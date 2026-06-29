"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
    className?: string;
    external?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className,
    external,
}: ButtonProps) {
    const base =
        "inline-flex items-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer";

    const variants = {
        primary:
            "bg-[#0E3B2E] text-white hover:bg-[#174d3d] active:scale-[0.97]",
        secondary:
            "bg-[#D7A441] text-[#0E3B2E] hover:bg-[#e8bc6a] active:scale-[0.97]",
        outline:
            "border-2 border-[#0E3B2E] text-[#0E3B2E] hover:bg-[#0E3B2E] hover:text-white active:scale-[0.97]",
        ghost:
            "text-[#0E3B2E] hover:bg-[#0E3B2E]/8 active:scale-[0.97]",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className || ""}`;

    const content = (
        <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={classes}
        >
            {children}
        </motion.span>
    );

    if (href) {
        return (
            <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex"
            >
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className="inline-flex">
            {content}
        </button>
    );
}