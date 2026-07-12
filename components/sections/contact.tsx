import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";

const contacts = [
  {
    title: "GitHub",
    description: "Source code, experiments, and build logs.",
    href: "https://github.com/",
    icon: Github,
    label: "github.com"
  },
  {
    title: "LinkedIn",
    description: "Professional updates and collaboration.",
    href: "https://linkedin.com/in/",
    icon: Linkedin,
    label: "linkedin.com/in"
  },
  {
    title: "Gmail",
    description: "Direct mail for opportunities and inquiries.",
    href: "mailto:yourname@gmail.com",
    icon: Mail,
    label: "yourname@gmail.com"
  }
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 pt-10 lg:pt-16">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Let&apos;s build something sharp</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {contacts.map((contact) => {
          const Icon = contact.icon;

          return (
            <BentoCard key={contact.title} className="p-0">
              <a
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                data-cursor="interactive"
                className="flex h-full min-h-[220px] flex-col justify-between p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-neutral-500 transition-colors group-hover:text-cyan-200" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-semibold text-white">{contact.title}</h3>
                  <p className="max-w-xs text-sm leading-7 text-neutral-400">{contact.description}</p>
                  <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">{contact.label}</p>
                </div>
              </a>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
}