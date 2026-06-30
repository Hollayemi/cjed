"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { newsArticles } from "@/app/data/news";
import SectionHeading from "@/app/components/SectionHeading";
import Container from "@/app/components/Container";
import Badge from "@/app/components/Badge";
import { stagger, fadeUp } from "@/app/data/animation";

export default function LatestNews() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="Latest News"
            title="Stories from the field"
            subtitle="Updates on our work, impact stories, and advocacy in action."
          />
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0068C1] hover:gap-3 transition-all duration-200 flex-shrink-0"
          >
            View all news <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {newsArticles.map((article, i) => (
            <motion.div
              key={article.id}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col rounded-3xl overflow-hidden border border-gray-100 hover:border-[#0068C1]/15 hover:shadow-xl hover:shadow-black/6 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 bg-[#0068C1]/8 overflow-hidden">
                <img
                  src={
                    i === 0
                      ? "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=500&q=80"
                      : i === 1
                      ? "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80"
                      : "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80"
                  }
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant="gold">{article.category}</Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 p-6 flex-1">
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

                <p className="text-sm text-gray-500 leading-relaxed flex-1">{article.excerpt}</p>

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
      </Container>
    </section>
  );
}