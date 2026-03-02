import type { NextRequest } from "next/server";
import { verifyJwt } from "./jwt";

export interface AuthPayload {
  userId: string;
  email: string;
}

export function getBearerToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7).trim() || null;
}

export function getAuthPayload(req: NextRequest): AuthPayload | null {
  const token = getBearerToken(req);
  if (!token) return null;
  return verifyJwt<AuthPayload>(token);
}

