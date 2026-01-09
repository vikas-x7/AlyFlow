import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/shared/lib/db";
import { signJwt } from "@/shared/lib/jwt";
import { registerSchema } from "@/modules/auth/schemas/auth.schema";

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { email, password, name } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findFirst({
    where: {
      email: {
        equals: normalizedEmail,
        mode: "insensitive",
      },
    },
    select: { id: true },
  });

  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name,
        passwordHash,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = signJwt({ userId: user.id, email: user.email });
    return NextResponse.json({ user, token }, { status: 201 });
  } catch (e: any) {
    const message = typeof e?.message === "string" ? e.message : "";
    const isUnique = message.toLowerCase().includes("unique") || message.toLowerCase().includes("email");
    return NextResponse.json(
      { error: isUnique ? "Email already exists" : "Registration failed" },
      { status: isUnique ? 409 : 500 },
    );
  }
}
