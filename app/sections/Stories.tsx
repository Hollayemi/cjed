import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StoryCard as Story } from "@/lib/public-content";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import StoryCard from "@/app/components/StoryCard";

/** "Stories from the field" on the home page. Hidden until at least one story is published. */
export default function Stories({ stories }: { stories: Story[] }) {
  if (stories.length === 0) return null;
  return (
    <section className="bg-[#F5F7F8] py-24 lg:py-32">
      <Container>
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Stories"
            title="Stories from the field"
            subtitle="Voices and moments from the communities we serve."
          />
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 rounded-full bg-[#0068C1] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0068C1]/20 transition-colors hover:bg-[#0054a0]"
          >
            All stories <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.slice(0, 3).map((s) => (
            <StoryCard key={s.id} story={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
