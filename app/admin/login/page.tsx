import LoginForm from "../_components/LoginForm";
import BrandMark from "../_components/BrandMark";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  // Only allow redirects back into /admin (prevents open redirects).
  const safeNext = next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";

  return (
    <div className="fixed inset-0 z-50 grid overflow-y-auto bg-mist text-ink md:grid-cols-[1.1fr_1fr]">
      <aside className="relative flex flex-col justify-between gap-12 overflow-hidden bg-brand-deep p-8 text-white md:p-14">
        <div aria-hidden className="absolute -right-24 -bottom-24 size-80 rounded-full bg-brand/60 blur-2xl" />
        <div aria-hidden className="absolute top-1/3 -left-16 size-48 rounded-full bg-gold/15 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <BrandMark size={56} />
          <p className="text-sm tracking-wide text-gold uppercase">CJED admin</p>
        </div>
        <div className="relative">
          <h1 className="max-w-md text-3xl leading-tight md:text-5xl">Centre for Justice, Education &amp; Development</h1>
          <span className="mt-6 block h-1 w-16 rounded-full bg-gold" />
          <p className="mt-6 max-w-sm text-sm text-white/75">
            Publish news, programs and stories for the public site.
          </p>
          <p className="mt-2 text-sm font-medium text-gold">Empowered Citizens, Developed Nation</p>
        </div>
      </aside>
      <main className="flex items-center justify-center p-8">
        <LoginForm next={safeNext} />
      </main>
    </div>
  );
}
