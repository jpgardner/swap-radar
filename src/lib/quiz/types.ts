import type { PlatformSlug } from "@/data/platforms";

export const QUIZ_RULES_VERSION = "quiz_rules_v1" as const;

export type HousingStatus = "own_primary" | "own_second" | "rent" | "no_home";
export type TripLength = "weekend" | "weeks" | "month" | "long" | "mixed";
export type SimultaneousOk = "yes" | "no" | "either";
export type BudgetMembership = "free" | "low" | "mid" | "high";
export type LuxuryLevel = "normal" | "nice" | "luxury";
export type TravelStyle =
  | "volume"
  | "trust"
  | "community"
  | "design"
  | "work";
export type PetsKidsFlag =
  | "pets_have"
  | "pets_ok"
  | "kids"
  | "none";

export type QuizAnswers = {
  housing_status: HousingStatus;
  trip_length: TripLength;
  simultaneous_ok: SimultaneousOk;
  budget_membership: BudgetMembership;
  luxury: LuxuryLevel;
  travel_style: TravelStyle;
  /** Multi-select; use ["none"] when nothing applies */
  pets_kids: PetsKidsFlag[];
  destinations?: string[];
};

export type NoteCode =
  | "renter_lease"
  | "must_offer_home"
  | "membership_not_free"
  | "invite_only"
  | "thirdhome_needs_second_home"
  | "pets_planning"
  | "family_homes"
  | "long_stay_visa";

export type RankingRow = {
  slug: PlatformSlug;
  score: number;
  rank: 1 | 2 | 3;
  reasons: string[];
  ctaPath: string;
};

export type AlsoConsiderRow = {
  slug: PlatformSlug;
  score: number;
  reasons: string[];
};

export type QuizResult = {
  rulesVersion: typeof QUIZ_RULES_VERSION;
  rankings: RankingRow[];
  alsoConsider: AlsoConsiderRow[];
  notes: string[];
  noteCodes: NoteCode[];
  destinations: string[];
  primarySlug: PlatformSlug;
  secondarySlug: PlatformSlug | null;
  /** Full score map for debugging / tests */
  scores: Record<PlatformSlug, number>;
};
