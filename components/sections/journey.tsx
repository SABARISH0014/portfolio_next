import { BentoCard } from "@/components/ui/bento-card";

const journey = [
  {
    year: "2025 - Present",
    title: "MCA @ PSG College of Technology",
    detail: "CGPA: 7.94"
  },
  {
    year: "Aug 2024 - Sep 2024",
    title: "Web Development Intern @ Intern Learn",
    detail: "Accelerated delivery timelines by 10%, improved stability by 15%"
  },
  {
    year: "2022 - 2025",
    title: "BCA @ SRM Institute of Science and Technology",
    detail: "CGPA: 9.36"
  }
];

export function Journey() {
  return (
    <section id="journey" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Journey</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Progress mapped as a timeline</h2>
      </div>

      <BentoCard className="p-0">
        <div className="relative px-6 py-8 sm:px-8">
          <div className="absolute left-9 top-10 bottom-10 hidden w-px bg-gradient-to-b from-cyan-400/70 via-white/10 to-transparent sm:block" />

          <div className="space-y-6">
            {journey.map((entry) => (
              <div key={entry.year} className="relative grid gap-4 sm:grid-cols-[160px_1fr] sm:items-start">
                <div className="flex items-center gap-4 sm:pr-10">
                  <div className="hidden h-4 w-4 rounded-full border border-cyan-300/50 bg-cyan-300/20 shadow-[0_0_24px_rgba(34,211,238,0.35)] sm:block" />
                  <div className="text-sm uppercase tracking-[0.32em] text-cyan-200/80">{entry.year}</div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-cyan-300/20 hover:bg-white/[0.03]">
                  <h3 className="text-lg font-medium text-white">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-400">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>
    </section>
  );
}