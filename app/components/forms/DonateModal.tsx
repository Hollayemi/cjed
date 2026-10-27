"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Landmark } from "lucide-react";
import { siteConfig } from "@/app/config/site";
import Modal from "@/app/components/Modal";

export default function DonateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { bankName, accountNumber, accountName } = siteConfig.donation;
  const [copied, setCopied] = useState<"number" | "">("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch {
      // Older browsers / insecure contexts: fall back to a temporary text field.
      const el = document.createElement("textarea");
      el.value = accountNumber;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied("number");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(""), 2000);
  };

  return (
    <Modal open={open} onClose={onClose} size="sm" title="Support our work" description="Transfer directly to our bank account. Every naira goes toward making justice accessible.">
      <div className="rounded-2xl bg-[#0068C1] text-white p-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#f7cb06]/20 blur-2xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-5">
          <div className="flex items-center gap-2.5 text-white/80 text-xs font-semibold uppercase tracking-widest">
            <Landmark className="w-4 h-4 text-[#f7cb06]" />
            {bankName}
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/60 mb-1">Account number</p>
            <div className="flex items-center justify-between gap-3">
              <p className="text-3xl font-bold tracking-[0.12em] tabular-nums">{accountNumber}</p>
              <button
                type="button"
                onClick={copyNumber}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f7cb06] text-[#0068C1] text-xs font-bold hover:bg-[#e8bc6a] active:scale-95 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/60 mb-1">Account name</p>
            <p className="text-sm font-semibold leading-snug">{accountName}</p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs text-gray-400 leading-relaxed text-center">
        Please confirm the account name shows as <span className="font-semibold text-gray-500">CJED</span> before you send. Questions about your gift? Email{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-[#0068C1] font-semibold hover:underline">
          {siteConfig.email}
        </a>
        .
      </p>
      <p className="sr-only" aria-live="polite">
        {copied ? "Account number copied to clipboard" : ""}
      </p>
    </Modal>
  );
}
