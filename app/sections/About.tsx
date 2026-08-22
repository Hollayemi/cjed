"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import Container from "@/app/components/Container";
import { stagger, fadeUp,  } from "@/app/data/animation";
import {
  Scale,
  ShieldCheck,
  Handshake,
  Award,
  Users,
} from "lucide-react";

const valueIcons: Record<string, React.ReactNode> = {
  Justice: <Scale />,
  Integrity: <ShieldCheck />,
  Inclusion: <Handshake />,
  Excellence: <Award />,
  Community: <Users />,
};

export default function About() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Visual mosaic */}
          <Reveal>
            <div className="relative max-w-lg">
              <div className="grid grid-cols-2 gap-4 h-[420px] sm:h-[520px]">
                {/* Large breathing photo — spans both rows */}
                <div className="relative rounded-3xl overflow-hidden row-span-2">
                  <motion.img
                    src="/images/image9.webp"
                    alt="Legal aid and community support"
                    className="w-full h-full object-cover"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F2E]/85 via-[#0A1F2E]/5 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p
                      className="text-white text-base sm:text-lg leading-snug"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      &ldquo;Bridging the gap between the law and the people it is meant to protect.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Top-right photo */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden group"
                  initial={{ opacity: 0, y: -14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <img
                    src="/images/rur1.jpg"
                    alt="Community outreach"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>

                {/* Bottom-right photo */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden group"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  <img
                    src="/images/rur2.jpg"
                    alt="Capacity building workshop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              </div>

              {/* Floating reg card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-4 lg:-left-8 bg-[#f7cb06] rounded-2xl px-6 py-4 shadow-xl"
              >
                <p className="text-[#0068C1] text-xs font-semibold tracking-wider uppercase mb-1">
                  Registration
                </p>
                <p className="text-[#0068C1] font-bold text-sm">{siteConfig.registration}</p>
              </motion.div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Who We Are"
              title="Educating for justice, one community at a time"
              subtitle={siteConfig.mission}
            />

            {/* Vision */}
            <Reveal delay={0.15}>
              <div className="p-6 rounded-2xl bg-[#F5F7F8] border border-gray-100">
                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] mb-3">
                  Our Vision
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{siteConfig.vision}</p>
              </div>
            </Reveal>

            {/* Core Values */}
            <div className="hidden">
              <Reveal>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-[#0068C1]/50 mb-5">
                  Core Values
                </h4>
              </Reveal>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {siteConfig.coreValues.map((v) => (
                  <motion.div
                    key={v.name}
                    variants={fadeUp}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#F5F7F8] hover:bg-[#0068C1]/5 transition-colors duration-200 group"
                  >
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {valueIcons[v.name] || "•"}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0068C1] group-hover:text-[#0068C1]">
                        {v.name}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{v.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}