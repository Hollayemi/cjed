import mongoose from "mongoose";
import { connectDB } from "./db";
import { models } from "./models";
import type { ResourceKey } from "./resource-config";

export function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "item"
  );
}

export async function uniqueSlug(resource: ResourceKey, base: string, excludeId?: string) {
  const Model = models[resource];
  let slug = base;
  let n = 1;
  while (await Model.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

export function toDates(data: Record<string, unknown>) {
  for (const key of ["startDate", "endDate"]) {
    if (key in data) data[key] = data[key] ? new Date(String(data[key])) : null;
  }
  return data;
}

export const isId = (id: string) => mongoose.isValidObjectId(id);

/* ---------- Public queries (use these in server components on the public site) ---------- */
const PUBLIC_FIELDS = "-__v -status";

export async function getPublished(resource: ResourceKey, limit = 20) {
  await connectDB();
  return models[resource]
    .find({ status: "published" })
    .select(PUBLIC_FIELDS)
    .sort({ publishedAt: -1 })
    .limit(limit)
    .lean();
}

export async function getPublishedBySlug(resource: ResourceKey, slug: string) {
  await connectDB();
  return models[resource].findOne({ slug, status: "published" }).select(PUBLIC_FIELDS).lean();
}
