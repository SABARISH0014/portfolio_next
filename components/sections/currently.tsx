"use client";

import { useEffect, useState } from "react";
import { BentoCard } from "@/components/ui/bento-card";

type CurrentlyPayload = {
  githubStars: number;
  latestRepoName: string;
};

import { Code2, GraduationCap } from "lucide-react";

const updates = [
  { text: "Building 'SubSage' & 'CipherSpend'.", icon: Code2 },
  { text: "Studying MCA @ PSG College of Technology.", icon: GraduationCap }
];

export function Currently() {
  const [signals, setSignals] = useState<CurrentlyPayload | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadSignals = async () => {
      try {
        const response = await fetch("/api/currently", { signal: controller.signal, cache: "no-store" });

        if (!response.ok) {
          throw new Error("Unable to load currently signals");
        }

        const data = (await response.json()) as CurrentlyPayload;
        setSignals(data);
      } catch {
        setSignals({ githubStars: 0, latestRepoName: "GitHub data unavailable" });
      }
    };

    void loadSignals();

    return () => controller.abort();
  }, []);

  return (
    <section id="currently" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Currently</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">What I&apos;m focused on now</h2>
        </div>
      </div>

      <BentoCard className="p-0">
        <div className="grid gap-px bg-white/[0.03] md:grid-cols-2">
          {updates.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="min-h-[180px] p-6 md:p-8">
                <div className="flex h-full flex-col justify-between gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="max-w-md text-lg leading-8 text-neutral-300">{item.text}</p>
                </div>
              </div>
            );
          })}
          <div className="min-h-[180px] p-6 md:col-span-2 md:p-8">
            <div className="flex h-full flex-col justify-between gap-6 rounded-[1.4rem] border border-white/5 bg-neutral-950/40 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">Live Signal</p>
                  <p className="mt-2 text-lg font-medium text-white">GitHub pulse from SABARISH0014</p>
                </div>
                <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                  7.94 CGPA
                </div>
              </div>
              <div className="grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="text-neutral-500">Live stars</div>
                  <div className="mt-2 text-xl font-semibold text-white">{signals ? signals.githubStars.toLocaleString() : "…"}</div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="text-neutral-500">Latest push</div>
                  <div className="mt-2 text-xl font-semibold text-white">{signals ? signals.latestRepoName : "Loading…"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>
    </section>
  );
}