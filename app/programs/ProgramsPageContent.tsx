"use client";
import { motion } from "framer-motion";
import { Scale, GraduationCap, Users, BookOpen, MapPin, Calendar } from "lucide-react";
import { programs } from "@/app/data/program";
import Link from "next/link";
import type { ProgramCard } from "@/lib/public-content";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import CTA from "@/app/sections/CTA";
import { stagger, fadeUp } from "@/app/data/animation";

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
};

const programImages = [
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
];

export default function ProgramsPageContent({ initiatives }: { initiatives: ProgramCard[] }) {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#F5F7F8] overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.span
                variants={fadeUp}
                className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-5"
              >
                What We Do
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl text-[#0068C1] leading-tight mb-6"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Justice Education: One Citizen At A Time
              </motion.h1>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
                Providing legal aid, educating citizens and equiping stakeholders.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-[#0068C1]/10">
                <motion.img
                  src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=900&q=80"
                  alt="CJED programs in action across Nigeria"
                  className="w-full h-full object-cover"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F2E]/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100">
                <p className="text-2xl font-bold text-[#0068C1]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                  4+
                </p>
                <p className="text-xs text-gray-500">Active programs</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Recent Initiatives */}
      <section id="recent-initiatives" className="py-24 bg-[#F5F7F8]">
        <Container>
          <div className="mb-14">
            <SectionHeading
              eyebrow="On The Ground"
              title="Recent initiatives"
              subtitle="A look at specific projects and partnerships where our programs came to life in real communities."
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {initiatives.map((init) => (
              <Reveal key={init.id}>
                <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-[#0068C1]/6 transition-all duration-300 flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0A1F2E]">
                    <img
                      src={init.image || "/images/image1.webp"}
                      alt={init.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#f7cb06] text-[#0A1F2E] text-xs font-bold">
                      {init.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 p-7 flex-1">
                    <h3
                      className="text-xl lg:text-2xl text-[#0068C1] leading-tight"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      {init.hasPage ? (
                        <Link href={`/programs/${init.slug}`} className="hover:underline after:absolute after:inset-0">
                          {init.title}
                        </Link>
                      ) : (
                        init.title
                      )}
                    </h3>

                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-400">
                      {init.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          {init.location}
                        </span>
                      )}
                      {init.date && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          {init.date}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed">{init.summary}</p>

                    <ul className="flex flex-col gap-2">
                      {init.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="w-4 h-4 rounded-full bg-[#0068C1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0068C1]" />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                      {init.partners.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 rounded-full bg-[#F5F7F8] text-[#0068C1] text-xs font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}