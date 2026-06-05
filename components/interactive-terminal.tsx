"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { BrandIcon } from "@/components/icons";
import { Typewriter, type TermLine } from "@/components/typewriter";
import {
  runCommand,
  visibleCommandNames,
  type OutLine,
  type Tone,
} from "@/lib/commands";

const toneClass: Record<Tone, string> = {
  default: "text-foreground",
  accent: "text-accent",
  muted: "text-muted",
  bright: "text-bright",
  prompt: "text-prompt",
  error: "text-[#ff7a7a]",
};

const introLines: TermLine[] = [
  { kind: "command", text: "whoami" },
  {
    kind: "output",
    text: `${site.name.toLowerCase()} · ${site.role}`,
    tone: "bright",
  },
  { kind: "command", text: "cat now.txt" },
  { kind: "output", text: site.tagline, tone: "accent" },
];

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-prompt">guest@pk</span>
      <span className="text-muted">:</span>
      <span className="text-accent">~</span>
      <span className="text-muted">$</span>
    </span>
  );
}

function LinkText({
  line,
  className,
}: {
  line: OutLine;
  className: string;
}) {
  const text = line.text || " ";
  return line.external ? (
    <a
      href={line.href}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {text}
    </a>
  ) : (
    <Link href={line.href ?? "#"} className={className}>
      {text}
    </Link>
  );
}

function OutputLine({ line }: { line: OutLine }) {
  const cls = toneClass[line.tone ?? "default"];

  // Social row: [icon] name (plain) + url (the only highlighted/clickable part)
  if (line.icon || line.label) {
    return (
      <span className="flex items-center gap-2.5">
        {line.icon && (
          <BrandIcon
            name={line.icon}
            className="h-3.5 w-3.5 shrink-0 text-muted"
          />
        )}
        {line.label && (
          <span className="w-20 shrink-0 whitespace-nowrap text-muted">
            {line.label}
          </span>
        )}
        {line.href ? (
          <LinkText
            line={line}
            className={`${cls} break-all underline-offset-2 hover:underline`}
          />
        ) : (
          <span className={cls}>{line.text}</span>
        )}
      </span>
    );
  }

  if (line.href) {
    return (
      <LinkText
        line={line}
        className={`${cls} underline-offset-2 hover:underline`}
      />
    );
  }
  return <span className={`${cls} whitespace-pre-wrap`}>{line.text || " "}</span>;
}

type Entry = { input: string; output: OutLine[] };

export function InteractiveTerminal({ className = "" }: { className?: string }) {
  const [booted, setBooted] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [cmd, setCmd] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyPos, setHistoryPos] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the newest output + the prompt comfortably in view (scroll to the
  // end of the page so the cursor never sits flush against a cut-off edge).
  useEffect(() => {
    if (!booted) return;
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [entries, booted]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  function run(raw: string) {
    const trimmed = raw.trim();
    setCmd("");
    setHistoryPos(-1);
    if (!trimmed) return;
    setHistory((h) => [...h, trimmed]);
    if (trimmed.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }
    setEntries((e) => [...e, { input: trimmed, output: runCommand(trimmed) }]);
  }

  function recallHistory(direction: -1 | 1) {
    if (history.length === 0) return;
    let pos = historyPos === -1 ? history.length : historyPos;
    pos += direction;
    if (pos >= history.length) {
      setHistoryPos(-1);
      setCmd("");
      return;
    }
    if (pos < 0) pos = 0;
    setHistoryPos(pos);
    setCmd(history[pos]);
  }

  function complete() {
    const prefix = cmd.trim().toLowerCase();
    if (!prefix) return;
    const matches = visibleCommandNames().filter((n) => n.startsWith(prefix));
    if (matches.length === 1) setCmd(matches[0]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      recallHistory(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      recallHistory(1);
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    }
  }

  return (
    <div
      className={`min-w-0 ${className}`}
      onClick={() => booted && inputRef.current?.focus()}
    >
      <Typewriter
        lines={introLines}
        showReadyPrompt={false}
        onDone={() => setBooted(true)}
      />

      {booted && (
        <p className="mt-3 text-xs text-muted">
          type a command to explore — try{" "}
          <span className="text-accent">help</span>,{" "}
          <span className="text-accent">about</span>, or{" "}
          <span className="text-accent">contact</span>.
        </p>
      )}

      {entries.length > 0 && (
        <div className="mt-3 space-y-2">
          {entries.map((entry, i) => (
            <div key={i}>
              <div className="flex gap-2">
                <Prompt />
                <span className="min-w-0 break-all text-bright">
                  {entry.input}
                </span>
              </div>
              {entry.output.length > 0 && (
                <div className="mt-0.5 space-y-0.5">
                  {entry.output.map((line, j) => (
                    <div key={j} className="break-words">
                      <OutputLine line={line} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {booted && (
        <form
          className="mt-2 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(cmd);
          }}
        >
          <Prompt />
          <input
            ref={inputRef}
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="terminal command input"
            className="min-w-0 flex-1 bg-transparent text-bright caret-accent outline-none"
          />
        </form>
      )}
    </div>
  );
}
