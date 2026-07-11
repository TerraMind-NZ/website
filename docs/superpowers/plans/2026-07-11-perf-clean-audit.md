# Performance + Clean-Code Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the TerraMind marketing site fast and keep every source file under 500 lines, with zero visual changes.

**Architecture:** Next.js 16 App Router site in `terramind-web/`. All changes are surgical: shrink oversized image assets, stop the hero canvas animation loop when it isn't visible, cache per-frame allocations, and split the one >500-line file (`globals.css`) into focused imports. No markup, copy, or style *values* change.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript 5.

---

## Audit findings (2026-07-11)

1. **`src/app/icon.png` is 908 KB (1631×1366)** — served as the favicon on every page load. Should be ≤512 px / a few KB.
2. **`public/logo-icon.png` is 908 KB (1631×1366)** — rendered at 28 px in the nav. Dev serves it near-raw; prod pays optimization cost.
3. **`public/logo.png` is 1.1 MB (2000×2000)** — unused by any page, so it never loads; leave it (may be linked externally).
4. **`HeroCanvas` rAF loop never pauses** when the hero is scrolled off-screen; every frame allocates ~50 canvas gradients (sky + glow + 22 mist + 26×2 firefly) and runs ~4,000 `ridgeY` trig evaluations. This taxes the main thread for the whole page visit.
5. **`globals.css` is 614 lines** — only file over the 500-line limit. Also duplicates every design token between `@theme inline` and `:root`.
6. Everything else is already clean: files are small, hooks are shared, listeners are passive and cleaned up, reveal animations use IntersectionObserver, reduced-motion is handled thoroughly.

---

### Task 1: Shrink image assets

**Files:**
- Modify: `terramind-web/src/app/icon.png` (resample to 96 px wide)
- Modify: `terramind-web/public/logo-icon.png` (resample to 168 px wide = 28 px × 6, covers 3× displays with headroom)

- [ ] **Step 1: Resample both PNGs with sips**

```bash
cd terramind-web
sips -Z 96 src/app/icon.png
sips -Z 168 public/logo-icon.png
du -h src/app/icon.png public/logo-icon.png
```
Expected: both files drop to a few KB / tens of KB.

- [ ] **Step 2: Commit**

```bash
git add src/app/icon.png public/logo-icon.png
git commit -m "perf: shrink 908KB favicon and nav logo sources"
```

### Task 2: Pause HeroCanvas when off-screen; hoist per-frame gradient allocations

**Files:**
- Modify: `terramind-web/src/components/HeroCanvas.tsx`

- [ ] **Step 1: Cache the sky gradient (rebuild only on resize), and gate the rAF loop behind an IntersectionObserver**

In the `useEffect`:
- Add `let skyGradient: CanvasGradient` rebuilt inside `resize()`.
- Replace the per-frame sky `createLinearGradient` with the cached one.
- Add:

```ts
let running = false;
const start = () => {
  if (running || reduced) return;
  running = true;
  raf = requestAnimationFrame(draw);
};
const stop = () => {
  running = false;
  cancelAnimationFrame(raf);
};
const io = new IntersectionObserver(([entry]) =>
  entry.isIntersecting ? start() : stop()
);
io.observe(canvas);
```
- In `draw`, schedule the next frame only while `running`.
- Draw one static frame immediately for the reduced-motion case (unchanged behavior).
- Cleanup: `io.disconnect()` plus existing teardown.

- [ ] **Step 2: Verify visuals unchanged in preview (screenshot before/after), check console clean**

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroCanvas.tsx
git commit -m "perf: pause hero canvas when off-screen, cache sky gradient"
```

### Task 3: Split globals.css under 500 lines and DRY the tokens

**Files:**
- Modify: `terramind-web/src/app/globals.css` (keep tokens, base, shared primitives)
- Create: `terramind-web/src/app/animations.css` (all motion/effect classes + reduced-motion block)
- Create: `terramind-web/src/app/legal.css` (`.legal-body` typography)

- [ ] **Step 1: Move rules verbatim** — `@import "./animations.css"; @import "./legal.css";` at the top of globals.css after the tailwind import. No rule text changes. Make `@theme inline` reference the `:root` vars (`--color-chrome: var(--chrome);` etc.) instead of duplicating hex values.

- [ ] **Step 2: Verify** — `wc -l` all three files < 500; preview screenshots identical; `npm run lint` and `npx tsc --noEmit` pass.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/animations.css src/app/legal.css
git commit -m "refactor: split globals.css under 500 lines, dedupe design tokens"
```

### Task 4: Full verification

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run lint` — clean
- [ ] `npm run build` — succeeds
- [ ] Preview: home, /intelligence, /proof, /work-with-us render identically (screenshots), no console errors
