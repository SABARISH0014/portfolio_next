"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, Search, Menu, X, FileDown } from "lucide-react";
import { useTerminal } from "@/components/ui/terminal-provider";

const links = [
  { label: "Arsenal", href: "#arsenal" },
  { label: "Currently", href: "#currently" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Activity", href: "#recent-activity" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  const { setTerminalMode } = useTerminal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/[0.04] bg-neutral-950/80 backdrop-blur-xl"
    >
      <div ref={menuRef} className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 lg:px-10">
        <a href="#top" className="group flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-white transition-colors group-hover:border-cyan-300/40 group-hover:text-cyan-200">
            SP
          </div>
          <div>
            <div className="text-sm font-medium text-white">Sabarish P</div>
            <div className="text-xs text-neutral-400 hidden min-[380px]:block md:hidden xl:block">
              Software &amp; Product Developer
            </div>
          </div>
        </a>

        {/* Desktop Navigation: sleek floating pill card */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1 backdrop-blur-md">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border border-transparent px-3 py-1.5 lg:px-4 text-xs lg:text-sm text-neutral-400 transition-colors hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Command Palette trigger: icon on mobile, pill on sm+ */}
          <motion.button
            type="button"
            aria-label="Open command palette"
            title="Command Palette (⌘K / Ctrl+K)"
            onClick={openCommandPalette}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 sm:h-auto sm:w-auto items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] sm:px-3 sm:py-2 text-xs text-neutral-400 transition-all hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <Search className="h-4 w-4 sm:hidden text-cyan-300/80" />
            <kbd className="hidden font-sans sm:inline">⌘K</kbd>
          </motion.button>

          {/* Terminal Mode trigger */}
          <motion.button
            type="button"
            aria-label="Open terminal mode"
            title="Terminal / CLI Mode"
            onClick={() => setTerminalMode(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 transition-all hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <Terminal className="h-4 w-4" />
          </motion.button>

          {/* Explore Work CTA: hidden below 400px to prevent crowding */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="interactive"
            className="hidden min-[400px]:inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white transition-all hover:border-cyan-300/30 hover:bg-cyan-400/10"
          >
            <span>Explore Work</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </motion.a>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 transition-colors hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-white md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Floating Individual Card Popover on Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="absolute right-4 top-[calc(100%+0.6rem)] z-50 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:hidden"
            >
              {/* Subtle radial cyan glow inside card */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_50%)]" />

              <div className="relative">
                <p className="px-3 pt-1 pb-1.5 text-[10px] uppercase tracking-[0.32em] text-neutral-500 font-medium">
                  Navigate
                </p>

                <nav className="flex flex-col gap-1">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" />
                    </a>
                  ))}
                </nav>

                {/* 1px divider */}
                <div className="my-1.5 h-px bg-white/[0.06]" />

                <a
                  href="/resume.pdf"
                  download="Sabarish_P_Resume.pdf"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-200 transition-colors hover:bg-cyan-500/20"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
