import { NextRequest, NextResponse } from "next/server";
import { sendAdminEmail } from "@/lib/brevo";
import { clientIp, parseForm, partnerSchema } from "@/lib/forms";
import { rateLimit } from "@/lib/rate-limit";

// Public "Partner with us" form. Emails the admin through Brevo; the contact's address is set as Reply-To.
export async function POST(req: NextRequest) {
  // Loose cap on every request (stops floods); the strict cap below only counts submissions that are valid and about to send.
  if (!rateLimit(`partner-any:${clientIp(req)}`, 40, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  const raw = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!raw || typeof raw !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (typeof raw.website === "string" && raw.website.trim()) return NextResponse.json({ ok: true }); // bot

  const parsed = parseForm(partnerSchema, raw);
  if ("fields" in parsed) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fields: parsed.fields }, { status: 400 });
  }
  const d = parsed.data;

  if (!rateLimit(`partner:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  const result = await sendAdminEmail({
    tag: "partner",
    subject: `Partnership request: ${d.organisation}`,
    heading: "New partnership request",
    replyTo: { email: d.email, name: d.contactPerson },
    rows: [
      { label: "Organisation", value: d.organisation },
      { label: "Type", value: d.organisationType },
      { label: "Contact person", value: d.contactPerson },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phone },
      { label: "How they'd like to partner", value: d.message },
    ],
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
