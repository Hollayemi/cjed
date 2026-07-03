"use client";
import { motion } from "framer-motion";
import { stats } from "@/app/data/stat";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import CTA from "@/app/sections/CTA";
import { stagger, fadeUp } from "@/app/data/animation";

const testimonials = [
  {
    quote:
      "CJED's lawyers took on my land dispute case when no one else would. After eight months, we won — and I have my land title today.",
    name: "Mallam Suleiman A.",
    location: "Kaduna State",
  },
  {
    quote:
      "The paralegal training completely changed how I advise members of my community. I now understand their rights and how to protect them.",
    name: "Fatima B.",
    location: "Community Leader, Borno State",
  },
  {
    quote:
      "CJED's research brief directly influenced the amendment that now protects domestic workers in our state.",
    name: "Hon. Chioma E.",
    location: "Member, State House of Assembly",
  },
];

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description: "CJED incorporated and begins operations from Abuja with a team of five advocates.",
  },
  {
    year: "2021",
    title: "First Major Case",
    description: "Secured acquittal for 12 wrongly detained individuals in landmark criminal case.",
  },
  {
    year: "2022",
    title: "Expanded Reach",
    description: "Extended outreach to 18 states through mobile legal clinic partnerships.",
  },
  {
    year: "2023",
    title: "Policy Milestone",
    description: "Research brief cited in National Assembly debate on access to justice bill.",
  },
  {
    year: "2024",
    title: "5,000 Citizens",
    description: "Reached our five-thousandth beneficiary — a widow from rural Katsina.",
  },
];

export default function ImpactPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#0068C1] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
        <Container>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.span
              variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-5"
            >
              Impact Report
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Every number is a person. Every person matters.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed">
              We believe accountability is an act of respect for the communities we serve. Here is what our work has produced.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-24 bg-white">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#0068C1] hover:bg-[#0759a1] transition-colors duration-300"
              >
                <div
                  className="text-4xl lg:text-5xl font-bold text-[#f7cb06] mb-2"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  <AnimatedCounter to={s.value} suffix={s.suffix} duration={2200} />
                </div>
                <p className="text-white font-semibold text-sm mb-2">{s.label}</p>
                <p className="text-white/50 text-xs leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Milestones */}
      <section className="py-24 bg-[#F5F7F8]">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="From inception to impact"
            className="mb-16"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            <div className="absolute left-[60px] top-0 bottom-0 w-px bg-[#0068C1]/12 hidden md:block" />
            <div className="flex flex-col gap-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  variants={fadeUp}
                  className="flex gap-8 pb-10 last:pb-0 group"
                >
                  <div className="relative flex-shrink-0 hidden md:flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      className="w-10 h-10 rounded-full bg-white border-2 border-[#0068C1]/20 group-hover:border-[#f7cb06] group-hover:bg-[#f7cb06] transition-all duration-300 flex items-center justify-center shadow-sm ml-4 mt-1"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#0068C1] group-hover:bg-white transition-colors" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-[#f7cb06] tracking-widest uppercase">
                      {m.year}
                    </span>
                    <h3
                      className="text-lg font-semibold text-[#0068C1]"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-sm text-gray-500">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Voices from the field"
            title="What our beneficiaries say"
            align="center"
            className="mb-16"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 rounded-3xl bg-[#F5F7F8] border border-gray-100 flex flex-col gap-6"
              >
                <span
                  className="text-5xl text-[#f7cb06] leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  "
                </span>
                <p
                  className="text-[#0068C1] text-base leading-relaxed -mt-4 flex-1"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {t.quote}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-[#111827]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTA />
    </>
  );
}