import LoginForm from "../_components/LoginForm";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  // Only allow redirects back into /admin (prevents open redirects).
  const safeNext = next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";

  return (
    <div className="fixed inset-0 z-50 grid overflow-y-auto bg-[#F4F5F2] text-[#14232B] md:grid-cols-[1.1fr_1fr]">
      <aside className="flex flex-col justify-between gap-12 bg-[#14232B] p-8 text-[#F4F5F2] md:p-14">
        <p className="text-sm text-[#F4F5F2]/70">CJED admin</p>
        <div>
          <h1 className="max-w-md text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
            Centre for Justice, Education &amp; Development
          </h1>
          <p className="mt-6 max-w-sm text-sm text-[#F4F5F2]/70">
            Publish news, programs and stories for the public site.
          </p>
        </div>
      </aside>
      <main className="flex items-center justify-center p-8">
        <LoginForm next={safeNext} />
      </main>
    </div>
  );
}
