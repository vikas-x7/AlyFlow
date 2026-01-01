import { NextResponse } from "next/server";

interface Params {
  params: {
    workflowId: string;
  };
}

export async function GET(_req: Request, { params }: Params) {
  return NextResponse.json({ workflowId: params.workflowId, canvas: null }, { status: 200 });
}

export async function POST(_req: Request, { params }: Params) {
  return NextResponse.json({ workflowId: params.workflowId, saved: true }, { status: 200 });
}

