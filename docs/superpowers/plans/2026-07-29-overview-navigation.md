# Overview Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the misleading Platform navigation category with a homepage-wide Overview destination and meaningful deep links.

**Architecture:** Keep the existing page structure and styling. Update navigation copy and destinations in place, give the relevant homepage sections stable anchors, preserve the legacy `#platform` target, and protect the information architecture with one source-level regression test.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Node test runner

---

### Task 1: Overview navigation and deep links

**Files:**
- Create: `terramind-web/test/overview-navigation.test.mjs`
- Modify: `terramind-web/src/components/Nav.tsx`
- Modify: `terramind-web/src/components/Hero.tsx`
- Modify: `terramind-web/src/components/PlatformRows.tsx`
- Modify: `terramind-web/src/components/EconomicsBand.tsx`
- Modify: `terramind-web/src/components/HardwareSection.tsx`
- Modify: `terramind-web/src/components/Footer.tsx`

- [ ] **Step 1: Write the failing regression test**

Create a source-level test asserting:

```js
assert.match(navSource, /\{ href: "\/", label: "Overview" \}/);
assert.match(heroSource, /href="#problem"/);
assert.match(heroSource, /See how it works/);
assert.match(platformSource, /id="predictions"/);
assert.match(platformSource, />Prediction areas</);
assert.match(platformSource, /id="platform"/);
assert.match(economicsSource, /id="economics"/);
assert.match(hardwareSource, /id="soil-scouter"/);
assert.match(footerSource, />Overview</);
assert.match(footerSource, /href="\/#problem"[\s\S]*How it works/);
assert.match(footerSource, /href="\/#predictions"[\s\S]*Prediction areas/);
assert.match(footerSource, /href="\/#economics"[\s\S]*Decision economics/);
assert.match(footerSource, /href="\/#soil-scouter"[\s\S]*Soil Scouter/);
```

- [ ] **Step 2: Verify the test fails**

Run:

```bash
cd terramind-web
node --test test/overview-navigation.test.mjs
```

Expected: failure because `Platform`, `See the platform`, and the old footer structure still exist.

- [ ] **Step 3: Implement the Overview information architecture**

Make these minimal changes:

```tsx
// Nav.tsx
{ href: "/", label: "Overview" }

// Hero.tsx
<a href="#problem">See how it works</a>

// PlatformRows.tsx
<section id="predictions">
  <span id="platform" aria-hidden />
  <div>Prediction areas</div>
</section>

// EconomicsBand.tsx
<section id="economics">

// HardwareSection.tsx
<section id="soil-scouter">
```

Replace the footer `Platform` column with:

```tsx
Overview
How it works → /#problem
Prediction areas → /#predictions
Decision economics → /#economics
Soil Scouter → /#soil-scouter
```

- [ ] **Step 4: Verify the focused test passes**

Run:

```bash
node --test test/overview-navigation.test.mjs
```

Expected: one passing test.

- [ ] **Step 5: Verify the complete project**

Run:

```bash
node --test test/*.test.mjs
npm run lint
npx tsc --noEmit
```

Expected: all commands exit successfully.
