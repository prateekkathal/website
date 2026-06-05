import Image from "next/image";
import { site } from "@/lib/site";

// Small rounded avatar with a soft accent glow. Source is 512px; capped at 128px display.
export function Avatar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-28 w-28 sm:h-32 sm:w-32 ${className}`}>
      <div
        className="absolute -inset-1.5 rounded-full bg-accent/25 blur-md"
        aria-hidden="true"
      />
      <Image
        src="/avatar.jpg"
        alt={site.name}
        width={256}
        height={256}
        sizes="160px"
        priority
        className="relative h-full w-full rounded-full object-cover ring-1 ring-accent/40"
      />
    </div>
  );
}
