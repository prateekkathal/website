import { site } from "@/lib/site";
import { BrandIcon } from "@/components/icons";
import { Year } from "@/components/year";

// Status-bar style footer beneath the window.
export function Footer() {
  return (
    <footer className="mt-5 flex flex-col items-center justify-between gap-3 px-1 text-xs text-muted sm:flex-row">
      <span>
        © <Year /> {site.name}
      </span>
      <ul className="flex items-center gap-5">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              className="block text-muted transition-colors hover:text-accent"
            >
              <BrandIcon name={s.label.toLowerCase()} className="h-4 w-4" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
