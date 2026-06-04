<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

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
