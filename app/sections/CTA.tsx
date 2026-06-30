"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/app/config/site";
import Container from "@/app/components/Container";
import Reveal from "@/app/components/Reveal";
import { stagger, fadeUp } from "@/app/data/animation";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="relative rounded-3xl overflow-hidden bg-[#0068C1] px-8 py-16 lg:px-16 lg:py-20">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D7A441]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-[#D7A441]"
            >
              Get Involved
            </motion.span>

            <Reveal>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl leading-tight text-white"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Join us in creating a more just society.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-white/60 text-base leading-relaxed">
                Whether you volunteer your time, partner your organisation, or donate to our work — every act of solidarity makes justice more accessible.
              </p>
            </Reveal>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.div variants={fadeUp}>
                <Link
                  href={siteConfig.volunteerLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D7A441] text-[#0068C1] text-sm font-bold hover:bg-[#e8bc6a] active:scale-[0.97] transition-all duration-200"
                >
                  Volunteer
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  href={siteConfig.partnerLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/30 text-white text-sm font-bold hover:border-white hover:bg-white/10 active:scale-[0.97] transition-all duration-200"
                >
                  Partner with Us
                </Link>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  href={siteConfig.donateLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/12 text-white text-sm font-bold hover:bg-white/20 active:scale-[0.97] transition-all duration-200"
                >
                  Donate
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}