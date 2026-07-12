import { BentoCard } from "@/components/ui/bento-card";

const updates = [
  "Building 'SubSage' & 'CipherSpend'.",
  "Studying MCA @ PSG College of Technology."
];

export function Currently() {
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
          {updates.map((item) => (
            <div key={item} className="min-h-[180px] p-6 md:p-8">
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03]" />
                <p className="max-w-md text-lg leading-8 text-neutral-300">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </BentoCard>
    </section>
  );
}