# Work With Us Booking Design

## Outcome

The Work With Us page must feel centered on the viewport and expose booking immediately without asking visitors to scroll. The existing inline calendar remains available lower on the page, while the opening view gains a prominent animated booking control.

## Layout

Hero copy, pilot cards, and booking content use one viewport-anchored shell. The shell derives its width from the viewport rather than nested section padding, keeping a single horizontal axis across desktop and mobile layouts. The hero keeps only a slight upward adjustment from its original spacing.

## Booking interaction

An animated glass-and-green “Book a call” control appears directly after the hero copy, within the opening viewport. Its glow and directional motion signal interactivity without copy telling the visitor to scroll. Clicking it opens a TerraMind-styled modal containing the booking context and the existing Cal.com calendar together. The duplicate lower booking section is removed, and the partner email appears below the CTA.

## Motion and accessibility

The CTA uses a restrained halo, sheen, and arrow movement consistent with TerraMind’s current motion language. It remains a semantic button with an explicit accessible label. Motion is disabled under `prefers-reduced-motion`.

## Verification

Regression checks assert the viewport-centered shell, first-screen booking control, Cal.com modal attributes, and preload instruction. The normal lint, TypeScript, and production build checks must remain clean.
