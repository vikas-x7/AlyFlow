import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "logout placeholder" }, { status: 200 });
}

