"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookHeart, HandHeart, LayoutDashboard, Newspaper } from "lucide-react";
import { RESOURCE_KEYS, RESOURCES, type ResourceKey } from "@/lib/resource-config";

const icons: Record<ResourceKey, typeof Newspaper> = {
  news: Newspaper,
  programs: HandHeart,
  stories: BookHeart,
};

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  ...RESOURCE_KEYS.map((key) => ({
    href: `/admin/${key}`,
    label: RESOURCES[key].label,
    Icon: icons[key],
  })),
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto md:flex-col">
      {links.map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={[
              "flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
              "md:shrink",
              active
                ? "bg-white/15 font-medium text-white"
                : "text-white/70 hover:bg-white/8 hover:text-white",
            ].join(" ")}
          >
            <Icon
              className={`size-4 shrink-0 ${active ? "text-gold" : "text-white/60"}`}
              aria-hidden="true"
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}