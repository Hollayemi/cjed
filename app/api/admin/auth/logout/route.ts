import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, sameOrigin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}
