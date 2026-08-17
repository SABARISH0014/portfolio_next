"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import { resumeData } from "@/lib/data/resume";

const journey = [
  ...resumeData.education.map(edu => ({
    year: edu.duration,
    title: `${edu.degree} @ ${edu.institution}`,
    detail: edu.score
  })),
  ...resumeData.experience.map(exp => ({
    year: exp.duration,
    title: `${exp.role} @ ${exp.company}`,
    detail: exp.shortSummary
  }))
].sort((a, b) => {
  // Sort descending by start year
  const getYear = (str: string) => parseInt(str.substring(0, 4)) || 0;
  return getYear(b.year) - getYear(a.year);
});

type JourneyItemProps = {
  entry: (typeof journey)[number];
  index: number;
  isLast: boolean;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function JourneyItem({ entry, index, isLast, total, progress }: JourneyItemProps) {
  const segStart = index / total;
  const segEnd   = Math.min((index + 1) / total, 1);

  const dotScale  = useTransform(progress, [segStart, segEnd], [0.55, 1]);
  const dotGlow   = useTransform(progress, [segStart, segEnd], [0.08, 0.55]);
  const dotShadow = useTransform(dotGlow, v => `0 0 ${20 * v}px rgba(34,211,238,${v})`);
  const lineScale = useTransform(progress, [segStart, segEnd], [0, 1]);
  const lineOpacity = useTransform(progress, [segStart, segEnd], [0.15, 0.5]);

  return (
    /*
     * Three-column flex row:
     *   col-A  (w-5)   : dot  +  connecting line below it
     *   col-B  (w-44)  : year label
     *   col-C  (flex-1): card
     *
     * col-A uses `self-stretch` so it always matches the tallest column's height.
     * The `flex-1` line inside col-A fills exactly the space from dot-bottom to
     * row-bottom, touching the next row's dot.  Last item → no line rendered.
     */
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
      <div className={`hidden sm:block w-48 shrink-0 pt-5 pr-6 pl-3 ${!isLast ? "pb-6" : ""}`}>
        <span className="text-sm uppercase tracking-[0.32em] text-cyan-200/80 leading-snug">
          {entry.year}
        </span>
      </div>

      {/* ── col-C: card ── */}
      <div className={`flex-1 pt-5 ${!isLast ? "pb-6" : ""}`}>
        {/* Mobile-only year label */}
        <span className="sm:hidden block text-sm uppercase tracking-[0.32em] text-cyan-200/80 mb-3">
          {entry.year}
        </span>
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.03]">
          <h3 className="text-lg font-medium text-white">{entry.title}</h3>
          <p className="mt-2 text-sm leading-7 text-neutral-400">{entry.detail}</p>
        </div>
      </div>
    </div>
  );
}

export function Journey() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} id="journey" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Journey</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          Progress mapped as a timeline
        </h2>
      </div>

      <BentoCard className="p-0 overflow-hidden">
        <div className="px-4 sm:px-6">
          {journey.map((entry, index) => (
            <JourneyItem
              key={`${entry.year}-${index}`}
              entry={entry}
              index={index}
              total={journey.length}
              isLast={index === journey.length - 1}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </BentoCard>
    </section>
  );
}