"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import type { ResourceKey } from "@/lib/resource-config";

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

type Props = {
  id: string;
  resource: ResourceKey;
  value: string;
  onChange: (url: string) => void;
};

/** Picks an image, uploads it straight to Cloudinary with a server-signed request, and hands back the https URL. */
export default function ImageUploader({ id, resource, value, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const busy = progress !== null;

  async function upload(file: File) {
    setError("");
    if (!TYPES.includes(file.type)) return setError("Choose a JPG, PNG, WebP, AVIF or GIF image.");
    if (file.size > MAX_BYTES) return setError("That image is over 8 MB. Choose a smaller one.");

    setProgress(0);
    try {
      const signRes = await fetch("/api/admin/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resource }),
      });
      const sign = await signRes.json().catch(() => ({}));
      if (!signRes.ok) throw new Error(sign.error ?? "Could not start the upload.");

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", sign.apiKey);
      body.append("timestamp", String(sign.timestamp));
      body.append("folder", sign.folder);
      body.append("signature", sign.signature);

      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`);
        xhr.upload.onprogress = (e) => e.lengthComputable && setProgress(Math.round((e.loaded / e.total) * 100));
        xhr.onerror = () => reject(new Error("Network problem. Check your connection and try again."));
        xhr.onload = () => {
          let res: { secure_url?: string; error?: { message?: string } } = {};
          try {
            res = JSON.parse(xhr.responseText);
          } catch {}
          if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) resolve(res.secure_url);
          else reject(new Error(res.error?.message ?? "The upload failed. Try again."));
        };
        xhr.send(body);
      });
      onChange(url);
    } catch (err) {
      setError((err as Error).message || "The upload failed. Try again.");
    } finally {
      setProgress(null);
      if (input.current) input.current.value = "";
    }
  }

  const pick = (files: FileList | null) => files?.[0] && upload(files[0]);

  return (
    <div className="mt-1">
      <input
        ref={input}
        id={id}
        type="file"
        accept={TYPES.join(",")}
        className="sr-only"
        disabled={busy}
        onChange={(e) => pick(e.target.files)}
      />

      {value ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover preview" className="h-44 w-full bg-mist object-cover" />
          <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-3 py-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => input.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-brand hover:bg-brand/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
              {busy ? `Uploading ${progress}%` : "Replace image"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
            >
              <Trash2 className="size-4" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files);
          }}
          className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-70 ${
            dragging ? "border-brand bg-brand/5" : "border-gray-300 bg-mist hover:border-brand/60"
          }`}
        >
          {busy ? <Loader2 className="size-7 animate-spin text-brand" /> : <ImagePlus className="size-7 text-brand" />}
          <span className="text-sm font-medium text-ink">
            {busy ? `Uploading… ${progress}%` : "Click to upload, or drop an image here"}
          </span>
          {busy && (
            <span className="h-1.5 w-40 overflow-hidden rounded-full bg-gray-200" aria-hidden>
              <span className="block h-full bg-gold transition-[width]" style={{ width: `${progress}%` }} />
            </span>
          )}
        </button>
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
