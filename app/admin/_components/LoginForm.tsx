"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const input =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/25";

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      if (res.ok) {
        router.replace(next);
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Could not sign in. Try again.");
    } catch {
      setError("Network problem. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <h2 className="text-3xl text-brand">Sign in</h2>
      <p className="mt-1 text-sm text-ink/70">Admins only.</p>

      <label htmlFor="email" className="mt-8 block text-sm font-medium">
        Email
      </label>
      <input id="email" name="email" type="email" autoComplete="username" required className={input} />

      <label htmlFor="password" className="mt-4 block text-sm font-medium">
        Password
      </label>
      <input id="password" name="password" type="password" autoComplete="current-password" required className={input} />

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-[#F8E5E3] px-3 py-2 text-sm text-[#8A2A22]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/20 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
