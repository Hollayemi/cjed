interface BadgeProps {
  children: React.ReactNode;
  variant?: "forest" | "gold" | "neutral";
  className?: string;
}

export default function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const variants = {
    forest: "bg-[#0068C1]/10 text-[#0068C1]",
    gold: "bg-[#f7cb06]/15 text-[#b88520]",
    neutral: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className || ""}`}
    >
      {children}
    </span>
  );
}