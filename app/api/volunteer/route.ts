import { NextRequest, NextResponse } from "next/server";
import { sendAdminEmail } from "@/lib/brevo";
import { cvMatchesExtension, getCloudinaryConfig, uploadCv } from "@/lib/cloudinary";
import { cvProblem, fileExtension } from "@/lib/form-options";
import { clientIp, parseForm, volunteerSchema } from "@/lib/forms";
import { rateLimit } from "@/lib/rate-limit";

// Public volunteer form: checks the CV, stores it on Cloudinary, then emails the admin the details and the link.
export async function POST(req: NextRequest) {
  // Loose cap on every request (stops floods); the strict cap below only counts submissions that are valid and about to send.
  if (!rateLimit(`volunteer-any:${clientIp(req)}`, 40, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true }); // bot

  const parsed = parseForm(volunteerSchema, {
    fullName: String(form.get("fullName") ?? ""),
    institution: String(form.get("institution") ?? ""),
    level: String(form.get("level") ?? ""),
    website: "",
  });
  const fields: Record<string, string> = "fields" in parsed ? { ...parsed.fields } : {};

  const cv = form.get("cv");
  let ext = "";
  if (!(cv instanceof File) || cv.size === 0) {
    fields.cv = "Upload your CV.";
  } else {
    ext = fileExtension(cv.name);
    const problem = cvProblem(cv);
    if (problem) fields.cv = problem;
    else if (!(await cvMatchesExtension(cv, ext))) fields.cv = "That file doesn't look like a real PDF or Word document.";
  }

  const d = "data" in parsed ? parsed.data : null;
  if (!d || !(cv instanceof File) || Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fields }, { status: 400 });
  }

  if (!rateLimit(`volunteer:${clientIp(req)}`, 4, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }

  const config = getCloudinaryConfig();
  if (!config) {
    console.error("Cloudinary is not configured: CV uploads need the CLOUDINARY_* keys.");
    return NextResponse.json({ error: "CV uploads are not available right now. Please try again later." }, { status: 503 });
  }

  let cvUrl: string;
  try {
    cvUrl = await uploadCv(cv, ext, d.fullName, config);
  } catch (err) {
    console.error("CV upload failed:", (err as Error).message);
    return NextResponse.json({ error: "We couldn't upload your CV. Please try again." }, { status: 502 });
  }

  const result = await sendAdminEmail({
    tag: "volunteer",
    subject: `New volunteer application: ${d.fullName}`,
    heading: "New volunteer application",
    rows: [
      { label: "Full name", value: d.fullName },
      { label: "School / institution", value: d.institution },
      { label: "Level", value: d.level },
      { label: "CV", value: "Open CV", href: cvUrl },
      { label: "CV link", value: cvUrl },
    ],
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}

export const maxDuration = 30;
