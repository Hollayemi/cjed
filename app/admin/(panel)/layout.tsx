import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminNav from "../_components/AdminNav";
import LogoutButton from "../_components/LogoutButton";

export const metadata = { title: "CJED admin", robots: { index: false, follow: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  // fixed + inset-0 sits above any site header/footer defined in the root layout.
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#F4F5F2] text-[#14232B] md:flex-row">
      <aside className="flex shrink-0 flex-col gap-4 border-b border-[#D9DDD6] bg-white p-4 md:w-60 md:gap-6 md:border-r md:border-b-0 md:p-6">
        <p className="font-semibold">CJED admin</p>
        <AdminNav />
        <div className="flex min-w-0 items-center justify-between gap-3 md:mt-auto md:block">
          <p className="truncate text-sm text-[#14232B]/60">{session.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
