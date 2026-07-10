# TerraMind Marketing Site Rehaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the landing page around a Predict → Price → Decide → Learn narrative and add `/intelligence` and `/proof` pages, all stats sourced from Technical Brief v11.

**Architecture:** Next.js 16 App Router. Two new routes (`src/app/intelligence/page.tsx`, `src/app/proof/page.tsx`) are thin server components exporting metadata and composing shared Nav/Footer/ModalProvider around one client "sections" component each. Landing page gains two new section components and expands three existing ones. All components follow existing conventions: `"use client"`, `useReveal` hook, Tailwind v4 tokens (`ink`, `ink-mute`, `leaf`, `paper-2`, `chrome-deep`, `accent`, `line`, `mint`), data arrays at top of file, serif display headlines, mono stat labels.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4. No unit-test infrastructure exists in this repo (marketing site) — each task verifies with `npx tsc --noEmit`, and the final task does lint + full browser verification. Spec (including **claim guardrails** that copy must obey): `docs/superpowers/specs/2026-07-11-marketing-rehaul-design.md`.

**Working directory for all commands:** `terramind-web/`

**IMPORTANT — pre-existing dirty files:** `Hero.tsx`, `Nav.tsx`, `Footer.tsx`, `HeroCanvas.tsx`, `StatementBand.tsx`, `globals.css`, `.claude/launch.json` have uncommitted user changes. `git add` only the files each task names — never `git add -A`.

---

### Task 1: Nav — route-aware links

**Files:**
- Modify: `terramind-web/src/components/Nav.tsx`

- [ ] **Step 1: Update links and logo href**

In `Nav.tsx`, replace the `LINKS` constant (lines 8–12):

```tsx
const LINKS = [
  { href: "/#platform", label: "Platform" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/proof", label: "Proof" },
];
```

And change the logo anchor from `<a href="#"` to `<a href="/"` so it works from sub-pages. No other changes — the desktop and mobile menus both render from `LINKS`.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit` — Expected: no output (clean).

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: nav tabs for intelligence and proof pages"
```

---

### Task 2: Hero — arc copy + stat strip

**Files:**
- Modify: `terramind-web/src/components/Hero.tsx`

- [ ] **Step 1: Update subheadline and add stat strip**

Replace the `<p>` subheadline (lines 24–28) with:

```tsx
        <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/70">
          TerraMind&apos;s prediction engine turns calibrated weather and
          agronomic probabilities into block-level, dollar-denominated
          decisions — with an AI reasoning layer that plans your season,
          briefs your mornings, and learns every block.
        </p>
```

Immediately after the closing `</div>` of the CTA button row (after line 42, still inside the `max-w-3xl` wrapper), add:

```tsx
        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
          <span>94% frost nights caught</span>
          <span className="text-white/25">·</span>
          <span>r = 0.87 irrigation</span>
          <span className="text-white/25">·</span>
          <span>±2-day harvest timing</span>
          <span className="text-white/25">·</span>
          <span>ECE 0.007 calibration</span>
        </div>
```

Keep the H1 ("Every forecast / a dollar decision") unchanged.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: hero arc copy and proof stat strip"
```

---

### Task 3: Decision Pipeline section (new)

**Files:**
- Create: `terramind-web/src/components/DecisionPipeline.tsx`
- Modify: `terramind-web/src/app/page.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";

const STEPS = [
  {
    n: "01",
    name: "Predict",
    desc: "A 1000-sample Monte Carlo engine fuses physics models with machine learning across every block — emitting calibrated probability distributions, not point guesses. Deterministic, auditable, millisecond-fast.",
  },
  {
    n: "02",
    name: "Price",
    desc: "The finance layer converts each probability into expected value — dollars per block, per decision — in the language growers, lenders and insurers actually use.",
  },
  {
    n: "03",
    name: "Decide",
    desc: "Expected-value thresholds and three-tier decision confidence turn priced risk into a clear call: protect or don't, irrigate or wait — reasoning shown, drivers attributed.",
  },
  {
    n: "04",
    name: "Learn",
    desc: "Every confirmed outcome banks a dollar-valued decision win, builds the block's track record, and retrains the models. Intelligence that compounds, season over season.",
  },
];

export default function DecisionPipeline() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="pipeline"
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">How TerraMind thinks</div>
      <h2 className="mb-14 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
        From probability to profit,{" "}
        <em className="italic text-leaf">in four moves</em>
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-xl border border-line bg-white/60 p-6 transition-colors hover:border-ink/20 hover:bg-mint"
          >
            <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-leaf">
              {s.n}
            </div>
            <div className="mb-2 text-[19px] font-semibold tracking-tight text-ink">
              {s.name}
            </div>
            <p className="text-sm leading-relaxed text-ink-mute">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Note: apostrophes inside the `STEPS` string literals (e.g. `don't`, `block's`) are fine — ESLint's `react/no-unescaped-entities` only applies to JSX text, not string values.

- [ ] **Step 2: Insert into the landing page**

In `src/app/page.tsx`, add `import DecisionPipeline from "@/components/DecisionPipeline";` and render `<DecisionPipeline />` between `<Hero />` and `<PlatformRows />`.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/DecisionPipeline.tsx src/app/page.tsx
git commit -m "feat: decision pipeline section (predict, price, decide, learn)"
```

---

### Task 4: Platform rows — tightened stat tags

**Files:**
- Modify: `terramind-web/src/components/PlatformRows.tsx`

- [ ] **Step 1: Update tags and one description**

In the `PRODUCTS` array, change only these fields:

- Frost: `tag: "Flagship · 94% of frost nights"`
- Water & Irrigation: `tag: "r = 0.87 · Validated in 6 NZ regions"`
- Harvest & Phenology: `tag: "±2-day harvest timing"`
- Pollination & Wind: `tag: "92% bloom · 97% wind days"`, and replace its `desc` with:

```
"Bee-flyable-hour forecasts (92% accuracy) for bloom and day-ahead warnings that catch 97% of damaging-wind days — notice enough to supplement hives or bring a pick forward."
```

Leave Disease Risk and Soil Scouter unchanged.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/PlatformRows.tsx
git commit -m "feat: measured accuracy tags on platform rows"
```

---

### Task 5: Intelligence section — 14-feature reframe

**Files:**
- Modify: `terramind-web/src/components/AILayerSection.tsx`

- [ ] **Step 1: Replace the component**

Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
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
    desc: "An agentic assistant with retrieval-augmented answers grounded in your blocks, your history, your numbers — never a generic chatbot.",
  },
];

const MORE_FEATURES = [
  { name: "Nightly Insight Scan", desc: "Five deterministic detectors sweep every block at 2:30 am." },
  { name: "Decision Wins", desc: "Confirmed calls valued in dollars, banked per block." },
  { name: "Risk-Weighted Planning", desc: "Season-scale Monte Carlo, priced into revenue impact." },
  { name: "Pre-Decision Checklists", desc: "Before you run the wind machine: check X, Y, Z." },
  { name: "Season Reports", desc: "Weekly, pre-season, debrief and agronomist-grade PDFs." },
  { name: "Voice Logging", desc: "Hands-free structured logging from the orchard row." },
  { name: "Inferred Logging", desc: "Likely actions detected, confirmed with one tap." },
  { name: "Staff View", desc: "A plain-language day sheet for the crew, one tap to share." },
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
            A 14-feature AI reasoning layer —{" "}
            <em className="italic text-leaf">not a chatbot</em>
          </h2>
          <p className="mb-6 text-base leading-relaxed text-ink-mute">
            Every AI feature exists because of a TerraMind prediction. The
            discipline is grounding-before-generation: deterministic engines
            find the signal, the AI puts it into words, and a structured
            fallback ships if it can&apos;t. Agentic tool-calling,
            retrieval-augmented answers, self-consistency ensembles on
            high-stakes questions — with you making every call.
          </p>
          <Link
            href="/intelligence"
            className="font-mono text-[12px] uppercase tracking-[0.15em] text-leaf transition-colors hover:text-leaf-deep"
          >
            Explore the intelligence layer →
          </Link>
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
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MORE_FEATURES.map((f) => (
          <div
            key={f.name}
            className="rounded-xl border border-line-soft bg-white/40 px-5 py-4"
          >
            <div className="mb-0.5 text-[13px] font-semibold text-ink">
              {f.name}
            </div>
            <p className="text-[13px] leading-relaxed text-ink-mute">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/AILayerSection.tsx
git commit -m "feat: expand intelligence section to 14-feature reasoning layer"
```

---

### Task 6: Proof band — 8 stats + link

**Files:**
- Modify: `terramind-web/src/components/MetricsBand.tsx`

- [ ] **Step 1: Replace the component**

Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

const METRICS = [
  { value: "94%", label: "Frost nights caught" },
  { value: "15–18%", label: "Sharper than the public forecast" },
  { value: "0.007", label: "Expected calibration error" },
  { value: "r = 0.87", label: "Irrigation accuracy · 6 NZ regions" },
  { value: "97%", label: "Damaging-wind days caught" },
  { value: "92%", label: "Pollination-window accuracy" },
  { value: "±2 days", label: "Harvest-timing accuracy" },
  { value: "1,270", label: "Tests passing · gate green ×18" },
];

export default function MetricsBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="calibration"
      ref={ref}
      className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
    >
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <div className="eyebrow mb-8">Calibration as brand</div>
          <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
            Published accuracy.
            <br />
            Every prediction.
          </h2>
          <p className="mb-6 text-base leading-relaxed text-ink-mute">
            When TerraMind says 30%, it happens about 30% of the time — and we
            publish the reliability data to prove it. Every surface ships with
            a measured accuracy stat on real New Zealand data. Calibrated
            probabilities are trust infrastructure: the foundation growers,
            lenders and insurers can build decisions on.
          </p>
          <Link
            href="/proof"
            className="font-mono text-[12px] uppercase tracking-[0.15em] text-leaf transition-colors hover:text-leaf-deep"
          >
            See the full proof →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-line bg-paper p-6"
            >
              <div className="mb-1 font-mono text-[26px] font-bold tracking-tight text-ink tabular-nums">
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

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/MetricsBand.tsx
git commit -m "feat: expand proof band to eight measured stats with proof link"
```

---

### Task 7: Economics band (new)

**Files:**
- Create: `terramind-web/src/components/EconomicsBand.tsx`
- Modify: `terramind-web/src/app/page.tsx`

- [ ] **Step 1: Create the component**

Claim guardrail: exposure is "tens of thousands of dollars a hectare" (registry parameter, not market-measured); 66% is the climatology miss rate.

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";
import { useModal } from "./ModalProvider";

const FIGURES = [
  {
    value: "23.4",
    label: "Damaging frost nights per season, average NZ location",
  },
  { value: "66%", label: "Of frost nights missed by climatology tools" },
  { value: "94%", label: "Caught by TerraMind at the economic setting" },
];

export default function EconomicsBand() {
  const ref = useReveal<HTMLElement>();
  const { openModal } = useModal();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 md:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
        }}
      />
      <div className="relative z-1 mx-auto max-w-[1100px]">
        <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          The economics
        </div>
        <h2 className="mb-5 max-w-3xl font-serif text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-tight text-white">
          Frost alone is a{" "}
          <em className="italic text-accent">five-figure decision</em> — per
          hectare, per season.
        </h2>
        <p className="mb-14 max-w-2xl text-[17px] leading-relaxed text-white/65">
          Exposure runs to tens of thousands of dollars a hectare. TerraMind
          prices every risk night in dollars and tells you when protection
          pays for itself — before you start the wind machine, not after.
        </p>
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FIGURES.map((f) => (
            <div
              key={f.value}
              className="rounded-xl border border-white/12 bg-white/4 p-7"
            >
              <div className="mb-2 font-serif text-[44px] font-semibold leading-none tracking-tight text-white">
                {f.value}
              </div>
              <p className="font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-white/50">
                {f.label}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={openModal}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep"
        >
          Get early access ↗
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insert into the landing page**

In `src/app/page.tsx`, add `import EconomicsBand from "@/components/EconomicsBand";` and render `<EconomicsBand />` between `<MetricsBand />` and `<Footer />`. Final landing order: Nav · Hero · DecisionPipeline · PlatformRows · StatementBand · AILayerSection · MetricsBand · EconomicsBand · Footer.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/EconomicsBand.tsx src/app/page.tsx
git commit -m "feat: economics band with frost exposure figures"
```

---

### Task 8: `/intelligence` page

**Files:**
- Create: `terramind-web/src/components/IntelligenceSections.tsx`
- Create: `terramind-web/src/app/intelligence/page.tsx`

- [ ] **Step 1: Create the sections component**

`src/components/IntelligenceSections.tsx` — dark hero (so the transparent Nav's white text reads), then light sections:

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";
import { useModal } from "./ModalProvider";

const PIPELINE = [
  { n: "01", name: "Query", desc: "Every relevant prediction, observation and dollar figure is retrieved from your blocks' database first." },
  { n: "02", name: "Bundle", desc: "Assembled into a structured context bundle — the AI only ever sees verified figures." },
  { n: "03", name: "Narrate", desc: "The model synthesises and narrates. It never computes a number on its own." },
  { n: "04", name: "Validate", desc: "Output is parsed against a strict schema before a grower ever sees it." },
  { n: "05", name: "Fall back", desc: "If validation fails, a deterministic structured display ships instead. No malformed AI output, ever." },
];

const DETECTORS = [
  { name: "Trajectory change", desc: "The forecast midpoint has shifted beyond the block's own rolling variability." },
  { name: "Cross-prediction correlation", desc: "Agronomist-reviewed rules across surfaces — e.g. sustained disease risk while yield softens." },
  { name: "Historical anomaly", desc: "Today's value sits far outside the same block at the same point in past seasons." },
  { name: "Accumulating risk", desc: "Cold hours, disease-favourable days or water deficit building without any single-day alert firing." },
  { name: "Unexplained deviation", desc: "A prediction lands outside the confidence band the block's own season model expects." },
];

const ASK = [
  { name: "Agentic tool-calling", desc: "A bounded agent loop over read tools, a scenario runner and tiered action tools — hard budgets, one repair retry, deterministic fallback." },
  { name: "Grounded retrieval (RAG)", desc: "Hybrid full-text + vector search over your own records, rank-fused, isolated to your orchard in SQL. Citations shown." },
  { name: "Self-consistency", desc: "High-stakes questions run a three-temperature ensemble; when the answers disagree, the disagreement is surfaced as an explicit limitation." },
  { name: "Voice", desc: "Hands-free in the orchard — questions spoken, answers streamed back sentence by sentence." },
  { name: "Partner MCP", desc: "External agents can read and propose through a consent-gated endpoint. They can never execute a write." },
];

export default function IntelligenceSections() {
  const heroRef = useReveal<HTMLElement>();
  const pipelineRef = useReveal<HTMLElement>();
  const scanRef = useReveal<HTMLElement>();
  const askRef = useReveal<HTMLElement>();
  const closeRef = useReveal<HTMLElement>();
  const { openModal } = useModal();

  return (
    <>
      <section
        ref={heroRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 pb-24 pt-44 md:px-10"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[1100px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            TerraMind Intelligence
          </div>
          <h1 className="mb-6 max-w-3xl font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-white">
            A decision-intelligence layer,{" "}
            <em className="italic text-accent">not a chatbot</em>
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/70">
            Fourteen AI features, and every one exists because of a TerraMind
            prediction. The findings are deterministic — the AI puts them into
            words. Grounded, auditable, and always yours to confirm.
          </p>
        </div>
      </section>

      <section
        ref={pipelineRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">Grounding before generation</div>
        <h2 className="mb-5 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
          No AI output touches a number{" "}
          <em className="italic text-leaf">it didn&apos;t retrieve</em>
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-ink-mute">
          Every AI-generated report, briefing, insight and answer runs the same
          five-step discipline. Hallucinated figures aren&apos;t rare —
          they&apos;re architecturally impossible.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map((s) => (
            <div key={s.n} className="rounded-xl border border-line bg-white/60 p-5">
              <div className="mb-3 font-mono text-[11px] tracking-[0.2em] text-leaf">
                {s.n}
              </div>
              <div className="mb-1.5 text-[15px] font-semibold text-ink">
                {s.name}
              </div>
              <p className="text-[13px] leading-relaxed text-ink-mute">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={scanRef}
        className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
      >
        <div className="mx-auto grid max-w-[1100px] items-start gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <div className="eyebrow mb-8">While you sleep</div>
            <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
              Five detectors sweep every block,{" "}
              <em className="italic text-leaf">every night</em>
            </h2>
            <p className="text-base leading-relaxed text-ink-mute">
              At 2:30 am the nightly scan runs deterministic detectors over
              each block&apos;s prediction history. Only genuine findings
              surface — deduplicated against alerts you&apos;ve already seen,
              narrated in plain language by morning. It also plans: the AI
              Season Planner reschedules frost, irrigation, harvest and
              scouting events on every forecast update; your 5 am Daily
              Briefing ranks the day&apos;s decisions by expected value; and
              when you open an event, a pre-decision checklist spells out what
              to verify before you act. Weekly, pre-season and debrief reports
              round out the record.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {DETECTORS.map((d) => (
              <div
                key={d.name}
                className="rounded-xl border border-line bg-paper px-6 py-4"
              >
                <div className="mb-0.5 text-[14px] font-semibold text-ink">
                  {d.name}
                </div>
                <p className="text-[13px] leading-relaxed text-ink-mute">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={askRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">The showpiece</div>
        <h2 className="mb-5 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
          Ask TerraMind —{" "}
          <em className="italic text-leaf">an agent that knows your orchard</em>
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-ink-mute">
          Ask anything about your operation and get an answer grounded in your
          blocks, your history, your numbers. Under the hood it&apos;s a
          bounded agentic loop — powerful enough to run what-if scenarios,
          disciplined enough to never act without you.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ASK.map((f) => (
            <div
              key={f.name}
              className="rounded-xl border border-line bg-white/60 p-6 transition-colors hover:border-ink/20 hover:bg-mint"
            >
              <div className="mb-1.5 text-[15px] font-semibold text-ink">
                {f.name}
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={closeRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 text-center md:px-10"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 35%, rgba(15,122,65,0.24) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-3xl">
          <h2 className="mb-5 font-serif text-[clamp(32px,4.5vw,56px)] font-semibold leading-tight tracking-tight text-white">
            The AI drafts.
            <br />
            <em className="italic text-accent">You decide.</em>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/65">
            TerraMind&apos;s AI suggests, schedules, and generates — but nothing
            writes to your operation without your explicit confirmation. Human
            judgment stays exactly where it belongs.
          </p>
          <button
            onClick={openModal}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep"
          >
            Get early access ↗
          </button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create the route**

`src/app/intelligence/page.tsx`:

```tsx
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IntelligenceSections from "@/components/IntelligenceSections";
import RequestAccessModal from "@/components/RequestAccessModal";
import { ModalProvider } from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: "TerraMind Intelligence — A 14-feature AI reasoning layer",
  description:
    "Grounding-before-generation, nightly insight scans, an agentic assistant with retrieval-augmented answers — every AI feature exists because of a TerraMind prediction.",
};

export default function IntelligencePage() {
  return (
    <ModalProvider>
      <Nav />
      <main>
        <IntelligenceSections />
        <Footer />
      </main>
      <RequestAccessModal />
    </ModalProvider>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/IntelligenceSections.tsx src/app/intelligence/page.tsx
git commit -m "feat: intelligence page - AI reasoning layer in depth"
```

---

### Task 9: `/proof` page

**Files:**
- Create: `terramind-web/src/components/ProofSections.tsx`
- Create: `terramind-web/src/app/proof/page.tsx`

- [ ] **Step 1: Create the sections component**

Claim guardrails applied: Psa framed as regional separation; wind as day-level; no disease-AUC-as-infection, no $18k/ha as market fact, no competitor claims; honesty section included.

`src/components/ProofSections.tsx`:

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";
import { useModal } from "./ModalProvider";

const SURFACES = [
  {
    name: "Frost",
    stat: "94%",
    statLabel: "of frost nights caught",
    impact:
      "The average NZ growing location faces 23.4 damaging frost nights a season, with exposure running to tens of thousands of dollars per hectare.",
    accuracy:
      "Catches 94% of frost nights at the economically-correct alarm setting. Production overnight-low forecasts run 15–18% sharper than the public forecast (1.38 °C RMSE at 24 h). Climatology-style tools miss 66% of frost nights.",
  },
  {
    name: "Calibration",
    stat: "0.007",
    statLabel: "expected calibration error",
    impact:
      "Calibrated probabilities are what lenders and insurers can actually price on — trust infrastructure, not a footnote.",
    accuracy:
      "When TerraMind says 30%, it happens about 30% of the time. ECE 0.007, CRPS skill 0.306, and the 90% interval holds about 90% of the time — verified on 2,278 held-out nights.",
  },
  {
    name: "Irrigation",
    stat: "r = 0.87",
    statLabel: "deficit trajectory · 6 regions",
    impact:
      "Water is the next-biggest input cost after frost protection — and over- or under-watering both cost real money.",
    accuracy:
      "Soil-water deficit trajectory validated against independent ERA5-Land reanalysis across six NZ regions: r = 0.87 (0.77–0.94), direction right on 85% of meaningful days, bounded by real S-Map soil data.",
  },
  {
    name: "Pollination",
    stat: "92%",
    statLabel: "flyable-hour accuracy",
    impact:
      "Only 34–45% of bloom-window daylight hours are bee-flyable — and it swings 30% year to year. Poor bloom weather is lost fruit set.",
    accuracy:
      "1-day-ahead bee-flyable-hour forecasts: 92% classification accuracy with 86% recall and precision, measured over 2,544 spring daylight hours.",
  },
  {
    name: "Wind",
    stat: "97%",
    statLabel: "of damaging-wind days caught",
    impact:
      "Damaging gusts drop and scar fruit — roughly 58 damaging-gust days a season for kiwifruit, with peaks over 100 km/h.",
    accuracy:
      "Day-ahead forecasts catch 97% of damaging-wind days at a 50 km/h watch trigger; gust forecast RMSE 10.4 km/h. A day's warning to deploy protection or bring a pick forward.",
  },
  {
    name: "Harvest & phenology",
    stat: "±2 days",
    statLabel: "harvest-timing accuracy",
    impact:
      "A wrong harvest date mis-books labour, packhouse slots and market windows — costs that land whether or not the fruit is perfect.",
    accuracy:
      "Growing-degree-day projections from forecast temperature hit days-to-harvest targets within ±2 days, with 7.1% cumulative-season error.",
  },
  {
    name: "Psa risk",
    stat: "6.6×",
    statLabel: "correct regional separation",
    impact:
      "The bacterial disease behind the 2010–11 outbreak that cost NZ kiwifruit hundreds of millions and forced Gold replanting.",
    accuracy:
      "Built on the published Plant & Food Research risk curve — explainable to growers and industry. It rates the Bay of Plenty (kiwifruit heartland) 6.6× higher-risk than Central Otago: the correct geographic separation.",
  },
];

const ENGINE = [
  { value: "1,000", label: "Monte Carlo samples per prediction" },
  { value: "~1.5 ms", label: "Per full simulation" },
  { value: "Bit-identical", label: "Same seed, same result — auditable" },
  { value: "1,270", label: "Tests passing" },
  { value: "×18", label: "Surfaces green on the calibration gate" },
  { value: "7 · 13", label: "Crops · NZ regions, equal depth" },
];

const NOT_CLAIMED = [
  "Our disease classifiers (AUC 0.91–0.98) faithfully reproduce published agronomic risk formulas — that is reproduction fidelity, not field-validated infection prediction. Real validation lands as grower-confirmed outcomes accumulate.",
  "Yield-from-satellite (NDVI) is not field-validated for any crop yet. Five of seven crop models are flagged as self-referential in their own metadata — in capitals.",
  "A runoff model scoring a 92% improvement sits unshipped in our codebase, held at deployable:false — it learned to mimic physics labels, so the score isn't real-world skill. We'd rather hold it back than dress it up.",
  "No named-competitor benchmark yet. When we publish one, it will be run the same way as everything on this page: real data, stated provenance.",
];

export default function ProofSections() {
  const heroRef = useReveal<HTMLElement>();
  const surfacesRef = useReveal<HTMLElement>();
  const engineRef = useReveal<HTMLElement>();
  const honestyRef = useReveal<HTMLElement>();

  return (
    <>
      <section
        ref={heroRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 pb-24 pt-44 md:px-10"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[1100px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            Proof
          </div>
          <h1 className="mb-6 max-w-3xl font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-white">
            Proof, <em className="italic text-accent">not promises</em>
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/70">
            Every TerraMind surface ships with a measured accuracy stat on real
            New Zealand data — benchmarked July 2026, provenance documented,
            caveats stated up front. This page is our technical brief, in the
            open.
          </p>
        </div>
      </section>

      <section
        ref={surfacesRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">Impact + accuracy, per surface</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SURFACES.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-line bg-white/60 p-7"
            >
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <div className="text-[19px] font-semibold tracking-tight text-ink">
                  {s.name}
                </div>
                <div className="text-right">
                  <div className="font-mono text-[24px] font-bold tracking-tight text-leaf tabular-nums">
                    {s.stat}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                    {s.statLabel}
                  </div>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-ink-mute">
                <span className="font-semibold text-ink">Why it matters — </span>
                {s.impact}
              </p>
              <p className="text-sm leading-relaxed text-ink-mute">
                <span className="font-semibold text-ink">Measured — </span>
                {s.accuracy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={engineRef}
        className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="eyebrow mb-12">The engine underneath</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ENGINE.map((e) => (
              <div
                key={e.label}
                className="rounded-xl border border-line bg-paper p-5"
              >
                <div className="mb-1 font-mono text-[20px] font-bold tracking-tight text-ink tabular-nums">
                  {e.value}
                </div>
                <div className="font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-ink-mute">
                  {e.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={honestyRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">What we don&apos;t claim (yet)</div>
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
              Numbers you can trust exist only where a company says{" "}
              <em className="italic text-leaf">what it can&apos;t claim</em>
            </h2>
            <p className="text-base leading-relaxed text-ink-mute">
              Everything above is measured against real, independent data. A
              few things aren&apos;t provable yet — and rather than blur the
              line, we publish it. This discipline is the product.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {NOT_CLAIMED.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-line bg-white/60 px-6 py-5 text-sm leading-relaxed text-ink-mute"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create the route**

`src/app/proof/page.tsx`:

```tsx
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProofSections from "@/components/ProofSections";
import RequestAccessModal from "@/components/RequestAccessModal";
import { ModalProvider } from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: "TerraMind Proof — Measured accuracy, every surface",
  description:
    "94% of frost nights caught, ECE 0.007 calibration, r = 0.87 irrigation across 6 NZ regions — every TerraMind surface ships with a measured accuracy stat on real New Zealand data.",
};

export default function ProofPage() {
  return (
    <ModalProvider>
      <Nav />
      <main>
        <ProofSections />
        <Footer />
      </main>
      <RequestAccessModal />
    </ModalProvider>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProofSections.tsx src/app/proof/page.tsx
git commit -m "feat: proof page - per-surface accuracy, engine stats, honesty section"
```

---

### Task 10: Full verification pass

**Files:** none created — verification only.

- [ ] **Step 1: Lint**

Run: `npm run lint` — Expected: no errors. Fix any (most likely unescaped apostrophes in JSX text — use `&apos;`).

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit` — Expected: clean.

- [ ] **Step 3: Browser verification (preview tools, port 3002 per launch config)**

Start the dev server via the preview tooling, then verify:
1. `/` — all 8 sections render in order (Hero → DecisionPipeline → PlatformRows → StatementBand → AILayerSection → MetricsBand → EconomicsBand → Footer); no console errors; hero stat strip visible; reveal animations fire on scroll.
2. `/intelligence` and `/proof` — render with dark heroes (nav text legible before scrolling), no console errors.
3. Nav — from `/proof`, click "Platform" → lands on `/#platform`; logo → `/`; "Intelligence" and "Proof" tabs navigate; mobile menu (resize to 375 px) opens and links work.
4. Request-access modal opens from the EconomicsBand button and the Intelligence closing-band button.
5. Mobile width (375 px): pipeline cards stack, proof cards stack, no horizontal scroll.
6. Take a screenshot of each page for the user.

- [ ] **Step 4: Claim audit**

Re-read all copy added in Tasks 2–9 against the spec's "Claim guardrails" section. Confirm none of the six forbidden claims appear. Expected: pass (the plan's copy was written to comply — verify nothing drifted).

- [ ] **Step 5: Final commit (only if fixes were made)**

```bash
git add <specific files fixed>
git commit -m "fix: lint/verification fixes for marketing rehaul"
```
