import Link from "next/link";
import { ArrowUpRight, BookHeart, HandHeart, Newspaper, Plus } from "lucide-react";
import { connectDB } from "@/lib/db";
import { models } from "@/lib/models";
import { RESOURCE_KEYS, RESOURCES, type ResourceKey } from "@/lib/resource-config";

export const dynamic = "force-dynamic";

const icons: Record<ResourceKey, typeof Newspaper> = {
  news: Newspaper,
  programs: HandHeart,
  stories: BookHeart,
};

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
  const total = stats.reduce((sum, s) => sum + s.published + s.draft, 0);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl text-brand md:text-3xl">Dashboard</h1>
          <p className="mt-1.5 text-sm text-ink/60">
            {total === 0
              ? "No content has been created yet."
              : `${total} item${total === 1 ? "" : "s"} across ${RESOURCE_KEYS.length} sections.`}
          </p>
        </div>
      </header>

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {stats.map(({ key, published, draft }) => {
          const Icon = icons[key];
          const label = RESOURCES[key].label;
          const count = published + draft;

          return (
            <li
              key={key}
              className="relative rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-md bg-brand/8 text-brand">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h2 className="text-base font-medium text-brand-deep">{label}</h2>
                </div>
                <Link
                  href={`/admin/${key}`}
                  aria-label={`Manage ${label}`}
                  className="-m-1.5 rounded-md p-1.5 text-ink/40 hover:bg-mist hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <dl className="mt-5 flex items-baseline gap-4 text-sm">
                <div className="flex items-baseline gap-1.5">
                  <dd className="text-2xl font-semibold tabular-nums text-ink">{published}</dd>
                  <dt className="text-ink/55">published</dt>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <dd className="text-2xl font-semibold tabular-nums text-ink/70">{draft}</dd>
                  <dt className="text-ink/55">{draft === 1 ? "draft" : "drafts"}</dt>
                </div>
              </dl>

              <p className="mt-3 text-xs leading-relaxed text-ink/50">
                Appears on the {RESOURCES[key].appearsOn}.
              </p>

              <Link
                href={`/admin/${key}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                {count === 0 ? `Add ${label.toLowerCase()}` : `Manage ${label.toLowerCase()}`}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}