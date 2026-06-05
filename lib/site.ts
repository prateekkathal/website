// Single source of truth for site content + links.
// Edit copy here — components and pages read from this.

export const site = {
  name: "Prateek Kathal",
  handle: "prateekkathal",
  role: "AI-first developer",
  tagline: "building intelligent products — fast.",
  // Where the contact form delivers. Public links are in `socials` below.
  email: "contact@prateekkathal.com",
  location: "Toronto",
  company: "Crowdlinker",
  url: "https://prateekkathal.com",

  // Short bio shown on /about — deliberately minimal.
  about: [
    "AI-first developer. I design and ship software with AI at the core — from prototype to production.",
    "Based in Toronto, building at Crowdlinker.",
  ],
  focus: ["ai-products", "full-stack", "fast-delivery"],

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
