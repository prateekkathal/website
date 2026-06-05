"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Nav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className="flex items-center gap-3 text-xs sm:gap-4 sm:text-sm">
        {site.nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                <span className={active ? "text-prompt" : "text-border"}>
                  {active ? "›" : " "}
                </span>{" "}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
