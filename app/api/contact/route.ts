import { NextRequest, NextResponse } from "next/server";
import { sendAdminEmail } from "@/lib/brevo";
import { clientIp, contactSchema, parseForm } from "@/lib/forms";
import { rateLimit } from "@/lib/rate-limit";

// Public "Contact us" form. Emails the admin through Brevo; the visitor's address is set as Reply-To.
export async function POST(req: NextRequest) {
  // Loose cap on every request (stops floods); the strict cap below only counts submissions that are valid and about to send.
  if (!rateLimit(`contact-any:${clientIp(req)}`, 40, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many messages. Please wait a few minutes and try again." }, { status: 429 });
  }

  const raw = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!raw || typeof raw !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (typeof raw.website === "string" && raw.website.trim()) return NextResponse.json({ ok: true }); // bot

  const parsed = parseForm(contactSchema, raw);
  if ("fields" in parsed) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fields: parsed.fields }, { status: 400 });
  }
  const d = parsed.data;

  if (!rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many messages. Please wait a few minutes and try again." }, { status: 429 });
  }

  const result = await sendAdminEmail({
    tag: "contact",
    subject: `Website enquiry${d.enquiryType ? ` (${d.enquiryType})` : ""} from ${d.name}`,
    heading: "New message from the contact form",
    replyTo: { email: d.email, name: d.name },
    rows: [
      { label: "Name", value: d.name },
      { label: "Email", value: d.email },
      { label: "Phone", value: d.phone },
      { label: "Enquiry type", value: d.enquiryType },
      { label: "Message", value: d.message },
    ],
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
