# Overview Navigation Design

## Goal

Replace the misleading `Platform` top-level category with an `Overview` category that accurately represents the whole homepage: the problem, Harvora's answer, onboarding, decision pipeline, prediction areas, economics, and hardware.

## Navigation

The primary navigation becomes:

1. `Overview` → `/`
2. `Intelligence` → `/intelligence`
3. `Proof` → `/proof`

`Overview` is a homepage destination, not a synonym for the prediction-area section.

## Hero CTA

Replace `See the platform` with `See how it works`.

The CTA links to `#problem`, beginning the homepage explanation at the problem-and-solution section directly below the hero.

## Prediction-Area Section

Keep the existing Frost, Water & Irrigation, Disease Risk, Harvest & Phenology, Annual Crop Intelligence, Insect Phenology, Pollination & Wind, Spray Window, and Soil Scouter rows.

Rename the visible section eyebrow from `The platform` to `Prediction areas`. Use `predictions` as the primary section anchor. Preserve the old `platform` anchor as a non-visible compatibility target so existing external links do not break.

## Footer

Replace the `Platform` footer column and its four same-destination links with an `Overview` column containing meaningful homepage deep links:

- `How it works` → `/#problem`
- `Prediction areas` → `/#predictions`
- `Decision economics` → `/#economics`
- `Soil Scouter` → `/#soil-scouter`

Add stable section IDs to the economics and hardware sections for these links.

## Responsive Behaviour

Desktop and mobile navigation use the same `Overview` label and `/` destination. The mobile menu continues to close after a selection. Existing layout and visual styling remain unchanged.

## Verification

- Automated source-level coverage checks the new navigation, CTA, section label, footer links, and compatibility anchor.
- Desktop and mobile browser checks confirm the navigation label and destination.
- Each footer deep link is checked against a unique section target.
- Run the complete test suite, lint, and TypeScript checks.
