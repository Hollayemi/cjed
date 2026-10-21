import Link from "next/link";
import { connectDB } from "@/lib/db";
import { models } from "@/lib/models";
import { RESOURCE_KEYS, RESOURCES } from "@/lib/resource-config";

export const dynamic = "force-dynamic";

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
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-[#14232B]/70">
        {empty ? "Nothing here yet. Open a section to add your first item." : "What is live and what is still a draft."}
      </p>

      <ul className="mt-8 divide-y divide-[#D9DDD6] rounded-lg border border-[#D9DDD6] bg-white">
        {stats.map(({ key, published, draft }) => (
          <li key={key}>
            <Link
              href={`/admin/${key}`}
              className="flex items-baseline justify-between gap-4 px-5 py-4 hover:bg-[#F4F5F2] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#B7791F]"
            >
              <span className="text-lg font-medium">{RESOURCES[key].label}</span>
              <span className="text-sm text-[#14232B]/70">
                {published} published, {draft} {draft === 1 ? "draft" : "drafts"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
