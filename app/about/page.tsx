import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Typewriter, type TermLine } from "@/components/typewriter";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "about",
  description: site.about.join(" "),
};

const lines: TermLine[] = [
  { kind: "command", text: "cat about.md" },
  { kind: "output", text: `# ${site.name}`, tone: "bright" },
  ...site.about.map(
    (line): TermLine => ({ kind: "output", text: line }),
  ),
  { kind: "command", text: "ls focus/" },
  { kind: "output", text: site.focus.join("   "), tone: "accent" },
];

export default function About() {
  return (
    <section className="space-y-9">
      <Typewriter lines={lines} />

      <FadeIn delay={2.2}>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <Link
            href="/contact"
            className="transition-colors hover:text-accent"
          >
            <span className="text-prompt">$</span> ./contact.sh
          </Link>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-accent"
            >
              <span className="text-prompt">$</span> open {s.label.toLowerCase()}
            </a>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
