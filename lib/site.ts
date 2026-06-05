// Single source of truth for site content + links.
// Edit copy here — components, pages, and the interactive terminal read from this.

export const site = {
  name: "Prateek Kathal",
  handle: "prateekkathal",
  role: "AI-first developer",
  tagline: "building intelligent products — fast.",
  // Where the contact form delivers. Public links are in `socials` below.
  email: "contact@prateekkathal.com",
  location: "Toronto, ON",
  company: "Crowdlinker",
  url: "https://prateekkathal.com",

  // Short bio shown on /about and via the `about` command — deliberately tight.
  about: [
    "AI-first developer. I design and ship software with AI at the core — from prototype to production.",
    "I've been building for the web since I was 13; today that means pairing strong product instincts with LLMs, agents, and a lot of TypeScript.",
    "Based in Toronto, building at Crowdlinker.",
  ],

  focus: ["ai-products", "full-stack", "fast-delivery"],

  // Tools I reach for (surfaced by the `skills` command).
  skills: [
    "typescript",
    "react",
    "next.js",
    "node",
    "python",
    "postgres",
    "aws",
    "docker",
    "llms & agents",
  ],

  experience: [
    {
      role: "full-stack / AI developer",
      org: "Crowdlinker",
      period: "2018 — now",
      place: "Toronto, ON",
    },
  ],

  now: "shipping AI-first features, exploring agentic workflows, and tinkering with this terminal.",

  interests: ["animals", "games", "anime", "music", "good food"],

  socials: [
    { label: "GitHub", href: "https://github.com/prateekkathal", handle: "prateekkathal" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/prateekkathal/", handle: "prateekkathal" },
    { label: "X", href: "https://twitter.com/prateekkathal", handle: "@prateekkathal" },
  ],

  nav: [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "contact", href: "/contact" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
