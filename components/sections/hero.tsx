"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileDown, MapPin } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";

export function Hero({ location }: { location?: string | null }) {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    if (location) {
      const hour = new Date().getHours();
      const timeGreeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
      setGreeting(`${timeGreeting} to you in ${location}. I am`);
    } else {
      setGreeting("Hello, I'm");
    }
  }, [location]);

  return (
    <section id="top" className="relative pt-14 lg:pt-20 pb-20 min-h-[90vh] flex flex-col justify-center">
      <AnimatedBackground />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-8">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300"
          >
            <MapPin className="h-4 w-4 text-cyan-300" />
            Coimbatore, Tamil Nadu
          </motion.div>

          <div className="max-w-4xl space-y-6">
            <motion.h1
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.6, ease: "easeOut" }}
              className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-8xl"
            >
              {greeting} <span className="inline-flex translate-y-[-0.06em] items-center align-middle"><span className="mx-3 inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-lg font-semibold text-cyan-100 shadow-[0_0_36px_rgba(34,211,238,0.18)] sm:h-16 sm:w-16">SP</span></span>Sabarish.
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.55, ease: "easeOut" }}
              className="max-w-2xl text-lg leading-8 text-neutral-400 sm:text-xl"
            >
                Aspiring Software &amp; Product Developer. MCA @ PSG Tech.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#journey"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-all hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              Timeline
            </a>
            <a
              href="/resume.pdf"
              download="Sabarish_P_Resume.pdf"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20"
            >
              Download CV
              <FileDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.aside
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="grid gap-4 rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl"
        >
          <div className="rounded-2xl border border-white/5 bg-neutral-950/70 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Identity</p>
            <div className="mt-3 text-lg font-medium text-white">Sabarish P</div>
            <p className="mt-1 text-sm text-neutral-400">Aspiring Software &amp; Product Developer</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">Focus</p>
              <p className="mt-3 text-sm leading-6 text-neutral-300">Driven to solve high-impact business problems with scalable technology and a product-first mindset.</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">Stack</p>
              <p className="mt-3 text-sm leading-6 text-neutral-300">Full-stack apps, mobile apps, and offline-first tooling.</p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}