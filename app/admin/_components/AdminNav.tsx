"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESOURCE_KEYS, RESOURCES } from "@/lib/resource-config";

const links = [
  { href: "/admin", label: "Dashboard" },
  ...RESOURCE_KEYS.map((key) => ({ href: `/admin/${key}`, label: RESOURCES[key].label })),
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex flex-wrap gap-1 md:flex-col">
      {links.map((l) => {
        const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md border-l-2 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-[#B7791F] ${
              active
                ? "border-[#B7791F] bg-[#F4F5F2] font-medium"
                : "border-transparent text-[#14232B]/70 hover:bg-[#F4F5F2]"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
