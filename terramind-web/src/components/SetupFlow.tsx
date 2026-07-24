"use client";

import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useReveal } from "@/hooks/useReveal";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const STEPS = [
  {
    title: "Highlight your blocks",
    desc: "Trace them on the map — or let TerraMind auto-detect them from your address.",
    ms: 3200,
  },
  {
    title: "Label your crops",
    desc: "Crop and variety per block, so predictions calibrate to your orchard from day one.",
    ms: 3200,
  },
  {
    title: "Set your costs",
    desc: "Enter your cost assumptions — or connect Xero read-only and use your real numbers.",
    ms: 3200,
  },
  {
    title: "We pull the data",
    desc: "Weather ensembles, soil maps, satellite imagery — the engine takes it from there and gets to predicting.",
    ms: 5400,
  },
];

/**
 * Compressed onboarding story for the platform section: a step rail that
 * auto-advances while the orchard panel builds up layer by layer — blocks
 * trace in, crop labels land, costs sync, data flows, predictions start.
 */
export default function SetupFlow() {
  const ref = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [userDriven, setUserDriven] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
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
    const id = setTimeout(
      () => setActive((a) => (a + 1) % STEPS.length),
      STEPS[active].ms
    );
    return () => clearTimeout(id);
  }, [auto, active]);

  // Keep the active step in view on the horizontal rail, without ever
  // scrolling the page itself.
  useEffect(() => {
    const rail = railRef.current;
    const step = stepRefs.current[active];
    if (!rail || !step) return;
    rail.scrollTo({
      left: step.offsetLeft - (rail.clientWidth - step.clientWidth) / 2,
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

  // Layers are cumulative: everything up to the active step stays on screen.
  const on = (layer: number) => reducedMotion || active >= layer;
  const cls = (layer: number, base: string) =>
    `${base}${on(layer) ? " on" : ""}`;

  return (
    <div ref={ref} className="reveal">
      <div className="eyebrow mb-10">Getting started</div>
      <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
        <h3 className="max-w-xl font-serif text-[clamp(26px,3vw,40px)] font-semibold leading-[1.12] tracking-tight text-ink">
          Highlight your blocks.{" "}
          <em className="italic text-leaf">We do the rest.</em>
        </h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-mute">
          Setup is deliberately light. Upon completion, TerraMind quickly gathers the
          data and the engine gets to predicting on your blocks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr] lg:gap-10">
        {/* Step rail — horizontal scroll on mobile, column on desktop */}
        <div
          ref={railRef}
          className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-2 [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 lg:[mask-image:none]"
          role="tablist"
          aria-label="Onboarding steps"
        >
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={i === active}
              onClick={() => select(i)}
              className={`relative w-[240px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-lg border px-4 py-3.5 text-left transition-all duration-300 lg:w-auto lg:shrink ${
                i === active
                  ? "border-leaf/35 bg-white/70 shadow-[0_8px_24px_-14px_rgba(10,15,12,0.25)]"
                  : "border-transparent hover:border-line hover:bg-white/40"
              }`}
            >
              {auto && i === active && (
                <span
                  key={`bar-${active}`}
                  aria-hidden
                  className="fillbar absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-leaf to-accent"
                  style={{ animationDuration: `${s.ms}ms` } as CSSProperties}
                />
              )}
              <span className="flex items-baseline gap-3">
                <span
                  className={`font-mono text-[11px] tabular-nums transition-colors ${
                    i <= active ? "text-leaf" : "text-ink-mute/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span
                    className={`block text-[15px] font-semibold tracking-tight transition-colors ${
                      i === active ? "text-ink" : "text-ink-mute"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-ink-mute">
                    {s.desc}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Orchard panel — layers accumulate as the steps advance */}
        <div className="relative overflow-hidden rounded-xl border border-line bg-white/60">
          <svg
            viewBox="0 0 560 380"
            className="block h-auto w-full"
            role="img"
            aria-label="Animated orchard map: blocks are highlighted, crops labelled, costs synced, then data flows in and predictions begin"
          >
            <defs>
              <pattern id="sf-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M28 0H0V28" fill="none" stroke="var(--line)" strokeOpacity="0.5" />
              </pattern>
            </defs>
            <rect width="560" height="380" fill="url(#sf-grid)" />

            {/* Step 1 — block polygons trace themselves in */}
            <path
              pathLength={1}
              strokeDasharray={1}
              style={{ "--sd": 0 } as CSSProperties}
              className={cls(0, "sf-poly")}
              d="M64 96 L226 74 L254 188 L92 212 Z"
              fill="rgba(15,122,65,0.08)"
              stroke="var(--leaf)"
              strokeWidth="1.5"
            />
            <path
              pathLength={1}
              strokeDasharray={1}
              style={{ "--sd": 1 } as CSSProperties}
              className={cls(0, "sf-poly")}
              d="M292 118 L446 98 L474 226 L322 248 Z"
              fill="rgba(15,122,65,0.08)"
              stroke="var(--leaf)"
              strokeWidth="1.5"
            />
            <path
              pathLength={1}
              strokeDasharray={1}
              style={{ "--sd": 2 } as CSSProperties}
              className={cls(0, "sf-poly")}
              d="M110 244 L248 228 L268 322 L128 338 Z"
              fill="rgba(15,122,65,0.08)"
              stroke="var(--leaf)"
              strokeWidth="1.5"
            />

            {/* Step 2 — crop labels land on the blocks */}
            <g style={{ "--sd": 0 } as CSSProperties} className={cls(1, "sf-layer")}>
              <rect x="98" y="128" width="130" height="22" rx="5" fill="rgba(255,255,255,0.9)" stroke="var(--line)" />
              <text x="163" y="142.5" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1.2" fill="var(--leaf)">
                KIWIFRUIT · HAYWARD
              </text>
            </g>
            <g style={{ "--sd": 1 } as CSSProperties} className={cls(1, "sf-layer")}>
              <rect x="330" y="158" width="100" height="22" rx="5" fill="rgba(255,255,255,0.9)" stroke="var(--line)" />
              <text x="380" y="172.5" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1.2" fill="var(--leaf)">
                APPLES · ENVY
              </text>
            </g>
            <g style={{ "--sd": 2 } as CSSProperties} className={cls(1, "sf-layer")}>
              <rect x="128" y="270" width="118" height="22" rx="5" fill="rgba(255,255,255,0.9)" stroke="var(--line)" />
              <text x="187" y="284.5" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1.2" fill="var(--leaf)">
                CHERRIES · LAPINS
              </text>
            </g>

            {/* Step 3 — cost assumptions land / Xero syncs */}
            <g style={{ "--sd": 0 } as CSSProperties} className={cls(2, "sf-layer")}>
              <rect x="312" y="262" width="212" height="52" rx="8" fill="rgba(255,255,255,0.92)" stroke="var(--line)" />
              <circle cx="334" cy="288" r="8" fill="none" stroke="var(--leaf)" strokeWidth="1.3" />
              <text x="334" y="291.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--leaf)">$</text>
              <text x="352" y="283" className="font-mono" fontSize="9" letterSpacing="1.2" fill="var(--ink)">
                COST ASSUMPTIONS
              </text>
              <text x="352" y="300" className="font-mono" fontSize="9" letterSpacing="1.2" fill="var(--ink-mute)">
                XERO · SYNCED READ-ONLY
              </text>
            </g>

            {/* Step 4 — data streams in, the engine starts predicting */}
            <g className={cls(3, "sf-layer")}>
              <text x="96" y="26" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1.4" fill="var(--ink-mute)">WEATHER</text>
              <text x="280" y="26" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1.4" fill="var(--ink-mute)">SOIL</text>
              <text x="440" y="26" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1.4" fill="var(--ink-mute)">SATELLITE</text>
              <path className="flow-line" d="M96 34 C 100 80, 140 100, 158 138" fill="none" stroke="var(--accent-strong)" strokeOpacity="0.55" strokeWidth="1.3" />
              <path className="flow-line" d="M280 34 C 270 110, 220 200, 196 278" fill="none" stroke="var(--accent-strong)" strokeOpacity="0.55" strokeWidth="1.3" />
              <path className="flow-line" d="M440 34 C 436 70, 404 120, 384 168" fill="none" stroke="var(--accent-strong)" strokeOpacity="0.55" strokeWidth="1.3" />
              <circle className="pulse-dot" cx="158" cy="142" r="4" fill="var(--accent-strong)" />
              <circle className="pulse-dot" cx="384" cy="172" r="4" fill="var(--accent-strong)" style={{ animationDelay: "0.4s" }} />
              <circle className="pulse-dot" cx="196" cy="282" r="4" fill="var(--accent-strong)" style={{ animationDelay: "0.8s" }} />
            </g>
            <g style={{ "--sd": 3 } as CSSProperties} className={cls(3, "sf-layer")}>
              <rect x="432" y="48" width="104" height="24" rx="12" fill="var(--ink)" />
              <circle className="pulse-dot" cx="448" cy="60" r="3.5" fill="var(--accent)" />
              <text x="459" y="63.5" className="font-mono" fontSize="9" letterSpacing="1.4" fill="var(--accent)">
                PREDICTING
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
