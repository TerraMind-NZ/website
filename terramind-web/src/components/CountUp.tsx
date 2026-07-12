"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates every numeric run inside `value` from 0 when scrolled into view,
 * preserving surrounding text, decimal places and thousands separators.
 * e.g. "15–18%" counts both numbers; "r = 0.87" counts the 0.87.
 *
 * The server-rendered markup always contains the final value so crawlers,
 * link previews and no-JS clients never see zeroes; the count-up is a
 * client-only progressive enhancement (progress === null means "show final").
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          // Back to null at the end so the original string renders verbatim.
          setProgress(t < 1 ? ease(t) : null);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const rendered =
    progress === null
      ? value
      : value.replace(/[\d,]*\.?\d+/g, (run) => {
          const target = parseFloat(run.replace(/,/g, ""));
          if (Number.isNaN(target)) return run;
          const decimals = run.includes(".") ? run.split(".")[1].length : 0;
          const current = (target * progress).toFixed(decimals);
          return run.includes(",")
            ? Number(current).toLocaleString("en-NZ", {
                minimumFractionDigits: decimals,
              })
            : current;
        });

  return (
    <span ref={ref} className="tabular-nums">
      {rendered}
    </span>
  );
}
