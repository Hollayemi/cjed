import { siteConfig } from "@/app/config/site";

// Server-only. Sends the website's form submissions to the admin through Brevo's transactional email API.
// The API key stays on the server; the browser only ever talks to our own /api routes.

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export function getBrevoConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
  if (!apiKey || !senderEmail) return null;

  // ADMIN_NOTIFY_EMAIL can hold several addresses separated by commas.
  const admins = (process.env.ADMIN_NOTIFY_EMAIL?.trim() || siteConfig.email)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  return {
    apiKey,
    senderEmail,
    senderName: process.env.BREVO_SENDER_NAME?.trim() || "CJED Website",
    admins,
  };
}

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type EmailRow = {
  label: string;
  value: string;
  /** When set, the value is shown as a link. Only https:// links are rendered as links. */
  href?: string;
};

function renderEmail(heading: string, rows: EmailRow[]) {
  const body = rows
    .filter((r) => r.value)
    .map((r) => {
      const safeValue = escapeHtml(r.value).replace(/\r?\n/g, "<br>");
      const content =
        r.href && /^https:\/\//i.test(r.href)
          ? `<a href="${escapeHtml(r.href)}" style="color:#0068C1;font-weight:600">${safeValue}</a>`
          : safeValue;
      return `<tr>
  <td style="padding:12px 16px;width:170px;vertical-align:top;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#6b7280;border-bottom:1px solid #eef0f2">${escapeHtml(r.label)}</td>
  <td style="padding:12px 16px;vertical-align:top;font-size:14px;line-height:1.6;color:#111827;border-bottom:1px solid #eef0f2">${content}</td>
</tr>`;
    })
    .join("\n");

  return `<!doctype html>
<html>
<body style="margin:0;padding:24px;background:#F5F7F8;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb" cellspacing="0" cellpadding="0">
    <tr><td style="background:#0068C1;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700">${escapeHtml(heading)}</td></tr>
    <tr><td><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${body}</table></td></tr>
    <tr><td style="padding:16px 24px;font-size:12px;color:#9ca3af">Sent from the ${escapeHtml(siteConfig.shortName)} website (${escapeHtml(siteConfig.url)})</td></tr>
  </table>
</body>
</html>`;
}

export type SendResult = { ok: true } | { ok: false; status: number; error: string };

export async function sendAdminEmail(input: {
  subject: string;
  heading: string;
  rows: EmailRow[];
  /** The visitor, so the admin can answer with one click on "Reply". */
  replyTo?: { email: string; name?: string };
  tag: string;
}): Promise<SendResult> {
  const config = getBrevoConfig();
  if (!config) {
    console.error("Brevo is not configured: set BREVO_API_KEY and BREVO_SENDER_EMAIL.");
    return {
      ok: false,
      status: 503,
      error: `Messages can't be sent right now. Please email us at ${siteConfig.email}.`,
    };
  }

  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: { "api-key": config.apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: config.senderName, email: config.senderEmail },
        to: config.admins.map((email) => ({ email })),
        ...(input.replyTo ? { replyTo: input.replyTo } : {}),
        subject: input.subject.replace(/[\r\n]+/g, " ").slice(0, 200),
        htmlContent: renderEmail(input.heading, input.rows),
        tags: [input.tag],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`Brevo rejected the email (${res.status}):`, detail.slice(0, 300));
      return { ok: false, status: 502, error: `We couldn't send that just now. Please try again, or email us at ${siteConfig.email}.` };
    }
    return { ok: true };
  } catch (err) {
    console.error("Could not reach Brevo:", (err as Error).message);
    return { ok: false, status: 502, error: `We couldn't send that just now. Please try again, or email us at ${siteConfig.email}.` };
  }
}
