"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, ArrowUpRight, X, Calendar, MapPin } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { resumeData } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

// Extracts the first 4-digit year anywhere in the string (handles "Aug 2024 - Sep 2024")
const extractYear = (str: string) => {
  const match = str.match(/\b(20\d{2})\b/);
  return match ? parseInt(match[1], 10) : 0;
};

type JourneyEntry = {
  year: string;
  title: string;
  detail: string;
  location?: string;
  highlights?: string[];
  type: "education" | "experience";
};

const journey: JourneyEntry[] = [
  ...resumeData.education.map((edu) => ({
    year: edu.duration,
    title: `${edu.degree} @ ${edu.institution}`,
    detail: `${edu.score} · ${edu.location}`,
    location: edu.location,
    type: "education" as const
  })),
  ...resumeData.experience.map((exp) => ({
    year: exp.duration,
    title: `${exp.role} @ ${exp.company}`,
    detail: exp.shortSummary,
    location: exp.location,
    highlights: exp.highlights,
    type: "experience" as const
  }))
].sort((a, b) => extractYear(b.year) - extractYear(a.year));

type JourneyItemProps = {
  entry: JourneyEntry;
  index: number;
  isLast: boolean;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onSelect?: (entry: JourneyEntry) => void;
};

const TypeBadge = ({ type }: { type: "education" | "experience" }) => {
  const Icon = type === "education" ? GraduationCap : Briefcase;
  return (
    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
      <Icon className="h-3 w-3" />
      {type}
    </div>
  );
};

function JourneyItem({ entry, index, isLast, total, progress, onSelect }: JourneyItemProps) {
  const segStart = index / total;
  const segEnd = Math.min((index + 1) / total, 1);

  const dotScale = useTransform(progress, [segStart, segEnd], [0.55, 1]);
  const dotGlow = useTransform(progress, [segStart, segEnd], [0.08, 0.55]);
  const dotShadow = useTransform(dotGlow, (v) => `0 0 ${20 * v}px rgba(34,211,238,${v})`);
  const lineScale = useTransform(progress, [segStart, segEnd], [0, 1]);
  const lineOpacity = useTransform(progress, [segStart, segEnd], [0.15, 0.5]);

  const isExperience = entry.type === "experience";

  return (
    <div className="flex items-start">
      {/* ── col-A: dot + line ── */}
      <div className="self-stretch hidden sm:flex flex-col items-center shrink-0 w-5">
        <motion.div
          className="h-4 w-4 shrink-0 rounded-full border border-cyan-300/50 bg-cyan-300/20 mt-[1.35rem] z-10"
          style={{ scale: dotScale, boxShadow: dotShadow }}
        />
        {!isLast && (
          <div className="flex-1 w-px mt-1.5 mb-0 overflow-hidden bg-white/[0.06]">
            <motion.div
              className="h-full origin-top bg-gradient-to-b from-cyan-400/50 via-cyan-400/25 to-transparent"
              style={{ scaleY: lineScale, opacity: lineOpacity }}
            />
          </div>
        )}
      </div>

      {/* ── col-B: year label ── */}
      <div className={`hidden sm:block w-48 shrink-0 pt-5 pr-6 pl-3 ${!isLast ? "pb-6" : "pb-2"}`}>
        <span className="text-sm uppercase tracking-[0.32em] text-cyan-200/80 leading-snug">
          {entry.year}
        </span>
      </div>

      {/* ── col-C: card ── */}
      <div className={`flex-1 pt-5 ${!isLast ? "pb-6" : "pb-2"}`}>
        {/* Mobile-only year label */}
        <span className="sm:hidden block text-sm uppercase tracking-[0.32em] text-cyan-200/80 mb-3">
          {entry.year}
        </span>
        <div
          onClick={isExperience ? () => onSelect?.(entry) : undefined}
          className={cn(
            "rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.03]",
            isExperience && "cursor-pointer group/card hover:border-cyan-400/30 hover:bg-white/[0.04]"
          )}
        >
          <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-2.5 sm:gap-3">
            <h3 className="text-base sm:text-lg font-medium text-white flex-1 min-w-[180px]">{entry.title}</h3>
            <div className="flex items-center gap-2 shrink-0">
              <TypeBadge type={entry.type} />
              {isExperience && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(entry);
                  }}
                  aria-label="View internship highlights"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition-colors group-hover/card:border-cyan-300/40 group-hover/card:bg-cyan-400/10 group-hover/card:text-cyan-200 hover:text-white"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-sm leading-7 text-neutral-400">{entry.detail}</p>
        </div>
      </div>
    </div>
  );
}

export function Journey() {
  const [selectedEntry, setSelectedEntry] = useState<JourneyEntry | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEntry(null);
      }
    };
    if (selectedEntry) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEntry]);

  return (
    <section ref={sectionRef} id="journey" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Journey</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          Progress mapped as a timeline
        </h2>
      </div>

      <BentoCard className="p-0 overflow-hidden" interactive={false}>
        <div className="px-4 pt-3 pb-7 sm:px-8 sm:pt-4 sm:pb-9">
          {journey.map((entry, index) => (
            <JourneyItem
              key={`${entry.year}-${index}`}
              entry={entry}
              index={index}
              total={journey.length}
              isLast={index === journey.length - 1}
              progress={scrollYProgress}
              onSelect={setSelectedEntry}
            />
          ))}
        </div>
      </BentoCard>

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-neutral-950/75 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              className="relative w-full max-w-xl max-h-[85dvh] overflow-y-auto rounded-[2rem] border border-white/10 bg-neutral-900/90 p-5 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_40%)] pointer-events-none" />

              <div className="relative flex flex-col gap-6">
                {/* Header with Title & Close button */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.32em] text-cyan-300/80 font-medium">
                      Experience Overview
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
                      {selectedEntry.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedEntry(null)}
                    aria-label="Close modal"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition-colors hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Badges: Duration & Location */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                    <Calendar className="h-3.5 w-3.5 text-cyan-300" />
                    {selectedEntry.year}
                  </span>
                  {selectedEntry.location && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300">
                      <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                      {selectedEntry.location}
                    </span>
                  )}
                </div>

                {/* Inner Box with Highlights */}
                {selectedEntry.highlights && selectedEntry.highlights.length > 0 && (
                  <div className="rounded-2xl border border-white/5 bg-neutral-950/60 p-5">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-3.5 font-medium">
                      Key Highlights &amp; Contributions
                    </p>
                    <ul className="space-y-3">
                      {selectedEntry.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-neutral-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
