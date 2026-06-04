# Repository Cleanup & Architecture Consolidation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse four overlapping project folders into one canonical Next.js app (`terramind-web/`) and delete all stale/duplicate artefacts so the repo has a single clear source of truth.

**Architecture:** The repo currently has four versions of the same site living side-by-side: a root-level static HTML file, a duplicate of that HTML in `terramind-site/`, a stale Next.js copy in `terramind-next/`, and the live/canonical Next.js app in `terramind-web/`. Only `terramind-web/` is Vercel-linked and receives commits; everything else is dead weight. The plan deletes the three dead folders and root-level cruft, leaving `terramind-web/` as the sole project inside the repo.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Vercel

---

## What each folder actually is

| Path | What it is | Status |
|---|---|---|
| `/index.html` | Original vanilla HTML/CSS site (1285 lines) | Dead — superseded by Next.js |
| `/vercel.json` | Vercel config for the static HTML site | Dead — wrong for Next.js |
| `/3.png` | Unreferenced image at repo root | Dead — orphaned asset |
| `terramind-site/` | 100% byte-for-byte duplicate of `/index.html` + own `vercel.json` | Dead — exact duplicate |
| `terramind-next/` | Next.js port — identical structure to `terramind-web/` but 4 files are older (`Hero.tsx`, `PlatformSection.tsx`, `VisionSection.tsx`, `globals.css`) | Dead — stale intermediate step |
| `terramind-web/` | **Canonical app.** Vercel-linked (`prj_kDqBqWQUtVzJ2v4K1hKG0KGXG48a`). All recent commits touch this. | **ACTIVE — keep everything** |

---

## Files to create / modify

- Delete: `index.html` (root)
- Delete: `vercel.json` (root) — `terramind-web/vercel.json` is the live one
- Delete: `3.png` (root)
- Delete: `terramind-site/` (entire folder)
- Delete: `terramind-next/` (entire folder)
- Modify: `README.md` (root) — update to describe the actual repo structure
- Modify: `terramind-web/CLAUDE.md` — ensure it reflects canonical status and points agents to this folder

---

## Task 1: Verify the canonical app builds cleanly before touching anything

Before deleting anything, confirm `terramind-web/` is healthy. You need a baseline.

**Files:** `terramind-web/` (read-only verification)

- [ ] **Step 1: Run type-check**

```bash
cd terramind-web && npx tsc --noEmit
```

Expected: no errors. If errors exist, stop and fix them before continuing.

- [ ] **Step 2: Run lint**

```bash
cd terramind-web && npm run lint
```

Expected: no errors or only warnings. Errors must be fixed before continuing.

- [ ] **Step 3: Confirm the dev server starts**

```bash
cd terramind-web && npm run dev -- --port 3001
```

Expected: "✓ Ready" message and `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001` returns `200`.

- [ ] **Step 4: Commit a clean baseline**

```bash
git add -A
git commit -m "chore: baseline — no changes, pre-cleanup verification"
```

Only commit if there were zero uncommitted changes at the start (i.e. working tree was clean). If the tree was already clean, skip this step.

---

## Task 2: Delete `terramind-site/`

This folder is a 100% identical copy of `/index.html` and has never received a unique commit.

**Files:** Delete `terramind-site/`

- [ ] **Step 1: Confirm it's identical to root index.html**

```bash
diff index.html terramind-site/index.html && echo "IDENTICAL — safe to delete"
```

Expected output: `IDENTICAL — safe to delete`. If output shows differences, stop and review before deleting.

- [ ] **Step 2: Delete the folder**

```bash
rm -rf terramind-site
```

- [ ] **Step 3: Confirm deletion**

```bash
ls terramind-site 2>/dev/null && echo "ERROR: still exists" || echo "OK: deleted"
```

Expected: `OK: deleted`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove terramind-site — exact duplicate of root index.html"
```

---

## Task 3: Delete `terramind-next/`

This folder is a stale Next.js copy identical to `terramind-web/` except 4 files are older versions. It is not linked to Vercel and has received no commits since `708c60c`.

**Files:** Delete `terramind-next/`

- [ ] **Step 1: Confirm which files differ (for the record)**

```bash
diff -rq --exclude="node_modules" --exclude=".next" --exclude="package-lock.json" terramind-next/src terramind-web/src
```

Expected: only `Hero.tsx`, `PlatformSection.tsx`, `VisionSection.tsx`, `globals.css` differ. `terramind-web/` has the newer versions of all four.

- [ ] **Step 2: Delete the folder**

```bash
rm -rf terramind-next
```

- [ ] **Step 3: Confirm deletion**

```bash
ls terramind-next 2>/dev/null && echo "ERROR: still exists" || echo "OK: deleted"
```

Expected: `OK: deleted`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove terramind-next — stale intermediate copy, superseded by terramind-web"
```

---

## Task 4: Remove root-level HTML-era artefacts

The root `index.html`, `vercel.json`, and `3.png` belong to the pre-Next.js era. The Vercel deployment now uses `terramind-web/vercel.json`.

**Files:** Delete `index.html`, `vercel.json`, `3.png` at repo root

- [ ] **Step 1: Check 3.png is not referenced**

```bash
grep -r "3\.png" . --include="*.tsx" --include="*.ts" --include="*.html" --include="*.css" --include="*.md" 2>/dev/null
```

Expected: no output (file is unreferenced). If it IS referenced somewhere, investigate before deleting.

- [ ] **Step 2: Delete the three root-level artefacts**

```bash
rm index.html vercel.json 3.png
```

- [ ] **Step 3: Confirm deletion**

```bash
ls index.html vercel.json 3.png 2>/dev/null && echo "ERROR: files remain" || echo "OK: deleted"
```

Expected: `OK: deleted`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove root index.html, vercel.json, 3.png — HTML-era artefacts replaced by terramind-web"
```

---

## Task 5: Update root README.md

The root `README.md` likely describes the old structure. Update it so any developer cloning the repo immediately understands what's here.

**Files:** Modify `README.md` (root)

- [ ] **Step 1: Read the current README**

```bash
cat README.md
```

- [ ] **Step 2: Rewrite it to describe the actual structure**

Replace the entire content of `README.md` with:

```markdown
# TerraMind Web

Marketing website for [TerraMind](https://terramind.co.nz) — agricultural intelligence for horticulture growers.

## Project

All source code lives in [`terramind-web/`](terramind-web/).

```bash
cd terramind-web
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
npx tsc --noEmit   # type-check
```

## Stack

- Next.js 16 (Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS v4
- Deployed on Vercel

## Deploy

Vercel is linked to the `terramind-web/` subdirectory. Pushes to `main` trigger automatic deploys.
```

- [ ] **Step 3: Verify the file looks right**

```bash
cat README.md
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: update root README to reflect terramind-web as sole project"
```

---

## Task 6: Update `terramind-web/AGENTS.md` to reflect canonical status

`terramind-web/CLAUDE.md` imports `AGENTS.md` via `@AGENTS.md`, so canonical context belongs in `AGENTS.md` — both files stay in sync automatically without duplication.

**Files:** Modify `terramind-web/AGENTS.md`

- [ ] **Step 1: Read current CLAUDE.md and AGENTS.md**

```bash
cat terramind-web/CLAUDE.md
cat terramind-web/AGENTS.md
```

- [ ] **Step 2: Update `terramind-web/AGENTS.md`**

Append below the existing `<!-- END:nextjs-agent-rules -->` block:

```markdown
# Project Context

This directory (`terramind-web/`) is the **canonical source of truth** for the TerraMind marketing website. It is the only active project in this repository.

## Key facts
- Deployed on Vercel (project ID: `prj_kDqBqWQUtVzJ2v4K1hKG0KGXG48a`)
- Stack: Next.js 16, React 19, TypeScript 5, Tailwind CSS v4
- Dev server: `npm run dev` → http://localhost:3000
- Type-check: `npx tsc --noEmit`
- Lint: `npm run lint`

## Source structure
- `src/app/` — Next.js App Router entry points (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/` — All page sections (Hero, Nav, PlatformSection, VisionSection, etc.)
- `src/hooks/` — Shared React hooks (`useParallax`, `useReveal`, `useScrolled`)
- `public/` — Static assets (logo, icons)
```

- [ ] **Step 3: Confirm CLAUDE.md still just says `@AGENTS.md`**

```bash
cat terramind-web/CLAUDE.md
```

Expected: single line `@AGENTS.md`. No changes needed — it automatically picks up everything in AGENTS.md.

- [ ] **Step 4: Commit**

```bash
git add terramind-web/AGENTS.md
git commit -m "docs: add canonical project context to AGENTS.md (CLAUDE.md imports it via @AGENTS.md)"
```

---

## Task 7: Final verification

Confirm the repo is clean and `terramind-web/` still works.

- [ ] **Step 1: Check repo root is clean**

```bash
ls -la
```

Expected: only `docs/`, `terramind-web/`, `README.md`, `.gitignore`, `.git` (and `.DS_Store` on macOS is fine). No `index.html`, no `vercel.json`, no `3.png`, no `terramind-site/`, no `terramind-next/`.

- [ ] **Step 2: Run type-check on the canonical app**

```bash
cd terramind-web && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Confirm dev server starts**

```bash
cd terramind-web && npm run dev -- --port 3001
```

Expected: `✓ Ready` and `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001` returns `200`.

- [ ] **Step 4: Check git log is clean**

```bash
git log --oneline -8
```

Expected: the 5 cleanup commits from Tasks 2–6 appear on top of the original history.

---

## Self-review notes

- Tasks are ordered conservatively (verify first, delete last) so nothing is deleted before it's confirmed safe.
- `terramind-web/.vercel/` folder is intentionally kept — it stores the Vercel project link and must not be deleted.
- `terramind-web/node_modules/` is in `.gitignore` and is not tracked; no action needed.
- The `docs/superpowers/plans/` folder created for this plan should be kept — it's useful project documentation.
- No components are being refactored in this plan. The scope is delete-dead-things only.
