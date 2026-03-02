import { NextRequest, NextResponse } from "next/server";
import prisma from "@/shared/lib/db";
import { getAuthPayload } from "@/shared/lib/auth";

export async function GET(req: NextRequest) {
  const payload = getAuthPayload(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  return NextResponse.json({ user }, { status: 200 });
}

