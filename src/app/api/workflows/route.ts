import { NextResponse } from 'next/server';
import prisma from '@/shared/lib/db';
import { auth } from '@/shared/lib/auth';
import { workflowSchema } from '@/modules/dashboard/schemas/workflow.schema';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const workflows = await prisma.workflow.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ workflows }, { status: 200 });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = workflowSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.issues }, { status: 400 });
  }

  const workflow = await prisma.workflow.create({
    data: {
      ownerId: session.user.id,
      name: parsed.data.name,
      description: parsed.data.description,
      canvas: {
        create: {
          nodes: [],
          edges: [],
        },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ workflow }, { status: 201 });
}
