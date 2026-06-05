import { Nav } from "@/components/nav";

// The window chrome: a macOS-style title bar (traffic-light dots + path) with
// the nav living on the right, wrapping the routed page content.
export function TerminalWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface/70 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/80 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="hidden text-xs text-muted sm:inline">
          prateek@portfolio:~
        </span>
        <Nav className="ml-auto" />
      </div>
      <div className="min-h-[60vh] px-5 py-7 text-sm leading-relaxed sm:px-9 sm:py-11 sm:text-[0.95rem]">
        {children}
      </div>
    </div>
  );
}
