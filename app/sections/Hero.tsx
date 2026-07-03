"use client";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { heroStats } from "@/app/data/stat";
import { fadeUp, stagger, float, floatDelayed } from "@/app/data/animation";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FCFCFC]">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_20%_20%,rgba(14,59,46,0.07),transparent)]" />
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(215,164,65,0.07),transparent)]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#0068C1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-6 lg:px-8 w-full pt-28 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0068C1]/8 text-[#0068C1] text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f7cb06] animate-pulse" />
                Legal Aid · Education · Community
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#111827]"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Justice should never depend on{" "}
              <span className="text-primary! italic">privilege.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-500 leading-relaxed max-w-lg"
            >
              We provide legal aid, education and community empowerment for
              underserved communities across Nigeria — bridging the gap between
              the law and the people it is meant to protect.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-2 md:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 md:px-7 py-3.5 rounded-full bg-[#0068C1] text-white text-sm font-semibold hover:bg-[#0759a1] transition-all duration-200 active:scale-[0.97]"
              >
                Get Legal Help
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-4 md:px-7 py-3.5 rounded-full border border-[#0068C1]/30 text-[#0068C1] text-sm font-semibold hover:border-[#0068C1] hover:bg-[#0068C1]/5 transition-all duration-200"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — floating stat cards */}
          <div className="relative flex items-center justify-center h-[480px] lg:h-[520px]">
            {/* Decorative circle */}
            <div className="absolute w-80 h-80 rounded-full border border-[#0068C1]/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-56 h-56 rounded-full border border-[#f7cb06]/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Central seal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-36 h-36 rounded-full bg-[#fff] flex flex-col items-center justify-center shadow-2xl shadow-[#0068C1]/30 z-10"
            >
                <img src="/images/logo.png" className="w-full h-full"/>
              {/* <span
                className="text-[#f7cb06] text-2xl font-bold"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                CJED
              </span>
              <span className="text-white/60 text-[10px] tracking-widest uppercase mt-1">
                Since 2020
              </span> */}
            </motion.div>

            {/* Floating stat card 1 — top left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="absolute top-8 left-4 lg:left-0"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                className="bg-white rounded-2xl px-5 py-4 shadow-lg shadow-black/8 border border-gray-100 flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-[#0068C1] flex-shrink-0" />
                <div>
                  <p className="text-xl font-bold text-[#0068C1]">{heroStats[0].value}</p>
                  <p className="text-xs text-gray-500">{heroStats[0].label}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating stat card 2 — top right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="absolute hidden md:block top-16 right-4 lg:right-0"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 0.5 }}
                className="bg-[#0068C1] rounded-2xl px-5 py-4 shadow-lg shadow-[#0068C1]/25 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#f7cb06]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#f7cb06] font-bold text-sm">{heroStats[1].value}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{heroStats[1].label}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating stat card 3 — bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 1 }}
                className="bg-white min-w-40 rounded-2xl px-4 md:px-6 py-4 shadow-lg shadow-black/8 border border-gray-100 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#f7cb06] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{heroStats[2].value}</span>
                </div>
                <div className="w-auto min-w-46">
                  <p className="text-sm font-semibold text-gray-800">{heroStats[2].label}</p>
                  <p className="text-xs text-gray-400">Delivered this year</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Small accent dots */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              className="absolute top-32 right-20 w-2.5 h-2.5 rounded-full bg-[#f7cb06]"
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 1 }}
              className="absolute bottom-28 left-16 w-2 h-2 rounded-full bg-[#0068C1]"
            />
          </div>
        </div>
      </div>

     
    </section>
  );
}
