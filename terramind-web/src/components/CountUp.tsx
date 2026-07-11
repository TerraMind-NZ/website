"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates every numeric run inside `value` from 0 when scrolled into view,
 * preserving surrounding text, decimal places and thousands separators.
 * e.g. "15–18%" counts both numbers; "r = 0.87" counts the 0.87.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1);
          setProgress(ease(t));
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

  const rendered = value.replace(/[\d,]*\.?\d+/g, (run) => {
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
