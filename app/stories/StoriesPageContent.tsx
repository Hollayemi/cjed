"use client";
import type { StoryCard as Story } from "@/lib/public-content";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import StoryCard from "@/app/components/StoryCard";
import CTA from "@/app/sections/CTA";

export default function StoriesPageContent({ stories }: { stories: Story[] }) {
  return (
    <>
      <section className="bg-[#F5F7F8] pt-36 pb-16 lg:pt-44">
        <Container>
          <SectionHeading
            eyebrow="Stories from the field"
            title="Real people, real justice"
            subtitle="Voices and moments from the communities we work with across Nigeria."
          />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          {stories.length === 0 ? (
            <p className="py-16 text-center text-gray-500">No stories have been published yet. Please check back soon.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((s) => (
                <Reveal key={s.id}>
                  <StoryCard story={s} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
      <CTA />
    </>
  );
}
