import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import type { StoryCard as Story } from "@/lib/public-content";

/** Card used on the Stories page and in the home page section. */
export default function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-[#0068C1]/6">
      <div className="relative h-52 overflow-hidden bg-[#0068C1]/8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.image || "/images/image2.webp"}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
          {story.date && <span>{story.date}</span>}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {story.readTime}
          </span>
          {story.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-[#0068C1]" /> {story.location}
            </span>
          )}
        </div>
        <h3 className="text-lg leading-snug text-[#111827] transition-colors group-hover:text-[#0068C1]">
          <Link href={`/stories/${story.slug}`} className="after:absolute after:inset-0">
            {story.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-500">{story.summary}</p>
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
          <span className="text-gray-500">{story.author ? `Told by ${story.author}` : "CJED"}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#0068C1]">
            Read story <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
