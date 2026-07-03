"use client";
import { motion } from "framer-motion";
import { Scale, GraduationCap, Users, BookOpen } from "lucide-react";
import { programs } from "@/app/data/program";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import CTA from "@/app/sections/CTA";
import { stagger, fadeUp, slideRight } from "@/app/data/animation";

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

export default function ProgramsPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#F5F7F8]">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
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
              Four pillars of justice, education, and empowerment
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Each program is designed to address a distinct but interconnected dimension of systemic injustice in Nigeria, from courtroom representation to grassroots advocacy.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Programs detail */}
      <section className="py-16 bg-white">
        <Container>
          <div className="flex flex-col gap-24">
            {programs.map((program, i) => (
              <div
                key={program.id}
                id={program.slug}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <Reveal>
                  <div
                    className={`relative rounded-3xl overflow-hidden aspect-[4/3] ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={programImages[i]}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0068C1]/40 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/90 text-[#0068C1] flex items-center justify-center shadow-lg">
                        {iconMap[program.icon]}
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Content */}
                <div className={`flex flex-col gap-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal>
                    <span className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06]">
                      Program 0{i + 1}
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2
                      className="text-3xl lg:text-4xl text-[#0068C1] leading-tight"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      {program.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="text-gray-500 text-base leading-relaxed">{program.description}</p>
                  </Reveal>

                  <motion.ul
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-2"
                  >
                    {program.highlights.map((h) => (
                      <motion.li
                        key={h}
                        variants={fadeUp}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#0068C1]/10 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0068C1]" />
                        </span>
                        {h}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <Reveal delay={0.2}>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0068C1] text-[#0068C1] text-sm font-semibold hover:bg-[#0068C1] hover:text-white transition-all duration-200 w-fit mt-2"
                    >
                      Get involved with this program
                    </a>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
