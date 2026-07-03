"use client"
import Link from "next/link";
import { Scale, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/app/config/site";
import Container from "@/app/components/Container";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import Image from "next/image";

const footerLinks = {
  Programs: [
    { label: "Legal Aid & Counseling", href: "/programs#legal-aid" },
    { label: "Capacity Building", href: "/programs#capacity-building" },
    { label: "Community Development", href: "/programs#community-development" },
    { label: "Research & Policy", href: "/programs#research-policy" },
  ],
  Organisation: [
    { label: "About CJED", href: "/about" },
    { label: "Our Impact", href: "/impact" },
    { label: "Latest News", href: "/news" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#055091] relative text-white">
      <Container>
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt={siteConfig.shortName}
                width={900}
                height={900}
                className="object-contain p-1 w-20"
                onError={() => { }} // silently fallback — div bg-color shows
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Advancing social justice, human rights, and the rule of law in Nigeria — bridging the gap between the law and the people it is meant to protect.
            </p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#f7cb06]" />
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#f7cb06]" />
                {siteConfig.phone}
              </a>
              <span className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-[#f7cb06]" />
                {siteConfig.address}
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-[#f7cb06]">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#f7cb06] transition-colors">
              <FaFacebook className="w-4 h-4" />
            </a>
            <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#f7cb06] transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#f7cb06] transition-colors">
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}