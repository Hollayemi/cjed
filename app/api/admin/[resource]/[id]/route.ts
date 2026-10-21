import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { models } from "@/lib/models";
import { validate } from "@/lib/validation";
import { isId, revalidateContent, slugify, toDates, uniqueSlug } from "@/lib/content";
import { isResourceKey } from "@/lib/resource-config";

type Ctx = { params: Promise<{ resource: string; id: string }> };

const notFound = () => NextResponse.json({ error: "Not found" }, { status: 404 });

export async function GET(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin(req);
  if (guard.error) return guard.error;

  const { resource, id } = await params;
  if (!isResourceKey(resource) || !isId(id)) return notFound();

  await connectDB();
  const item = await models[resource].findById(id).select("-__v").lean();
  return item ? NextResponse.json({ item }) : notFound();
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin(req);
  if (guard.error) return guard.error;

  const { resource, id } = await params;
  if (!isResourceKey(resource) || !isId(id)) return notFound();

  const result = validate(resource, await req.json().catch(() => null));
  if (!result.data) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields: result.fields }, { status: 400 });
  }

  await connectDB();
  const Model = models[resource];
  const existing = await Model.findById(id).select("slug publishedAt").lean();
  if (!existing) return notFound();

  const data = toDates(result.data);
  // Keep the existing URL unless the admin typed a new slug.
  data.slug = data.slug ? await uniqueSlug(resource, slugify(String(data.slug)), id) : existing.slug;
  if (data.status === "published" && !existing.publishedAt) data.publishedAt = new Date();

  const item = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select("-__v").lean();
  revalidateContent(resource);
  return NextResponse.json({ item });
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin(req);
  if (guard.error) return guard.error;

  const { resource, id } = await params;
  if (!isResourceKey(resource) || !isId(id)) return notFound();

  await connectDB();
  const deleted = await models[resource].findByIdAndDelete(id);
  if (deleted) revalidateContent(resource);
  return deleted ? NextResponse.json({ ok: true }) : notFound();
}
