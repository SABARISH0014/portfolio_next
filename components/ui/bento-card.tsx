"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  href?: string; // New prop for GitHub redirection
  onClick?: () => void;
  controls?: ReactNode;
  interactive?: boolean;
};

export function BentoCard({
  children,
  className,
  href,
  onClick,
  controls,
  interactive = true,
}: BentoCardProps) {
  // If an href is provided, render as an anchor tag, otherwise a div
  const Component = href ? motion.a : motion.div;

  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.02, y: -4 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl transition-colors hover:border-cyan-400/30 hover:bg-white/[0.03]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_45%)] before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "after:pointer-events-none after:absolute after:inset-px after:rounded-2xl after:border after:border-white/[0.04] after:opacity-100",
        "portfolio-glow block",
        interactive && "cursor-pointer",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      {controls && <div className="absolute right-6 top-6 z-20">{controls}</div>}
    </Component>
  );
}
