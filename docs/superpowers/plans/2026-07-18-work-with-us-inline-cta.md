# Work With Us Inline CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the Work With Us eyebrow and integrate the existing booking CTA between the narrative and pilot cards while keeping the complete desktop composition visible without scrolling.

**Architecture:** Keep `BookingCTA` responsible for its trigger and modal, changing its only usage from fixed to inline rather than introducing another component or booking path. Compose the page as one shared centered shell containing hero copy, CTA, and cards, then use viewport-height media queries to tighten only vertical spacing on shorter desktop screens.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind utility classes, shared CSS, Node test runner

---

### Task 1: Lock the intended composition with failing tests

**Files:**
- Modify: `terramind-web/test/work-with-us-layout.test.mjs`
- Test: `terramind-web/test/work-with-us-layout.test.mjs`

- [ ] **Step 1: Replace the existing page-composition assertions**

Add assertions that require the eyebrow to be absent, require `BookingCTA` to appear between the second narrative paragraph and `PilotCards`, and require the CTA wrapper to use inline rather than fixed positioning:

```js
assert.doesNotMatch(pageSource, />\s*Work with us\s*</);

const secondParagraph = pageSource.indexOf("For growers tired");
const bookingCta = pageSource.indexOf("<BookingCTA />");
const pilotCards = pageSource.indexOf("<PilotCards />");

assert.ok(secondParagraph < bookingCta);
assert.ok(bookingCta < pilotCards);
assert.match(animationsSource, /\.booking-cta-wrap\s*\{[\s\S]*position:\s*relative/);
assert.doesNotMatch(animationsSource, /\.booking-cta-wrap\s*\{[\s\S]{0,180}position:\s*fixed/);
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run:

```bash
cd /Users/hasansheikh/dev/TerraMind-Web/terramind-web
node --test test/work-with-us-layout.test.mjs
```

Expected: the composition test fails because the eyebrow exists, `BookingCTA` follows the card section, and the wrapper is fixed.

### Task 2: Implement the inline viewport-fit composition

**Files:**
- Modify: `terramind-web/src/app/work-with-us/page.tsx`
- Modify: `terramind-web/src/components/BookingCTA.tsx`
- Modify: `terramind-web/src/app/animations.css`
- Modify: `terramind-web/src/app/base.css`
- Test: `terramind-web/test/work-with-us-layout.test.mjs`

- [ ] **Step 1: Change the CTA wrapper to an inline-only class**

The component has only one usage, so keep its modal logic intact and replace the wrapper class without adding an unused placement API:

```tsx
<div className="booking-cta-wrap booking-cta-wrap--inline flex flex-col items-center justify-center">
```

Do not change the button handler, partner email, React portal, modal copy, close behavior, or `CalEmbed` rendering.

- [ ] **Step 2: Compose the narrative, CTA, and cards in page order**

Remove the eyebrow and render the inline CTA after the second paragraph but before the card grid:

```tsx
<section className="work-with-us-stage relative px-6 text-center md:px-10">
  <div className="work-with-us-shell relative z-1">
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-5 font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.08] tracking-tight text-white">
        Join us in transforming
        <br />
        <em className="font-serif italic text-accent">horticulture</em>
      </h1>
      <p className="mx-auto mb-4 max-w-2xl text-[17px] leading-relaxed text-white/80">
        TerraMind is a fundamental reimagining of how horticultural decisions get made — the AI-powered platform growers have been waiting for: one that saves time, prevents losses, and puts the economics of every decision in plain sight, with the confidence interval attached.
      </p>
      <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-white/80">
        For growers tired of making six-figure calls without the tools to back them up. For an industry ready to move from signal to decision — choose TerraMind, configured to the way your orchard already works.
      </p>
    </div>
    <div className="work-with-us-booking-row">
      <BookingCTA />
    </div>
    <div className="work-with-us-cards">
      <PilotCards />
    </div>
  </div>
</section>
```

Delete the old second card section and the standalone `<BookingCTA />` after it.

- [ ] **Step 3: Add scoped inline CTA and viewport-fit styles**

Keep modal styles unchanged and scope placement rules so the inline CTA does not inherit fixed positioning:

```css
.booking-cta-wrap--inline {
  position: relative;
  z-index: 60;
  isolation: isolate;
}

.work-with-us-booking-row {
  display: flex;
  justify-content: center;
  margin: 22px 0 24px;
}

@media (min-width: 1024px) and (max-height: 900px) {
  .work-with-us-stage {
    padding-top: 88px;
    padding-bottom: 24px;
  }

  .work-with-us-booking-row {
    margin: 14px 0 16px;
  }

  .work-with-us-cards .card-lift-dark {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
```

Use class names on the page and cards that match these selectors. Preserve the approved desktop axis transform `translate(calc(-50% - 3px), -4px)`.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run:

```bash
node --test test/work-with-us-layout.test.mjs
```

Expected: all Work With Us layout tests pass.

### Task 3: Verify behavior and production readiness

**Files:**
- Verify: `terramind-web/src/app/work-with-us/page.tsx`
- Verify: `terramind-web/src/components/BookingCTA.tsx`
- Verify: `terramind-web/src/app/animations.css`
- Verify: `terramind-web/src/app/base.css`

- [ ] **Step 1: Run static verification**

Run:

```bash
node --test test/work-with-us-layout.test.mjs
npm run lint
npx tsc --noEmit
git diff --check
```

Expected: five or more focused tests pass; lint, TypeScript, and whitespace checks exit zero.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: Next.js completes the production build with exit code zero.

- [ ] **Step 3: Inspect the desktop viewport when browser access is available**

At the target desktop viewport, confirm the navigation, headline, both paragraphs, CTA and email, and all three cards are visible without scrolling. Confirm the CTA opens exactly one custom booking modal, the close control works, and no content overlaps.

- [ ] **Step 4: Commit the implementation**

```bash
git add terramind-web/src/app/work-with-us/page.tsx \
  terramind-web/src/components/BookingCTA.tsx \
  terramind-web/src/app/animations.css \
  terramind-web/src/app/base.css \
  terramind-web/test/work-with-us-layout.test.mjs
git commit -m "feat: integrate booking CTA into work-with-us page"
```
