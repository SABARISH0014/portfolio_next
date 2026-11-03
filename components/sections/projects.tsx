"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpenText, Cloud, Wallet, Github, X, ChevronRight } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import { resumeData } from "@/lib/data/resume";
import { OPEN_PROJECT_EVENT, type PortfolioProjectId } from "@/lib/portfolio-events";

type ProjectId = "subsage" | "mxshare" | "cipherspend";

const projects = resumeData.projects.map((proj) => {
  let icon = Wallet;
  if (proj.id === "mxshare") icon = BookOpenText;
  if (proj.id === "cipherspend") icon = Cloud;

  return {
    ...proj,
    id: proj.id as ProjectId,
    icon,
  };
});

export function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId]
  );

  useEffect(() => {
    const handleOpenProject = (event: Event) => {
      const customEvent = event as CustomEvent<{ projectId: PortfolioProjectId }>;
      setActiveProjectId(customEvent.detail.projectId);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener(OPEN_PROJECT_EVENT, handleOpenProject);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, handleOpenProject);
  }, []);

  return (
    <section id="projects" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Projects</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Selected builds with real product intent</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const Icon = project.icon;

          return (
            <BentoCard
              key={project.title}
              className="group cursor-pointer min-h-[220px] transition-colors hover:border-cyan-300/30"
              onClick={() => setActiveProjectId(project.id)}
            >
              <motion.div layoutId={`project-${project.id}`} className="flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between gap-4">
                  <motion.div layoutId={`icon-container-${project.id}`} className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-cyan-200 group-hover:bg-cyan-400/10 group-hover:border-cyan-300/30 transition-colors">
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <ArrowUpRight className="h-5 w-5 text-neutral-500 transition-colors group-hover:text-cyan-200" />
                </div>

                <div>
                  <motion.h3 layoutId={`title-${project.id}`} className="font-display text-2xl font-semibold text-white">
                    {project.title}
                  </motion.h3>
                  <motion.p layoutId={`subtitle-${project.id}`} className="mt-1 text-sm text-cyan-200/80">
                    {project.subtitle}
                  </motion.p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 2).map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-300">
                        {item}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-300">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-cyan-200 opacity-0 transition-opacity group-hover:opacity-100 font-medium">
                    View
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            </BentoCard>
          );
        })}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-neutral-950/70 px-4 py-8 backdrop-blur-xl overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProjectId(null)}
          >
            <motion.div
              layoutId={`project-${activeProject.id}`}
              className="relative w-full max-w-4xl max-h-[88dvh] overflow-y-auto rounded-[2rem] border border-white/10 bg-neutral-900 shadow-[0_30px_120px_rgba(0,0,0,0.55)] my-auto"
              transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.8 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)] pointer-events-none" />
              
              <div className="relative p-5 sm:p-10 flex flex-col gap-6 sm:gap-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5 sm:gap-5">
                    <motion.div layoutId={`icon-container-${activeProject.id}`} className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-200">
                      <activeProject.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </motion.div>
                    <div>
                      <motion.h3 layoutId={`title-${activeProject.id}`} className="font-display text-2xl font-semibold text-white sm:text-4xl">
                        {activeProject.title}
                      </motion.h3>
                      <motion.p layoutId={`subtitle-${activeProject.id}`} className="mt-1 text-sm sm:text-base text-cyan-200/80">
                        {activeProject.subtitle}
                      </motion.p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveProjectId(null)}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-cyan-300/30 hover:bg-cyan-400/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 mb-4">Overview</p>
                      <p className="text-base leading-8 text-neutral-300">
                        {activeProject.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 mb-4">Case Study</p>
                      <p className="text-base leading-8 text-neutral-300">
                        {activeProject.caseStudy}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeProject.tech.map((item) => (
                        <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-100">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-[1.5rem] border border-white/5 bg-neutral-950/60 p-6 space-y-6">
                      {activeProject.details.map((detail) => (
                        <div key={detail.label}>
                          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">{detail.label}</p>
                          <p className="mt-2 text-sm leading-6 text-neutral-200">{detail.value}</p>
                        </div>
                      ))}
                    </div>

                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-2 rounded-[1.2rem] border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 text-cyan-200 font-medium transition-all hover:bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                    >
                      <Github className="h-5 w-5" />
                      View Repository
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}