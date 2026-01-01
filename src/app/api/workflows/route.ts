import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ workflows: [] }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ workflow: null }, { status: 201 });
}

