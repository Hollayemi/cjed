"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  src: string;
  caption: string;
  location: string;
}

export default function GalleryCarousel({
  slides,
  interval = 4500,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [paused, next, interval]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] shadow-2xl shadow-black/20 bg-[#0A1F2E]">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <motion.img
              src={slides[index].src}
              alt={slides[index].caption}
              className="w-full h-full object-cover"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: interval / 1000 + 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10">
              <p className="text-[#f7cb06] text-xs font-semibold tracking-widest uppercase mb-2">
                {slides[index].location}
              </p>
              <p
                className="text-white text-lg md:text-2xl leading-snug max-w-2xl"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {slides[index].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails / dots */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {slides.map((s, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
              i === index ? "w-16 h-12 ring-2 ring-[#0068C1]" : "w-10 h-8 opacity-50 hover:opacity-80"
            }`}
          >
            <img src={s.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
