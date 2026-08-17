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
  // A simple heuristic to sort by year descending (assuming start year is first 4 chars of duration)
  const getYear = (str: string) => parseInt(str.substring(0, 4)) || 0;
  return getYear(b.year) - getYear(a.year);
});


type JourneyItemProps = {
  entry: (typeof journey)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function JourneyItem({ entry, index, progress }: JourneyItemProps) {
  const dotScale = useTransform(progress, [index * 0.26 + 0.12, index * 0.26 + 0.18], [0.55, 1]);
  const dotGlow = useTransform(progress, [index * 0.26 + 0.12, index * 0.26 + 0.18], [0.08, 0.5]);
  const dotShadow = useTransform(dotGlow, (value) => `0 0 ${24 * value}px rgba(34, 211, 238, ${value})`);

  return (
    <div className="relative grid gap-4 sm:grid-cols-[220px_1fr] sm:items-start">
      <div className="flex items-center gap-4 sm:pr-6">
        <motion.div
          className="hidden h-4 w-4 shrink-0 rounded-full border border-cyan-300/50 bg-cyan-300/20 sm:block"
          style={{
            scale: dotScale,
            boxShadow: dotShadow
          }}
        />
        <div className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">{entry.year}</div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.03]">
        <h3 className="text-lg font-medium text-white">{entry.title}</h3>
        <p className="mt-2 text-sm leading-7 text-neutral-400">{entry.detail}</p>
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

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineGlow = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.15, 0.55, 0.9, 1]);

  return (
    <section ref={sectionRef} id="journey" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Journey</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Progress mapped as a timeline</h2>
      </div>

      <BentoCard className="p-0">
        <div className="relative px-6 py-8 sm:px-8">
          {/* Centered line: 32px (sm:px-8) + 8px (half of 16px dot) - 1px (half of 2px line) = 39px */}
          <div className="absolute left-[39px] top-14 bottom-14 hidden w-[2px] sm:block bg-white/5">
            <motion.div
              className="absolute inset-0 origin-top rounded-full bg-cyan-400/40"
              style={{ scaleY: pathLength, opacity: lineGlow }}
            />
          </div>

          <div className="space-y-6">
            {journey.map((entry, index) => (
              <JourneyItem key={entry.year} entry={entry} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </BentoCard>
    </section>
  );
}