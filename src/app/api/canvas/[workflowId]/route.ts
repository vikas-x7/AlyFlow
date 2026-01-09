import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/db";
import { getAuthPayload } from "@/shared/lib/auth";
import { canvasSaveSchema } from "@/modules/canvas/schemas/canvas.schema";
import type { Prisma } from "@/generated/prisma/client";

interface Params {
  params: Promise<{
    workflowId: string;
  }>;
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function readNodeId(node: unknown) {
  if (!node || typeof node !== "object") return null;
  const id = (node as { id?: unknown }).id;
  return typeof id === "string" ? id : null;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { workflowId } = await params;
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const workflow = await prisma.workflow.findFirst({
    where: { id: workflowId, ownerId: payload.userId },
    select: { id: true },
  });
  if (!workflow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const canvas = await prisma.canvas.findUnique({
    where: { workflowId },
    select: { nodes: true, edges: true, updatedAt: true },
  });

  return NextResponse.json(
    { workflowId, canvas: canvas ?? { nodes: [], edges: [], updatedAt: null } },
    { status: 200 },
  );
}

export async function POST(req: NextRequest, { params }: Params) {
  const { workflowId } = await params;
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const workflow = await prisma.workflow.findFirst({
    where: { id: workflowId, ownerId: payload.userId },
    select: { id: true },
  });
  if (!workflow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const json = await req.json().catch(() => null);
  const parsed = canvasSaveSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  let nextNodes: unknown[] = [];
  let nextEdges: unknown[] = [];

  if ("nodes" in parsed.data) {
    nextNodes = parsed.data.nodes;
    nextEdges = parsed.data.edges;
  } else {
    const existingCanvas = await prisma.canvas.findUnique({
      where: { workflowId },
      select: { nodes: true, edges: true },
    });

    const existingNodes = asArray(existingCanvas?.nodes);
    const existingEdges = asArray(existingCanvas?.edges);
    const removedIds = new Set(parsed.data.removedNodeIds);
    const mergedById = new Map<string, unknown>();
    const withoutId: unknown[] = [];

    for (const node of existingNodes) {
      const nodeId = readNodeId(node);
      if (!nodeId) {
        withoutId.push(node);
        continue;
      }
      if (removedIds.has(nodeId)) continue;
      mergedById.set(nodeId, node);
    }

    for (const node of parsed.data.dirtyNodes) {
      const nodeId = readNodeId(node);
      if (!nodeId) {
        withoutId.push(node);
        continue;
      }
      mergedById.set(nodeId, node);
    }

    nextNodes = [...mergedById.values(), ...withoutId];
    nextEdges = parsed.data.edges ?? existingEdges;
  }

  const updated = await prisma.canvas.upsert({
    where: { workflowId },
    create: {
      workflowId,
      nodes: nextNodes as Prisma.InputJsonValue,
      edges: nextEdges as Prisma.InputJsonValue,
    },
    update: {
      nodes: nextNodes as Prisma.InputJsonValue,
      edges: nextEdges as Prisma.InputJsonValue,
    },
    select: { updatedAt: true },
  });

  return NextResponse.json({ ok: true, updatedAt: updated.updatedAt }, { status: 200 });
}
