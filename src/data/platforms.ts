/**
 * Canonical platform registry for Swap Radar.
 * Add/remove slugs here — never hardcode labels only in UI.
 */

export type PlatformModel =
  | "simultaneous"
  | "points"
  | "credits"
  | "sitting"
  | "luxury"
  | "midterm"
  | "community"
  | "global"
  | "invite"
  | "verified"
  | "second_home"
  | "keys"
  | "design"
  | "creative"
  | "traditional"
  | "academic"
  | "rental_ok"
  | "no_home_required";

export type PlatformSlug =
  | "homeexchange"
  | "kindred"
  | "thirdhome"
  | "trustedhousesitters"
  | "peoplelikeus"
  | "homelink"
  | "behomm"
  | "sabbaticalhomes";

export type Platform = {
  slug: PlatformSlug;
  name: string;
  website: string;
  /**
   * Default join URL when no AFFILIATE_<SLUG>_URL env is set.
   * Prefer env affiliate links in production (see src/lib/affiliates.ts).
   */
  joinUrl: string;
  /** Optional public search base for deep-links */
  searchUrl?: string;
  model: PlatformModel[];
  pricingSummary: string;
  pricingDetail: string;
  insuranceSummary: string;
  renterOk: boolean;
  inviteOnly: boolean;
  luxury: boolean;
  coverageNotes: string;
  /** Affiliate network notes; empty until program live */
  affiliateNotes: string;
  lastVerifiedAt: string; // ISO date
  /** Editorial 1–5 scores for compare table */
  scores: {
    scale: number;
    flexibility: number;
    trust: number;
    value: number;
  };
  shortBlurb: string;
};

/** Tie-break order when scores equal (docs/quiz-decision-tree.md) */
export const TIE_BREAK_ORDER: PlatformSlug[] = [
  "homeexchange",
  "kindred",
  "trustedhousesitters",
  "thirdhome",
  "peoplelikeus",
  "homelink",
  "sabbaticalhomes",
  "behomm",
];

export const PLATFORMS: Platform[] = [
  {
    slug: "homeexchange",
    name: "HomeExchange",
    website: "https://www.homeexchange.com",
    joinUrl: "https://www.homeexchange.com/",
    searchUrl: "https://www.homeexchange.com/",
    model: ["simultaneous", "points", "global"],
    pricingSummary: "Annual membership (plan tiers vary)",
    pricingDetail:
      "Paid annual membership unlocks unlimited exchanges. GuestPoints support non-simultaneous stays. Verify current pricing on site — last checked as marketing snapshot only.",
    insuranceSummary:
      "Member protections and damage processes advertised; details depend on plan/region.",
    renterOk: true,
    inviteOnly: false,
    luxury: false,
    coverageNotes: "Largest global home-swap network; strong city coverage in Europe & North America.",
    affiliateNotes: "FlexOffers / influencer partnerships when approved.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 5, flexibility: 4, trust: 4, value: 4 },
    shortBlurb:
      "Biggest classic home-exchange network: simultaneous swaps plus points for flexible timing.",
  },
  {
    slug: "kindred",
    name: "Kindred",
    website: "https://livekindred.com",
    joinUrl: "https://livekindred.com/",
    model: ["credits", "verified", "invite"],
    pricingSummary: "Application-based; fees more per-stay than big annual bill",
    pricingDetail:
      "Members earn credits by hosting (and referrals). Cleaning/service fees apply per stay. Confirm current fee schedule on Kindred.",
    insuranceSummary:
      "Identity/home verification plus advertised cleaning and damage protection layers.",
    renterOk: true,
    inviteOnly: true,
    luxury: false,
    coverageNotes: "Growing verified urban inventory; strength varies by city.",
    affiliateNotes: "Member referral / invite codes when available.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 3, flexibility: 5, trust: 5, value: 4 },
    shortBlurb:
      "Credit-based, verified community: host when you can, travel when you want.",
  },
  {
    slug: "thirdhome",
    name: "ThirdHome",
    website: "https://www.thirdhome.com",
    joinUrl: "https://www.thirdhome.com/",
    model: ["luxury", "second_home", "keys"],
    pricingSummary: "Free to join if home qualifies; pay when you travel",
    pricingDetail:
      "Built for qualifying second/vacation homes. Travel via keys/credits; trip fees apply. Primary-home-only travelers usually start elsewhere.",
    insuranceSummary: "Club standards and member protections for upscale inventory.",
    renterOk: false,
    inviteOnly: false,
    luxury: true,
    coverageNotes: "Luxury second homes and resort-affiliated inventory worldwide.",
    affiliateNotes: "Ambassador / referral program.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 3, flexibility: 3, trust: 4, value: 3 },
    shortBlurb:
      "Upscale second-home exchange club — reciprocal luxury stays, not primary apartments.",
  },
  {
    slug: "trustedhousesitters",
    name: "TrustedHousesitters",
    website: "https://www.trustedhousesitters.com",
    joinUrl: "https://www.trustedhousesitters.com/",
    searchUrl: "https://www.trustedhousesitters.com/",
    model: ["sitting", "no_home_required"],
    pricingSummary: "Annual membership for sitters and/or owners",
    pricingDetail:
      "Membership required to apply for sits. Lodging is free in exchange for pet/home care — not a reciprocal home swap.",
    insuranceSummary: "Platform screening and membership protections; verify current cover.",
    renterOk: true,
    inviteOnly: false,
    luxury: false,
    coverageNotes: "Global house/pet sits; competitive in popular destinations.",
    affiliateNotes: "Impact.com affiliate program when approved.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 4, flexibility: 3, trust: 4, value: 5 },
    shortBlurb:
      "House & pet sitting network — offset lodging without offering your own home.",
  },
  {
    slug: "peoplelikeus",
    name: "People Like Us",
    website: "https://www.peoplelikeus.world",
    joinUrl: "https://www.peoplelikeus.world/",
    model: ["simultaneous", "community"],
    pricingSummary: "Membership-based community exchange",
    pricingDetail:
      "Community-forward home exchange with its own credit/globe-style system. Confirm current dues on their site.",
    insuranceSummary: "Member community norms; verify published protections.",
    renterOk: true,
    inviteOnly: false,
    luxury: false,
    coverageNotes: "Smaller than HomeExchange; stronger personal-matching culture.",
    affiliateNotes: "Direct / referral when available.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 2, flexibility: 3, trust: 4, value: 3 },
    shortBlurb:
      "Community-first home exchange — warmer matching, less pure marketplace scale.",
  },
  {
    slug: "homelink",
    name: "HomeLink",
    website: "https://homelink.org",
    joinUrl: "https://homelink.org/en/home-swap/",
    model: ["simultaneous", "traditional"],
    pricingSummary: "Annual membership",
    pricingDetail:
      "Long-running traditional exchange network. Pricing and regional clubs vary — verify on HomeLink.",
    insuranceSummary: "Traditional club protections; check local organization terms.",
    renterOk: true,
    inviteOnly: false,
    luxury: false,
    coverageNotes: "Decades-old network; solid classic simultaneous swaps.",
    affiliateNotes: "Direct partnership TBD.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 2, flexibility: 2, trust: 4, value: 3 },
    shortBlurb:
      "Classic home-exchange network with a long track record and traditional swaps.",
  },
  {
    slug: "behomm",
    name: "Behomm",
    website: "https://www.behomm.com",
    joinUrl: "https://www.behomm.com/",
    model: ["design", "creative", "simultaneous"],
    pricingSummary: "Membership for design-minded exchangers",
    pricingDetail:
      "Curated toward creatives and design-forward homes. Confirm current membership pricing on Behomm.",
    insuranceSummary: "Platform member terms; verify published cover.",
    renterOk: true,
    inviteOnly: false,
    luxury: false,
    coverageNotes: "Niche design/creative inventory — not maximum volume.",
    affiliateNotes: "Direct / referral TBD.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 2, flexibility: 2, trust: 3, value: 3 },
    shortBlurb:
      "Design- and creative-oriented home exchange for aesthetic-led travelers.",
  },
  {
    slug: "sabbaticalhomes",
    name: "SabbaticalHomes",
    website: "https://www.sabbaticalhomes.com",
    joinUrl: "https://www.sabbaticalhomes.com/",
    model: ["midterm", "academic", "rental_ok"],
    pricingSummary: "Listing / membership fees for mid-term housing",
    pricingDetail:
      "Mid-term furnished homes often used by academics and remote workers. Mix of rentals and occasional exchanges — not pure free swap.",
    insuranceSummary: "Varies by listing arrangement; not a classic swap insurance product.",
    renterOk: true,
    inviteOnly: false,
    luxury: false,
    coverageNotes: "Strong for month-plus furnished stays near universities and cities.",
    affiliateNotes: "Direct / affiliate TBD.",
    lastVerifiedAt: "2026-07-20",
    scores: { scale: 3, flexibility: 4, trust: 3, value: 3 },
    shortBlurb:
      "Mid-term furnished housing marketplace — ideal for month-plus and work-away stays.",
  },
];

export const PLATFORM_BY_SLUG: Record<PlatformSlug, Platform> = PLATFORMS.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<PlatformSlug, Platform>,
);

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORM_BY_SLUG[slug as PlatformSlug];
}

export function isPlatformSlug(slug: string): slug is PlatformSlug {
  return slug in PLATFORM_BY_SLUG;
}
