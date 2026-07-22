# Swap Radar

Decision layer for free/near-free place-trading — home exchange, credit swaps, luxury clubs, and house sitting.

Not a scraped inventory mirror. A comparison + quiz product that routes pre-qualified traffic to platforms via tracked `/go` links.

## Quick start

```bash
cd swap-radar
npm install
npm run dev      # http://localhost:3000
npm test         # quiz scorer unit tests
npm run build
```

## What's implemented

| Area | Location |
|------|----------|
| Platform seed (8 networks) | `src/data/platforms.ts` |
| Quiz rules v1 scorer | `src/lib/quiz/score.ts` |
| Questions + copy | `src/lib/quiz/questions.ts`, `copy.ts` |
| Unit tests (examples A–E) | `src/lib/quiz/score.test.ts` |
| Quiz UI | `/quiz` · `src/components/QuizForm.tsx` |
| Compare table | `/compare` |
| Savings calculator | `/tools/savings-calculator` · `src/lib/calculator/` |
| Affiliate URL resolution | `src/lib/affiliates.ts` · `.env.example` |
| Clickout persistence | `.data/clickouts.jsonl` · `/admin/clickouts` · `GET /api/clickouts` |
| SEO guides (10) | `/guides/*`, `/compare/*-vs-*`, `/destinations/*` |
| Tracked redirects | `/go/[slug]` |

## Affiliates & clickouts

1. Copy `.env.example` → `.env.local`
2. Paste approved affiliate URLs into `AFFILIATE_*_URL`
3. Optional: `CLICKOUTS_ADMIN_TOKEN`, `POSTHOG_API_KEY`
4. Outbound links always use `/go/{slug}?src=…` so clickouts are recorded

## Product docs

| Doc | Purpose |
|-----|---------|
| [docs/PRD.md](docs/PRD.md) | MVP PRD |
| [docs/quiz-decision-tree.md](docs/quiz-decision-tree.md) | Scoring rules source of truth |
| [docs/content-outline.md](docs/content-outline.md) | First 10 SEO pages |

## Product in one line

> Verified multi-platform decision engine (directory + quiz + calculator + destination SEO + affiliate clickouts), then a human intent board and light city-coverage signals.
