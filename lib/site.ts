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
    "Coding agents — Claude Code, Codex, Cursor, Copilot — are part of my daily loop, on top of a decade of full-stack engineering.",
    "Senior Technical Lead at Crowdlinker, based in Toronto.",
  ],

  focus: ["ai-products", "full-stack", "fast-delivery"],

  // Headline tools (surfaced by `skills` with no args). Grouped lists live in
  // `skillGroups` below — reached via `skills --backend`, `skills --devops`, etc.
  skillsTop: ["NestJS", "TypeScript", "Astro", "Vite", "PostgreSQL + pgVector"],

  experience: [
    { role: "Senior Technical Lead", org: "Crowdlinker", period: "2018 — now", place: "Toronto, ON" },
    { role: "Software Developer", org: "SquareBoat Solutions", period: "2014 — 2017", place: "India" },
  ],

  education: [
    { title: "Web Design & Development", org: "Lambton College", period: "2017 — 2019", place: "Canada" },
    { title: "B.Tech, Computer Science", org: "MD University", period: "2012 — 2016", place: "India" },
  ],

  now: "shipping AI-first features, exploring agentic workflows, and tinkering with this terminal.",

  interests: ["animals", "games", "anime", "music", "good food"],

  socials: [
    { label: "GitHub", href: "https://github.com/prateekkathal", handle: "prateekkathal" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/prateekkathal/", handle: "prateekkathal" },
    { label: "X", href: "https://x.com/prateekkathal", handle: "@prateekkathal" },
  ],

  nav: [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "contact", href: "/contact" },
  ],
} as const;

export type Social = (typeof site.socials)[number];

// AI-first day-to-day: coding agents + the AI/ML stack I build on.
export const aiAgents = ["Claude Code", "Codex", "Cursor", "Copilot", "Conductor"];
export const aiStack = [
  "LlamaIndex",
  "pgVector",
  "AWS S3 Vectors",
  "Speechmatics",
  "Deepgram",
  "AWS Textract",
  "AWS Rekognition",
  "GCP Document AI",
  "GCP Vision",
  "Azure Document Intelligence",
];

export type SkillGroup = { flag: string; label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    flag: "frontend",
    label: "frontend",
    items: ["React", "Next.js", "Astro", "Vite", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    flag: "backend",
    label: "backend",
    items: ["NestJS", "Node.js", "Bun", "Python", "PayloadCMS", "LlamaIndex", "PostgreSQL", "pgVector", "MongoDB Atlas"],
  },
  {
    flag: "devops",
    label: "devops · cloud",
    items: [
      "Terraform",
      "Docker",
      "Kubernetes",
      "Sentry",
      "AWS (ECS, EKS, EC2, ELB, Lambda, S3, SES, SNS, OpenSearch, S3 Vectors, ACM)",
      "Azure (Container Apps, Static Web Apps, Functions, Service Bus, Log Analytics)",
      "GCP (GCS, Compute)",
      "DigitalOcean (Droplets, DBs)",
      "Vultr (Compute, DBs)",
    ],
  },
  {
    flag: "ai",
    label: "ai · ml",
    items: [...aiAgents, ...aiStack],
  },
  {
    flag: "integrations",
    label: "integrations",
    items: [
      "Twilio (SMS/MMS/Voice)",
      "MCP (GitHub, Notion, Figma, Linear, Google)",
      "Autodesk + 3DVista",
      "Polar.sh",
      "Clerk",
      "Better Auth",
      "Auth0",
      "Google Maps + Places",
    ],
  },
  {
    flag: "tools",
    label: "tools",
    items: ["Notion", "Linear", "Discourse"],
  },
  {
    flag: "compliance",
    label: "compliance",
    items: ["HIPAA", "SOC 2 Type II", "PHIPA"],
  },
];
