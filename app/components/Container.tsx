"use client";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Container({ children, className, size = "xl" }: ContainerProps) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
  };

  return (
    <div className={`mx-auto px-6 lg:px-8 w-full ${sizes[size]} ${className || ""}`}>
      {children}
    </div>
  );
}