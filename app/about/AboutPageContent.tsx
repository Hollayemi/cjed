"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import CTA from "@/app/sections/CTA";
import { stagger, fadeUp } from "@/app/data/animation";

const valueColors: Record<string, string> = {
  Justice: "#0068C1",
  Integrity: "#174d3d",
  Inclusion: "#1a5c48",
  Excellence: "#D7A441",
  Community: "#b88520",
};

const team = [
  {
    name: "Barr. Adaeze Okonkwo",
    role: "Executive Director",
    bio: "Former Senior Advocate of Nigeria with 20 years of public interest law experience.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80",
  },
  {
    name: "Dr. Emeka Nwachukwu",
    role: "Director of Research",
    bio: "Legal scholar and policy advisor specialising in constitutional and human rights law.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Amina Yusuf",
    role: "Head of Community Programs",
    bio: "Development practitioner with expertise in grassroots mobilisation across 8 states.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80",
  },
];

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#0068C1] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute bottom-0 right-0 w-96 h-64 bg-[#D7A441]/10 rounded-full blur-3xl" />
        </div>
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
              About CJED
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              We exist to make justice real for every Nigerian
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed">
              {siteConfig.mission}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="p-8 lg:p-10 rounded-3xl bg-[#0068C1] text-white">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#D7A441] block mb-4">
                  Our Mission
                </span>
                <p className="text-white/80 text-base leading-relaxed">{siteConfig.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-8 lg:p-10 rounded-3xl bg-[#F5F7F8] border border-gray-100">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#D7A441] block mb-4">
                  Our Vision
                </span>
                <p
                  className="text-[#0068C1] text-xl leading-relaxed"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {siteConfig.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#F5F7F8]">
        <Container>
          <SectionHeading
            eyebrow="Our Foundation"
            title="Five values that guide everything we do"
            align="center"
            className="mb-16"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {siteConfig.coreValues.map((v) => (
              <motion.div
                key={v.name}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white hover:shadow-lg hover:shadow-[#0068C1]/6 transition-shadow duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: valueColors[v.name] || "#0068C1" }}
                >
                  {v.name[0]}
                </div>
                <h3 className="font-semibold text-[#0068C1] mb-2">{v.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <Container>
          <SectionHeading
            eyebrow="Our Team"
            title="Led by experienced advocates"
            subtitle="Our leadership brings together decades of legal, policy, and community development expertise."
            className="mb-16"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl overflow-hidden border border-gray-100 group hover:shadow-xl hover:shadow-black/6 transition-shadow duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-semibold text-[#111827] mb-1"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D7A441] uppercase tracking-wide mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTA />
    </>
  );
}