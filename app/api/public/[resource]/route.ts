import { NextRequest, NextResponse } from "next/server";
import { getPublished, getPublishedBySlug } from "@/lib/content";
import { isResourceKey } from "@/lib/resource-config";

// Read-only, published content only. GET /api/public/news  or  /api/public/news?slug=my-post
export async function GET(req: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!isResourceKey(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const headers = { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" };
  const slug = req.nextUrl.searchParams.get("slug");

  if (slug) {
    const item = await getPublishedBySlug(resource, slug.slice(0, 120));
    return item ? NextResponse.json({ item }, { headers }) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const limit = Math.min(50, Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 20));
  return NextResponse.json({ items: await getPublished(resource, limit) }, { headers });
}
