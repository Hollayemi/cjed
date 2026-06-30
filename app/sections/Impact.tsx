"use client";
import { motion } from "framer-motion";
import { stats } from "@/app/data/stat";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import SectionHeading from "@/app/components/SectionHeading";
import Container from "@/app/components/Container";
import Reveal from "@/app/components/Reveal";
import { stagger, fadeUp } from "@/app/data/animation";

export default function Impact() {
  return (
    <section className="py-24 lg:py-32 bg-[#0068C1] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D7A441]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <Container>
        <div className="flex flex-col items-center text-center mb-16">
          <SectionHeading
            eyebrow="Our Impact"
            title="Numbers that tell a human story"
            subtitle="Every number represents a life changed, a right defended, and a community strengthened."
            align="center"
            light
          />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div
                className="text-4xl lg:text-5xl font-bold text-[#D7A441] mb-2 tabular-nums"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                <AnimatedCounter to={s.value} suffix={s.suffix} />
              </div>
              <p className="text-white font-semibold text-sm mb-2">{s.label}</p>
              <p className="text-white/50 text-xs leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.3}>
          <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/60 text-sm max-w-md text-center md:text-left">
              Since our founding, we have reached individuals across Nigeria's 36 states and the FCT, with a growing network of pro-bono partners.
            </p>
            <a
              href="/impact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D7A441] text-[#D7A441] text-sm font-semibold hover:bg-[#D7A441] hover:text-[#0068C1] transition-all duration-200 flex-shrink-0"
            >
              See Full Impact Report
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}