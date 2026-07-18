# Work With Us Inline CTA Design

## Goal

Make the complete Work With Us experience visible in the initial desktop viewport while giving the booking action a deliberate, visually integrated position between the narrative and the pilot cards.

## Layout

- Remove the small `Work with us` eyebrow above the headline.
- Retain the centered headline and both existing narrative paragraphs.
- Render the existing animated booking pill immediately after the second paragraph, with the partner email directly beneath it.
- Keep the booking control visually independent from the three pilot cards; it must not appear as a fourth card or a floating overlay.
- Preserve the three equal pilot cards in one row beneath the booking control.
- Preserve the shared desktop content-axis adjustment: 3px left and 4px up.

## Viewport Fit

- At standard desktop viewport sizes, the navigation, headline, narrative, CTA, email, and all three cards must fit without vertical scrolling.
- Achieve this through responsive spacing and type sizing, not clipping, overlap, or hiding content.
- On shorter desktop viewports, reduce vertical gaps and card padding while preserving legibility.
- On mobile and narrow screens, allow normal document scrolling and stacked responsive content.

## Booking Behavior

- The inline booking pill opens the existing custom TerraMind booking modal.
- Keep the existing animated signal, sheen, hover response, partner email, modal copy, and Cal.com embed behavior.
- There must be only one booking trigger and one modal instance.

## Visual Treatment

- Use the pill as a centered bridge between narrative and cards.
- Give the CTA a subtle halo and glass treatment already established by the current component.
- Maintain clear vertical separation so neither the second paragraph nor the cards visually collide with the CTA.
- Do not add a new heading, card, scroll prompt, or competing callout.

## Verification

- Add layout assertions confirming the eyebrow is absent, the CTA is located between narrative and cards, and the CTA is no longer fixed-positioned.
- Verify the focused layout tests, lint, TypeScript compilation, production build, and diff whitespace checks.
- Inspect the page at a desktop viewport when local browser access is available; otherwise verify structure and responsive CSS mechanically.
