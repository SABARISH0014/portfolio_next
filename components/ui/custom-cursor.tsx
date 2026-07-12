"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor='interactive']";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);

  const cursorStyles = useMemo(
    () => ({
      left: 0,
      top: 0,
      x,
      y
    }),
    [x, y]
  );

  useEffect(() => {
    setReady(true);

    const move = (event: MouseEvent) => {
      x.set(event.clientX - 16);
      y.set(event.clientY - 16);
    };

    const over = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setHovered(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const leave = () => setHovered(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mouseout", over, { passive: true });
    window.addEventListener("blur", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", over);
      window.removeEventListener("blur", leave);
    };
  }, [x, y]);

  if (!ready) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden lg:block">
      <motion.div
        className="absolute rounded-full bg-cyan-300/70 mix-blend-screen blur-[2px]"
        style={cursorStyles}
        animate={{
          width: hovered ? 96 : 14,
          height: hovered ? 96 : 14,
          opacity: hovered ? 0.28 : 0.85,
          filter: hovered ? "blur(24px)" : "blur(0px)"
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.35 }}
      />
      <motion.div
        className="absolute rounded-full border border-cyan-200/60 bg-cyan-200/10"
        style={cursorStyles}
        animate={{
          width: hovered ? 26 : 10,
          height: hovered ? 26 : 10,
          opacity: hovered ? 0.85 : 0.95
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.2 }}
      />
    </div>
  );
}