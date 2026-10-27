"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Calendar, CheckCircle2, GraduationCap, MapPin, Scale, Users } from "lucide-react";
import Link from "next/link";
import { programs } from "@/app/data/program";
import type { ProgramCard } from "@/lib/public-content";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import Badge from "@/app/components/Badge";
import CTA from "@/app/sections/CTA";
import { stagger, fadeUp } from "@/app/data/animation";

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
};

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" };

export default function ProgramsPageContent({ initiatives }: { initiatives: ProgramCard[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(initiatives.map((i) => i.category)))], [initiatives]);
  const [active, setActive] = useState("All");
  const visible = active === "All" ? initiatives : initiatives.filter((i) => i.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 lg:pb-24 bg-[#F5F7F8] overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.span variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-5">
                What We Do
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl text-[#0068C1] leading-tight mb-6" style={serif}>
                Justice education, one citizen at a time
              </motion.h1>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-8">
                We provide legal aid, educate citizens and equip stakeholders, bridging the gap between the law and the people it is meant to protect.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a href="#program-areas" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0068C1] text-white text-sm font-semibold hover:bg-[#0759a1] active:scale-[0.97] transition-all">
                  Our program areas
                </a>
                <a href="#recent-initiatives" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0068C1] text-[#0068C1] text-sm font-semibold hover:bg-[#0068C1] hover:text-white active:scale-[0.97] transition-all">
                  Recent initiatives
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-[#0068C1]/10 bg-[#0068C1]/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/cjed3.jpg" alt="Law students attending the CJED Law Students in Justice Conference" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F2E]/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100">
                <p className="text-2xl font-bold text-[#0068C1]" style={serif}>
                  {programs.length}
                </p>
                <p className="text-xs text-gray-500">Program areas</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Program areas */}
      <section id="program-areas" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <Container>
          <div className="mb-12 lg:mb-14">
            <SectionHeading
              eyebrow="Our Program Areas"
              title="Four ways we advance justice"
              subtitle="Each program area works on a different part of the justice system, from the individual in need of a lawyer to the laws themselves."
            />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {programs.map((p, i) => (
              <motion.article
                key={p.id}
                id={p.id}
                variants={fadeUp}
                className="group scroll-mt-28 relative flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-7 lg:p-8 hover:border-[#0068C1]/20 hover:shadow-xl hover:shadow-[#0068C1]/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0068C1]/8 text-[#0068C1] flex items-center justify-center group-hover:bg-[#0068C1] group-hover:text-white transition-colors duration-300">
                    {iconMap[p.icon]}
                  </div>
                  <span className="text-4xl font-bold text-gray-100 tabular-nums" style={serif} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl text-[#0068C1] mb-2" style={serif}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-5 mt-auto border-t border-gray-100">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0068C1]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Recent initiatives */}
      <section id="recent-initiatives" className="py-20 lg:py-28 bg-[#F5F7F8] scroll-mt-24">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <SectionHeading
              eyebrow="On The Ground"
              title="Recent initiatives"
              subtitle="Projects and partnerships where our programs came to life in real communities."
            />
            {categories.length > 2 && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter initiatives by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active === cat}
                    onClick={() => setActive(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                      active === cat ? "bg-[#0068C1] text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-[#0068C1]/30 hover:text-[#0068C1]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {visible.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-16">No initiatives to show yet. Check back soon.</p>
          ) : (
            <div className={`grid md:grid-cols-2 gap-6 ${visible.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {visible.map((init, i) => (
                <Reveal key={init.id} delay={(i % 3) * 0.06} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white hover:border-[#0068C1]/20 hover:shadow-xl hover:shadow-[#0068C1]/6 transition-all duration-300">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0A1F2E]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={init.image || "/images/image1.webp"}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="gold" className="!bg-[#f7cb06] !text-[#0A1F2E] font-bold">
                          {init.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <h3 className="text-lg lg:text-xl text-[#0068C1] leading-snug line-clamp-3" style={serif}>
                        {init.hasPage ? (
                          <Link href={`/programs/${init.slug}`} className="hover:underline after:absolute after:inset-0">
                            {init.title}
                          </Link>
                        ) : (
                          init.title
                        )}
                      </h3>

                      {(init.location || init.date) && (
                        <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                          {init.location && (
                            <span className="inline-flex items-start gap-1.5">
                              <MapPin className="w-3.5 h-3.5 mt-px flex-shrink-0 text-[#0068C1]" />
                              <span className="line-clamp-1">{init.location}</span>
                            </span>
                          )}
                          {init.date && (
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-[#0068C1]" />
                              {init.date}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">{init.summary}</p>

                      {init.highlights.length > 0 && (
                        <ul className="flex flex-col gap-2">
                          {init.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#0068C1]" />
                              <span className="line-clamp-2">{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
                        <div className="flex flex-wrap gap-1.5 min-w-0">
                          {init.partners.slice(0, 2).map((p) => (
                            <span key={p} className="max-w-full truncate px-2.5 py-1 rounded-full bg-[#F5F7F8] text-[#0068C1] text-[11px] font-medium">
                              {p}
                            </span>
                          ))}
                          {init.partners.length > 2 && (
                            <span className="px-2.5 py-1 rounded-full bg-[#F5F7F8] text-gray-400 text-[11px] font-medium">+{init.partners.length - 2}</span>
                          )}
                        </div>
                        {init.hasPage && (
                          <span className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-[#0068C1] group-hover:gap-2 transition-all">
                            Read more <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
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
