"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/app/config/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Pages with dark hero backgrounds — navbar can use light text when not scrolled
  const darkHeroPages = ["/about", "/impact"];
  const isDarkHero = darkHeroPages.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Determine text colours
  const navTextClass = scrolled
    ? "text-gray-600 hover:text-[#0068C1] hover:bg-[#0068C1]/8"
    : isDarkHero
    ? "text-white/80 hover:text-white hover:bg-white/10"
    : "text-[#0068C1] hover:bg-[#0068C1]/8";

const navLogoClass = isDarkHero && !scrolled
    ? "invert"
    : "";

  const activeClass = scrolled
    ? "bg-[#0068C1] text-white"
    : isDarkHero
    ? "bg-white/20 text-white"
    : "bg-[#0068C1] text-white";

  const logoTextClass = scrolled
    ? "text-[#0068C1]"
    : isDarkHero
    ? "text-white"
    : "text-[#0068C1]";

  const subTextClass = scrolled
    ? "text-gray-400"
    : isDarkHero
    ? "text-white/50"
    : "text-gray-500";

  const mobileToggleClass = scrolled
    ? "text-gray-600"
    : isDarkHero
    ? "text-white"
    : "text-[#0068C1]";

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
            : isDarkHero
            ? "bg-transparent"
            : "bg-white/80 backdrop-blur-md border-b border-gray-100/60"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.shortName}
                  fill
                  className={`${navLogoClass} object-contain p-1`}
                  onError={() => {}} // silently fallback — div bg-color shows
                />
              </div>
              {/* <div className="flex flex-col">
                <span
                  className={`text-sm font-bold leading-tight tracking-wide transition-colors duration-300 ${logoTextClass}`}
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {siteConfig.shortName}
                </span>
                <span className={`text-[10px] leading-none tracking-wide hidden sm:block transition-colors duration-300 ${subTextClass}`}>
                  {siteConfig.registration}
                </span>
              </div> */}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === link.href ? activeClass : navTextClass
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                href={siteConfig.donateLink}
                className="px-5 py-2.5 rounded-full bg-[#f7cb06] text-[#0068C1] text-sm font-semibold hover:bg-[#e8bc6a] active:scale-95 transition-all duration-200"
              >
                Donate
              </Link>
              <Link
                href="/contact"
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  scrolled
                    ? "border border-[#0068C1] text-[#0068C1] hover:bg-[#0068C1] hover:text-white"
                    : isDarkHero
                    ? "border border-white/40 text-white hover:border-white hover:bg-white/10"
                    : "border border-[#0068C1] text-[#0068C1] hover:bg-[#0068C1] hover:text-white"
                }`}
              >
                Get Legal Help
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors ${mobileToggleClass}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-[#0068C1] text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#0068C1]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={siteConfig.donateLink}
                  className="px-5 py-3 rounded-full bg-[#f7cb06] text-[#0068C1] text-sm font-semibold text-center"
                >
                  Donate
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-3 rounded-full border border-[#0068C1] text-[#0068C1] text-sm font-semibold text-center hover:bg-[#0068C1] hover:text-white transition-all duration-200"
                >
                  Get Legal Help
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
