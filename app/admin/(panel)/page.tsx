import Link from "next/link";
import { ArrowUpRight, BookHeart, HandHeart, Newspaper, Plus } from "lucide-react";
import { connectDB } from "@/lib/db";
import { models } from "@/lib/models";
import { RESOURCE_KEYS, RESOURCES, type ResourceKey } from "@/lib/resource-config";

export const dynamic = "force-dynamic";

const icons: Record<ResourceKey, typeof Newspaper> = { news: Newspaper, programs: HandHeart, stories: BookHeart };

export default async function Dashboard() {
  await connectDB();
  const stats = await Promise.all(
    RESOURCE_KEYS.map(async (key) => {
      const [published, draft] = await Promise.all([
        models[key].countDocuments({ status: "published" }),
        models[key].countDocuments({ status: "draft" }),
      ]);
      return { key, published, draft };
    }),
  );
  const empty = stats.every((s) => s.published + s.draft === 0);

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold tracking-[0.15em] text-gold-deep uppercase">Welcome back</p>
      <h1 className="mt-1 text-3xl text-brand md:text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-ink/65">
        {empty
          ? "Nothing here yet. Open a section to add your first item."
          : "What is live on the public site and what is still a draft."}
      </p>

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {stats.map(({ key, published, draft }) => {
          const Icon = icons[key];
          return (
            <li
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand/10"
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-gold" />
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="size-5" />
                </span>
                <Link
                  href={`/admin/${key}`}
                  aria-label={`Open ${RESOURCES[key].label}`}
                  className="rounded-full p-1.5 text-ink/40 hover:bg-mist hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <ArrowUpRight className="size-5" />
                </Link>
              </div>
              <h2 className="mt-4 text-xl text-brand-deep">{RESOURCES[key].label}</h2>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tabular-nums">{published}</span>
                <span className="text-sm text-ink/65">live</span>
                <span className="ml-2 text-sm text-ink/65">
                  · {draft} {draft === 1 ? "draft" : "drafts"}
                </span>
              </p>
              <p className="mt-3 min-h-10 text-xs leading-relaxed text-ink/55">Shown on the {RESOURCES[key].appearsOn}.</p>
              <Link
                href={`/admin/${key}`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Plus className="size-4" /> Manage {RESOURCES[key].label.toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
