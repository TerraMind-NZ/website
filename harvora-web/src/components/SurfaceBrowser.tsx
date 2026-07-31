"use client";

import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import CountUp from "@/components/CountUp";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export interface Surface {
  name: string;
  stat: string;
  statLabel: string;
  impact: string;
  accuracy: string;
}

const CYCLE_MS = 7000;

/**
 * Compact browser for the per-surface proof stats: a rail of surfaces on the
 * left, one detail panel on the right. Auto-advances on a fixed clock until
 * the visitor taps a surface directly.
 */
export default function SurfaceBrowser({ surfaces }: { surfaces: Surface[] }) {
  const [active, setActive] = useState(0);
  const [userDriven, setUserDriven] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
  const auto = !userDriven && !reducedMotion;

  // Advances on a fixed clock, independent of hover/touch — pausing on
  // interaction restarted the full duration on resume, which read as a
  // random multi-second freeze. A manual tap (below) is the only thing
  // that stops it.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % surfaces.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, [auto, surfaces.length]);

  // Keep the active surface in view on the horizontal rail, without ever
  // scrolling the page itself.
  useEffect(() => {
    const rail = railRef.current;
    const btn = railRefs.current[active];
    if (!rail || !btn) return;
    rail.scrollTo({
      left: btn.offsetLeft - (rail.clientWidth - btn.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  const select = (i: number) => {
    setActive(i);
    setUserDriven(true); // the visitor is driving now

    // Hand control back to auto-advance after 30s of no further taps.
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setUserDriven(false), 20000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const s = surfaces[active];

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr] lg:gap-8"
    >
      {/* Surface rail — horizontal scroll on mobile, column on desktop */}
      <div
        ref={railRef}
        className="-mx-6 flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-6 pb-2 [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 lg:[mask-image:none]"
        role="tablist"
        aria-label="Prediction surfaces"
      >
        {surfaces.map((f, i) => (
          <button
            key={f.name}
            ref={(el) => {
              railRefs.current[i] = el;
            }}
            role="tab"
            aria-selected={i === active}
            onClick={() => select(i)}
            className={`flex shrink-0 snap-start cursor-pointer items-baseline justify-between gap-4 rounded-lg border px-4 py-3 text-left transition-all duration-300 lg:shrink ${
              i === active
                ? "border-leaf/35 bg-white/70 shadow-[0_8px_24px_-14px_rgba(10,15,12,0.25)]"
                : "border-transparent hover:border-line hover:bg-white/40"
            }`}
          >
            <span
              className={`text-[14px] font-semibold tracking-tight transition-colors ${
                i === active ? "text-ink" : "text-ink-mute"
              }`}
            >
              {f.name}
            </span>
            <span
              className={`font-mono text-[12px] tabular-nums transition-colors ${
                i === active ? "text-leaf" : "text-ink-mute/70"
              }`}
            >
              {f.stat}
            </span>
          </button>
        ))}
      </div>

      {/* Detail panel — re-keyed so it rises in on every switch */}
      <div className="relative overflow-hidden rounded-xl border border-line bg-white/60">
        {auto && (
          <div
            key={`bar-${active}`}
            className="fillbar absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-leaf to-accent"
            style={{ animationDuration: `${CYCLE_MS}ms` } as CSSProperties}
          />
        )}
        <div key={active} className="swap-in p-7 md:p-9">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <div className="font-serif text-[26px] font-semibold tracking-tight text-ink">
              {s.name}
            </div>
            <div className="text-right">
              <div className="font-mono text-[38px] font-bold leading-none tracking-tight text-leaf tabular-nums">
                <CountUp value={s.stat} />
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                {s.statLabel}
              </div>
            </div>
          </div>
          <div className="mb-5 h-px bg-line" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                Why it matters
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">
                {s.impact}
              </p>
            </div>
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-leaf">
                Measured
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">
                {s.accuracy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
