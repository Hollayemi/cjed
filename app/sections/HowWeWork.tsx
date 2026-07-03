"use client";
import { motion } from "framer-motion";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import { stagger, fadeUp } from "@/app/data/animation";

const steps = [
  {
    number: "01",
    title: "Community Outreach",
    description:
      "We identify and engage underserved communities through partnerships with local leaders, civil society, and government agencies.",
  },
  {
    number: "02",
    title: "Legal Assessment",
    description:
      "Our lawyers and paralegals conduct thorough assessments of individual cases and systemic legal needs within each community.",
  },
  {
    number: "03",
    title: "Education & Capacity",
    description:
      "We run targeted workshops equipping community members and leaders with practical knowledge of their rights and legal recourse.",
  },
  {
    number: "04",
    title: "Advocacy",
    description:
      "We represent clients in court, engage policymakers, and publish research to drive systemic change at the legislative level.",
  },
  {
    number: "05",
    title: "Sustained Impact",
    description:
      "We track outcomes, publish impact reports, and build on every case to strengthen the fabric of justice across Nigeria.",
  },
];

export default function HowWeWork() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F7F8]">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left sticky heading */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Our Process"
                title="How we work"
                subtitle="A structured approach that ensures every person we serve receives consistent, quality support."
              />
            </div>
          </div>

          {/* Right: timeline */}
          <div className="flex-1 relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#0068C1]/12 hidden sm:block" />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-0"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="relative flex gap-8 pb-12 last:pb-0 group"
                >
                  {/* Circle on line */}
                  <div className="relative flex-shrink-0 w-12 h-12 hidden sm:flex">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
                      className="w-12 h-12 rounded-full bg-white border-2 border-[#0068C1]/20 group-hover:border-[#f7cb06] group-hover:bg-[#f7cb06] transition-all duration-300 flex items-center justify-center shadow-sm"
                    >
                      <span className="text-xs font-bold text-[#0068C1] group-hover:text-white transition-colors">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 pt-2 pb-2">
                    <div className="flex items-center gap-3 sm:hidden">
                      <span className="text-xs font-bold text-[#f7cb06]">{step.number}</span>
                    </div>
                    <h3
                      className="text-lg font-semibold text-[#111827] group-hover:text-[#0068C1] transition-colors"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}