"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import Link from "next/link";
import { heroStats } from "@/app/data/stat";
import { fadeUp, stagger } from "@/app/data/animation";
import HeroCarousel from "@/app/components/HeroCarousel";

const slides = [
  {
    src: "/images/cjed4.jpg",
    alt: "Community members CJED serves across Nigeria",
  },
  {
    src: "/images/cjed3.jpg",
    alt: "Community members CJED serves across Nigeria",
  },
  {
    src: "/images/cjed7.jpg",
    alt: "Community members CJED serves across Nigeria",
  },
  {
    src: "/images/image2.webp",
    alt: "CJED legal team at work",
  },
  {
    src: "/images/image3.webp",
    alt: "Community outreach and education session",
  },
  {
    src: "/images/image4.webp",
    alt: "Women's rights and empowerment programme",
  },
  {
    src: "/images/image5.webp",
    alt: "Women's rights and empowerment programme",
  },
  {
    src: "/images/image6.webp",
    alt: "Women's rights and empowerment programme",
  },
  {
    src: "/images/image7.webp",
    alt: "Women's rights and empowerment programme",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-end overflow-hidden bg-[#0A1F2E]">
      {/* Breathing crossfade carousel background */}
      <HeroCarousel slides={slides} />

      {/* Gradient overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061620]/95 via-[#061620]/70 to-[#061620]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061620] via-[#061620]/15 to-transparent pointer-events-none" />

      {/* Dot grid accent */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8 w-full pt-40 pb-16 lg:pb-20">
        {/* Headline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f7cb06] animate-pulse" />
              Legal Aid · Education · Community
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] leading-[1.05] text-white"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Justice should never depend on{" "}
            <span className="text-[#f7cb06] italic">privilege.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-white/70 leading-relaxed max-w-lg"
          >
            We provide legal aid, education and community empowerment for
            underserved communities across Nigeria — bridging the gap between
            the law and the people it is meant to protect.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 md:gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 rounded-full bg-[#f7cb06] text-[#0A1F2E] text-sm font-bold hover:bg-[#ffd93d] transition-all duration-200 active:scale-[0.97]"
            >
              Get Legal Help
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 md:px-7 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:border-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Stat strip — glass cards over the photo */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-2xl"
        >
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 ${
                i === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <CheckCircle className="w-5 h-5 text-[#f7cb06] flex-shrink-0" />
              <div>
                <p
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
