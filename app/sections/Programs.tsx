"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { ProgramCard } from "@/lib/public-content";
import SectionHeading from "@/app/components/SectionHeading";
import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import { stagger, fadeUp } from "@/app/data/animation";

const serif = { fontFamily: "'DM Serif Display', Georgia, serif" };

export default function Programs({ initiatives }: { initiatives: ProgramCard[] }) {
  const items = initiatives.slice(0, 4);

  return (
    <section className="py-24 lg:py-32 bg-[#F5F7F8]">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-14">
          <SectionHeading
            eyebrow="Our Mission in Action"
            title="Programs that change lives"
            subtitle="Recent work from our legal aid, training and community programs across Nigeria."
          />
          <Link
            href="/programs"
            className="inline-flex flex-shrink-0 items-center gap-2 self-start lg:self-auto px-6 py-3 bg-[#0068C1] text-white rounded-full text-sm font-semibold hover:bg-[#0759a1] active:scale-[0.97] transition-all shadow-lg shadow-[#0068C1]/20 group"
          >
            Explore all programs
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {items.map((init) => (
            <motion.article
              key={init.id}
              variants={fadeUp}
              className="group relative flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-gray-100 bg-white hover:border-[#0068C1]/20 hover:shadow-xl hover:shadow-[#0068C1]/6 transition-all duration-300"
            >
              <div className="relative sm:w-2/5 flex-shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-full overflow-hidden bg-[#0A1F2E]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={init.image || "/images/image1.webp"}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div>
                  <Badge variant="forest">{init.category}</Badge>
                </div>
                <h3 className="text-lg text-[#0068C1] leading-snug line-clamp-3" style={serif}>
                  {init.hasPage ? (
                    <Link href={`/programs/${init.slug}`} className="hover:underline after:absolute after:inset-0">
                      {init.title}
                    </Link>
                  ) : (
                    init.title
                  )}
                </h3>
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
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{init.summary}</p>
                {init.hasPage && (
                  <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0068C1] group-hover:gap-2 transition-all">
                    Read more <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
