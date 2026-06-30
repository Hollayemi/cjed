"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/app/lib/animation";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "items-center text-center" : "";
  const spacingClass = "flex flex-col gap-3";

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`${spacingClass} ${alignClasses} ${className || ""}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className={`text-xs font-semibold tracking-[0.15em] uppercase text-[#D7A441]`}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className={`text-3xl md:text-4xl lg:text-5xl leading-tight ${
          light ? "text-white" : "text-[#0068C1]"
        }`}
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`text-base md:text-lg leading-relaxed max-w-2xl ${
            light ? "text-white/70" : "text-gray-500"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}