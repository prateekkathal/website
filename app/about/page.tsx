import type { Metadata } from "next";
import Link from "next/link";
import { site, aiAgents } from "@/lib/site";
import { Typewriter, type TermLine } from "@/components/typewriter";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "about",
  description: site.about.join(" "),
};

const lines: TermLine[] = [
  { kind: "command", text: "cat about.md" },
  { kind: "output", text: `# ${site.name}`, tone: "bright" },
  ...site.about.map((line): TermLine => ({ kind: "output", text: line })),

  { kind: "command", text: "skills" },
  { kind: "output", text: site.skillsTop.join("  ·  "), tone: "accent" },

  { kind: "command", text: "ai" },
  { kind: "output", text: aiAgents.join("  ·  "), tone: "accent" },

  { kind: "command", text: "cat experience.log" },
  ...site.experience.flatMap((e): TermLine[] => [
    { kind: "output", text: `${e.role} @ ${e.org}`, tone: "bright" },
    { kind: "output", text: `  ${e.period} · ${e.place}`, tone: "muted" },
  ]),

  { kind: "command", text: "cat education.log" },
  ...site.education.flatMap((e): TermLine[] => [
    { kind: "output", text: `${e.title} — ${e.org}`, tone: "bright" },
    { kind: "output", text: `  ${e.period} · ${e.place}`, tone: "muted" },
  ]),
];

export default function About() {
  return (
    <section className="space-y-9">
      <Typewriter lines={lines} />

      <FadeIn delay={3.4}>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-accent">
            <span className="text-prompt">$</span> run live commands
          </Link>
          <Link href="/contact" className="transition-colors hover:text-accent">
            <span className="text-prompt">$</span> ./contact.sh
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
