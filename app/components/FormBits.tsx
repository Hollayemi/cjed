"use client";
import type { ReactNode } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all";

export const inputState = (error?: string) =>
  error
    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
    : "border-gray-200 focus:border-[#0068C1]/50 focus:ring-[#0068C1]/10";

export function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-gray-400">{hint}</p>
      ) : null}
    </div>
  );
}

/** Hidden from people, visible to bots. Anything typed here means the submission is thrown away. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      {message}
    </div>
  );
}

export function SubmitButton({ busy, busyLabel, children }: { busy: boolean; busyLabel: string; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0068C1] text-white text-sm font-semibold hover:bg-[#0759a1] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200"
    >
      {busy ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {busyLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function SuccessPanel({ title, children, onDone, doneLabel = "Close" }: { title: string; children: ReactNode; onDone?: () => void; doneLabel?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 gap-5" role="status">
      <div className="w-16 h-16 rounded-full bg-[#0068C1] flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-[#f7cb06]" />
      </div>
      <h3 className="text-2xl text-[#0068C1]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
        {title}
      </h3>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed">{children}</p>
      {onDone && (
        <button type="button" onClick={onDone} className="px-6 py-2.5 rounded-full border border-[#0068C1] text-[#0068C1] text-sm font-semibold hover:bg-[#0068C1] hover:text-white transition-colors">
          {doneLabel}
        </button>
      )}
    </div>
  );
}

/** Posts JSON and returns a readable result for every failure mode (bad fields, server error, offline). */
export async function postJson(url: string, body: unknown): Promise<{ ok: true } | { ok: false; error: string; fields: Record<string, string> }> {
  return send(url, { headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
}

export async function postForm(url: string, body: FormData) {
  return send(url, { body });
}

async function send(url: string, init: { headers?: Record<string, string>; body: BodyInit }) {
  try {
    const res = await fetch(url, { method: "POST", ...init });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: Record<string, string> } | null;
    if (res.ok && data?.ok) return { ok: true as const };
    return { ok: false as const, error: data?.error || "Something went wrong. Please try again.", fields: data?.fields ?? {} };
  } catch {
    return { ok: false as const, error: "We couldn't reach the server. Check your connection and try again.", fields: {} };
  }
}
