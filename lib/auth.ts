import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, SESSION_SECONDS, verifyToken, type Session } from "./token";

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

/** For server components / layouts. */
export async function getSession() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE_NAME, token, { ...cookieBase, maxAge: SESSION_SECONDS });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", { ...cookieBase, maxAge: 0 });
}

/** Rejects cross-site browser requests (extra CSRF layer on top of SameSite=Strict). */
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

type Guard = { session: Session; error?: never } | { error: NextResponse; session?: never };

/** Call at the top of every /api/admin handler: don't rely on proxy.ts alone. */
export async function requireAdmin(req: NextRequest): Promise<Guard> {
  if (req.method !== "GET" && !sameOrigin(req)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  const session = await verifyToken(req.cookies.get(COOKIE_NAME)?.value);
  if (!session) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session };
}
