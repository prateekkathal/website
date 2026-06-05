import Link from "next/link";
import { site } from "@/lib/site";
import { Avatar } from "@/components/avatar";
import { Typewriter, type TermLine } from "@/components/typewriter";
import { FadeIn } from "@/components/motion/fade-in";

const lines: TermLine[] = [
  { kind: "command", text: "whoami" },
  {
    kind: "output",
    text: `${site.name.toLowerCase()} · ${site.role}`,
    tone: "bright",
  },
  { kind: "command", text: "cat now.txt" },
  { kind: "output", text: site.tagline, tone: "accent" },
];

export default function Home() {
  return (
    <section>
      <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-8">
        <Avatar className="shrink-0" />
        <Typewriter lines={lines} className="flex-1" />
      </div>

      <FadeIn delay={1.6} className="mt-10">
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <Link
            href="/about"
            className="group transition-colors hover:text-accent"
          >
            <span className="text-prompt">$</span> cd about
            <span className="text-border transition-colors group-hover:text-accent">
              /
            </span>
          </Link>
          <Link
            href="/contact"
            className="group transition-colors hover:text-accent"
          >
            <span className="text-prompt">$</span> ./contact.sh
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
