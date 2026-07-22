import type { PlatformSlug } from "@/data/platforms";
import type { NoteCode } from "./types";

type ReasonKey =
  | "volume"
  | "simultaneous"
  | "long"
  | "trust"
  | "flex"
  | "invite"
  | "luxury"
  | "no_home"
  | "pets"
  | "rent"
  | "community"
  | "traditional"
  | "design"
  | "work"
  | "default";

export const REASON_COPY: Record<
  PlatformSlug,
  Partial<Record<ReasonKey, string>>
> = {
  homeexchange: {
    volume: "Largest global network and points for non-simultaneous trips.",
    simultaneous: "Strong classic swap marketplace if you can trade dates.",
    long: "Often used for longer multi-week exchanges via points or direct swaps.",
    default:
      "Broad inventory and flexible exchange models fit most first-time swappers.",
  },
  kindred: {
    trust:
      "Verified members, credit system, polishing (cleaning/protection) matters to you.",
    flex: "Credits let you host when you can and travel when you want.",
    invite:
      "Application/invite community — higher bar, less open marketplace chaos.",
    default: "Credit-based stays with a verified, app-native community.",
  },
  thirdhome: {
    luxury: "Built for higher-end second homes and reciprocal luxury stays.",
    default: "Luxury second-home club for qualifying vacation properties.",
  },
  trustedhousesitters: {
    no_home:
      "You don’t need to offer a home — sit for others and offset lodging.",
    pets: "Pet care sits are the core inventory; good if animals are in the mix.",
    rent: "Lower friction than swapping a rental you’re not allowed to sublet.",
    default:
      "House and pet sitting path to free lodging without a reciprocal home.",
  },
  peoplelikeus: {
    community:
      "Community-forward exchange culture over pure marketplace scale.",
    default: "Warm, community-led home exchange matching.",
  },
  homelink: {
    traditional:
      "Long-running traditional exchange network; solid if you like classic swaps.",
    default: "Classic simultaneous home-exchange network with deep history.",
  },
  behomm: {
    design: "Curated toward design-conscious and creative homes.",
    default: "Design-forward home exchange for aesthetic-led travelers.",
  },
  sabbaticalhomes: {
    work: "Strong for mid-term / academic / work-away furnished stays.",
    long: "Better fit for month-plus stays than pure vacation swap networks.",
    default: "Mid-term furnished housing for longer work and study stays.",
  },
};

export const NOTE_COPY: Record<NoteCode, string> = {
  renter_lease:
    "Many leases ban sublets or long guest stays. Confirm your lease and local rules before listing.",
  must_offer_home:
    "Classic home exchange requires a place to offer. Sitting or mid-term rentals fit better until you have one.",
  membership_not_free:
    "Most networks charge annual membership; stays offset lodging, not flights.",
  invite_only: "Kindred is application-based; approval isn’t guaranteed.",
  thirdhome_needs_second_home:
    "ThirdHome is built around qualifying second homes — primary-home travelers usually start elsewhere.",
  pets_planning:
    "Filter for pet-friendly homes/sits and clarify care expectations in writing.",
  family_homes:
    "Prioritize family-friendly listings and childproofing notes on each platform.",
  long_stay_visa:
    "Housing swaps don’t grant visas or tax residency. Check entry rules for month-plus stays.",
};

/** Map dominant answer signals → reason keys per platform */
export function pickReasonKeys(
  slug: PlatformSlug,
  ctx: {
    housing_status: string;
    trip_length: string;
    simultaneous_ok: string;
    travel_style: string;
    luxury: string;
    pets: boolean;
  },
): ReasonKey[] {
  const keys: ReasonKey[] = [];

  switch (slug) {
    case "homeexchange":
      if (ctx.travel_style === "volume") keys.push("volume");
      if (ctx.simultaneous_ok === "yes") keys.push("simultaneous");
      if (ctx.trip_length === "long" || ctx.trip_length === "month")
        keys.push("long");
      break;
    case "kindred":
      if (ctx.travel_style === "trust") keys.push("trust");
      if (ctx.simultaneous_ok === "no" || ctx.simultaneous_ok === "either")
        keys.push("flex");
      keys.push("invite");
      break;
    case "thirdhome":
      keys.push("luxury");
      break;
    case "trustedhousesitters":
      if (ctx.housing_status === "no_home") keys.push("no_home");
      if (ctx.housing_status === "rent") keys.push("rent");
      if (ctx.pets) keys.push("pets");
      break;
    case "peoplelikeus":
      keys.push("community");
      break;
    case "homelink":
      keys.push("traditional");
      break;
    case "behomm":
      keys.push("design");
      break;
    case "sabbaticalhomes":
      if (ctx.travel_style === "work") keys.push("work");
      if (ctx.trip_length === "long" || ctx.trip_length === "month")
        keys.push("long");
      break;
  }

  if (keys.length === 0) keys.push("default");
  return keys.slice(0, 2);
}

export function resolveReasons(
  slug: PlatformSlug,
  keys: ReasonKey[],
): string[] {
  const map = REASON_COPY[slug];
  const lines = keys
    .map((k) => map[k])
    .filter((s): s is string => Boolean(s));
  if (lines.length === 0 && map.default) return [map.default];
  return [...new Set(lines)].slice(0, 2);
}
