"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-[#0E3B2E] flex items-center justify-center flex-shrink-0">
                <Scale className="w-5 h-5 text-[#D7A441]" />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-sm font-bold text-[#0E3B2E] leading-tight tracking-wide"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {siteConfig.shortName}
                </span>
                <span className="text-[10px] text-gray-400 leading-none tracking-wide hidden sm:block">
                  {siteConfig.registration}
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[#0E3B2E] text-white"
                      : "text-gray-600 hover:text-[#0E3B2E] hover:bg-[#0E3B2E]/8"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={siteConfig.donateLink}
                className="px-5 py-2.5 rounded-full bg-[#D7A441] text-[#0E3B2E] text-sm font-semibold hover:bg-[#e8bc6a] transition-all duration-200"
              >
                Donate
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full border border-[#0E3B2E] text-[#0E3B2E] text-sm font-semibold hover:bg-[#0E3B2E] hover:text-white transition-all duration-200"
              >
                Get Legal Help
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-[#0E3B2E] hover:bg-gray-100"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-gray-100 shadow-lg lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-[#0E3B2E] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={siteConfig.donateLink}
                  className="px-5 py-3 rounded-full bg-[#D7A441] text-[#0E3B2E] text-sm font-semibold text-center"
                >
                  Donate
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-3 rounded-full border border-[#0E3B2E] text-[#0E3B2E] text-sm font-semibold text-center"
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