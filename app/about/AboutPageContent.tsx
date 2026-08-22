"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/app/config/site";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import CTA from "@/app/sections/CTA";
import GalleryCarousel from "@/app/components/GalleryCarousel";
import { stagger, fadeUp } from "@/app/data/animation";

const valueColors: Record<string, string> = {
  Justice: "#0068C1",
  Integrity: "#0068C1",
  Inclusion: "#0068C1",
  Excellence: "#f7cb06",
  Community: "#f7cb06",
};

const team = [
  {
    name: "Sunday Kenechukwu Agwu",
    role: "Executive Director",
    bio: "Ph.D.",
    img: "/images/team1.jpg",
  },
  {
    name: "Esq. Winner Onyibor",
    role: "Associate",
    bio: "Legal scholar and policy advisor specialising in constitutional and human rights law.",
    img: "/images/winning.png",
  },
  {
    name: "Chukwunanu Agwu-Okeh",
    role: "Esq.",
    bio: "Development practitioner with expertise in grassroots mobilisation across 8 states.",
    img: "/images/Chukwunanu.png",
  },
];

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#0068C1] relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80"
            alt="CJED team at work"
            className="w-full h-full object-cover opacity-[0.18]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0068C1] via-[#0068C1]/95 to-[#0068C1]" />
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute bottom-0 right-0 w-96 h-64 bg-[#f7cb06]/10 rounded-full blur-3xl" />
        </div>
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl relative"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-5"
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
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-stretch">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden h-full min-h-[320px]">
                <motion.img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                  alt="CJED legal team collaborating"
                  className="w-full h-full object-cover absolute inset-0"
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F2E]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/90 text-sm font-medium">
                    Registered under {siteConfig.registration}
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="grid gap-8">
              <Reveal>
                <div className="p-8 lg:p-10 rounded-3xl bg-[#0068C1] text-white">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-4">
                    Our Mission
                  </span>
                  <p className="text-white/80 text-base leading-relaxed">{siteConfig.mission}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="p-8 lg:p-10 rounded-3xl bg-[#F5F7F8] border border-gray-100">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-4">
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

      {/* Our Work in Photos — breathing carousel */}
      <section className="py-24 bg-white">
        <Container>
          <div className="mb-14">
            <SectionHeading
              eyebrow="Behind The Work"
              title="Our work, in photos"
              subtitle="From courtroom representation to grassroots workshops — a glimpse into how CJED shows up for the communities we serve."
              align="center"
            />
          </div>
          <GalleryCarousel
            slides={[
              {
                src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80",
                caption: "Free legal clinics bringing counsel directly to underserved communities.",
                location: "Nationwide Outreach",
              },
              {
                src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80",
                caption: "Training paralegals and community leaders in rights-based advocacy.",
                location: "Capacity Building",
              },
              {
                src: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?w=1600&q=80",
                caption: "Establishing university law clinics to train the next generation of advocates.",
                location: "UNIDEL, Delta State",
              },
              {
                src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80",
                caption: "Street Law sessions teaching children their rights under the law.",
                location: "Kuje, Abuja",
              },
              {
                src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1600&q=80",
                caption: "Women's rights workshops equipping leaders with legal knowledge.",
                location: "Enugu State",
              },
            ]}
          />
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
                <div className="h-80 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-semibold text-[#111827] mb-1"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#f7cb06] uppercase tracking-wide mb-3">
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