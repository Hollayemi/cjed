"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookHeart, HandHeart, LayoutDashboard, Newspaper } from "lucide-react";
import { RESOURCE_KEYS, RESOURCES, type ResourceKey } from "@/lib/resource-config";

const icons: Record<ResourceKey, typeof Newspaper> = { news: Newspaper, programs: HandHeart, stories: BookHeart };

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  ...RESOURCE_KEYS.map((key) => ({ href: `/admin/${key}`, label: RESOURCES[key].label, Icon: icons[key] })),
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto md:flex-col">
      {links.map(({ href, label, Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg border-l-4 px-3 py-2.5 text-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-gold ${
              active
                ? "border-gold bg-white/15 font-semibold text-white"
                : "border-transparent text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className={`size-4 ${active ? "text-gold" : ""}`} /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
