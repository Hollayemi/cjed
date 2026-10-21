import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Admin } from "@/lib/models";
import { sameOrigin, setSessionCookie } from "@/lib/auth";
import { signSession } from "@/lib/token";
import { rateLimit } from "@/lib/rate-limit";

const MAX_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;

const body = z.object({ email: z.string().trim().toLowerCase().email().max(254), password: z.string().min(1).max(200) });

// Compared against when the email is unknown, so timing doesn't reveal which emails exist.
let dummyHash: string | undefined;

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(`login:${ip}`, 10, LOCK_MS)) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }
  const { email, password } = parsed.data;

  await connectDB();
  const admin = await Admin.findOne({ email }).select("+passwordHash");

  if (admin?.lockUntil && admin.lockUntil > new Date()) {
    return NextResponse.json({ error: "Account locked for 15 minutes after too many failed attempts." }, { status: 429 });
  }

  dummyHash ??= await bcrypt.hash("not-a-real-password", 12);
  const valid = await bcrypt.compare(password, admin?.passwordHash ?? dummyHash);

  if (!admin || !valid) {
    if (admin) {
      const fails = admin.failedAttempts + 1;
      await Admin.updateOne(
        { _id: admin._id },
        fails >= MAX_FAILS
          ? { $set: { failedAttempts: 0, lockUntil: new Date(Date.now() + LOCK_MS) } }
          : { $set: { failedAttempts: fails } },
      );
    }
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  await Admin.updateOne({ _id: admin._id }, { $set: { failedAttempts: 0 }, $unset: { lockUntil: "" } });

  const token = await signSession({ id: String(admin._id), email: admin.email, role: admin.role });
  const res = NextResponse.json({ ok: true });
  setSessionCookie(res, token);
  return res;
}
