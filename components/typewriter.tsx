"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export type TermLine =
  | { kind: "command"; text: string }
  | { kind: "output"; text: string; tone?: "accent" | "muted" | "bright" };

const toneClass: Record<string, string> = {
  accent: "text-accent",
  muted: "text-muted",
  bright: "text-bright",
  default: "text-foreground",
};

// Types a sequence of terminal lines: commands type character-by-character
// behind a green "$" prompt; output lines reveal after a short beat. A blinking
// block cursor trails the active line, then a final ready prompt. Reduced-motion
// users get the full text instantly.
export function Typewriter({
  lines,
  speed = 36,
  startDelay = 250,
  className = "",
  showReadyPrompt = true,
  onDone,
}: {
  lines: TermLine[];
  speed?: number;
  startDelay?: number;
  className?: string;
  showReadyPrompt?: boolean;
  onDone?: () => void;
}) {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const doneFiredRef = useRef(false);

  useEffect(() => {
    if (reduce || line >= lines.length) {
      // Fire once when the sequence finishes (or immediately under reduced motion).
      if (!doneFiredRef.current && lines.length > 0) {
        doneFiredRef.current = true;
        onDone?.();
      }
      return;
    }
    const current = lines[line];
    let timer: ReturnType<typeof setTimeout>;
    if (current.kind === "command") {
      if (chars < current.text.length) {
        timer = setTimeout(
          () => setChars((c) => c + 1),
          chars === 0 ? startDelay : speed,
        );
      } else {
        timer = setTimeout(() => {
          setLine((l) => l + 1);
          setChars(0);
        }, 320);
      }
    } else {
      timer = setTimeout(() => {
        setLine((l) => l + 1);
        setChars(0);
      }, 220);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line, chars, reduce]);

  const finished = reduce || line >= lines.length;

  const renderLine = (
    l: TermLine,
    text: string,
    key: number,
    cursor: boolean,
  ) => (
    <div key={key} className="whitespace-pre-wrap break-words">
      {l.kind === "command" ? (
        <>
          <span className="text-prompt">$</span>{" "}
          <span className="text-bright">{text}</span>
        </>
      ) : (
        <span className={toneClass[l.tone ?? "default"]}>{text}</span>
      )}
      {cursor && <span className="cursor-blink" aria-hidden="true" />}
    </div>
  );

  const rendered: React.ReactNode[] = [];
  if (finished) {
    lines.forEach((l, i) => rendered.push(renderLine(l, l.text, i, false)));
  } else {
    for (let i = 0; i < lines.length; i++) {
      if (i < line) {
        rendered.push(renderLine(lines[i], lines[i].text, i, false));
      } else if (i === line && lines[i].kind === "command") {
        rendered.push(
          renderLine(lines[i], lines[i].text.slice(0, chars), i, true),
        );
        break;
      } else {
        break;
      }
    }
  }

  const srText = lines
    .map((l) => (l.kind === "command" ? `$ ${l.text}` : l.text))
    .join("\n");

  return (
    <div className={className}>
      <span className="sr-only">{srText}</span>
      <div aria-hidden="true" className="space-y-1">
        {rendered}
        {finished && showReadyPrompt && (
          <div className="pt-1">
            <span className="text-prompt">$</span>
            <span className="cursor-blink" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
