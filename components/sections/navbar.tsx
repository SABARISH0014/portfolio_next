"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Currently", href: "#currently" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/[0.04] bg-neutral-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-white transition-colors group-hover:border-cyan-300/40 group-hover:text-cyan-200">
            SP
          </div>
          <div>
            <div className="text-sm font-medium text-white">Sabarish P</div>
            {/* Updated title to reflect your product developer transition */}
            <div className="text-xs text-neutral-400">Product Developer</div> 
          </div>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-transparent px-4 py-2 text-sm text-neutral-400 transition-colors hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="interactive"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white transition-all hover:border-cyan-300/30 hover:bg-cyan-400/10"
        >
          Explore Work
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.header>
  );
}