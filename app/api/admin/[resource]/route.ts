import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { models } from "@/lib/models";
import { validate } from "@/lib/validation";
import { slugify, toDates, uniqueSlug } from "@/lib/content";
import { isResourceKey } from "@/lib/resource-config";

type Ctx = { params: Promise<{ resource: string }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin(req);
  if (guard.error) return guard.error;

  const { resource } = await params;
  if (!isResourceKey(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sp = req.nextUrl.searchParams;
  const page = Math.max(1, Number(sp.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(sp.get("limit")) || 10));
  const q = (sp.get("q") ?? "").trim().slice(0, 100);
  const status = sp.get("status");

  const filter: Record<string, unknown> = {};
  if (q) filter.title = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  if (status === "draft" || status === "published") filter.status = status;

  await connectDB();
  const Model = models[resource];
  const [items, total] = await Promise.all([
    Model.find(filter)
      .select("-body -__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Model.countDocuments(filter),
  ]);

  return NextResponse.json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const guard = await requireAdmin(req);
  if (guard.error) return guard.error;

  const { resource } = await params;
  if (!isResourceKey(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const result = validate(resource, await req.json().catch(() => null));
  if (!result.data) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields: result.fields }, { status: 400 });
  }

  await connectDB();
  const data = toDates(result.data);
  data.slug = await uniqueSlug(resource, slugify(String(data.slug || data.title)));
  if (data.status === "published") data.publishedAt = new Date();

  const item = await models[resource].create(data);
  return NextResponse.json({ item }, { status: 201 });
}
