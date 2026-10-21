import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectDB } from "./db";
import { models } from "./models";
import { RESOURCES, type ResourceKey } from "./resource-config";
import {
  fallbackNews,
  fallbackNewsArticle,
  fallbackPrograms,
  toArticle,
  toNewsCard,
  toProgramCard,
  toStoryCard,
  type Article,
  type NewsCard,
  type ProgramCard,
  type StoryCard,
} from "./public-content";

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

/* ---------- Ready-to-render lists for the public pages ---------- */
// If the database is empty or unreachable the public site keeps working: news and programs fall back to
// the built-in content, stories simply show an empty state.
async function safe<T>(read: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await read();
  } catch (err) {
    console.error("Could not load published content:", (err as Error).message);
    return fallback;
  }
}

export async function getNewsCards(limit = 20): Promise<NewsCard[]> {
  const docs = await safe(() => getPublished("news", limit), []);
  return docs.length ? docs.map(toNewsCard) : fallbackNews.slice(0, limit);
}

export async function getProgramCards(limit = 20): Promise<ProgramCard[]> {
  const docs = await safe(() => getPublished("programs", limit), []);
  return docs.length ? docs.map(toProgramCard) : fallbackPrograms.slice(0, limit);
}

export async function getStoryCards(limit = 20): Promise<StoryCard[]> {
  const docs = await safe(() => getPublished("stories", limit), []);
  return docs.map(toStoryCard);
}

export async function getPublishedItem(resource: ResourceKey, slug: string) {
  return safe(() => getPublishedBySlug(resource, slug.slice(0, 120)), null);
}

/** A published item ready for its own page, or null (which the page turns into a 404). */
export async function getArticle(resource: ResourceKey, slug: string): Promise<Article | null> {
  const doc = await getPublishedItem(resource, slug);
  if (doc) return toArticle(resource, doc as Record<string, unknown>);
  return resource === "news" ? fallbackNewsArticle(slug) : null;
}

export async function getPublishedSlugs(resource: ResourceKey) {
  const docs = await safe(() => getPublished(resource, 500), []);
  return docs.map((d) => ({ slug: String(d.slug), updatedAt: d.updatedAt as Date | undefined }));
}

/** Call after any admin write so the public pages update straight away instead of waiting for the timer. */
export function revalidateContent(resource: ResourceKey) {
  const base = RESOURCES[resource].publicPath;
  revalidatePath("/");
  revalidatePath(base);
  revalidatePath(`${base}/[slug]`, "page");
  revalidatePath("/sitemap.xml");
}
