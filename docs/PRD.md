# Swap Radar — MVP PRD

**Status:** Draft for implementation  
**Owner:** Founder  
**Horizon:** 6–8 weeks to public MVP  
**Last updated:** 2026-07-20

---

## Problem

People who want to offset housing costs while living elsewhere (weeks or months) face a fragmented landscape: simultaneous home exchange, points/credits networks, luxury second-home clubs, house-sitting, and mid-term furnished housing. Comparison content is stale and bloggy. Platforms gate inventory behind membership. Users pick the wrong network, bounce, or never convert.

## Solution

**Swap Radar** is the decision layer: verified platform data, a short recommender quiz, a savings calculator, destination/comparison SEO pages, and tracked outbound links. We push warm traffic to platforms; we do not scrape or host full listing catalogs.

## Goals

| Goal | Metric (90 days) |
|------|------------------|
| Own decision intent | Rank top 10 for ≥3 head terms; top 5 for ≥2 “vs” pages |
| Convert confusion → signup | ≥15% quiz complete → outbound click |
| Monetize traffic | ≥2 live affiliate/referral programs paying |
| Own audience | ≥500 email subscribers |
| Prove product loop | Quiz start ≥8% of homepage sessions |

## Non-goals (v1)

- Live multi-platform home inventory search
- Messaging, booking, or payments for stays
- Login-walled scrapes / photo mirrors
- Mobile native apps
- Social network profiles

## Personas

1. **Curious owner** — Has a primary home; wants 1–3 trips/year without hotel bills.  
2. **Long-stay explorer** — Wants 1–3 months abroad; needs flexibility on simultaneous vs credits.  
3. **No-home traveler** — Cannot offer a home; needs sitting / mid-term alternatives.  
4. **Second-home owner** — Luxury / vacation property; wants reciprocal high-end stays.

## User stories & acceptance criteria

### US-1 — Discover the right platform

**As a** first-time swapper,  
**I want** a clear comparison of models and platforms,  
**so that** I don’t pay for the wrong membership.

| # | Acceptance criteria |
|---|---------------------|
| AC-1.1 | `/compare` shows ≥8 platforms in a structured table (fees, model, coverage, insurance, renter OK, invite-only). |
| AC-1.2 | Each cell links to a platform detail page with methodology and `last_verified` date. |
| AC-1.3 | Table is filterable by model (simultaneous / points / credits / sitting / luxury). |
| AC-1.4 | Every fee claim shows source + verification date. |

### US-2 — Get a personalized recommendation

**As a** visitor who doesn’t know the jargon,  
**I want** a short quiz,  
**so that** I get ranked platforms with plain-language reasons.

| # | Acceptance criteria |
|---|---------------------|
| AC-2.1 | Quiz has 6–10 questions; completable in &lt;90 seconds. |
| AC-2.2 | Results show top 3 platforms, each with a one-line “why you,” ranked by score. |
| AC-2.3 | Results include risk notes when relevant (e.g. renter / lease). |
| AC-2.4 | Primary + secondary CTA use tracked `/go/{platform}` redirects. |
| AC-2.5 | User can email/PDF results (email capture optional but encouraged). |
| AC-2.6 | Scoring follows `quiz-decision-tree.md` (versioned). |

### US-3 — Estimate savings

**As a** budget-conscious traveler,  
**I want** a calculator,  
**so that** I know break-even nights vs hotels.

| # | Acceptance criteria |
|---|---------------------|
| AC-3.1 | Inputs: origin optional, destination, nights, hotel nightly (defaulted), membership fee, cleaning estimate. |
| AC-3.2 | Outputs: $ saved vs hotel, break-even nights, one-line summary suitable for sharing. |
| AC-3.3 | OG/share card works for social and embeds. |
| AC-3.4 | Defaults exist for ≥20 seed cities’ hotel baselines. |

### US-4 — Research a destination

**As a** someone targeting a city,  
**I want** a destination page,  
**so that** I know which platforms are strong there and can click through.

| # | Acceptance criteria |
|---|---------------------|
| AC-4.1 | Template pages for seed destinations (see content outline). |
| AC-4.2 | Each page lists recommended platforms + deep-link search CTAs where URLs allow. |
| AC-4.3 | Includes hotel baseline, renter notes, and internal links to quiz/compare. |
| AC-4.4 | No claim of live full inventory counts without methodology. |

### US-5 — Leave for a platform and get attributed

**As the** business,  
**I want** every outbound join link tracked,  
**so that** I can optimize content and prove affiliate value.

| # | Acceptance criteria |
|---|---------------------|
| AC-5.1 | All CTAs go through `/go/{slug}?src={page}` (or equivalent). |
| AC-5.2 | Clickouts logged: platform, source page, UTM, timestamp, quiz_id if any. |
| AC-5.3 | Affiliate network cookies/params preserved on final redirect. |
| AC-5.4 | Admin or analytics can report clickouts per page and per platform. |

### US-6 — Capture follow-up intent

**As a** visitor not ready to join today,  
**I want** to leave my email,  
**so that** I get fee changes and planning tips.

| # | Acceptance criteria |
|---|---------------------|
| AC-6.1 | Email capture on quiz results, calculator, and ≥1 pillar page. |
| AC-6.2 | Double-opt-in or compliant single opt-in with clear privacy copy. |
| AC-6.3 | Stored with quiz answers (if any) and recommended platforms. |

### US-7 — Trust the data

**As a** skeptical reader,  
**I want** freshness and honesty,  
**so that** I trust recommendations over random blogs.

| # | Acceptance criteria |
|---|---------------------|
| AC-7.1 | Platform records include `last_verified_at`. |
| AC-7.2 | Site states what we don’t do (no full scraped catalogs). |
| AC-7.3 | Affiliate disclosure present on all monetized pages. |
| AC-7.4 | “When not to swap” section on main pillar guide. |

## Functional scope (v1)

| Module | Priority |
|--------|----------|
| Platform directory + detail pages | P0 |
| Compare table | P0 |
| Quiz + results | P0 |
| `/go` affiliate redirects + logging | P0 |
| Savings calculator | P0 |
| 3 pillar SEO pages | P0 |
| 2 “vs” pages | P0 |
| 5 destination pages (of 20 planned) | P0 |
| Email capture | P0 |
| Remaining 5 of first-10 content pages | P1 |
| Remaining destinations | P1 |
| Intent board (offer/seek posts) | P2 |
| City “thickness” estimates | P2 |

## Data model (minimum)

```
Platform {
  slug, name, model[], pricing_summary, pricing_detail,
  insurance_summary, renter_ok, invite_only, luxury,
  coverage_notes, affiliate_url, referral_notes,
  last_verified_at, scores{} // optional editorial scores
}

Destination {
  slug, city, country, hotel_nightly_default,
  platform_strength_notes, renter_notes
}

QuizSession {
  id, answers{}, scores{}, ranked_slugs[], email?, created_at
}

Clickout {
  id, platform_slug, source_path, utm, quiz_session_id?, created_at
}

Lead {
  email, source, quiz_session_id?, created_at
}
```

## Tech constraints

- Static-friendly site + small backend for quiz sessions, leads, clickouts (e.g. Next.js + Postgres).
- CMS or MDX for guides OK.
- No requirement for real-time listing APIs in v1.
- Scoring rules versioned in code (`QUIZ_RULES_VERSION`).

## Analytics events

- `quiz_started`, `quiz_answered` (q_id), `quiz_completed`
- `calculator_used`
- `clickout` (platform, source)
- `email_submitted`
- `destination_cta_clicked`

## Launch checklist

- [ ] ≥8 platforms seeded and verified  
- [ ] Quiz matches decision tree v1  
- [ ] Calculator live with 20 city defaults  
- [ ] Affiliates applied: HomeExchange-class + TrustedHousesitters-class minimum  
- [ ] Affiliate disclosure + privacy policy  
- [ ] `/go` logging live  
- [ ] First 10 content pages published (see content outline)  
- [ ] Basic SEO: titles, metas, sitemap, OG images  

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Thin affiliate programs | Lead with THS + HE; content still builds brand deals |
| Stale competitor blogs rank | Fresher structured data + tools + `last_verified` |
| Legal/scrape temptation | Deep-links + UGC intents only; no catalog mirror |
| Wrong recommendations hurt trust | Explicit disclaimers; “secondary” options; renter warnings |

## Open questions

1. Final brand name (Swap Radar is working title).  
2. Which 8–12 platforms at launch (must include HE, Kindred, ThirdHome, TrustedHousesitters).  
3. Email tool (Resend / ConvertKit / Buttondown).  
4. Whether renters get a hard “sitting-first” path or soft ranking only.

## Success definition (MVP done)

A stranger can land, complete the quiz in under 90 seconds, understand *why* platforms were ranked, click through a tracked link, and optionally leave an email — and the first 10 SEO pages exist with internal links into that funnel.
