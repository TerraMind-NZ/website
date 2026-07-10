# TerraMind Marketing Site Rehaul — Design

**Date:** 2026-07-11
**Status:** Approved by Hasan
**Sources of truth:** `docs/TerraMind-Technical-Brief-v11.docx` (stats + claim boundaries), `docs/TerraMind-AI-PRD-v2.md` (AI feature set), existing components in `terramind-web/src/components/`.

## Goal

Evolve the current landing page into the strongest possible TerraMind marketing site by leaning into three things:

1. **The narrative arc: Predict → Price → Decide → Learn.** Predictions become dollar-denominated financial outcomes, which become AI-reasoned decisions, which are confirmed by growers and feed back into the models.
2. **AI-forward language** — real terms from the technical brief used with marketing energy: agentic tool-calling, retrieval-augmented answers, self-consistency ensembles, grounding-before-generation, deterministic fallbacks, Monte Carlo engine.
3. **Proof** — measured accuracy stats from Technical Brief v11 §11, expanded on the landing page and given a dedicated page.

Aesthetic is already right — keep the existing palette, serif display headlines, mono stat labels, reveal animations, dark chrome bands. No visual restyle; this is content architecture and copy.

## Shape

Landing-page upgrade **plus two new routes**: `/intelligence` and `/proof`. Nav gains tabs for both. (Chosen over a single-page mega-expansion — preserves the landing page's pacing — and over a full multi-page site — scope discipline.)

## Landing page (`/`) — revised section order

1. **Hero** (`Hero.tsx`, modify) — keep vineyard canvas and layout. Copy sharpened toward the arc (calibrated predictions → dollars → decisions). Add a slim mono stat strip beneath the CTAs: `94% frost nights caught · r = 0.87 irrigation · ±2-day harvest · ECE 0.007`.
2. **Decision Pipeline** (`DecisionPipeline.tsx`, NEW) — four-step band telling the arc in one screen:
   - **Predict** — 1000-sample Monte Carlo, calibrated probability distributions, physics + ML ensemble.
   - **Price** — finance layer converts every probability into $/block expected value; revenue and loan-covenant framing.
   - **Decide** — expected-value thresholds, three-tier decision confidence (High / Medium / Marginal), frost prescribes while other surfaces hand off to the grower.
   - **Learn** — confirmed outcomes accrue a per-block track record with dollar-valued decision wins; models retrain and calibrate.
3. **Platform rows** (`PlatformRows.tsx`, modify) — keep structure; tighten stat tags per row (wind row gets "97% of damaging-wind days"; pollination gets "92% flyable-hour accuracy").
4. **Statement band** (`StatementBand.tsx`) — unchanged.
5. **Intelligence section** (`AILayerSection.tsx`, expand) — reframe: *"A 14-feature AI reasoning layer — not a chatbot."* Keep the 4 hero feature cards; add a compact grid of secondary features (Nightly Insight Scan, Season Planner, Daily Briefing, Decision Wins, Risk-Weighted Season Planning, Voice Logging, Inferred Logging, Reports, Pre-Decision Checklist, Staff View, AI Analysis Carousel). AI-forward copy, all grounded in the brief. "Explore the intelligence layer →" links to `/intelligence`.
6. **Proof band** (`MetricsBand.tsx`, expand) — from 4 to ~8 stat cards: 94% frost nights · 15–18% sharper than the public forecast · ECE 0.007 · r = 0.87 (6 regions) · 97% damaging-wind days · 92% pollination accuracy · ±2-day harvest timing · 1,270 tests passing. "See the full proof →" links to `/proof`.
7. **Economics band** (`EconomicsBand.tsx`, NEW) — dark band, big serif numbers: 23.4 damaging frost nights/season at the average NZ location; conventional tools miss ~two-thirds of frost nights; per-hectare exposure in the tens of thousands of dollars. CTA repeat (Request access).
8. **Footer** — unchanged.

## `/intelligence` (new route + components)

The AI layer in depth. Sections:

- **Hero statement** — "A decision-intelligence layer, not a chatbot." All 14 features exist because of a TerraMind prediction.
- **Grounding-before-generation pipeline** — the five-step discipline (query DB → structured context bundle → LLM narration → schema validation → render, with structured fallback on failure). The findings are deterministic; the LLM only puts them into words.
- **Nightly Insight Scan** — the five deterministic detectors (trajectory change, cross-prediction correlation, historical anomaly, accumulating risk, unexplained deviation), 02:30 NZT.
- **AI Season Planner** — prediction-driven calendar on the 6-hour forecast cadence; two-tier conflict resolution (AI events updated in place with a change log; human events get accept/dismiss suggestions).
- **Daily Briefing / Pre-Decision Checklist / Reports** — expected-value-ranked mornings, "before you run the wind machine" checklists, four report types.
- **Ask TerraMind (showpiece)** — bounded agentic tool-calling (8 read tools + scenario runner + tiered action tools), hybrid RAG over the grower's own records (full-text + vector, rank-fused, orchard-isolated), 3-temperature self-consistency ensemble on high-stakes questions with agreement surfaced, voice mode, partner MCP endpoint (external agents can propose, never execute).
- **Closing principle** — human confirmation before action: the AI drafts, suggests, schedules and generates; the grower makes every call.

## `/proof` (new route + components)

The technical brief, productised:

- **Intro** — calibration as brand; benchmarks run on real NZ data, provenance available.
- **Per-surface proof cards** — all seven surfaces from brief §11, each with Impact + Accuracy: Frost (94% caught; 1.38 °C production RMSE, 15–18% sharper than public forecast; climatology misses 66%), Calibration (ECE 0.007, CRPS 0.306, flat PIT — "when we say 30%, it happens about 30% of the time"), Irrigation (r = 0.87 across 6 regions, direction 85%), Pollination (92%), Wind (97% of damaging-wind days at day level), GDD/Harvest (±2 days), Psa (6.6× correct regional separation, published Plant & Food curve).
- **Engine stats** — 1000-sample deterministic Monte Carlo (~1.2–1.6 ms, bit-identical reruns), OOD guard, 1,270 tests passing, calibration gate green across 18 surfaces.
- **"What we don't claim yet"** — honesty as marketing: disease classifiers reproduce published formulas (not yet field-validated infection prediction); NDVI→yield not field-validated for any crop; the 92%-scoring runoff model deliberately held back (`deployable:false`); no named-competitor benchmark yet. Framed as the discipline that makes the other numbers credible.

## Nav (`Nav.tsx`, modify)

Links: Platform (anchor `/#platform`) · Intelligence (`/intelligence`) · Proof (`/proof`) · Request Access pill unchanged. The old Calibration anchor link is removed — the Proof tab supersedes it (the `#calibration` section id stays on the landing page so old links don't break). Works from sub-pages (anchors become `/#...`). Mobile behaviour follows the existing pattern.

## Claim guardrails (hard constraints on copy)

From brief v11 honesty notes — the site must NOT state:
- Disease AUC (0.91–0.98) as infection-prediction accuracy — it is reproduction fidelity of a published formula.
- NDVI→yield as validated yield prediction — synthetic/self-referential for 5 of 7 crops, none field-validated.
- $18,000/ha as a market-measured figure — it is a configured registry parameter; use "tens of thousands per hectare" framing.
- Wind hour-exact accuracy — 97% is the day-level figure; say "damaging-wind days".
- Any named-competitor comparison.
- Pollination/wind/GDD figures as multi-region — they are single-location, 1-day-ahead; keep wording that doesn't imply national validation (or footnote it on /proof).

## Non-goals

- No visual redesign, palette change, or new fonts.
- No pricing page, about page, blog, or CMS.
- No backend/form changes; Request Access modal unchanged.
- No changes to legal pages.

## Technical notes

- Next.js 16 App Router: new routes as `src/app/intelligence/page.tsx` and `src/app/proof/page.tsx`; shared Nav/Footer/ModalProvider wrappers reused.
- New components live in `src/components/`, follow existing conventions (`useReveal`, Tailwind v4 tokens: `ink`, `ink-mute`, `leaf`, `paper`, `chrome-deep`, `accent`, `line`, `mint`).
- Stats live as data arrays in their components, consistent with current style.
- Verify with dev server on the user's port (3002 if 3000 conflicts — iCloud hazards memory), `npx tsc --noEmit`, `npm run lint`.

## Testing / acceptance

- All three pages render without console errors; nav works from every page including anchors from sub-pages.
- `tsc --noEmit` and `npm run lint` clean.
- Copy audit against the Claim Guardrails section above before commit.
- Responsive check at mobile width; reveal animations fire on scroll.
