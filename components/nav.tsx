"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function Nav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={`flex items-center gap-4 sm:gap-5 ${className}`}>
      <Link
        href="/"
        aria-label={`${site.name} — home`}
        className="hidden shrink-0 opacity-90 transition-opacity hover:opacity-100 sm:block"
      >
        <Image src="/pk.png" alt="" width={22} height={22} priority />
      </Link>
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
                  active
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
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
