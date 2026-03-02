import { NextResponse } from "next/server";

export async function POST() {
  // Stateless JWT: client just discards token.
  return NextResponse.json({ ok: true }, { status: 200 });
}

