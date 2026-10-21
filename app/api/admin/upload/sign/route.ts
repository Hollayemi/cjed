import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getCloudinaryConfig, signParams, uploadFolder } from "@/lib/cloudinary";
import { isResourceKey } from "@/lib/resource-config";

// Gives the admin browser a short-lived signature so it can upload an image straight to Cloudinary.
// Only signed-in admins reach this, and the signature is locked to the folder for that content type.
export async function POST(req: NextRequest) {
  const guard = await requireAdmin(req);
  if (guard.error) return guard.error;

  const config = getCloudinaryConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Image uploads are not set up yet. Add the Cloudinary keys to the server settings." },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => null)) as { resource?: string } | null;
  const resource = body?.resource ?? "";
  if (!isResourceKey(resource)) return NextResponse.json({ error: "Unknown content type." }, { status: 400 });

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = uploadFolder(resource);
  const signature = signParams({ folder, timestamp }, config.apiSecret);

  return NextResponse.json(
    { cloudName: config.cloudName, apiKey: config.apiKey, timestamp, folder, signature },
    { headers: { "Cache-Control": "no-store" } },
  );
}
