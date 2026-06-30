"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Search } from "lucide-react";
import Link from "next/link";
import { newsArticles } from "@/app/data/news";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Badge from "@/app/components/Badge";
import Reveal from "@/app/components/Reveal";
import CTA from "@/app/sections/CTA";
import { stagger, fadeUp } from "@/app/data/animation";

const categories = ["All", "Legal Aid", "Capacity Building", "Policy", "Community"];

const allArticles = [
  ...newsArticles,
  {
    id: "4",
    category: "Community",
    title: "Free Legal Clinic Draws Record 400 Attendees in Suleja",
    excerpt:
      "CJED's mobile legal clinic in Niger State attracted its largest crowd yet, with over 400 community members seeking advice on land rights, family law, and tenancy disputes.",
    date: "April 18, 2025",
    readTime: "3 min read",
    slug: "legal-clinic-suleja",
    image: "/images/news-4.jpg",
  },
  {
    id: "5",
    category: "Policy",
    title: "CJED Submits Memorandum to Senate Committee on Access to Justice",
    excerpt:
      "Our research team submitted a comprehensive memorandum to the Senate Committee on Judiciary, Human Rights and Legal Matters, urging structural reforms to the legal aid system.",
    date: "March 30, 2025",
    readTime: "6 min read",
    slug: "senate-committee-memorandum",
    image: "/images/news-5.jpg",
  },
  {
    id: "6",
    category: "Legal Aid",
    title: "Domestic Violence Survivor Wins Protection Order After CJED Intervention",
    excerpt:
      "A mother of three from Nasarawa State received a court protection order after CJED's lawyers represented her case pro bono, setting a critical precedent for domestic abuse survivors.",
    date: "March 12, 2025",
    readTime: "4 min read",
    slug: "domestic-violence-protection-order",
    image: "/images/news-6.jpg",
  },
];

const articleImages = [
  "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
];

export default function NewsPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allArticles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = allArticles[0];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-[#F5F7F8]">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-[#D7A441] block mb-5"
            >
              News & Stories
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl text-[#0068C1] leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Stories of justice, one case at a time
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Updates from our legal clinics, policy victories, and the people we serve across Nigeria.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Featured article */}
      <section className="py-12 bg-white border-b border-gray-100">
        <Container>
          <Reveal>
            <Link href={`/news/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-black/8 transition-shadow duration-500">
                <div className="relative h-72 lg:h-auto min-h-[320px] bg-[#0068C1] overflow-hidden">
                  <img
                    src={articleImages[0]}
                    alt={featured.title}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-50 group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0068C1]/60 to-[#0068C1]/20" />
                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D7A441] text-[#0068C1] text-xs font-bold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 bg-[#F5F7F8] flex flex-col justify-center gap-5">
                  <div>
                    <Badge variant="forest">{featured.category}</Badge>
                  </div>
                  <h2
                    className="text-2xl lg:text-3xl font-semibold text-[#0068C1] leading-snug group-hover:text-[#174d3d] transition-colors"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{featured.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0068C1] group-hover:gap-2 transition-all">
                      Read <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Filter + Search + Grid */}
      <section className="py-20 bg-white">
        <Container>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#0068C1] text-white"
                      : "bg-[#F5F7F8] text-gray-500 hover:bg-[#0068C1]/8 hover:text-[#0068C1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-full bg-[#F5F7F8] border border-gray-100 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0068C1]/30 focus:ring-2 focus:ring-[#0068C1]/10 w-56 transition-all"
              />
            </div>
          </div>

          {/* Articles grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + searchQuery}
                variants={stagger}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((article, i) => (
                  <motion.div
                    key={article.id}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group flex flex-col rounded-3xl overflow-hidden border border-gray-100 hover:border-[#0068C1]/15 hover:shadow-xl hover:shadow-black/6 transition-all duration-300"
                  >
                    <div className="relative h-48 bg-[#0068C1]/8 overflow-hidden">
                      <img
                        src={articleImages[i % articleImages.length]}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="gold">{article.category}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 p-6 flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                      </div>
                      <h3
                        className="text-base font-semibold text-[#111827] group-hover:text-[#0068C1] transition-colors leading-snug"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <Link
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0068C1] group-hover:gap-2.5 transition-all duration-200 mt-auto pt-4 border-t border-gray-100"
                      >
                        Read article <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#F5F7F8] flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">No articles match your search.</p>
                <button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="mt-4 text-xs font-semibold text-[#0068C1] underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      <CTA />
    </>
  );
}