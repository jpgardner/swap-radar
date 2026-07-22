# Swap Radar — Quiz Decision Tree (v1)

**Rules version:** `quiz_rules_v1`  
**Target completion time:** &lt;90 seconds  
**Output:** Ranked top 3 platforms + reasons + risk notes + CTAs  

Implement as pure functions: `score(answers) → { rankings, notes, primary, secondary }`.

---

## Platforms in scoring set (v1)

| Slug | Label | Model tags |
|------|-------|------------|
| `homeexchange` | HomeExchange | simultaneous, points, global |
| `kindred` | Kindred | credits, verified, invite |
| `thirdhome` | ThirdHome | luxury, second_home, keys |
| `trustedhousesitters` | TrustedHousesitters | sitting, no_home_required |
| `peoplelikeus` | People Like Us | simultaneous, community |
| `homelink` | HomeLink | simultaneous, traditional |
| `behomm` | Behomm | design, creative, simultaneous |
| `sabbaticalhomes` | SabbaticalHomes | midterm, academic, rental_ok |

> Add/remove slugs in one config file; never hardcode in UI copy only.

---

## Questions

Ask in this order. All required except Q8.

### Q1 — `housing_status`

**Copy:** What best describes your housing?

| Value | Label |
|-------|--------|
| `own_primary` | I own (or fully control) my primary home |
| `own_second` | I have a second / vacation home |
| `rent` | I rent my primary home |
| `no_home` | I don’t have a home to offer |

### Q2 — `trip_length`

**Copy:** How long do you usually want to stay?

| Value | Label |
|-------|--------|
| `weekend` | Weekends / long weekends |
| `weeks` | 1–2 weeks |
| `month` | About a month |
| `long` | 1–3+ months |
| `mixed` | Mix of short and long |

### Q3 — `simultaneous_ok`

**Copy:** Can you leave home when guests arrive (true simultaneous swap)?

| Value | Label |
|-------|--------|
| `yes` | Yes — classic swap works for me |
| `no` | No — I need flexible / non-simultaneous timing |
| `either` | Either works |

### Q4 — `budget_membership`

**Copy:** What will you spend on memberships this year?

| Value | Label |
|-------|--------|
| `free` | Prefer free / pay-per-use only |
| `low` | Up to ~$150 |
| `mid` | ~$150–300 |
| `high` | $300+ is fine if it fits |

### Q5 — `luxury`

**Copy:** What kind of places are you aiming for?

| Value | Label |
|-------|--------|
| `normal` | Normal homes / apartments |
| `nice` | Nice, well-kept places |
| `luxury` | High-end / luxury second homes |

### Q6 — `travel_style`

**Copy:** What matters most?

| Value | Label |
|-------|--------|
| `volume` | Maximum choice of cities and homes |
| `trust` | Vetting, cleaning, protection, polish |
| `community` | Warm community / personal matching |
| `design` | Design-forward / creative homes |
| `work` | Work-friendly long stays / academic mid-term |

### Q7 — `pets_kids` (multi-select OK; store as array)

**Copy:** Any of these apply? (optional multi)

| Value | Label |
|-------|--------|
| `pets_have` | I have pets that stay or travel |
| `pets_ok` | I’m fine hosting pets |
| `kids` | Traveling with kids |
| `none` | None of these |

If UI is single-select, use: `none` | `pets` | `kids` | `pets_and_kids`.

### Q8 — `destinations` (optional multi, max 5)

**Copy:** Any destinations in mind? (optional)

Free text tags or select from seed city list. Used for copy on results (“For Lisbon-style trips…”) and deep-links — **not** for hard scoring in v1.

---

## Scoring model

### Base weights

Each platform starts at `0`. Apply additive rules. Clamp final scores to ≥0. Sort descending; tie-break order:

1. `homeexchange`  
2. `kindred`  
3. `trustedhousesitters`  
4. `thirdhome`  
5. `peoplelikeus`  
6. `homelink`  
7. `sabbaticalhomes`  
8. `behomm`

### Rule table

Apply **all** matching rules.

#### From Q1 — housing_status

| Condition | Effects |
|-----------|---------|
| `own_primary` | +5 homeexchange, +4 kindred, +3 peoplelikeus, +2 homelink, +1 behomm |
| `own_second` | +6 thirdhome, +4 homeexchange, +2 kindred |
| `rent` | +5 trustedhousesitters, +4 sabbaticalhomes, +2 homeexchange *(with renter note)*, +1 kindred *(renter note)* |
| `no_home` | +8 trustedhousesitters, +5 sabbaticalhomes; **zero-out** pure exchange-only unless also scoring midterm path: set homeexchange, kindred, peoplelikeus, homelink, behomm, thirdhome base contribution from other rules max **2** total unless later rules add sitting-adjacent |

**Implementation note for `no_home`:**  
After all rules, if `housing_status == no_home`, force:

- `trustedhousesitters` score = max(score, 12)  
- `sabbaticalhomes` score = max(score, 8)  
- All pure-swap platforms: `score = min(score, 3)` and add risk note `must_offer_home`

#### From Q2 — trip_length

| Condition | Effects |
|-----------|---------|
| `weekend` | +3 kindred, +2 homeexchange, +2 trustedhousesitters |
| `weeks` | +4 homeexchange, +3 kindred, +2 peoplelikeus, +2 trustedhousesitters |
| `month` | +4 homeexchange, +3 kindred, +3 sabbaticalhomes, +2 trustedhousesitters |
| `long` | +5 sabbaticalhomes, +4 homeexchange, +2 kindred, +2 trustedhousesitters |
| `mixed` | +3 homeexchange, +3 kindred, +2 trustedhousesitters, +2 sabbaticalhomes |

#### From Q3 — simultaneous_ok

| Condition | Effects |
|-----------|---------|
| `yes` | +4 homeexchange, +3 peoplelikeus, +3 homelink, +2 behomm, +1 kindred |
| `no` | +5 kindred, +4 homeexchange *(points path)*, +3 sabbaticalhomes, +2 trustedhousesitters; −2 peoplelikeus, −2 homelink, −2 behomm |
| `either` | +3 homeexchange, +3 kindred, +1 peoplelikeus |

#### From Q4 — budget_membership

| Condition | Effects |
|-----------|---------|
| `free` | +4 trustedhousesitters *(still has membership—frame as alt)*, +2 kindred; −3 homeexchange if user insisted free-only → prefer note “most exchanges need a membership”; soft: +1 sabbaticalhomes |
| `low` | +3 kindred, +2 trustedhousesitters, +2 homeexchange |
| `mid` | +4 homeexchange, +3 kindred, +2 trustedhousesitters, +1 peoplelikeus |
| `high` | +3 homeexchange, +3 thirdhome, +2 kindred, +1 homelink |

#### From Q5 — luxury

| Condition | Effects |
|-----------|---------|
| `normal` | +2 homeexchange, +2 kindred, +2 trustedhousesitters, +1 peoplelikeus |
| `nice` | +3 kindred, +3 homeexchange, +1 behomm |
| `luxury` | +8 thirdhome, +2 homeexchange; −1 trustedhousesitters |

#### From Q6 — travel_style

| Condition | Effects |
|-----------|---------|
| `volume` | +6 homeexchange, +2 kindred, +1 trustedhousesitters |
| `trust` | +5 kindred, +3 homeexchange, +2 trustedhousesitters, +2 thirdhome |
| `community` | +5 peoplelikeus, +3 homeexchange, +2 homelink, +1 kindred |
| `design` | +7 behomm, +2 kindred, +1 homeexchange |
| `work` | +6 sabbaticalhomes, +3 homeexchange, +2 kindred |

#### From Q7 — pets_kids

| Condition | Effects |
|-----------|---------|
| has `pets_have` or pets path | +4 trustedhousesitters, +2 homeexchange, +1 kindred; add note `pets_planning` |
| has `kids` | +2 homeexchange, +2 peoplelikeus, +1 kindred; add note `family_homes` |
| `none` only | no change |

---

## Eligibility gates (hard filters)

Apply **after** scoring, before ranking.

| Gate | Rule |
|------|------|
| ThirdHome | If `housing_status != own_second` AND `luxury != luxury`, remove from top 3 unless score ≥ 10 and luxury == luxury (second home strongly preferred). If not `own_second`, append note `thirdhome_needs_second_home` and cap rank ≤3 only if score leads — still show as educational “not yet.” **v1 simpler rule:** if `housing_status != own_second`, exclude `thirdhome` from top 3 (may list under “Later”). |
| Behomm | If `travel_style != design` and score &lt; 6, exclude from top 3. |
| No-home | Top 1 must be `trustedhousesitters` or `sabbaticalhomes`. |
| Rent | Always inject renter risk note; never promise lease compliance. |

---

## Reason strings (template library)

Pick 1–2 per platform for results UI.

| Platform | Reason keys → copy |
|----------|-------------------|
| homeexchange | `volume` → “Largest global network and points for non-simultaneous trips.” |
| homeexchange | `simultaneous` → “Strong classic swap marketplace if you can trade dates.” |
| homeexchange | `long` → “Often used for longer multi-week exchanges via points or direct swaps.” |
| kindred | `trust` → “Verified members, credit system, polishing (cleaning/protection) matters to you.” |
| kindred | `flex` → “Credits let you host when you can and travel when you want.” |
| kindred | `invite` → “Application/invite community — higher bar, less open marketplace chaos.” |
| thirdhome | `luxury` → “Built for higher-end second homes and reciprocal luxury stays.” |
| trustedhousesitters | `no_home` → “You don’t need to offer a home — sit for others and offset lodging.” |
| trustedhousesitters | `pets` → “Pet care sits are the core inventory; good if animals are in the mix.” |
| trustedhousesitters | `rent` → “Lower friction than swapping a rental you’re not allowed to sublet.” |
| peoplelikeus | `community` → “Community-forward exchange culture over pure marketplace scale.” |
| homelink | `traditional` → “Long-running traditional exchange network; solid if you like classic swaps.” |
| behomm | `design` → “Curated toward design-conscious and creative homes.” |
| sabbaticalhomes | `work` → “Strong for mid-term / academic / work-away furnished stays.” |
| sabbaticalhomes | `long` → “Better fit for month-plus stays than pure vacation swap networks.” |

**Selection logic:** Map from dominant rules that added the most points for that platform (store `contributors[]` while scoring if useful).

---

## Risk / education notes

| Code | When | Copy |
|------|------|------|
| `renter_lease` | `housing_status == rent` | “Many leases ban sublets or long guest stays. Confirm your lease and local rules before listing.” |
| `must_offer_home` | pure swap recommended but no_home | “Classic home exchange requires a place to offer. Sitting or mid-term rentals fit better until you have one.” |
| `membership_not_free` | any exchange in top 3 | “Most networks charge annual membership; stays offset lodging, not flights.” |
| `invite_only` | kindred in top 3 | “Kindred is application-based; approval isn’t guaranteed.” |
| `thirdhome_needs_second_home` | interest in luxury without second home | “ThirdHome is built around qualifying second homes — primary-home travelers usually start elsewhere.” |
| `pets_planning` | pets flags | “Filter for pet-friendly homes/sits and clarify care expectations in writing.” |
| `family_homes` | kids | “Prioritize family-friendly listings and childproofing notes on each platform.” |
| `long_stay_visa` | trip_length long | “Housing swaps don’t grant visas or tax residency. Check entry rules for month-plus stays.” |

---

## Results payload (API / page props)

```ts
type QuizResult = {
  rulesVersion: "quiz_rules_v1";
  rankings: Array<{
    slug: string;
    score: number;
    rank: 1 | 2 | 3;
    reasons: string[]; // resolved copy
    ctaPath: string;   // /go/{slug}?src=quiz
  }>;
  alsoConsider: Array<{ slug: string; score: number; reasons: string[] }>; // ranks 4–5
  notes: string[];     // resolved risk copy
  destinations: string[];
  primarySlug: string;
  secondarySlug: string | null;
};
```

**Primary** = rank 1  
**Secondary** = rank 2  

---

## Worked examples

### Example A — Owner, flexible, volume

```
own_primary, weeks, either, mid, nice, volume, none
```

Expected top: **homeexchange**, **kindred**, **peoplelikeus** or **trustedhousesitters**  
Notes: `membership_not_free`

### Example B — Renter, long stay, work

```
rent, long, no, low, normal, work, none
```

Expected top: **sabbaticalhomes**, **trustedhousesitters**, **homeexchange** (capped enthusiasm)  
Notes: `renter_lease`, `long_stay_visa`, `membership_not_free`

### Example C — No home, pets, short trips

```
no_home, weekend, either, free, normal, trust, pets_have
```

Expected top: **trustedhousesitters**, **sabbaticalhomes**, (third optional weak)  
Notes: `must_offer_home` if any swap shown, `pets_planning`

### Example D — Second home luxury

```
own_second, weeks, either, high, luxury, trust, none
```

Expected top: **thirdhome**, **homeexchange**, **kindred**  
Notes: `membership_not_free`

### Example E — Design simultaneous

```
own_primary, weeks, yes, mid, nice, design, none
```

Expected top: **behomm**, **homeexchange**, **kindred** or **peoplelikeus**

---

## Pseudocode

```ts
function scoreQuiz(a: Answers): QuizResult {
  const s = zeroScores(PLATFORMS);

  applyHousing(s, a.housing_status);
  applyTripLength(s, a.trip_length);
  applySimultaneous(s, a.simultaneous_ok);
  applyBudget(s, a.budget_membership);
  applyLuxury(s, a.luxury);
  applyStyle(s, a.travel_style);
  applyPetsKids(s, a.pets_kids);

  if (a.housing_status === "no_home") applyNoHomeCaps(s);

  let ranked = sortDesc(s);
  ranked = applyEligibilityGates(ranked, a);

  const notes = collectNotes(a, ranked);
  const top3 = ranked.slice(0, 3).map(toRankingRow);
  const reasons = pickReasons(top3, a);

  return {
    rulesVersion: "quiz_rules_v1",
    rankings: reasons,
    alsoConsider: ranked.slice(3, 5),
    notes,
    destinations: a.destinations ?? [],
    primarySlug: top3[0].slug,
    secondarySlug: top3[1]?.slug ?? null,
  };
}
```

---

## QA checklist

- [ ] Every answer combo returns exactly 3 rankings (pad with next-best if filters remove too many).  
- [ ] `no_home` never ranks ThirdHome #1.  
- [ ] `own_second` + `luxury` surfaces ThirdHome in top 2.  
- [ ] `rent` always includes `renter_lease` note.  
- [ ] `design` surfaces Behomm in top 3.  
- [ ] `work` + `long` surfaces SabbaticalHomes in top 2.  
- [ ] All CTAs use `/go/{slug}?src=quiz`.  
- [ ] Unit tests for Examples A–E.

---

## v2 hooks (do not build yet)

- Destination-based inventory thickness modifiers  
- Live membership fee pulls  
- A/B weights  
- User feedback “was this right?” → retrain weights  
- Multi-platform “stack” recommendation (e.g. HE + THS)
