"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Scale, 
  GraduationCap, 
  Users, 
  BookOpen, 
  ArrowUpRight, 
  MapPin, 
  Sparkles,
  TrendingUp,
  Shield,
  Lightbulb,
  Heart,
  Award,
  Clock,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { programs } from "@/app/data/program";
import { initiatives } from "@/app/data/initiative";
import SectionHeading from "@/app/components/SectionHeading";
import Container from "@/app/components/Container";
import { stagger, fadeUp } from "@/app/data/animation";
import { useRef } from "react";

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
};

const imageMap: Record<string, string> = {
  "legal-aid":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80",
  "capacity-building":
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80",
  "community-development":
    "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&q=80",
  "research-policy":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80",
};

const programIcons = [
  <Shield key="shield" className="w-4 h-4" />,
  <TrendingUp key="trend" className="w-4 h-4" />,
  <Heart key="heart" className="w-4 h-4" />,
  <Lightbulb key="bulb" className="w-4 h-4" />,
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-[#F5F7F8] via-white to-[#F5F7F8] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#0068C1]/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-[#f7cb06]/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <Container>
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10"
        >
      

          {/* Recent initiatives strip - Enhanced */}
          <motion.div 
            className="mt-16 pt-12 border-t border-gray-200/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <SectionHeading
              eyebrow="Our Mission in Action"
              title="Programs that change lives"
              subtitle="Four pillars of intervention designed to address systemic injustice at every level of Nigerian society."
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0068C1] text-white rounded-full text-sm font-semibold hover:bg-[#0054a0] transition-colors shadow-lg shadow-[#0068C1]/20 group"
              >
                Explore all programs 
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-4"
            >
              {initiatives.map((init, index) => (
                <motion.div
                  key={init.id}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group bg-white rounded-2xl overflow-hidden flex items-center gap-5 p-4 border border-gray-100/50 hover:border-[#0068C1]/20 hover:shadow-xl hover:shadow-[#0068C1]/5 transition-all duration-300 relative"
                >
                  {/* Color accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0068C1] to-[#f7cb06] rounded-l-2xl" />
                  
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <motion.img
                      src={init.image}
                      alt={init.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0 py-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#f7cb06] px-2 py-0.5 rounded-full bg-[#0A1F2E]/5 border border-[#f7cb06]/20">
                        {init.category}
                      </span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {init.date.includes("Ongoing") ? "Ongoing" : "Recent"}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#111827] leading-snug line-clamp-2 group-hover:text-[#0068C1] transition-colors">
                      {init.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400 truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0 text-[#0068C1]" />
                      <span className="truncate">{init.location.split(",")[0]}</span>
                    </span>
                    
                    <motion.div
                      className="mt-1 flex items-center gap-1 text-xs font-medium text-[#0068C1] opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      Read story <ChevronRight className="w-3 h-3" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}