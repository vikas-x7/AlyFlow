import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/db';
import { auth } from '@/shared/lib/auth';
import { workflowSchema } from '@/modules/dashboard/schemas/workflow.schema';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

async function getOwnedWorkflow(userId: string, id: string) {
  return prisma.workflow.findFirst({
    where: { id, ownerId: userId },
    select: { id: true, name: true, description: true, createdAt: true, updatedAt: true },
  });
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const workflow = await getOwnedWorkflow(session.user.id, id);
  if (!workflow) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ workflow }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = workflowSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.issues }, { status: 400 });
  }

  const existing = await prisma.workflow.findFirst({
    where: { id, ownerId: session.user.id },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const workflow = await prisma.workflow.update({
    where: { id },
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
    },
    select: { id: true, name: true, description: true, createdAt: true, updatedAt: true },
  });

  return NextResponse.json({ workflow }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await prisma.workflow.findFirst({
    where: { id, ownerId: session.user.id },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.workflow.delete({ where: { id } });
  return NextResponse.json({ ok: true }, { status: 200 });
}
