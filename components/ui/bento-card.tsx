import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
};

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.03]",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_45%)] before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "after:pointer-events-none after:absolute after:inset-px after:rounded-2xl after:border after:border-white/[0.04] after:opacity-100",
        "portfolio-glow",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}