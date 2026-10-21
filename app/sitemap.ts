import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/config/site";
import { getPublishedSlugs } from "@/lib/content";
import { RESOURCE_KEYS, publicUrl } from "@/lib/resource-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/programs", changeFrequency: "monthly", priority: 0.8 },
    { path: "/impact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/news", changeFrequency: "weekly", priority: 0.7 },
    { path: "/stories", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  ];

  const lastModified = new Date();

  const pages = routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Published news, programs and stories from the admin.
  const items = (
    await Promise.all(
      RESOURCE_KEYS.map(async (key) =>
        (await getPublishedSlugs(key)).map((i) => ({
          url: `${siteConfig.url}${publicUrl(key, i.slug)}`,
          lastModified: i.updatedAt ?? lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ),
    )
  ).flat();

  return [...pages, ...items];
}
