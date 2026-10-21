// JWT helpers. Only depends on `jose`, so it is safe to import from proxy.ts.
import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "cjed_admin";
export const SESSION_SECONDS = 60 * 60 * 8; // 8 hours

export type Session = { id: string; email: string; role: string };

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters long");
  }
  return new TextEncoder().encode(s);
}

export async function signSession(session: Session) {
  return new SignJWT({ email: session.email, role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(secret());
}

export async function verifyToken(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    if (!payload.sub) return null;
    return { id: payload.sub, email: String(payload.email), role: String(payload.role) };
  } catch {
    return null;
  }
}
