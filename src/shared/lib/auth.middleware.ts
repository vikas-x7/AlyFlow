import { NextRequest, NextResponse } from "next/server";
import { getAuthPayload } from "./auth";

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    if (!getAuthPayload(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req);
  };
}

