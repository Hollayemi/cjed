"use client";
import { motion } from "framer-motion";
import { partners } from "@/app/data/news";
import Container from "@/app/components/Container";
import Reveal from "@/app/components/Reveal";
import { stagger, fadeUp } from "@/app/data/animation";

export default function Partners() {
  return (
    <section className="py-20 bg-[#F5F7F8] border-y border-gray-100">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-10">
            Trusted partners & supporters
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
        >
          {partners.map((p) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              className="group flex items-center justify-center px-6 py-3 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-default"
            >
              {/* Since actual logos don't exist in the repo, render styled text logos */}
              <span className="text-gray-300 group-hover:text-[#0068C1] font-semibold text-sm tracking-wide transition-colors duration-300">
                {p.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}