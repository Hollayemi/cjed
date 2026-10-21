import { z } from "zod";
import type { ResourceKey } from "./resource-config";

const text = (max: number) => z.string().trim().max(max).default("");

const dateString = z
  .string()
  .default("")
  .refine((v) => v === "" || !Number.isNaN(Date.parse(v)), "Enter a valid date");

const common = {
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200),
  slug: text(200),
  summary: text(500),
  body: text(50_000),
  // Only http(s) URLs or site-relative paths: blocks javascript:/data: URLs.
  coverImage: z
    .string()
    .trim()
    .max(500)
    .default("")
    .refine((v) => v === "" || /^(https?:\/\/|\/(?!\/))/i.test(v), "Use a full https:// link or a path starting with /"),
  status: z.enum(["draft", "published"]).default("draft"),
};

// z.object strips unknown keys, so clients can't write fields we didn't define.
export const schemas: Record<ResourceKey, z.ZodObject> = {
  news: z.object({ ...common, category: text(80), author: text(120) }),
  programs: z.object({
    ...common,
    category: text(80),
    location: text(160),
    startDate: dateString,
    endDate: dateString,
  }),
  stories: z.object({ ...common, author: text(120), location: text(160) }),
};

export function validate(resource: ResourceKey, raw: unknown) {
  const result = schemas[resource].safeParse(raw);
  if (result.success) return { data: result.data as Record<string, unknown> };
  const fields: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fields[key] ??= issue.message;
  }
  return { fields };
}
