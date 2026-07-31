# Harvora Web

Marketing website for Harvora — agricultural intelligence for horticulture growers.

## Project

All source code lives in [`harvora-web/`](harvora-web/).

```bash
cd harvora-web
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

Vercel is linked to the `harvora-web/` subdirectory. Pushes to `main` trigger automatic deploys.
