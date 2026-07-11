"use client";

import {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export interface AskCapability {
  name: string;
  desc: string;
}

interface Wire {
  d: string;
  len: number;
}

export default function AskHub({ items }: { items: AskCapability[] }) {
  const left = items.slice(0, 3);
  const right = items.slice(3);

  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const hub = hubRef.current;
    if (!container || !hub) return;
    const c = container.getBoundingClientRect();
    const h = hub.getBoundingClientRect();
    const next: Wire[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const isLeft = i < left.length;
      // Only draw when the layout is actually horizontal
      if (isLeft ? r.right > h.left : r.left < h.right) return;

      const x1 = (isLeft ? r.right : r.left) - c.left;
      const y1 = r.top + r.height / 2 - c.top;
      const x2 = (isLeft ? h.left : h.right) - c.left;
      const y2 = h.top + h.height / 2 - c.top;
      const mx = (x2 - x1) / 2;
      const d = isLeft
        ? `M ${x1} ${y1} C ${x1 + mx} ${y1}, ${x2 - mx} ${y2}, ${x2} ${y2}`
        : `M ${x2} ${y2} C ${x2 - mx} ${y2}, ${x1 + mx} ${y1}, ${x1} ${y1}`;
      next.push({ d, len: Math.hypot(x2 - x1, y2 - y1) });
    });
    setWires(next);
  }, [left.length]);

  useEffect(() => {
    measure();
    // Re-measure once the stagger entrance animation has settled
    const t = setTimeout(measure, 1500);
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [measure]);

  const card = (f: AskCapability, i: number, d: number) => (
    <div
      key={f.name}
      ref={(el) => {
        cardRefs.current[i] = el;
      }}
      style={{ "--d": d } as CSSProperties}
      className="card-lift group relative rounded-xl border border-line bg-white/70 p-5 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-leaf">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-5 bg-leaf/30 transition-all duration-300 group-hover:w-9 group-hover:bg-leaf/60" />
      </div>
      <div className="mb-1.5 text-[15px] font-semibold tracking-tight text-ink">
        {f.name}
      </div>
      <p className="text-[13px] leading-relaxed text-ink-mute">{f.desc}</p>
    </div>
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Wires — drawn between measured card edges, desktop only */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        {wires.map((w, i) => (
          <g key={`${w.d}-${i}`}>
            <path
              d={w.d}
              fill="none"
              stroke="var(--leaf)"
              strokeOpacity="0.35"
              strokeWidth="1.25"
              className="flow-line"
              style={{ animationDuration: "1.6s" }}
            />
            {!reducedMotion && (
              <circle r="3" fill="var(--accent-strong)" opacity="0.85">
                <animateMotion
                  dur={`${Math.max(2.2, w.len / 90)}s`}
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                  path={w.d}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      <div className="stagger grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_minmax(300px,340px)_1fr] lg:gap-x-14">
        {/* Hub — first on mobile, centre on desktop */}
        <div
          style={{ "--d": 0 } as CSSProperties}
          className="order-first lg:order-none lg:col-start-2 lg:row-start-1"
        >
          <div
            ref={hubRef}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-chrome-deep p-7 text-center shadow-[0_40px_90px_-40px_rgba(10,15,12,0.65)]"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 100% 65% at 50% 0%, rgba(67,213,133,0.16) 0%, rgba(67,213,133,0) 65%)",
              }}
            />
            <div className="relative">
              <div className="mb-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
                Agent online
              </div>
              <div className="mb-5 font-serif text-[28px] font-semibold leading-tight tracking-tight text-white">
                Ask TerraMind
              </div>
              <div className="mb-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left font-mono text-[11.5px] leading-relaxed text-white/75">
                <span className="text-accent">→ </span>
                Will frost hit Block 7 tonight — is the wind machine worth
                running?
                <span className="caret text-accent"> ▍</span>
              </div>
              <div className="mb-3 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                Grounded in
              </div>
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {["Your blocks", "Your history", "Your numbers"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[12px] font-medium text-white/85"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="border-t border-white/10 pt-4 text-[12px] leading-relaxed text-white/60">
                Drafts, answers and proposes — never acts without you.
              </p>
            </div>
          </div>
        </div>

        {/* Capabilities feeding in */}
        <div className="flex flex-col justify-center gap-4 lg:col-start-1 lg:row-start-1">
          {left.map((f, i) => card(f, i, i + 1))}
        </div>

        {/* Capabilities reaching out */}
        <div className="flex flex-col justify-center gap-4 lg:col-start-3 lg:row-start-1">
          {right.map((f, i) => card(f, left.length + i, left.length + i + 1))}
        </div>
      </div>
    </div>
  );
}
