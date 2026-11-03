import { BentoCard } from "@/components/ui/bento-card";

export function CurrentlySkeleton() {
  return (
    <section id="currently" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Currently</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">What I&apos;m focused on now</h2>
        </div>
      </div>

      <BentoCard className="p-0" interactive={false}>
        <div className="grid gap-px bg-white/[0.03] md:grid-cols-2">
          <div className="min-h-[180px] animate-pulse p-6 md:p-8">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.06]" />
              <div className="space-y-3">
                <div className="h-4 w-2/3 rounded-full bg-white/10" />
                <div className="h-4 w-5/6 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
          <div className="min-h-[180px] animate-pulse p-6 md:p-8">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.06]" />
              <div className="space-y-3">
                <div className="h-4 w-3/5 rounded-full bg-white/10" />
                <div className="h-4 w-4/5 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </BentoCard>
    </section>
  );
}
