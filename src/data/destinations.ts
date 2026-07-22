export type Destination = {
  slug: string;
  city: string;
  country: string;
  /** Rough mid-range hotel nightly USD for calculator defaults */
  hotelNightlyDefault: number;
  /** Suggested annual membership default for break-even (USD) */
  membershipDefault: number;
  /** Cleaning / turnover estimate per stay (USD) */
  cleaningDefault: number;
  platformNotes: string;
  renterNotes: string;
  tripLengthNotes: string;
  why: string;
};

function d(
  partial: Omit<
    Destination,
    "platformNotes" | "renterNotes" | "tripLengthNotes" | "why"
  > &
    Partial<
      Pick<
        Destination,
        "platformNotes" | "renterNotes" | "tripLengthNotes" | "why"
      >
    >,
): Destination {
  return {
    platformNotes:
      partial.platformNotes ??
      "Start with HomeExchange for scale; add Kindred for credits or TrustedHousesitters if you cannot offer a home.",
    renterNotes:
      partial.renterNotes ??
      "Confirm lease and building rules before hosting guests.",
    tripLengthNotes:
      partial.tripLengthNotes ??
      "Weeks are easiest; month-plus stays may need points, credits, or mid-term housing.",
    why:
      partial.why ??
      `${partial.city} is a frequent home-exchange and mid-term destination.`,
    ...partial,
  };
}

export const DESTINATIONS: Destination[] = [
  d({
    slug: "lisbon",
    city: "Lisbon",
    country: "Portugal",
    hotelNightlyDefault: 160,
    membershipDefault: 220,
    cleaningDefault: 80,
    why: "Strong remote-work and mid-term demand; popular for multi-week European bases.",
    platformNotes:
      "HomeExchange and Kindred are common starting points; house-sitting is competitive in peak season. Mid-term listings help for month-plus stays.",
    renterNotes:
      "Many central flats are rentals — confirm lease and local short-stay rules before listing guests.",
    tripLengthNotes:
      "1–2 weeks is the most common swap length; 30–90 nights lean mid-term or points/credits.",
  }),
  d({
    slug: "mexico-city",
    city: "Mexico City",
    country: "Mexico",
    hotelNightlyDefault: 120,
    membershipDefault: 220,
    cleaningDefault: 60,
    why: "High long-stay and remote-work interest with a wide range of neighborhoods and home types.",
    platformNotes:
      "Home exchange works well for weeks; house sits fill popular corridors quickly. Mid-term furnished is a practical backup for 1–3 months.",
    renterNotes:
      "Building rules and landlord permission matter more than platform marketing copy.",
    tripLengthNotes:
      "Month-plus stays are common for remote workers; plan 3–6 months ahead for reciprocal swaps.",
  }),
  d({
    slug: "barcelona",
    city: "Barcelona",
    country: "Spain",
    hotelNightlyDefault: 180,
    membershipDefault: 220,
    cleaningDefault: 90,
  }),
  d({
    slug: "paris",
    city: "Paris",
    country: "France",
    hotelNightlyDefault: 220,
    membershipDefault: 220,
    cleaningDefault: 100,
  }),
  d({
    slug: "new-york",
    city: "New York",
    country: "United States",
    hotelNightlyDefault: 280,
    membershipDefault: 220,
    cleaningDefault: 120,
  }),
  d({
    slug: "london",
    city: "London",
    country: "United Kingdom",
    hotelNightlyDefault: 240,
    membershipDefault: 220,
    cleaningDefault: 100,
  }),
  d({
    slug: "bali",
    city: "Bali",
    country: "Indonesia",
    hotelNightlyDefault: 90,
    membershipDefault: 220,
    cleaningDefault: 40,
  }),
  d({
    slug: "buenos-aires",
    city: "Buenos Aires",
    country: "Argentina",
    hotelNightlyDefault: 100,
    membershipDefault: 220,
    cleaningDefault: 50,
  }),
  d({
    slug: "berlin",
    city: "Berlin",
    country: "Germany",
    hotelNightlyDefault: 150,
    membershipDefault: 220,
    cleaningDefault: 70,
  }),
  d({
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    hotelNightlyDefault: 170,
    membershipDefault: 220,
    cleaningDefault: 80,
  }),
  d({
    slug: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    hotelNightlyDefault: 200,
    membershipDefault: 220,
    cleaningDefault: 90,
  }),
  d({
    slug: "rome",
    city: "Rome",
    country: "Italy",
    hotelNightlyDefault: 175,
    membershipDefault: 220,
    cleaningDefault: 85,
  }),
  d({
    slug: "medellin",
    city: "Medellín",
    country: "Colombia",
    hotelNightlyDefault: 85,
    membershipDefault: 220,
    cleaningDefault: 40,
  }),
  d({
    slug: "chiang-mai",
    city: "Chiang Mai",
    country: "Thailand",
    hotelNightlyDefault: 70,
    membershipDefault: 220,
    cleaningDefault: 30,
  }),
  d({
    slug: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    hotelNightlyDefault: 130,
    membershipDefault: 220,
    cleaningDefault: 55,
  }),
  d({
    slug: "austin",
    city: "Austin",
    country: "United States",
    hotelNightlyDefault: 190,
    membershipDefault: 220,
    cleaningDefault: 90,
  }),
  d({
    slug: "montreal",
    city: "Montreal",
    country: "Canada",
    hotelNightlyDefault: 160,
    membershipDefault: 220,
    cleaningDefault: 75,
  }),
  d({
    slug: "seoul",
    city: "Seoul",
    country: "South Korea",
    hotelNightlyDefault: 140,
    membershipDefault: 220,
    cleaningDefault: 60,
  }),
  d({
    slug: "sydney",
    city: "Sydney",
    country: "Australia",
    hotelNightlyDefault: 200,
    membershipDefault: 220,
    cleaningDefault: 95,
  }),
  d({
    slug: "prague",
    city: "Prague",
    country: "Czechia",
    hotelNightlyDefault: 130,
    membershipDefault: 220,
    cleaningDefault: 55,
  }),
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((x) => x.slug === slug);
}
