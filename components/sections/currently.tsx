"use client";

import { useEffect, useState } from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { Code2, GraduationCap, ExternalLink } from "lucide-react";

type CurrentlyPayload = {
  githubStars: number;
  latestRepoName: string;
  latestRepoUrl?: string;
  latestRepoDescription?: string;
  publicRepoCount?: number;
  lastPushedAt?: string;
};

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const updates = [
  {
    text: "Building 'CipherSpend' (Android NER SMS tracker) & 'SubSage'.",
    icon: Code2
  },
  { text: "Studying MCA @ PSG College of Technology.", icon: GraduationCap }
];

export function Currently() {
  const [signals, setSignals] = useState<CurrentlyPayload | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadSignals = async () => {
      try {
        const response = await fetch("/api/currently", {
          signal: controller.signal,
          cache: "no-store"
        });
        if (!response.ok) throw new Error("Unable to load currently signals");
        const data = (await response.json()) as CurrentlyPayload;
        setSignals(data);
      } catch {
        setSignals({ githubStars: 0, latestRepoName: "CipherSpend-v1" });
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
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            What I&apos;m focused on now
          </h2>
        </div>
      </div>

      <BentoCard className="p-0" interactive={false}>
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
                  7.87 CGPA
                </div>
              </div>
              <div className="grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="text-neutral-500">Live stars</div>
                  <div className="mt-2 text-xl font-semibold text-white">
                    {signals ? signals.githubStars.toLocaleString() : "…"}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="text-neutral-500">Latest push</div>
                  {signals?.latestRepoUrl ? (
                    <a
                      href={signals.latestRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-1.5 group"
                    >
                      <span className="text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
                        {signals.latestRepoName}
                      </span>
                      <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-cyan-300 transition-colors shrink-0" />
                    </a>
                  ) : (
                    <div className="mt-2 text-xl font-semibold text-white">
                      {signals ? signals.latestRepoName : "Loading…"}
                    </div>
                  )}
                  {signals?.lastPushedAt && (
                    <div className="mt-1 text-xs text-neutral-500">
                      {formatRelativeTime(signals.lastPushedAt)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>
    </section>
  );
}
