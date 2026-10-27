"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import type { NewsCard } from "@/lib/public-content";
import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import Reveal from "@/app/components/Reveal";
import CTA from "@/app/sections/CTA";
import { stagger, fadeUp } from "@/app/data/animation";

const PAGE_SIZE = 6;
const serif = { fontFamily: "'DM Serif Display', Georgia, serif" };

// Used only when an article has no cover image of its own.
const articleImages = [
  "/images/cjed1.jpg",
  "/images/cjed2.jpg",
  "/images/cjed4.jpg",
  "/images/cjed5.jpg",
  "/images/cjed6.jpg",
  "/images/cjed7.jpg",
];

const imageFor = (a: NewsCard, i: number) => a.image || articleImages[i % articleImages.length];

function Meta({ article }: { article: NewsCard }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
      {article.date && <span>{article.date}</span>}
      {article.date && <span className="w-1 h-1 rounded-full bg-gray-300" aria-hidden="true" />}
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3 h-3" /> {article.readTime}
      </span>
    </div>
  );
}

export default function NewsPageContent({ articles }: { articles: NewsCard[] }) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
    return [["All", articles.length] as const, ...Array.from(counts.entries())];
  }, [articles]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const filtering = activeCategory !== "All" || q !== "";

  const matches = articles.filter(
    (a) =>
      (activeCategory === "All" || a.category === activeCategory) &&
      (q === "" || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)),
  );

  // The newest story gets the big card, but only while browsing: a search or filter shows plain results.
  const featured = !filtering ? articles[0] : undefined;
  const list = featured ? matches.filter((a) => a.id !== featured.id) : matches;
  const visible = list.slice(0, shown);
  const remaining = list.length - visible.length;

  const reset = () => {
    setActiveCategory("All");
    setQuery("");
    setShown(PAGE_SIZE);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 lg:pb-20 bg-[#F5F7F8]">
        <Container>
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.span variants={fadeUp} className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-5">
              News &amp; Updates
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl text-[#0068C1] leading-tight mb-6" style={serif}>
              The latest from CJED
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Updates from our legal clinics, training programs and advocacy work across Nigeria.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Controls */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 lg:top-[0]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 -mx-1 px-1" role="group" aria-label="Filter articles by category">
              {categories.map(([cat, count]) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShown(PAGE_SIZE);
                  }}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat ? "bg-[#0068C1] text-white" : "bg-[#F5F7F8] text-gray-500 hover:bg-[#0068C1]/10 hover:text-[#0068C1]"
                  }`}
                >
                  {cat}
                  <span className={`text-[10px] ${activeCategory === cat ? "text-white/70" : "text-gray-400"}`}>{count}</span>
                </button>
              ))}
            </div>

            <div className="relative md:w-64 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="search"
                aria-label="Search articles"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShown(PAGE_SIZE);
                }}
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#F5F7F8] border border-gray-100 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0068C1]/30 focus:ring-2 focus:ring-[#0068C1]/10 transition-all [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-[#0068C1]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 lg:py-16 bg-white min-h-[50vh]">
        <Container>
          {/* Featured */}
          {featured && (
            <Reveal className="mb-12">
              <Link href={`/news/${featured.slug}`} className="group grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-black/8 transition-shadow duration-500">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-[#0068C1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageFor(featured, 0)} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1 rounded-full bg-[#f7cb06] text-[#0A1F2E] text-xs font-bold">Latest</span>
                </div>
                <div className="p-8 lg:p-12 bg-[#F5F7F8] flex flex-col justify-center gap-5">
                  <div>
                    <Badge variant="forest">{featured.category}</Badge>
                  </div>
                  <h2 className="text-2xl lg:text-3xl text-[#0068C1] leading-snug group-hover:text-[#0759a1] transition-colors" style={serif}>
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">{featured.excerpt}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                    <Meta article={featured} />
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0068C1] group-hover:gap-2 transition-all">
                      Read article <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Result summary */}
          {filtering && (
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500" aria-live="polite">
                {matches.length} {matches.length === 1 ? "article" : "articles"}
                {activeCategory !== "All" && <> in <span className="font-semibold text-[#0068C1]">{activeCategory}</span></>}
                {q && <> matching &ldquo;{query.trim()}&rdquo;</>}
              </p>
              <button type="button" onClick={reset} className="text-xs font-semibold text-[#0068C1] hover:underline">
                Clear filters
              </button>
            </div>
          )}

          {/* Grid */}
          <AnimatePresence mode="wait">
            {visible.length > 0 ? (
              <motion.div
                key={`${activeCategory}|${q}`}
                variants={stagger}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visible.map((article, i) => (
                  <motion.article
                    key={article.id}
                    variants={fadeUp}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white hover:border-[#0068C1]/15 hover:shadow-xl hover:shadow-black/6 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0068C1]/8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageFor(article, i + 1)} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="gold" className="!bg-[#f7cb06] !text-[#0A1F2E] font-bold">{article.category}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <Meta article={article} />
                      <h3 className="text-lg text-[#111827] group-hover:text-[#0068C1] transition-colors leading-snug line-clamp-3" style={serif}>
                        <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{article.excerpt}</p>
                      <span className="mt-auto pt-4 border-t border-gray-100 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0068C1] group-hover:gap-2.5 transition-all duration-200">
                        Read article <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : !featured ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5F7F8] flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm">{articles.length === 0 ? "No articles have been published yet." : "No articles match your search."}</p>
                {filtering && (
                  <button type="button" onClick={reset} className="mt-4 text-xs font-semibold text-[#0068C1] underline">
                    Clear filters
                  </button>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {remaining > 0 && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="px-7 py-3 rounded-full border-2 border-[#0068C1] text-[#0068C1] text-sm font-semibold hover:bg-[#0068C1] hover:text-white active:scale-[0.97] transition-all"
              >
                Load more ({remaining})
              </button>
            </div>
          )}
        </Container>
      </section>

      <CTA />
    </>
  );
}
