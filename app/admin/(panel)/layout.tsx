import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminNav from "../_components/AdminNav";
import BrandMark from "../_components/BrandMark";
import LogoutButton from "../_components/LogoutButton";

export const metadata = { title: "CJED admin", robots: { index: false, follow: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  // fixed + inset-0 sits above any site header/footer defined in the root layout.
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-mist text-ink md:flex-row">
      <aside className="flex shrink-0 flex-col gap-4 bg-brand-deep p-4 text-white md:w-64 md:gap-8 md:p-6">
        <Link href="/admin" className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-gold">
          <BrandMark size={52} />
          <span className="leading-tight">
            <span className="block text-lg" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
              CJED
            </span>
            <span className="block text-xs tracking-wide text-gold uppercase">Admin</span>
          </span>
        </Link>

        <AdminNav />

        <div className="flex min-w-0 items-center justify-between gap-3 border-t border-white/15 pt-4 md:mt-auto md:block">
          <Link
            href="/"
            target="_blank"
            className="mb-3 hidden items-center gap-2 text-sm text-white/75 hover:text-white md:inline-flex"
          >
            View public site <ExternalLink className="size-3.5" />
          </Link>
          <p className="truncate text-sm text-white/70">{session.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-10">{children}</main>
    </div>
  );
}
