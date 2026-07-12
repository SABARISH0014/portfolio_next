import { BentoCard } from "@/components/ui/bento-card";
import { ArrowUpRight, Cloud, Wallet, BookOpenText } from "lucide-react";

const projects = [
  {
    title: "SubSage",
    description: "Full-stack subscription management with auth, resilient payments, and a clean operational dashboard.",
    icon: Wallet,
    tech: ["NodeJS", "Express", "MongoDB", "Stripe API", "bcrypt"]
  },
  {
    title: "MXShare",
    description: "An educational notes sharing platform tuned for discoverability, file delivery, and simple collaboration.",
    icon: BookOpenText,
    tech: ["Next.JS", "Cloud Storage APIs"]
  },
  {
    title: "CipherSpend",
    description: "Offline-first finance tracker with encrypted local data and background SMS-driven transaction capture.",
    icon: Cloud,
    tech: ["Flutter", "Kotlin", "SQLCipher", "background SMS receivers"]
  }
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Projects</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Selected builds with real product intent</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => {
          const Icon = project.icon;

          return (
            <BentoCard key={project.title} className="min-h-[320px]">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-neutral-500 transition-colors group-hover:text-cyan-200" />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-400">{project.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}