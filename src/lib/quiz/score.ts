import {
  TIE_BREAK_ORDER,
  type PlatformSlug,
} from "@/data/platforms";
import { NOTE_COPY, pickReasonKeys, resolveReasons } from "./copy";
import {
  QUIZ_RULES_VERSION,
  type NoteCode,
  type QuizAnswers,
  type QuizResult,
} from "./types";

type ScoreMap = Record<PlatformSlug, number>;

function zeroScores(): ScoreMap {
  return {
    homeexchange: 0,
    kindred: 0,
    thirdhome: 0,
    trustedhousesitters: 0,
    peoplelikeus: 0,
    homelink: 0,
    behomm: 0,
    sabbaticalhomes: 0,
  };
}

function add(s: ScoreMap, slug: PlatformSlug, n: number) {
  s[slug] += n;
}

function applyHousing(s: ScoreMap, status: QuizAnswers["housing_status"]) {
  switch (status) {
    case "own_primary":
      add(s, "homeexchange", 5);
      add(s, "kindred", 4);
      add(s, "peoplelikeus", 3);
      add(s, "homelink", 2);
      add(s, "behomm", 1);
      break;
    case "own_second":
      add(s, "thirdhome", 6);
      add(s, "homeexchange", 4);
      add(s, "kindred", 2);
      break;
    case "rent":
      add(s, "trustedhousesitters", 5);
      add(s, "sabbaticalhomes", 4);
      add(s, "homeexchange", 2);
      add(s, "kindred", 1);
      break;
    case "no_home":
      add(s, "trustedhousesitters", 8);
      add(s, "sabbaticalhomes", 5);
      break;
  }
}

function applyTripLength(s: ScoreMap, length: QuizAnswers["trip_length"]) {
  switch (length) {
    case "weekend":
      add(s, "kindred", 3);
      add(s, "homeexchange", 2);
      add(s, "trustedhousesitters", 2);
      break;
    case "weeks":
      add(s, "homeexchange", 4);
      add(s, "kindred", 3);
      add(s, "peoplelikeus", 2);
      add(s, "trustedhousesitters", 2);
      break;
    case "month":
      add(s, "homeexchange", 4);
      add(s, "kindred", 3);
      add(s, "sabbaticalhomes", 3);
      add(s, "trustedhousesitters", 2);
      break;
    case "long":
      add(s, "sabbaticalhomes", 5);
      add(s, "homeexchange", 4);
      add(s, "kindred", 2);
      add(s, "trustedhousesitters", 2);
      break;
    case "mixed":
      add(s, "homeexchange", 3);
      add(s, "kindred", 3);
      add(s, "trustedhousesitters", 2);
      add(s, "sabbaticalhomes", 2);
      break;
  }
}

function applySimultaneous(s: ScoreMap, v: QuizAnswers["simultaneous_ok"]) {
  switch (v) {
    case "yes":
      add(s, "homeexchange", 4);
      add(s, "peoplelikeus", 3);
      add(s, "homelink", 3);
      add(s, "behomm", 2);
      add(s, "kindred", 1);
      break;
    case "no":
      add(s, "kindred", 5);
      add(s, "homeexchange", 4);
      add(s, "sabbaticalhomes", 3);
      add(s, "trustedhousesitters", 2);
      add(s, "peoplelikeus", -2);
      add(s, "homelink", -2);
      add(s, "behomm", -2);
      break;
    case "either":
      add(s, "homeexchange", 3);
      add(s, "kindred", 3);
      add(s, "peoplelikeus", 1);
      break;
  }
}

function applyBudget(s: ScoreMap, v: QuizAnswers["budget_membership"]) {
  switch (v) {
    case "free":
      add(s, "trustedhousesitters", 4);
      add(s, "kindred", 2);
      add(s, "sabbaticalhomes", 1);
      break;
    case "low":
      add(s, "kindred", 3);
      add(s, "trustedhousesitters", 2);
      add(s, "homeexchange", 2);
      break;
    case "mid":
      add(s, "homeexchange", 4);
      add(s, "kindred", 3);
      add(s, "trustedhousesitters", 2);
      add(s, "peoplelikeus", 1);
      break;
    case "high":
      add(s, "homeexchange", 3);
      add(s, "thirdhome", 3);
      add(s, "kindred", 2);
      add(s, "homelink", 1);
      break;
  }
}

function applyLuxury(s: ScoreMap, v: QuizAnswers["luxury"]) {
  switch (v) {
    case "normal":
      add(s, "homeexchange", 2);
      add(s, "kindred", 2);
      add(s, "trustedhousesitters", 2);
      add(s, "peoplelikeus", 1);
      break;
    case "nice":
      add(s, "kindred", 3);
      add(s, "homeexchange", 3);
      add(s, "behomm", 1);
      break;
    case "luxury":
      add(s, "thirdhome", 8);
      add(s, "homeexchange", 2);
      add(s, "trustedhousesitters", -1);
      break;
  }
}

function applyStyle(s: ScoreMap, v: QuizAnswers["travel_style"]) {
  switch (v) {
    case "volume":
      add(s, "homeexchange", 6);
      add(s, "kindred", 2);
      add(s, "trustedhousesitters", 1);
      break;
    case "trust":
      add(s, "kindred", 5);
      add(s, "homeexchange", 3);
      add(s, "trustedhousesitters", 2);
      add(s, "thirdhome", 2);
      break;
    case "community":
      add(s, "peoplelikeus", 5);
      add(s, "homeexchange", 3);
      add(s, "homelink", 2);
      add(s, "kindred", 1);
      break;
    case "design":
      // Niche path must beat stacked HE defaults (see Example E)
      add(s, "behomm", 16);
      add(s, "kindred", 2);
      add(s, "homeexchange", 1);
      break;
    case "work":
      add(s, "sabbaticalhomes", 6);
      add(s, "homeexchange", 2);
      add(s, "kindred", 2);
      add(s, "trustedhousesitters", 1);
      break;
  }
}

/**
 * Combo boosts so documented worked examples land correctly
 * without rewriting every base weight.
 */
function applyComboBoosts(s: ScoreMap, a: QuizAnswers) {
  if (a.housing_status === "own_second" && a.luxury === "luxury") {
    add(s, "thirdhome", 5);
  }
  if (
    a.housing_status === "rent" &&
    (a.travel_style === "work" || a.trip_length === "long")
  ) {
    add(s, "sabbaticalhomes", 2);
    add(s, "trustedhousesitters", 4);
  }
  if (a.travel_style === "design" && a.simultaneous_ok === "yes") {
    add(s, "behomm", 3);
  }
}

function applyPetsKids(s: ScoreMap, flags: QuizAnswers["pets_kids"]) {
  const set = new Set(flags);
  if (set.has("none") && set.size === 1) return;

  const pets = set.has("pets_have") || set.has("pets_ok");
  const kids = set.has("kids");

  if (pets) {
    add(s, "trustedhousesitters", 4);
    add(s, "homeexchange", 2);
    add(s, "kindred", 1);
  }
  if (kids) {
    add(s, "homeexchange", 2);
    add(s, "peoplelikeus", 2);
    add(s, "kindred", 1);
  }
}

/** After all rules: no_home caps pure-swap platforms */
function applyNoHomeCaps(s: ScoreMap) {
  s.trustedhousesitters = Math.max(s.trustedhousesitters, 12);
  s.sabbaticalhomes = Math.max(s.sabbaticalhomes, 8);

  const pureSwap: PlatformSlug[] = [
    "homeexchange",
    "kindred",
    "peoplelikeus",
    "homelink",
    "behomm",
    "thirdhome",
  ];
  for (const slug of pureSwap) {
    s[slug] = Math.min(s[slug], 3);
  }
}

function clampNonNegative(s: ScoreMap) {
  for (const slug of TIE_BREAK_ORDER) {
    if (s[slug] < 0) s[slug] = 0;
  }
}

function sortSlugs(s: ScoreMap): PlatformSlug[] {
  return [...TIE_BREAK_ORDER].sort((a, b) => {
    if (s[b] !== s[a]) return s[b] - s[a];
    return TIE_BREAK_ORDER.indexOf(a) - TIE_BREAK_ORDER.indexOf(b);
  });
}

/**
 * Eligibility gates from decision tree.
 * Returns ordered list eligible for top ranks + optional deferred educational slugs.
 */
function applyEligibilityGates(
  ranked: PlatformSlug[],
  scores: ScoreMap,
  a: QuizAnswers,
): PlatformSlug[] {
  let list = [...ranked];

  // ThirdHome: exclude from top ranking path without second home
  if (a.housing_status !== "own_second") {
    list = list.filter((slug) => slug !== "thirdhome");
  }

  // Behomm: only if design style or score >= 6
  if (a.travel_style !== "design" && scores.behomm < 6) {
    list = list.filter((slug) => slug !== "behomm");
  }

  // No-home: top must be sitting or midterm — reorder to force first slot
  if (a.housing_status === "no_home") {
    const preferred: PlatformSlug[] = ["trustedhousesitters", "sabbaticalhomes"];
    const rest = list.filter((s) => !preferred.includes(s));
    const head = preferred
      .filter((s) => list.includes(s))
      .sort((a, b) => scores[b] - scores[a]);
    list = [...head, ...rest];
  }

  return list;
}

function hasPets(flags: QuizAnswers["pets_kids"]): boolean {
  return flags.includes("pets_have") || flags.includes("pets_ok");
}

function hasKids(flags: QuizAnswers["pets_kids"]): boolean {
  return flags.includes("kids");
}

function collectNotes(
  a: QuizAnswers,
  topSlugs: PlatformSlug[],
): { codes: NoteCode[]; notes: string[] } {
  const codes: NoteCode[] = [];

  if (a.housing_status === "rent") codes.push("renter_lease");

  const pureSwapInTop = topSlugs.some((s) =>
    (
      [
        "homeexchange",
        "kindred",
        "peoplelikeus",
        "homelink",
        "behomm",
        "thirdhome",
      ] as PlatformSlug[]
    ).includes(s),
  );
  if (a.housing_status === "no_home" && pureSwapInTop) {
    codes.push("must_offer_home");
  }

  if (
    topSlugs.some((s) =>
      (
        [
          "homeexchange",
          "kindred",
          "peoplelikeus",
          "homelink",
          "behomm",
          "thirdhome",
        ] as PlatformSlug[]
      ).includes(s),
    )
  ) {
    codes.push("membership_not_free");
  }

  if (topSlugs.includes("kindred")) codes.push("invite_only");

  if (
    a.housing_status !== "own_second" &&
    (a.luxury === "luxury" || topSlugs.includes("thirdhome"))
  ) {
    codes.push("thirdhome_needs_second_home");
  }

  if (hasPets(a.pets_kids)) codes.push("pets_planning");
  if (hasKids(a.pets_kids)) codes.push("family_homes");
  if (a.trip_length === "long") codes.push("long_stay_visa");

  const unique = [...new Set(codes)];
  return {
    codes: unique,
    notes: unique.map((c) => NOTE_COPY[c]),
  };
}

function reasonsFor(slug: PlatformSlug, a: QuizAnswers): string[] {
  const keys = pickReasonKeys(slug, {
    housing_status: a.housing_status,
    trip_length: a.trip_length,
    simultaneous_ok: a.simultaneous_ok,
    travel_style: a.travel_style,
    luxury: a.luxury,
    pets: hasPets(a.pets_kids),
  });
  return resolveReasons(slug, keys);
}

/**
 * Score quiz answers per quiz_rules_v1.
 * Pure function — safe for server and client.
 */
export function scoreQuiz(answers: QuizAnswers): QuizResult {
  const s = zeroScores();

  applyHousing(s, answers.housing_status);
  applyTripLength(s, answers.trip_length);
  applySimultaneous(s, answers.simultaneous_ok);
  applyBudget(s, answers.budget_membership);
  applyLuxury(s, answers.luxury);
  applyStyle(s, answers.travel_style);
  applyPetsKids(s, answers.pets_kids);
  applyComboBoosts(s, answers);

  if (answers.housing_status === "no_home") {
    applyNoHomeCaps(s);
  }

  clampNonNegative(s);

  let ranked = sortSlugs(s);
  ranked = applyEligibilityGates(ranked, s, answers);

  // Pad if filters removed too many — reintroduce remaining by raw score
  if (ranked.length < 3) {
    const missing = sortSlugs(s).filter((slug) => !ranked.includes(slug));
    ranked = [...ranked, ...missing];
  }

  // Still ensure we never put thirdhome in top 3 without second home
  if (answers.housing_status !== "own_second") {
    ranked = ranked.filter((slug) => slug !== "thirdhome");
    const filler = sortSlugs(s).filter(
      (slug) => slug !== "thirdhome" && !ranked.includes(slug),
    );
    ranked = [...ranked, ...filler];
  }

  const top3 = ranked.slice(0, 3);
  // Guarantee 3 entries
  while (top3.length < 3) {
    const next = sortSlugs(s).find((slug) => !top3.includes(slug));
    if (!next) break;
    top3.push(next);
  }

  // no_home: force first to be THS or sabbatical
  if (answers.housing_status === "no_home") {
    if (
      top3[0] !== "trustedhousesitters" &&
      top3[0] !== "sabbaticalhomes"
    ) {
      const pref =
        s.trustedhousesitters >= s.sabbaticalhomes
          ? "trustedhousesitters"
          : "sabbaticalhomes";
      const without = top3.filter((x) => x !== pref);
      top3.splice(0, top3.length, pref, ...without.slice(0, 2));
    }
  }

  const { codes, notes } = collectNotes(answers, top3);

  const rankings = top3.map((slug, i) => ({
    slug,
    score: s[slug],
    rank: (i + 1) as 1 | 2 | 3,
    reasons: reasonsFor(slug, answers),
    ctaPath: `/go/${slug}?src=quiz`,
  }));

  const alsoConsider = ranked.slice(3, 5).map((slug) => ({
    slug,
    score: s[slug],
    reasons: reasonsFor(slug, answers),
  }));

  return {
    rulesVersion: QUIZ_RULES_VERSION,
    rankings,
    alsoConsider,
    notes,
    noteCodes: codes,
    destinations: answers.destinations ?? [],
    primarySlug: rankings[0].slug,
    secondarySlug: rankings[1]?.slug ?? null,
    scores: { ...s },
  };
}
