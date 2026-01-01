import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_req: Request, { params }: Params) {
  return NextResponse.json({ id: params.id, workflow: null }, { status: 200 });
}

export async function PUT(_req: Request, { params }: Params) {
  return NextResponse.json({ id: params.id, updated: true }, { status: 200 });
}

export async function DELETE(_req: Request, { params }: Params) {
  return NextResponse.json({ id: params.id, deleted: true }, { status: 200 });
}

