"use client";
import { motion } from "framer-motion";
import { Scale, GraduationCap, Users, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { programs } from "@/app/data/program";
import SectionHeading from "@/app/components/SectionHeading";
import Container from "@/app/components/Container";
import { stagger, fadeUp } from "@/app/data/animation";

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
};

export default function Programs() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F7F8]">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="What We Do"
            title="Programs that change lives"
            subtitle="Four pillars of intervention designed to address systemic injustice at every level."
          />
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0068C1] hover:gap-3 transition-all duration-200 flex-shrink-0"
          >
            View all programs <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-white rounded-3xl p-7 flex flex-col gap-5 cursor-pointer border border-transparent hover:border-[#0068C1]/10 hover:shadow-xl hover:shadow-[#0068C1]/6 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#0068C1]/8 text-[#0068C1] flex items-center justify-center group-hover:bg-[#0068C1] group-hover:text-white transition-all duration-300">
                {iconMap[p.icon]}
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <h3
                  className="text-lg font-semibold text-[#111827]"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
              </div>

              <ul className="flex flex-col gap-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D7A441] flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <Link
                href={`/programs#${p.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0068C1] group-hover:gap-2 transition-all duration-200 mt-auto pt-2 border-t border-gray-100"
              >
                Learn more <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}