"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function MagneticLink({ children, strength = 22, className, ...props }: MagneticLinkProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.max(bounds.width, bounds.height) / 2;
    const factor = Math.max(0, 1 - Math.hypot(offsetX, offsetY) / distance);

    x.set(offsetX * factor * (strength / 100));
    y.set(offsetY * factor * (strength / 100));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.98 }}
      className={cn("inline-flex will-change-transform", className)}
    >
      <a {...props} onMouseMove={handleMove} onMouseLeave={handleLeave} className="contents">
        {children}
      </a>
    </motion.div>
  );
}