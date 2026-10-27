import { createHash } from "node:crypto";
import type { ResourceKey } from "./resource-config";

// Server-only. The API secret must never reach the browser: the admin asks
// /api/admin/upload/sign for a short-lived signature and uploads straight to Cloudinary.

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export type CloudinaryConfig = { cloudName: string; apiKey: string; apiSecret: string };

export function getCloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  return cloudName && apiKey && apiSecret ? { cloudName, apiKey, apiSecret } : null;
}

// One folder per content type keeps the Cloudinary media library tidy.
export const uploadFolder = (resource: ResourceKey) => `cjed/${resource}`;

/** Cloudinary signature: SHA-1 of the sorted "key=value" pairs joined by "&", followed by the secret. */
export function signParams(params: Record<string, string | number>, apiSecret: string) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(toSign + apiSecret).digest("hex");
}

/* ---------- Volunteer CVs ---------- */
// Visitors are not signed in, so the CV goes browser -> our server -> Cloudinary.
// The server checks the file first and signs the upload; the API secret never leaves it.

export const CV_FOLDER = "cjed/volunteer-cvs";

const slug = (input: string) =>
  input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

/** The first bytes of a real PDF, .docx (a zip) or .doc (OLE) file. Stops a renamed .exe passing as a CV. */
export async function cvMatchesExtension(file: File, ext: string) {
  const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const startsWith = (...bytes: number[]) => bytes.every((b, i) => head[i] === b);
  if (ext === "pdf") return startsWith(0x25, 0x50, 0x44, 0x46); // %PDF
  if (ext === "docx") return startsWith(0x50, 0x4b, 0x03, 0x04); // PK..
  if (ext === "doc") return startsWith(0xd0, 0xcf, 0x11, 0xe0); // OLE2
  return false;
}

/** Uploads a CV as a raw file and returns its https link. Throws with a readable message on failure. */
export async function uploadCv(file: File, ext: string, ownerName: string, config: CloudinaryConfig) {
  const timestamp = Math.floor(Date.now() / 1000);
  // Raw files keep their extension inside the public id.
  const publicId = `${slug(ownerName) || "volunteer"}-cv-${timestamp}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const signature = signParams({ folder: CV_FOLDER, public_id: publicId, timestamp }, config.apiSecret);

  const body = new FormData();
  body.set("file", file);
  body.set("api_key", config.apiKey);
  body.set("timestamp", String(timestamp));
  body.set("folder", CV_FOLDER);
  body.set("public_id", publicId);
  body.set("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/raw/upload`, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(25_000),
  });
  const data = (await res.json().catch(() => null)) as { secure_url?: string; error?: { message?: string } } | null;
  if (!res.ok || !data?.secure_url) {
    throw new Error(data?.error?.message || `Cloudinary upload failed (${res.status})`);
  }
  return data.secure_url;
}
