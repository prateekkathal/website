"use client";

import { useEffect, useRef } from "react";

// Characters for the rain — katakana + a little code punctuation.
const CHARS =
  "アカサタナハマヤラワ0123456789{}<>[]/=$#*+".split("");

// A deliberately faint matrix rain. Performance-guarded: DPR is pinned to 1,
// the draw loop is throttled, it pauses when the tab is hidden, and it is
// disabled entirely for users who prefer reduced motion.
export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      fontSize = width < 640 ? 18 : 16; // sparser on phones
      columns = Math.ceil(width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -50),
      );
      ctx.font = `${fontSize}px ui-monospace, monospace`;
    };
    resize();

    let raf = 0;
    let last = 0;
    const interval = 60; // ~16fps

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < interval) return;
      last = now;

      // Fade the previous frame to leave trailing tails.
      ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(0, 159, 249, 0.6)";
      for (let i = 0; i < columns; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
        }
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.16]"
    />
  );
}
