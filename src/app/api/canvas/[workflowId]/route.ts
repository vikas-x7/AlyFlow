import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/db";
import { getAuthPayload } from "@/shared/lib/auth";
import { canvasSchema } from "@/modules/canvas/schemas/canvas.schema";
import type { Prisma } from "@/generated/prisma/client";

interface Params {
  params: Promise<{
    workflowId: string;
  }>;
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
  const parsed = canvasSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const updated = await prisma.canvas.upsert({
    where: { workflowId },
    create: {
      workflowId,
      nodes: parsed.data.nodes as Prisma.InputJsonValue,
      edges: parsed.data.edges as Prisma.InputJsonValue,
    },
    update: {
      nodes: parsed.data.nodes as Prisma.InputJsonValue,
      edges: parsed.data.edges as Prisma.InputJsonValue,
    },
    select: { updatedAt: true },
  });

  return NextResponse.json({ ok: true, updatedAt: updated.updatedAt }, { status: 200 });
}

