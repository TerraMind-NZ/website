# Work With Us Booking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Center the Work With Us experience on the viewport and make booking immediately available through an animated TerraMind booking modal.

**Architecture:** A reusable client-side `BookingCTA` renders the hero control and portals an accessible TerraMind-styled modal containing the booking context and `CalEmbed`. A shared CSS shell anchors each major page region to the viewport center, while the duplicate lower booking section is removed.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Cal.com embed loader, Node test runner.

---

### Task 1: Regression coverage

**Files:**
- Modify: `terramind-web/test/work-with-us-layout.test.mjs`

- [ ] Assert that the page renders `BookingCTA`, uses the viewport-centered shell three times, and retains only the slight `pt-28` upward adjustment.
- [ ] Assert that `BookingCTA` contains `data-cal-link`, `data-cal-namespace`, and modal configuration.
- [ ] Assert that `CalEmbed` preloads the booking link.
- [ ] Run `node --test test/work-with-us-layout.test.mjs` and confirm the new assertions fail before implementation.

### Task 2: Booking modal trigger

**Files:**
- Create: `terramind-web/src/components/BookingCTA.tsx`
- Modify: `terramind-web/src/components/CalEmbed.tsx`
- Modify: `terramind-web/src/app/work-with-us/page.tsx`

- [ ] Create a semantic booking button with the Cal.com element-click attributes and concise booking context.
- [ ] Export and reuse the Cal link and namespace rather than duplicating them.
- [ ] Preload the event from `CalEmbed` after namespace initialization.
- [ ] Render the CTA after the hero paragraphs so it is visible in the opening viewport.
- [ ] Run the focused test and confirm it passes.

### Task 3: Centering and motion

**Files:**
- Modify: `terramind-web/src/app/base.css`
- Modify: `terramind-web/src/app/animations.css`

- [ ] Define a viewport-width shell centered with `left: 50%` and `translateX(-50%)`, bounded to 1100px.
- [ ] Add halo, sheen, and arrow animations matching the existing green-on-dark visual language.
- [ ] Disable nonessential CTA animation under `prefers-reduced-motion`.
- [ ] Run `node --test test/work-with-us-layout.test.mjs`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
