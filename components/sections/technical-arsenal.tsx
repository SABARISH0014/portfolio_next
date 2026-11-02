import { BentoCard } from "@/components/ui/bento-card";
import { Code2, Database, Workflow } from "lucide-react";
import { resumeData } from "@/lib/data/resume";

const arsenal = [
  {
    category: "Core Stack",
    title: "Languages",
    icon: Code2,
    items: resumeData.skills.languages
  },
  {
    category: "Application Layer",
    title: "Frameworks",
    icon: Workflow,
    items: resumeData.skills.frameworks
  },
  {
    category: "Data & Credentials",
    title: "Databases, Tools & Certs",
    icon: Database,
    items: [...resumeData.skills.databasesAndTools, ...resumeData.skills.certifications]
  }
];

export function TechnicalArsenal() {
  return (
    <section id="arsenal" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Technical Arsenal</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Meticulous execution, stack by stack</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {arsenal.map((group) => {
          const Icon = group.icon;

          return (
            <BentoCard key={group.title} className="min-h-[260px]">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-neutral-500">{group.category}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-neutral-200 transition-colors group-hover:border-cyan-300/20 group-hover:bg-cyan-400/10"
                    >
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
