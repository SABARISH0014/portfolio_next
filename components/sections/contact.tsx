"use client";

import { motion } from "framer-motion";
import { Code2, FileDown, Github, Linkedin, Mail } from "lucide-react";

const contacts = [
  {
    title: "GitHub",
    href: "https://github.com/SABARISH0014",
    icon: Github,
    download: false,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/sabarishparthiban/",
    icon: Linkedin,
    download: false,
  },
  {
    title: "Email",
    href: "mailto:sabarish.0014@gmail.com",
    icon: Mail,
    download: false,
  },
  {
    title: "LeetCode",
    href: "https://leetcode.com/u/SABARISH_P",
    icon: Code2,
    download: false,
  },
  {
    title: "Resume",
    href: "/resume.pdf",
    icon: FileDown,
    download: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 pt-10 lg:pt-14">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/60">Contact</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
          Let&apos;s build something sharp.
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Open to internships, collaborations, and product discussions.
        </p>
      </div>

      {/* Icon cluster */}
      <div className="flex flex-wrap items-center gap-3">
        {contacts.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={contact.title}
              href={contact.href}
              target={
                contact.download
                  ? undefined
                  : contact.href.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
              {...(contact.download ? { download: "Sabarish_P_Resume.pdf" } : {})}
              aria-label={contact.title}
              title={contact.title}
              data-cursor="interactive"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ scale: 1.13, y: -2 }}
              whileTap={{ scale: 0.93 }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-neutral-400 transition-colors duration-200 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-200"
            >
              <Icon className="h-[18px] w-[18px]" />
            </motion.a>
          );
        })}
      </div>

      {/* Footnote */}
      <p className="mt-6 text-xs text-neutral-600">
        Response within 24 hrs · +91 8148246432
      </p>
    </section>
  );
}