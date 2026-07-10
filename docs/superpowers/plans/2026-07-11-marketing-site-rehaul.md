# Marketing Site Rehaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the TerraMind marketing site (`terramind-web/`) to the approved design spec: app-matched design system (chrome/paper/leaf palette, Fraunces/Manrope/Space Mono), new section lineup (Hero with vineyard canvas, Platform rows, Statement band, AI-layer section, Metrics band, Footer, Request-access modal).

**Architecture:** Clean rebuild (Approach A). New section components in `src/components/`, composed by a server `page.tsx`. Shared modal state via a small client `ModalProvider` context. Old marketing components deleted at the end. Hooks `useScrolled`/`useReveal` kept.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS v4 (`@theme` tokens), `next/font/google`.

**Spec:** `docs/superpowers/specs/2026-07-11-marketing-site-rehaul-design.md`

**Verification loop (no unit-test suite in this repo):** after each task run `npx tsc --noEmit` from `terramind-web/`, and visually check http://localhost:3002 (dev server already running, hot-reloads). Final task runs lint + full browser pass.

**Note:** The repo sits in iCloud-synced `~/Desktop`; if the dev server or tools hang on file access, `node_modules` may have been evicted — fix is `rm -rf node_modules && npm install`.

---

### Task 1: Design tokens, fonts, base CSS

**Files:**
- Modify: `terramind-web/src/app/globals.css` (full rewrite)
- Modify: `terramind-web/src/app/layout.tsx` (add Space Mono, new metadata)

- [ ] **Step 1: Rewrite `globals.css`** with app-matched tokens (from `~/terramind/web/app/globals.css`), grain overlay, reveal animation, and base styles:

```css
@import "tailwindcss";

/* ── Design tokens — matched to the TerraMind app ── */
@theme inline {
  --font-serif: var(--font-fraunces), 'Times New Roman', serif;
  --font-sans: var(--font-manrope), system-ui, sans-serif;
  --font-mono: var(--font-space-mono), "Menlo", monospace;

  --color-chrome: #1b2a22;
  --color-chrome-deep: #0a0f0c;
  --color-paper: #f3f6ee;
  --color-paper-2: #e4eadb;
  --color-paper-3: #d8e0cc;
  --color-leaf: #0f7a41;
  --color-leaf-deep: #0b5c32;
  --color-accent: #43d585;
  --color-accent-strong: #1f9d57;
  --color-ink: #0a0f0c;
  --color-ink-soft: #1b2a22;
  --color-ink-mute: #55625a;
  --color-mint: #eaf3ec;
  --color-sage: #86998e;
  --color-earth: #b67d2e;
  --color-amber: #ffc06b;
  --color-line: rgba(10, 15, 12, 0.12);
  --color-line-soft: rgba(10, 15, 12, 0.06);
}

:root {
  --chrome: #1b2a22;
  --chrome-deep: #0a0f0c;
  --paper: #f3f6ee;
  --paper-2: #e4eadb;
  --paper-3: #d8e0cc;
  --leaf: #0f7a41;
  --leaf-deep: #0b5c32;
  --accent: #43d585;
  --accent-strong: #1f9d57;
  --ink: #0a0f0c;
  --ink-soft: #1b2a22;
  --ink-mute: #55625a;
  --mint: #eaf3ec;
  --sage: #86998e;
  --line: rgba(10, 15, 12, 0.12);
  --line-soft: rgba(10, 15, 12, 0.06);
  --serif: var(--font-fraunces), 'Times New Roman', serif;
  --sans: var(--font-manrope), system-ui, sans-serif;
  --mono: var(--font-space-mono), "Menlo", monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 86px;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

a { color: inherit; text-decoration: none; }

/* ── Film grain overlay ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.3;
}

/* ── Scroll reveal (pairs with useReveal hook adding .in) ── */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
}

/* ── Shared section primitives ── */
.eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.eyebrow::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line);
}
```

- [ ] **Step 2: Update `layout.tsx`** — add Space Mono and new metadata (keep existing Fraunces/Manrope config):

```tsx
import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TerraMind — Decision-economics for horticulture",
  description:
    "TerraMind converts weather and agronomic predictions into block-level, dollar-denominated recommendations for New Zealand growers — calibrated probabilities, not dashboard noise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit` passes; http://localhost:3002 still renders (old components will look partially unstyled where they referenced removed vars like `--green`; acceptable, they're deleted in Task 8).

- [ ] **Step 4: Commit** — `git add -A && git commit -m "theme: adopt app design tokens, fonts, and base styles"`

---

### Task 2: ModalProvider context

**Files:**
- Create: `terramind-web/src/components/ModalProvider.tsx`

- [ ] **Step 1: Create the provider** (client component; shares open/close between Nav, Hero, Footer, Modal):

```tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalState>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        open,
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalState {
  return useContext(ModalContext);
}
```

- [ ] **Step 2: Verify + commit** — `npx tsc --noEmit`; `git add -A && git commit -m "feat: modal context provider"`

---

### Task 3: Nav

**Files:**
- Modify (full rewrite): `terramind-web/src/components/Nav.tsx`

- [ ] **Step 1: Rewrite Nav.tsx**:

```tsx
"use client";

import { useScrolled } from "@/hooks/useScrolled";
import { useModal } from "./ModalProvider";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#intelligence", label: "Intelligence" },
  { href: "#calibration", label: "Calibration" },
];

export default function Nav() {
  const scrolled = useScrolled(40);
  const { openModal } = useModal();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-10 md:py-7 ${
        scrolled
          ? "border-b border-line-soft bg-paper/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[17px] font-bold tracking-tight text-ink">
          TerraMind
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
          Central Otago · NZ
        </span>
      </div>

      <ul className="hidden items-center gap-8 md:flex">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[13px] text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={openModal}
        className="group flex cursor-pointer items-center overflow-hidden rounded-full border border-line text-[13px] transition-colors hover:border-ink/30"
      >
        <span className="whitespace-nowrap py-2 pl-5 pr-4 text-ink">
          Request access
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-full bg-leaf text-sm text-white transition-colors group-hover:bg-leaf-deep">
          ↗
        </span>
      </button>
    </nav>
  );
}
```

- [ ] **Step 2: Verify + commit** — `npx tsc --noEmit` (page.tsx still imports old Nav signature — Nav previously took no props, confirm no prop errors); `git add -A && git commit -m "feat: rebuild nav for light palette with request-access pill"`

---

### Task 4: Hero + HeroCanvas

**Files:**
- Create: `terramind-web/src/components/HeroCanvas.tsx`
- Modify (full rewrite): `terramind-web/src/components/Hero.tsx`

- [ ] **Step 1: Create HeroCanvas.tsx** — vineyard perspective animation ported from the reference HTML, palette remapped to app tokens, RAF cleanup + reduced-motion support:

```tsx
"use client";

import { useEffect, useRef } from "react";

const C = {
  sky0: "#dfe9dd",
  sky1: "#ebf1e8",
  sky2: "#f3f6ee",
  ground: "#c9d8c4",
  vine1: "#2a5c40",
  vine2: "#1f6b42",
  vine3: "#1b2a22",
  leaf1: "#2e7a4f",
  leaf2: "#1f6b42",
  leaf3: "#1b2a22",
  mist: "rgba(223, 233, 221,",
  glint: "rgba(31, 157, 87,",
};

const VP = { xr: 0.5, yr: 0.38 };

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let t = 0;
    let raf = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const GLINTS = Array.from({ length: 120 }, (_, i) => {
      const r = Math.sin(i * 9301 + 49297) * 0.5 + 0.5;
      const s = Math.sin(i * 6571 + 3141) * 0.5 + 0.5;
      const q = Math.sin(i * 2357 + 1777) * 0.5 + 0.5;
      return { x: r, y: s * 0.55, r: 0.4 + q, phase: q * Math.PI * 2 };
    });

    const MIST = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: 0.55 + Math.random() * 0.45,
      r: 40 + Math.random() * 120,
      speed: 0.00004 + Math.random() * 0.00008,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.015 + Math.random() * 0.04,
    }));

    const rowY = (row: number, rows: number) => {
      const f = row / (rows - 1);
      return VP.yr + f * f * (1 - VP.yr);
    };

    const drawVineRow = (
      ry: number,
      alpha: number,
      color: string,
      leafColor: string,
      leafSize: number,
      scroll: number
    ) => {
      const vpx = VP.xr * W;
      const ly = ry * H;
      const hw = Math.max(0.001, ry - VP.yr) * 0.8 * W;
      const lx0 = vpx - hw;
      const lx1 = vpx + hw;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.5, (ry - VP.yr) * 3);
      ctx.beginPath();
      ctx.moveTo(lx0, ly);
      ctx.lineTo(lx1, ly);
      ctx.stroke();

      for (let p = 0; p <= 9; p++) {
        const fx = lx0 + (lx1 - lx0) * (p / 9);
        const postH = leafSize * 2.5;
        ctx.lineWidth = Math.max(0.5, (ry - VP.yr) * 2);
        ctx.beginPath();
        ctx.moveTo(fx, ly - postH * 0.3);
        ctx.lineTo(fx, ly + postH * 0.7);
        ctx.stroke();
      }

      for (let b = 0; b < 18; b++) {
        const sway = Math.sin(b * 0.71 + scroll * 0.4) * leafSize * 0.15;
        const bx = lx0 + (lx1 - lx0) * ((b + 0.5) / 18) + sway;
        const by = ly - leafSize * (0.5 + Math.sin(b * 1.3) * 0.2);
        const br = leafSize * (0.55 + Math.sin(b * 2.1 + 1) * 0.15);
        ctx.fillStyle = leafColor;
        ctx.beginPath();
        ctx.ellipse(bx, by, br * 1.4, br * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(31, 157, 87, 0.18)";
        ctx.beginPath();
        ctx.ellipse(bx - br * 0.2, by - br * 0.3, br * 0.5, br * 0.3, -0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
      sky.addColorStop(0, C.sky2);
      sky.addColorStop(0.5, C.sky1);
      sky.addColorStop(1, C.sky0);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H * 0.65);

      const gnd = ctx.createLinearGradient(0, H * 0.55, 0, H);
      gnd.addColorStop(0, C.sky0);
      gnd.addColorStop(1, C.ground);
      ctx.fillStyle = gnd;
      ctx.fillRect(0, H * 0.55, W, H * 0.45);

      GLINTS.forEach((s) => {
        const twinkle = 0.2 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.8 + s.phase));
        ctx.fillStyle = C.glint + twinkle * 0.5 + ")";
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H * 0.5, s.r * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      const ROWS = 10;
      for (let row = 0; row < ROWS; row++) {
        const ry = rowY(row, ROWS);
        const depth = row / (ROWS - 1);
        const scroll = t * 0.12 * (0.2 + depth * 0.8);
        const alpha = 0.45 + depth * 0.55;
        const lsize = 4 + depth * 18;
        const color = depth < 0.33 ? C.vine1 : depth < 0.66 ? C.vine2 : C.vine3;
        const leaf = depth < 0.33 ? C.leaf1 : depth < 0.66 ? C.leaf2 : C.leaf3;
        drawVineRow(ry, alpha, color, leaf, lsize, scroll);
      }

      MIST.forEach((m) => {
        m.x += m.speed;
        if (m.x > 1.3) m.x = -0.3;
        const mx = m.x * W + Math.sin(t * 0.3 + m.phase) * 30;
        const my = m.y * H + Math.sin(t * 0.5 + m.phase) * 8;
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, m.r);
        g.addColorStop(0, C.mist + m.alpha + ")");
        g.addColorStop(1, C.mist + "0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(mx, my, m.r * 2.5, m.r * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Rewrite Hero.tsx**:

```tsx
"use client";

import HeroCanvas from "./HeroCanvas";
import { useModal } from "./ModalProvider";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-30 text-center md:px-10">
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(243,246,238,0.72) 0%, rgba(243,246,238,0) 100%), linear-gradient(to bottom, rgba(243,246,238,0.6) 0%, rgba(243,246,238,0) 30%, rgba(243,246,238,0) 70%, rgba(243,246,238,0.5) 100%)",
        }}
      />
      <div className="relative z-2 max-w-3xl">
        <div className="mb-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Probabilistic forecasting · Decision economics
        </div>
        <h1 className="mb-6 font-serif text-[clamp(42px,6vw,78px)] font-semibold leading-[1.05] tracking-tight text-ink">
          Every forecast
          <br />a <em className="font-serif italic text-leaf">dollar decision</em>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-ink-mute">
          TerraMind converts weather and agronomic predictions into block-level,
          dollar-denominated recommendations for New Zealand growers — calibrated
          probabilities, not dashboard noise.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={openModal}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep"
          >
            Get early access ↗
          </button>
          <a
            href="#platform"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5.5 py-3.5 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
          >
            See the platform →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + commit** — `npx tsc --noEmit`; check hero at :3002 (canvas animates, text legible); `git add -A && git commit -m "feat: hero with vineyard canvas and decision-economics headline"`

---

### Task 5: PlatformRows + StatementBand

**Files:**
- Create: `terramind-web/src/components/PlatformRows.tsx`
- Create: `terramind-web/src/components/StatementBand.tsx`

- [ ] **Step 1: Create PlatformRows.tsx**:

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";

const PRODUCTS = [
  {
    name: "Frost",
    tag: "Flagship · Priced decisions",
    desc: "Catches 94% of frost nights. Block-level frost probability converted to expected-value thresholds — protect or don't, priced against crop-loss risk. Not a temperature chart, a decision engine.",
  },
  {
    name: "Water & Irrigation",
    tag: "Validated · 6 NZ regions",
    desc: "FAO-56 evapotranspiration bounded by real S-Map soil data. Deficit trajectory validated across six New Zealand regions (r = 0.87) — irrigation scheduled when your soil actually needs it.",
  },
  {
    name: "Disease Risk",
    tag: "Psa · Published models",
    desc: "Published Plant & Food Research disease models combined with ensemble weather, producing block-level infection-risk curves growers and industry can interrogate.",
  },
  {
    name: "Harvest & Phenology",
    tag: "±2-day timing",
    desc: "Growing-degree-day projections anchored to observed heat accumulation. Harvest windows accurate to ±2 days — labour, packhouse slots, and market timing planned from evidence.",
  },
  {
    name: "Pollination & Wind",
    tag: "Bloom & canopy windows",
    desc: "Bee-flyable-hour forecasts for bloom and damaging-wind-day warnings for canopy protection — a day's notice to supplement hives or bring a pick forward.",
  },
  {
    name: "Soil Scouter",
    tag: "Hardware · Ground truth",
    desc: "Proprietary in-field soil moisture and temperature sensing feeding the prediction engine with block-level ground truth — closing the loop between forecast and soil reality.",
  },
];

export default function PlatformRows() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="platform"
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">The platform</div>
      {PRODUCTS.map((p, i) => (
        <div
          key={p.name}
          className={`grid cursor-default grid-cols-1 items-start gap-4 border-t border-line py-10 transition-colors hover:bg-leaf/4 md:grid-cols-2 md:gap-0 ${
            i === PRODUCTS.length - 1 ? "border-b" : ""
          }`}
        >
          <div className="flex items-start gap-5 md:pr-15">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-strong" />
            <div>
              <div className="mb-1.5 text-[22px] font-semibold tracking-tight text-ink">
                {p.name}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-leaf">
                {p.tag}
              </div>
            </div>
          </div>
          <p className="pl-7 text-[15px] leading-relaxed text-ink-mute md:pl-7">
            {p.desc}
          </p>
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Create StatementBand.tsx**:

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";

export default function StatementBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-chrome px-6 py-28 text-center md:px-10"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-1 mx-auto max-w-3xl">
        <h2 className="mb-5 font-serif text-[clamp(32px,4.5vw,56px)] font-semibold leading-tight tracking-tight text-white">
          Not a weather app.
          <br />A <em className="italic text-accent">decision-economics</em> platform.
        </h2>
        <p className="text-[17px] leading-relaxed text-white/65">
          Every TerraMind prediction is a calibrated probability distribution —
          and a finance layer prices each one into action, in dollars, per block.
          Forecasts you can take to the bank, literally.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + commit** — `npx tsc --noEmit`; `git add -A && git commit -m "feat: platform rows and statement band"`

---

### Task 6: AILayerSection + MetricsBand

**Files:**
- Create: `terramind-web/src/components/AILayerSection.tsx`
- Create: `terramind-web/src/components/MetricsBand.tsx`

- [ ] **Step 1: Create AILayerSection.tsx**:

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";

const FEATURES = [
  {
    name: "AI Season Planner",
    desc: "A prediction-driven calendar. Spray, irrigation, frost and harvest events scheduled — and rescheduled — as forecasts change.",
  },
  {
    name: "Daily Briefing",
    desc: "Each morning's decisions, ranked by economic impact. The five things worth your attention today, and why.",
  },
  {
    name: "Insights Feed",
    desc: "An overnight scan of every block surfaces patterns no single alert would catch — trajectory shifts, accumulating risks, quiet anomalies.",
  },
  {
    name: "Ask TerraMind",
    desc: "Ask anything about your operation. Answers grounded in your blocks, your history, your numbers — never a generic chatbot.",
  },
];

export default function AILayerSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="intelligence"
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">TerraMind Intelligence</div>
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
            An AI layer that
            <br />
            <em className="italic text-leaf">works your season</em>
          </h2>
          <p className="text-base leading-relaxed text-ink-mute">
            TerraMind doesn&apos;t stop at predicting. It plans your season,
            briefs you each morning, and watches every block overnight —
            reasoning across weather, agronomy and economics so the right
            information surfaces at the right moment. Grounded in your own
            blocks&apos; data, with you making every call.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className="rounded-xl border border-line bg-white/60 px-6 py-5 transition-colors hover:border-ink/20 hover:bg-mint"
            >
              <div className="mb-1 text-[15px] font-semibold text-ink">
                {f.name}
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create MetricsBand.tsx**:

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";

const METRICS = [
  { value: "94%", label: "Frost nights caught" },
  { value: "r = 0.87", label: "Irrigation accuracy · 6 NZ regions" },
  { value: "7 · 13", label: "Crops · regions, NZ-wide" },
  { value: "±2 days", label: "Harvest-timing accuracy" },
];

export default function MetricsBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="calibration"
      ref={ref}
      className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <div className="eyebrow mb-8">Calibration as brand</div>
          <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
            Published accuracy.
            <br />
            Every prediction.
          </h2>
          <p className="text-base leading-relaxed text-ink-mute">
            When TerraMind says 30%, it happens about 30% of the time — and we
            publish the reliability data to prove it. Calibrated probabilities
            are trust infrastructure, not a footnote: the foundation growers,
            lenders and insurers can build decisions on.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-line bg-paper p-6"
            >
              <div className="mb-1 font-mono text-[28px] font-bold tracking-tight text-ink tabular-nums">
                {m.value}
              </div>
              <div className="font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-ink-mute">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify + commit** — `npx tsc --noEmit`; `git add -A && git commit -m "feat: AI-layer section and calibration metrics band"`

---

### Task 7: Footer + RequestAccessModal

**Files:**
- Modify (full rewrite): `terramind-web/src/components/Footer.tsx`
- Create: `terramind-web/src/components/RequestAccessModal.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**:

```tsx
"use client";

import Link from "next/link";
import { useModal } from "./ModalProvider";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="bg-chrome px-6 pb-10 pt-15 md:px-10">
      <div className="mx-auto mb-12 grid max-w-[1100px] grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-2 text-base font-bold tracking-tight text-white">
            TerraMind
          </div>
          <div className="font-mono text-xs tracking-wider text-white/50">
            Christchurch · New Zealand
          </div>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
            Platform
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li><a href="#platform" className="text-white/60 transition-colors hover:text-white">Frost</a></li>
            <li><a href="#platform" className="text-white/60 transition-colors hover:text-white">Water &amp; Irrigation</a></li>
            <li><a href="#platform" className="text-white/60 transition-colors hover:text-white">Disease Risk</a></li>
            <li><a href="#platform" className="text-white/60 transition-colors hover:text-white">Soil Scouter</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
            Company
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li><a href="#intelligence" className="text-white/60 transition-colors hover:text-white">Intelligence</a></li>
            <li><a href="#calibration" className="text-white/60 transition-colors hover:text-white">Calibration</a></li>
            <li>
              <button onClick={openModal} className="cursor-pointer text-white/60 transition-colors hover:text-white">
                Contact
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
            Legal
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li><Link href="/privacy" className="text-white/60 transition-colors hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="text-white/60 transition-colors hover:text-white">Terms</Link></li>
            <li><Link href="/grower-data-sovereignty" className="text-white/60 transition-colors hover:text-white">Grower Data Sovereignty</Link></li>
            <li><Link href="/financial-disclaimer" className="text-white/60 transition-colors hover:text-white">Financial Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1100px] items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
        <span>© 2026 TerraMind Ltd.</span>
        <span>Central Otago pilot season</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create RequestAccessModal.tsx** (3 steps + success; Escape/overlay close; scroll lock):

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "./ModalProvider";

const CHIPS = [
  "Lincoln University",
  "Word of mouth",
  "Industry event",
  "Google",
  "LinkedIn",
  "Other",
];

export default function RequestAccessModal() {
  const { open, closeModal } = useModal();
  const [step, setStep] = useState(1);
  const [chip, setChip] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => {
        setStep(1);
        setChip(null);
      }, 300);
      return () => clearTimeout(id);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-chrome-deep/55 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Request access"
        className="relative w-full max-w-lg rounded-2xl border border-line bg-paper p-8 outline-none md:p-12"
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-paper-2 text-ink-soft transition-colors hover:bg-paper-3"
        >
          ✕
        </button>

        {step === 1 && (
          <div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              Get in touch
            </h3>
            <p className="mb-8 text-sm leading-normal text-ink-mute">
              Request early access to the TerraMind pilot or ask us anything.
            </p>
            <input
              type="text"
              placeholder="Name · email · or phone"
              className="w-full rounded-lg border border-line bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-accent-strong"
            />
            <div className="mt-7 flex items-center justify-between">
              <span className="text-xs text-ink-mute">1 of 3</span>
              <button
                onClick={() => setStep(2)}
                className="cursor-pointer rounded-full bg-leaf px-5.5 py-2.75 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              About your operation
            </h3>
            <p className="mb-8 text-sm leading-normal text-ink-mute">
              What are you growing, and what&apos;s your biggest decision
              challenge right now?
            </p>
            <textarea
              rows={4}
              placeholder="e.g. 25 ha Pinot Noir in Bannockburn, frost protection decisions eating margin every September…"
              className="w-full resize-none rounded-lg border border-line bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-accent-strong"
            />
            <div className="mt-7 flex items-center justify-between">
              <span className="text-xs text-ink-mute">2 of 3</span>
              <button
                onClick={() => setStep(3)}
                className="cursor-pointer rounded-full bg-leaf px-5.5 py-2.75 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              How did you find us?
            </h3>
            <p className="mb-8 text-sm leading-normal text-ink-mute">
              We appreciate it.
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={() => setChip(c)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-all ${
                    chip === c
                      ? "border-leaf bg-leaf text-white"
                      : "border-line text-ink-soft hover:border-leaf hover:bg-leaf hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between">
              <span className="text-xs text-ink-mute">3 of 3</span>
              <button
                onClick={() => setStep(4)}
                className="cursor-pointer rounded-full bg-leaf px-5.5 py-2.75 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep"
              >
                Submit ↗
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-leaf/10 text-[22px] text-leaf">
              ✓
            </div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              Thank you
            </h3>
            <p className="text-sm leading-normal text-ink-mute">
              Our team will reach out shortly. We&apos;re selectively onboarding
              growers for the Central Otago pilot season.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify + commit** — `npx tsc --noEmit`; `git add -A && git commit -m "feat: footer and request-access modal"`

---

### Task 8: Compose page, delete old components, re-theme legal pages

**Files:**
- Modify (full rewrite): `terramind-web/src/app/page.tsx`
- Delete: `terramind-web/src/components/{Atmosphere,HeroArtwork,AgentCard,VisionSection,TeamSection,WhoForSection,MarqueeStrip,CTASection,HeroHeadline,PlatformSection}.tsx`
- Check/Modify: `terramind-web/src/components/LegalPage.tsx`, `LegalNav.tsx` (re-theme to new token names if they reference removed vars like `--green`, `--navy`, `--gold`)
- Check: `terramind-web/src/hooks/useParallax.ts` — delete if no remaining consumer

- [ ] **Step 1: Rewrite page.tsx**:

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PlatformRows from "@/components/PlatformRows";
import StatementBand from "@/components/StatementBand";
import AILayerSection from "@/components/AILayerSection";
import MetricsBand from "@/components/MetricsBand";
import Footer from "@/components/Footer";
import RequestAccessModal from "@/components/RequestAccessModal";
import { ModalProvider } from "@/components/ModalProvider";

export default function Home() {
  return (
    <ModalProvider>
      <Nav />
      <main>
        <Hero />
        <PlatformRows />
        <StatementBand />
        <AILayerSection />
        <MetricsBand />
        <Footer />
      </main>
      <RequestAccessModal />
    </ModalProvider>
  );
}
```

- [ ] **Step 2: Delete old components** — `git rm` the files listed above. Then grep for remaining imports of deleted names (`grep -rn "Atmosphere\|HeroArtwork\|AgentCard\|VisionSection\|TeamSection\|WhoForSection\|MarqueeStrip\|CTASection\|HeroHeadline\|PlatformSection" src/`) and fix any stragglers.

- [ ] **Step 3: Re-theme legal components** — read `LegalPage.tsx`/`LegalNav.tsx` and the four legal `page.tsx` files; replace references to removed CSS vars (`--green`, `--green-deep`, `--navy`, `--gold`, `--paper` old values are fine by name) with the new equivalents: `--green`→`--leaf`, `--green-deep`→`--leaf-deep`, `--navy`→`--chrome`, `--gold`→`--earth`. Keep content unchanged.

- [ ] **Step 4: Verify + commit** — `npx tsc --noEmit` clean; all four legal routes render at :3002; `git add -A && git commit -m "feat: compose rehauled landing page; remove legacy sections; re-theme legal pages"`

---

### Task 9: Final verification pass

- [ ] **Step 1:** `npx tsc --noEmit` — expect no output (pass)
- [ ] **Step 2:** `npm run lint` — expect no errors
- [ ] **Step 3:** Browser pass at :3002 (desktop): each section in order, nav scroll state (transparent→blur), anchor links land correctly (`#platform`, `#intelligence`, `#calibration`), hero canvas animates, hover states on rows/cards, modal full flow (open from nav + hero + footer contact, steps 1→4, Escape close, overlay-click close, body scroll locked while open)
- [ ] **Step 4:** Mobile pass at 375px: nav shows wordmark + pill only, sections stack single-column, no horizontal scroll
- [ ] **Step 5:** Check `prefers-reduced-motion`: canvas renders one static frame, reveals visible
- [ ] **Step 6:** Final commit if fixes were needed; report results with screenshots
