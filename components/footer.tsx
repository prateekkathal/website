import { site } from "@/lib/site";

// Status-bar style footer beneath the window.
export function Footer() {
  return (
    <footer className="mt-5 flex flex-col items-center justify-between gap-3 px-1 text-xs text-muted sm:flex-row">
      <span>
        <span className="text-prompt">$</span> © {new Date().getFullYear()}{" "}
        {site.name}
      </span>
      <ul className="flex items-center gap-4">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
