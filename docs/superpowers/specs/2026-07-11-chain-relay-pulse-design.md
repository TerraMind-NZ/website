# Chain relay-pulse animation — design

**Date:** 2026-07-11
**Scope:** `terramind-web/src/components/ChainSteps.tsx`, `terramind-web/src/app/globals.css`

## Goal

Replace the current ambient chain animation (marching-dash connector lines + pulsing
endpoint dot) with a **relay pulse**: a pulse of energy perpetually travels the chain
left→right (top→bottom on mobile), lighting each card in turn. Applies automatically to
both consumers of `ChainSteps` (landing-page `DecisionPipeline`, intelligence-page
pipeline).

## Behaviour

- One full traversal takes ~1.5s per step; after the last step there is a ~1s quiet
  "breath" before the loop restarts. A 5-step chain loops every ~8.5s.
- Sequence per step *i*: card *i* glows for its beat, then the connector after it fires —
  the line brightens, a bright dot travels its length, and the arrowhead pops — handing
  off to card *i+1*.
- **Card "lit" state (noticeable glow):** border warms to leaf green, soft outer
  glow/box-shadow, slight mint background tint, and the step-number header brightens.
  No movement or scaling; the existing `card-lift` hover is untouched.
- Animation starts only once the ancestor section has scroll-revealed (gated under the
  existing `.reveal.in` pattern).
- Fully disabled under `prefers-reduced-motion` (static appearance, as today).

## Mechanics

Pure CSS, no JS timers. The container exposes `--steps` (step count); each card and
connector gets an index `--i`. Every animated piece runs a single keyframe animation
whose duration is the full cycle (`--chain-cycle: steps × step-duration + breath`) with
`animation-delay: calc(var(--i) × step-duration)`, so pieces fire in sequence and stay
in sync for any step count. The active window lives in the first ~20% of each element's
keyframe timeline.

Card glow is a `::after` overlay (absolute inset, inherited radius, opacity-animated) so
the infinite animation never fights the hover transition on the card itself. The
travelling dot is an SVG circle animated with `translateX` (horizontal) / `translateY`
(vertical connector).

## Out of scope

Entrance/reveal changes (existing `stagger` rise stays), hover behaviour changes, other
sections' animations.
