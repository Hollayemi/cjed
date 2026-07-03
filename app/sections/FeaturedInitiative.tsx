"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/app/components/Container";
import Reveal from "@/app/components/Reveal";
import Badge from "@/app/components/Badge";

export default function FeaturedInitiative() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-black/5">
          {/* Image side */}
          <div className="relative min-h-[340px] lg:min-h-[500px] bg-[#0068C1]">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80"
              alt="Community legal outreach session"
              className="w-full h-full object-cover mix-blend-luminosity opacity-50 absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0068C1]/80 to-[#0068C1]/20" />
            <div className="absolute bottom-8 left-8">
              <Badge variant="gold">Featured Initiative</Badge>
            </div>
          </div>

          {/* Content side */}
          <div className="bg-[#F5F7F8] p-10 lg:p-14 flex flex-col justify-center gap-7">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06]">
                Operation Justice Reach
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="text-3xl lg:text-4xl leading-tight text-[#0068C1]"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Taking legal aid directly to underserved rural communities
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our flagship mobile outreach program deploys teams of lawyers and paralegals to rural communities across 12 states, conducting free legal clinics, resolving land disputes, and registering vulnerable persons for national identification.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <ul className="flex flex-col gap-3">
                {[
                  "12 states covered in 2024",
                  "Over 1,400 individuals served in a single quarter",
                  "Partnership with federal and state legal aid councils",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-[#0068C1]/10 text-[#0068C1] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0068C1]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                href="/news/landmark-ruling-displaced-families"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0068C1] text-white text-sm font-semibold hover:bg-[#0759a1] transition-all duration-200 w-fit"
              >
                Read the Story <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}