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
