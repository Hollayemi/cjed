import Image from "next/image";

/** CJED logo on a white tile so it stays legible on the brand-blue sidebar and login panel. */
export default function BrandMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`grid flex-shrink-0 place-items-center rounded-2xl bg-white shadow-md shadow-black/20 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image src="/images/logo.png" alt="CJED" width={size - 8} height={Math.round((size - 8) * (319 / 349))} priority />
    </span>
  );
}
