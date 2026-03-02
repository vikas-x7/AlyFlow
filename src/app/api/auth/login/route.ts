import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/shared/lib/db";
import { signJwt } from "@/shared/lib/jwt";
import { loginSchema } from "@/modules/auth/schemas/auth.schema";

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, passwordHash: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signJwt({ userId: user.id, email: user.email });
  return NextResponse.json(
    { user: { id: user.id, email: user.email, name: user.name }, token },
    { status: 200 },
  );
}

