"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { siteConfig } from "@/app/config/site";
import { useGetInvolved } from "@/app/components/forms/GetInvolved";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "News", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Contact", href: "/contact" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useGetInvolved();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // Pages with dark hero backgrounds — navbar can use light text when not scrolled
  const darkHeroPages = ["/about", "/impact"];
  const isDarkHero = darkHeroPages.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Utility bar */}
        <div className="hidden lg:block bg-[#061620] border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between h-9 text-xs">
              <div className="flex items-center gap-4">
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-white/50 hover:text-[#f7cb06] transition-colors duration-200"
                >
                  <FaFacebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/50 hover:text-[#f7cb06] transition-colors duration-200"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href={siteConfig.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="text-white/50 hover:text-[#f7cb06] transition-colors duration-200"
                >
                  <FaTwitter className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-5">
                <Link href="/news" className="text-white/60 hover:text-white transition-colors duration-200 font-medium">
                  News
                </Link>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors duration-200 font-medium">
                  Contact Us
                </Link>
                <span className="w-px h-3.5 bg-white/15" />
                <button
                  type="button"
                  onClick={() => open("donate")}
                  className="px-4 py-1.5 rounded-md bg-[#0068C1] text-white font-semibold hover:bg-[#0077DD] transition-colors duration-200"
                >
                  Donate Now
                </button>
                <button aria-label="Search" className="text-white/50 hover:text-white transition-colors duration-200">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav row */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
              : isDarkHero
              ? "bg-transparent"
              : "bg-white/80 backdrop-blur-md border-b border-gray-100/60"
          }`}
        >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 gap-6">

            {/* Logo + full name */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group min-w-0">
              <motion.div
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden flex-shrink-0 relative"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.shortName}
                  fill
                  className={`${navLogoClass} object-contain p-1`}
                  onError={() => {}} // silently fallback — div bg-color shows
                />
              </motion.div>
              <div className="hidden lg:flex flex-col min-w-0 leading-tight">
                <span
                  className={`text-base xl:text-lg font-bold tracking-tight transition-colors duration-300 ${logoTextClass}`}
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {siteConfig.name}
                </span>
                <span className={`text-[11px] tracking-wide transition-colors duration-300 ${subTextClass}`}>
                  Bridging Law and Community
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-shrink-0">
              {navLinks
                .filter((l) => l.label !== "Home" && l.label !== "Contact")
                .map((link) =>
                link.label === "Programs" ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setProgramsOpen(true)}
                    onMouseLeave={() => setProgramsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        pathname === link.href ? activeClass : navTextClass
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      pathname === link.href ? activeClass : navTextClass
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA — bordered pill, PartnersGlobal-style */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link
                href="/contact"
                className={`px-6 py-2.5 rounded-full text-sm font-semibold border-[1.5px] transition-all duration-200 active:scale-95 ${
                  scrolled
                    ? "border-[#0068C1] text-[#0068C1] hover:bg-[#0068C1] hover:text-white"
                    : isDarkHero
                    ? "border-white/50 text-white hover:border-white hover:bg-white/10"
                    : "border-[#0068C1] text-[#0068C1] hover:bg-[#0068C1] hover:text-white"
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
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    open("donate");
                  }}
                  className="px-5 py-3 rounded-full bg-[#f7cb06] text-[#0068C1] text-sm font-semibold text-center"
                >
                  Donate
                </button>
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