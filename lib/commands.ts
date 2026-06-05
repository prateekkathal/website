import { site, skillGroups, aiAgents, aiStack } from "./site";

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
  icon?: string; // brand glyph key (github | linkedin | x)
  label?: string; // plain (un-highlighted) prefix shown before the link
};

type Command = {
  name: string;
  aliases?: string[];
  desc: string;
  run: (args: string[]) => OutLine[];
  hidden?: boolean;
};

const L = (text: string, tone?: Tone): OutLine => ({ text, tone });

const flagList = `${skillGroups.map((g) => `--${g.flag}`).join("  ")}  --all`;

const commands: Command[] = [
  {
    name: "help",
    desc: "list everything you can run",
    run: () => [
      L("available commands:", "muted"),
      ...visibleCommands().map((c) => L(`  ${c.name.padEnd(11)} ${c.desc}`)),
      L(""),
      L("some take flags — e.g. `skills --backend`, `skills --all`.", "muted"),
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
    desc: "tools i reach for — try `skills --backend`",
    run: (args) => {
      const flag = (args[0] ?? "").replace(/^--/, "").toLowerCase();

      if (!flag) {
        return [
          L(`top 5 — ${site.skillsTop.join("  ·  ")}`, "accent"),
          L(""),
          L(`filter: ${flagList}`, "muted"),
        ];
      }
      if (flag === "all") {
        return skillGroups.flatMap((g) => [
          L(`# ${g.label}`, "bright"),
          L(g.items.join("  ·  ")),
          L(""),
        ]);
      }
      const group = skillGroups.find((g) => g.flag === flag);
      if (!group) {
        return [
          { text: `unknown filter: --${flag}`, tone: "error" },
          L(`try: ${flagList}`, "muted"),
        ];
      }
      return [L(`# ${group.label}`, "bright"), L(group.items.join("  ·  "))];
    },
  },
  {
    name: "ai",
    desc: "the AI-first toolkit",
    run: () => [
      L("coding agents in my daily loop:", "muted"),
      L(aiAgents.join("  ·  "), "accent"),
      L(""),
      L("ai · ml stack:", "muted"),
      L(aiStack.join("  ·  ")),
    ],
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
    name: "education",
    aliases: ["edu"],
    desc: "the paper trail",
    run: () =>
      site.education.flatMap((e) => [
        L(`${e.title} — ${e.org}`, "bright"),
        L(`  ${e.period} · ${e.place}`, "muted"),
      ]),
  },
  {
    name: "focus",
    desc: "what i optimise for",
    run: () => site.focus.map((f) => L(`→ ${f}`, "accent")),
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
        icon: s.label.toLowerCase(),
        label: s.label.toLowerCase(),
        text: s.href.replace(/^https?:\/\/(www\.)?/, ""),
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
      L(
        "about.md  skills.txt  experience.log  education.log  now.txt  links/  contact.sh",
        "accent",
      ),
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
  const parts = trimmed.split(/\s+/);
  const name = parts[0].toLowerCase();
  const args = parts.slice(1);

  // `echo <args>` prints its arguments.
  if (name === "echo") return [L(args.join(" "))];

  const found = commands.find(
    (c) =>
      c.name === name ||
      c.name === lc ||
      c.aliases?.includes(name) ||
      c.aliases?.includes(lc),
  );

  if (!found) {
    return [{ text: `command not found: ${parts[0]} — type 'help'`, tone: "error" }];
  }
  return found.run(args);
}
