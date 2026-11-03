"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  ArrowRight,
  Search,
  Sparkles,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Code2,
  Github,
  Linkedin,
  Terminal,
  Bot,
  Briefcase,
  BookOpen,
  Home,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { openProject, type PortfolioProjectId } from "@/lib/portfolio-events";
import { resumeData } from "@/lib/data/resume";
import { useTerminal } from "./terminal-provider";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionCommand = {
  type: "section";
  label: string;
  href: string;
  icon: React.ElementType;
};

type ProjectCommand = {
  type: "project";
  label: string;
  projectId: PortfolioProjectId;
  tech: string;
};

type LinkCommand = {
  type: "link";
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
};

type ActionCommand = {
  type: "action";
  label: string;
  description: string;
  icon: React.ElementType;
  action: "terminal" | "ai-twin" | "download-resume";
};

type InfoCommand = {
  type: "info";
  label: string;
  value: string;
  icon: React.ElementType;
};


// ─── Data ─────────────────────────────────────────────────────────────────────

const { personalInfo, education, skills, projects } = resumeData;
const currentDegree = education[0];

const sectionCommands: SectionCommand[] = [
  { type: "section", label: "Home", href: "/#top", icon: Home },
  { type: "section", label: "Arsenal", href: "/#arsenal", icon: Code2 },
  { type: "section", label: "Currently", href: "/#currently", icon: Sparkles },
  { type: "section", label: "Journey", href: "/#journey", icon: BookOpen },
  { type: "section", label: "Projects", href: "/#projects", icon: Briefcase },
  { type: "section", label: "Activity", href: "/#recent-activity", icon: Github },
  { type: "section", label: "Contact", href: "/#contact", icon: Mail },
];

const projectCommands: ProjectCommand[] = projects.map((p) => ({
  type: "project",
  label: p.title,
  projectId: p.id as PortfolioProjectId,
  tech: p.tech.slice(0, 3).join(", "),
}));

const linkCommands: LinkCommand[] = [
  {
    type: "link",
    label: "GitHub",
    href: `https://github.com/${personalInfo.contact.github.replace("github.com/", "")}`,
    icon: Github,
    description: personalInfo.contact.github,
  },
  {
    type: "link",
    label: "LinkedIn",
    href: `https://www.linkedin.com/in/sabarishparthiban/`,
    icon: Linkedin,
    description: personalInfo.contact.linkedin,
  },
  {
    type: "link",
    label: "Email",
    href: `mailto:${personalInfo.contact.email}`,
    icon: Mail,
    description: personalInfo.contact.email,
  },
  {
    type: "link",
    label: "LeetCode",
    href: "https://leetcode.com/u/SABARISH_P",
    icon: Code2,
    description: "leetcode.com/u/SABARISH_P",
  },
];

const actionCommands: ActionCommand[] = [
  {
    type: "action",
    label: "Download Resume",
    description: "Save PDF to your device",
    icon: Download,
    action: "download-resume",
  },
  {
    type: "action",
    label: "Open Terminal Mode",
    description: "Switch to CLI interface",
    icon: Terminal,
    action: "terminal",
  },
  {
    type: "action",
    label: "Chat with AI Twin",
    description: "Ask anything about Sabarish",
    icon: Bot,
    action: "ai-twin",
  },
];

const infoCommands: InfoCommand[] = [
  {
    type: "info",
    label: "Email",
    value: personalInfo.contact.email,
    icon: Mail,
  },
  {
    type: "info",
    label: "Phone",
    value: personalInfo.contact.phone,
    icon: Phone,
  },
  {
    type: "info",
    label: "Location",
    value: personalInfo.location,
    icon: MapPin,
  },
  {
    type: "info",
    label: "Current Degree",
    value: `${currentDegree.degree} @ ${currentDegree.institution}`,
    icon: GraduationCap,
  },
  {
    type: "info",
    label: "GPA",
    value: currentDegree.score,
    icon: GraduationCap,
  },
  {
    type: "info",
    label: "Languages",
    value: skills.languages.join(", "),
    icon: Code2,
  },
  {
    type: "info",
    label: "AI & Backend",
    value: skills.aiDataBackend.slice(0, 4).join(", "),
    icon: Code2,
  },
  {
    type: "info",
    label: "Certification",
    value: skills.certifications[0],
    icon: BookOpen,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { setTerminalMode } = useTerminal();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setCopiedKey(null);
    }
  }, [open]);

  const navigateToSection = (href: string) => {
    setOpen(false);
    if (pathname === "/") {
      const sectionId = href.split("#")[1];
      if (!sectionId) return;
      history.replaceState(null, "", href);
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    router.push(href as never);
  };

  const jumpToProject = (projectId: PortfolioProjectId) => {
    setOpen(false);
    router.push("/#projects" as never);
    window.setTimeout(() => {
      openProject(projectId);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const openLink = (href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noreferrer");
  };

  const copyInfo = (label: string, value: string) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopiedKey(label);
    setTimeout(() => {
      setCopiedKey(null);
      setOpen(false);
    }, 900);
  };

  const runAction = (action: ActionCommand["action"]) => {
    setOpen(false);
    if (action === "terminal") {
      setTerminalMode(true);
    } else if (action === "download-resume") {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "Sabarish_P_Resume.pdf";
      a.click();
    } else if (action === "ai-twin") {
      // Dispatch a custom event that AITwinWidget can listen to
      window.dispatchEvent(new CustomEvent("portfolio:open-ai-twin"));
    }
  };

  const itemClass =
    "flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm text-neutral-200 outline-none aria-selected:bg-white/[0.06] aria-selected:text-white transition-colors";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global command palette"
      className="relative z-[100]"
    >
      <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-start justify-center px-4 pt-6 sm:pt-24">
        <Command
          shouldFilter
          value={search}
          onValueChange={setSearch}
          className={cn(
            "w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950/90 text-white shadow-[0_30px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl",
            "animate-in fade-in zoom-in-95 duration-200"
          )}
        >
          {/* Search bar */}
          <div className="flex items-center gap-3 border-b border-white/5 px-4 py-4">
            <Search className="h-4 w-4 text-cyan-300 shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Search sections, projects, links, skills..."
              className="h-9 w-full bg-transparent text-base sm:text-sm outline-none placeholder:text-neutral-500"
            />
            <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-neutral-400 sm:flex shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              cmdk
            </div>
          </div>

          <Command.List className="max-h-[60dvh] sm:max-h-[480px] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-10 text-center text-sm text-neutral-500">
              No matching command found.
            </Command.Empty>

            {/* ── Navigate ── */}
            <Command.Group
              heading="Navigate"
              className="px-2 py-2 text-xs uppercase tracking-[0.35em] text-neutral-500"
            >
              {sectionCommands.map((item) => {
                const Icon = item.icon as React.FC<{ className?: string }>;
                return (
                  <Command.Item
                    key={item.label}
                    value={`navigate ${item.label}`}
                    onSelect={() => navigateToSection(item.href)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-neutral-500 shrink-0" />
                      {item.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-neutral-600 shrink-0" />
                  </Command.Item>
                );
              })}
            </Command.Group>

            {/* ── Projects ── */}
            <Command.Group
              heading="Projects"
              className="px-2 py-2 text-xs uppercase tracking-[0.35em] text-neutral-500"
            >
              {projectCommands.map((item) => (
                <Command.Item
                  key={item.label}
                  value={`project ${item.label} ${item.tech}`}
                  onSelect={() => jumpToProject(item.projectId)}
                  className={itemClass}
                >
                  <span className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-neutral-500 shrink-0" />
                    <span>
                      {item.label}
                      <span className="ml-2 text-xs text-neutral-500">{item.tech}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-600 shrink-0" />
                </Command.Item>
              ))}
            </Command.Group>

            {/* ── Actions ── */}
            <Command.Group
              heading="Actions"
              className="px-2 py-2 text-xs uppercase tracking-[0.35em] text-neutral-500"
            >
              {actionCommands.map((item) => {
                const Icon = item.icon as React.FC<{ className?: string }>;
                return (
                  <Command.Item
                    key={item.label}
                    value={`action ${item.label} ${item.description}`}
                    onSelect={() => runAction(item.action)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>
                        {item.label}
                        <span className="ml-2 text-xs text-neutral-500">{item.description}</span>
                      </span>
                    </span>
                    {item.action === "download-resume" && (
                      <Download className="h-4 w-4 text-cyan-500 shrink-0" />
                    )}
                  </Command.Item>
                );
              })}
            </Command.Group>

            {/* ── Links ── */}
            <Command.Group
              heading="Links"
              className="px-2 py-2 text-xs uppercase tracking-[0.35em] text-neutral-500"
            >
              {linkCommands.map((item) => {
                const Icon = item.icon as React.FC<{ className?: string }>;
                return (
                  <Command.Item
                    key={item.label}
                    value={`link ${item.label} ${item.description}`}
                    onSelect={() => openLink(item.href)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-neutral-500 shrink-0" />
                      <span>
                        {item.label}
                        <span className="ml-2 text-xs text-neutral-500">{item.description}</span>
                      </span>
                    </span>
                    <ExternalLink className="h-4 w-4 text-neutral-600 shrink-0" />
                  </Command.Item>
                );
              })}
            </Command.Group>

            {/* ── About / Info ── */}
            <Command.Group
              heading="About — click to copy"
              className="px-2 py-2 text-xs uppercase tracking-[0.35em] text-neutral-500"
            >
              {infoCommands.map((item) => {
                const Icon = item.icon as React.FC<{ className?: string }>;
                const isCopied = copiedKey === item.label;
                return (
                  <Command.Item
                    key={item.label}
                    value={`info about ${item.label} ${item.value}`}
                    onSelect={() => copyInfo(item.label, item.value)}
                    className={itemClass}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-neutral-500 shrink-0" />
                      <span className="text-neutral-400">{item.label}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="max-w-[200px] truncate text-right text-xs text-neutral-300">
                        {item.value}
                      </span>
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                      )}
                    </span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>

          {/* Footer hint */}
          <div className="flex items-center justify-between border-t border-white/5 px-5 py-3 text-[11px] text-neutral-500">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </Command>
      </div>
    </Command.Dialog>
  );
}
