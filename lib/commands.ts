import { site } from "./site";

export type Tone =
  | "default"
  | "accent"
  | "muted"
  | "bright"
  | "prompt"
  | "error";

export type OutLine = {
  text: string;
  tone?: Tone;
  href?: string;
  external?: boolean;
};

type Command = {
  name: string;
  aliases?: string[];
  desc: string;
  run: () => OutLine[];
  hidden?: boolean;
};

const L = (text: string, tone?: Tone): OutLine => ({ text, tone });

const commands: Command[] = [
  {
    name: "help",
    desc: "list everything you can run",
    run: () => [
      L("available commands:", "muted"),
      ...visibleCommands().map((c) => L(`  ${c.name.padEnd(11)} ${c.desc}`)),
      L(""),
      L("tip: try `about`, `skills`, or `contact`.", "muted"),
    ],
  },
  {
    name: "whoami",
    desc: "the one-liner",
    run: () => [L(`${site.name.toLowerCase()} · ${site.role}`, "bright")],
  },
  {
    name: "about",
    aliases: ["cat about.md"],
    desc: "the short version",
    run: () => site.about.map((t) => L(t)),
  },
  {
    name: "skills",
    aliases: ["stack"],
    desc: "tools i reach for",
    run: () => [L(site.skills.join("  ·  "), "accent")],
  },
  {
    name: "focus",
    desc: "what i optimise for",
    run: () => site.focus.map((f) => L(`→ ${f}`, "accent")),
  },
  {
    name: "experience",
    aliases: ["work"],
    desc: "where i've been",
    run: () =>
      site.experience.flatMap((e) => [
        L(`${e.role} @ ${e.org}`, "bright"),
        L(`  ${e.period} · ${e.place}`, "muted"),
      ]),
  },
  {
    name: "now",
    desc: "what i'm up to",
    run: () => [L(site.now)],
  },
  {
    name: "links",
    aliases: ["socials"],
    desc: "find me online",
    run: () =>
      site.socials.map((s) => ({
        text: `${s.label.toLowerCase().padEnd(9)} ${s.href.replace(/^https?:\/\/(www\.)?/, "")}`,
        href: s.href,
        external: true,
        tone: "accent" as Tone,
      })),
  },
  {
    name: "contact",
    desc: "send me a message",
    run: () => [
      { text: "→ open the contact form", href: "/contact", tone: "accent" },
      L(`or email ${site.email}`, "muted"),
    ],
  },
  {
    name: "interests",
    aliases: ["fun"],
    desc: "off the clock",
    run: () => [L(site.interests.join("  ·  "))],
  },
  {
    name: "ls",
    desc: "list topics",
    run: () => [
      L("about.md   skills.txt   experience.log   now.txt   links/   contact.sh", "accent"),
    ],
  },
  {
    name: "clear",
    desc: "wipe the screen",
    run: () => [], // handled in the component
  },
  {
    name: "sudo",
    hidden: true,
    desc: "",
    run: () => [L("permission denied: nice try 😏", "error")],
  },
];

function visibleCommands(): Command[] {
  return commands.filter((c) => !c.hidden);
}

export function visibleCommandNames(): string[] {
  return visibleCommands().map((c) => c.name);
}

export function runCommand(input: string): OutLine[] {
  const trimmed = input.trim();
  const lc = trimmed.toLowerCase();
  const [first, ...rest] = trimmed.split(/\s+/);
  const name = first.toLowerCase();

  // `echo <args>` prints its arguments.
  if (name === "echo") return [L(rest.join(" "))];

  const found = commands.find(
    (c) =>
      c.name === name ||
      c.name === lc ||
      c.aliases?.includes(name) ||
      c.aliases?.includes(lc),
  );

  if (!found) {
    return [{ text: `command not found: ${first} — type 'help'`, tone: "error" }];
  }
  return found.run();
}
