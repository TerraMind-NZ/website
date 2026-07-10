# TerraMind Marketing Site Rehaul — Design Spec

Date: 2026-07-11
Status: Approved by Hasan (brainstorming session)
Scope: `terramind-web/` (public marketing site only — the product app is untouched)

## 1. Goal

Full visual and content rehaul of the TerraMind marketing site. Structure inspired by
micro1.ai (sticky nav, hero, product showcase, statement band, metrics, multi-column
footer) as interpreted through Hasan's reference HTML (`~/Downloads/terramind.html`),
restyled to match the **product app's actual design system** so marketing site and app
read as one brand. Content rewritten around the current product story (Technical Brief
v11 + AI PRD v2): probabilistic predictions, decision economics, and the AI layer.

Out of scope: research/benchmarks section (dropped), app dashboard changes, real
form-submission backend (modal shows success state only, endpoint wired later).

## 2. Design system

Tokens copied from the app (`~/terramind/web/app/globals.css`), defined as Tailwind v4
`@theme` variables in `src/app/globals.css`:

| Token | Value | Use |
|---|---|---|
| chrome | `#1b2a22` | Dark green — statement band, footer, nav wordmark |
| chrome-deep | `#0a0f0c` | Deepest green-black |
| paper | `#f3f6ee` | Page background |
| paper-2 / paper-3 | `#e4eadb` / `#d8e0cc` | Band/surface tiers, metric cards |
| leaf | `#0f7a41` | Primary buttons, links, product tags |
| accent / accent-strong | `#43d585` / `#1f9d57` | Highlights, eyebrow dots, metric accents |
| ink / ink-soft / ink-mute | `#0a0f0c` / `#1b2a22` / `#55625a` | Text tiers |
| mint / sage | `#eaf3ec` / `#86998e` | Subtle fills, muted UI |
| earth / amber | `#b67d2e` / `#ffc06b` | Optional warm accents (sparingly) |
| green-50…900 scale | as in app | Available where needed |

**Typography** (same trio as the app, via `next/font/google`):
- **Fraunces** (serif) — display headlines; italic Fraunces for the emphasized
  words inside headlines (replaces the reference HTML's Georgia italics)
- **Manrope** — body, UI, nav
- **Space Mono** — small mono labels (eyebrows, metric labels) where it helps

**Texture/motifs from reference HTML:** film-grain SVG overlay (fixed, low opacity),
uppercase letter-spaced eyebrows with trailing hairline rule, pill buttons
(label + green arrow chip), hover-highlight rows, generous 100px+ section padding,
max-width ~1100px content columns.

## 3. Page structure (`src/app/page.tsx`)

Order: Nav → Hero → PlatformRows → StatementBand → AILayerSection → MetricsBand →
Footer, plus RequestAccessModal rendered at page level.

### 3.1 Nav (`Nav.tsx`)
Fixed. Transparent over hero → cream blur + hairline border after 40px scroll
(existing `useScrolled` hook). Left: TerraMind wordmark + "Central Otago · NZ"
sub-line. Center: anchor links — Platform, Intelligence, Calibration. Right:
"Request access" pill (opens modal). Mobile: links hidden, wordmark + pill remain
(no hamburger in v1).

### 3.2 Hero (`Hero.tsx` + `HeroCanvas.tsx`)
Full-viewport, centered. Animated canvas: perspective vineyard rows converging to a
vanishing point, canopy blobs with subtle sway, drifting mist, light glints — ported
from the reference HTML into a client component (`requestAnimationFrame` with cleanup,
resize handling). Canvas palette remapped to paper/leaf/chrome tones. Vignette overlay
keeps text legible. Content: blinking-dot eyebrow ("Probabilistic forecasting ·
Decision economics"), Fraunces headline with italic accent ("Every forecast a
*dollar decision*" direction), one-paragraph lede (calibrated probabilities → block-level,
dollar-denominated recommendations for NZ growers), primary pill CTA ("Get early
access" → modal) + ghost CTA ("See the platform" → #platform scroll).

### 3.3 PlatformRows (`PlatformRows.tsx`, `#platform`)
Eyebrow: "The platform". Six hover rows (2-col grid: name+tag left, description
right; stacks on mobile). Content from Technical Brief v11 — public-safe claims only:

1. **Frost** (flagship) — catches 94% of frost nights; protect/don't-protect decisions
   priced as expected value per block
2. **Water & Irrigation** — FAO-56 + S-Map soil data; deficit trajectory validated
   across 6 NZ regions (r = 0.87)
3. **Disease Risk** — published Plant & Food Research models (Psa and others),
   block-level infection-risk curves
4. **Harvest & Phenology** — GDD-anchored harvest windows, ±2-day timing; labour
   planning starts here
5. **Pollination & Wind** — bee-flyable-hour and damaging-wind-day forecasts for
   bloom and canopy protection windows
6. **Soil Scouter** — proprietary in-field hardware feeding ground truth back into
   the prediction engine

### 3.4 StatementBand (`StatementBand.tsx`)
Chrome-green full-width band with grain texture. Fraunces headline: "Not a weather
app. A *decision-economics* platform." One supporting line: predictions are calibrated
probability distributions with a finance layer that prices them into action.

### 3.5 AILayerSection (`AILayerSection.tsx`, `#intelligence`)
Eyebrow: "TerraMind Intelligence". Two-column: left, narrative (an AI layer that
plans your season, briefs you each morning, and watches every block overnight —
grounded in your own blocks' data, never a generic chatbot). Right, stacked feature
cards (4):
- **AI Season Planner** — prediction-driven calendar; spray, irrigation, frost and
  harvest events scheduled and rescheduled as forecasts change
- **Daily Briefing** — the morning's decisions ranked by economic impact
- **Insights Feed** — overnight scan surfaces patterns no single alert would catch
- **Ask TerraMind** — ask anything about your operation; answers grounded in your
  blocks, your history, your numbers

No internal implementation detail (no model names, pipelines, fallback language).

### 3.6 MetricsBand (`MetricsBand.tsx`, `#calibration`)
paper-2 band, hairline top/bottom borders. Two-column: left — eyebrow "Calibration
as brand", Fraunces headline "Published accuracy. Every prediction.", copy on
calibrated probabilities as trust infrastructure. Right — 2×2 metric cards:
- **94%** — frost nights caught
- **r = 0.87** — irrigation accuracy across 6 NZ regions
- **7 crops · 13 regions** — equal-depth NZ coverage
- **±2 days** — harvest-timing accuracy

### 3.7 Footer (`Footer.tsx`)
Chrome background. Four columns: brand (wordmark + "Christchurch · New Zealand"),
Platform links (anchor), Company (Intelligence, Calibration, Contact→modal),
Contact (hello@terramind.co.nz, terramind.co.nz). Bottom rule: © 2026 TerraMind Ltd ·
Central Otago pilot season. Legal links (Privacy, Terms, Grower Data Sovereignty,
Financial Disclaimer) folded into a footer column.

### 3.8 RequestAccessModal (`RequestAccessModal.tsx`)
Client component, React state (no vanilla JS). Steps: 1 contact field → 2 operation
textarea → 3 "how did you find us" chips → success state. Overlay click + Escape
close; body scroll locked while open. Submission is front-end only for now.

## 4. Implementation approach (Approach A — clean rebuild)

- New components written fresh; old marketing components deleted:
  `Atmosphere`, `HeroArtwork`, `AgentCard`, `VisionSection`, `TeamSection`,
  `WhoForSection`, `MarqueeStrip`, `CTASection`, `HeroHeadline`, and the old
  `Hero`/`Nav`/`PlatformSection`/`Footer` replaced.
- Kept: `useScrolled`, `useReveal` (scroll-reveal on sections), `useParallax` only
  if used, legal pages + `LegalPage`/`LegalNav` re-themed to the light palette.
- `layout.tsx`: load Fraunces/Manrope/Space Mono via `next/font`, update metadata
  (title/description around decision-economics positioning).
- All animation/interactive components are client components; the page itself stays
  a server component.
- Mobile: single-column stacks for rows/grids, nav reduces to wordmark + CTA,
  hero type scales via clamp().

## 5. Copy honesty guardrails

Public stats limited to the Technical Brief's Tier-1/strong claims: frost 94% and
calibration, irrigation r = 0.87 / 6 regions, GDD ±2 days, 7 crops / 13 regions.
Explicitly excluded from public copy: disease AUC figures, NDVI→yield numbers,
internal caveats, model/vendor names (Gemma, OpenRouter), competitor claims.

## 6. Error handling & testing

- Canvas component guards against missing 2D context and cleans up RAF + listeners
  on unmount; honors `prefers-reduced-motion` (static frame, no animation loop).
- Modal traps focus while open and restores scroll on close.
- Verification: `npx tsc --noEmit`, `npm run lint`, then browser pass (desktop +
  375px mobile viewport) checking each section, scroll states, anchors, and the
  modal flow end-to-end.
