import { describe, expect, it } from "vitest";
import { scoreQuiz } from "./score";
import type { QuizAnswers } from "./types";

const base = {
  pets_kids: ["none"] as QuizAnswers["pets_kids"],
  destinations: [] as string[],
};

describe("scoreQuiz quiz_rules_v1", () => {
  it("Example A — owner, flexible, volume → HE then Kindred", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "own_primary",
      trip_length: "weeks",
      simultaneous_ok: "either",
      budget_membership: "mid",
      luxury: "nice",
      travel_style: "volume",
    });

    expect(result.rulesVersion).toBe("quiz_rules_v1");
    expect(result.rankings).toHaveLength(3);
    expect(result.primarySlug).toBe("homeexchange");
    expect(result.rankings[1].slug).toBe("kindred");
    expect(result.noteCodes).toContain("membership_not_free");
    // Third platform is peoplelikeus or trustedhousesitters per docs
    expect(["peoplelikeus", "trustedhousesitters", "homelink"]).toContain(
      result.rankings[2].slug,
    );
  });

  it("Example B — renter, long stay, work", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "rent",
      trip_length: "long",
      simultaneous_ok: "no",
      budget_membership: "low",
      luxury: "normal",
      travel_style: "work",
    });

    expect(result.primarySlug).toBe("sabbaticalhomes");
    expect(result.rankings.map((r) => r.slug).slice(0, 3)).toEqual(
      expect.arrayContaining(["sabbaticalhomes", "trustedhousesitters"]),
    );
    // homeexchange should appear in top 3 with capped enthusiasm
    expect(result.rankings.map((r) => r.slug)).toContain("homeexchange");
    expect(result.noteCodes).toContain("renter_lease");
    expect(result.noteCodes).toContain("long_stay_visa");
    expect(result.noteCodes).toContain("membership_not_free");
  });

  it("Example C — no home, pets, short trips", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "no_home",
      trip_length: "weekend",
      simultaneous_ok: "either",
      budget_membership: "free",
      luxury: "normal",
      travel_style: "trust",
      pets_kids: ["pets_have"],
    });

    expect(result.primarySlug).toBe("trustedhousesitters");
    expect(result.rankings[1].slug).toBe("sabbaticalhomes");
    expect(result.noteCodes).toContain("pets_planning");
    // pure swaps capped; if any appear, must_offer_home
    const pure = result.rankings.filter((r) =>
      [
        "homeexchange",
        "kindred",
        "peoplelikeus",
        "homelink",
        "behomm",
        "thirdhome",
      ].includes(r.slug),
    );
    if (pure.length) {
      expect(result.noteCodes).toContain("must_offer_home");
    }
    // ThirdHome never #1 for no_home
    expect(result.primarySlug).not.toBe("thirdhome");
  });

  it("Example D — second home luxury", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "own_second",
      trip_length: "weeks",
      simultaneous_ok: "either",
      budget_membership: "high",
      luxury: "luxury",
      travel_style: "trust",
    });

    expect(result.primarySlug).toBe("thirdhome");
    expect(result.rankings.map((r) => r.slug).slice(0, 3)).toEqual(
      expect.arrayContaining(["thirdhome", "homeexchange", "kindred"]),
    );
    expect(result.rankings[0].slug).toBe("thirdhome");
    expect(result.noteCodes).toContain("membership_not_free");
  });

  it("Example E — design simultaneous", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "own_primary",
      trip_length: "weeks",
      simultaneous_ok: "yes",
      budget_membership: "mid",
      luxury: "nice",
      travel_style: "design",
    });

    expect(result.primarySlug).toBe("behomm");
    expect(result.rankings.map((r) => r.slug)).toEqual(
      expect.arrayContaining(["behomm", "homeexchange"]),
    );
    // kindred or peoplelikeus as third-ish
    const top = result.rankings.map((r) => r.slug);
    expect(
      top.includes("kindred") || top.includes("peoplelikeus"),
    ).toBe(true);
  });

  it("always returns exactly 3 rankings with cta paths", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "own_primary",
      trip_length: "mixed",
      simultaneous_ok: "either",
      budget_membership: "mid",
      luxury: "normal",
      travel_style: "community",
    });
    expect(result.rankings).toHaveLength(3);
    for (const r of result.rankings) {
      expect(r.ctaPath).toBe(`/go/${r.slug}?src=quiz`);
      expect(r.reasons.length).toBeGreaterThan(0);
      expect(r.rank).toBeGreaterThanOrEqual(1);
      expect(r.rank).toBeLessThanOrEqual(3);
    }
  });

  it("excludes ThirdHome from top 3 without second home", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "own_primary",
      trip_length: "weeks",
      simultaneous_ok: "either",
      budget_membership: "high",
      luxury: "luxury",
      travel_style: "trust",
    });
    expect(result.rankings.map((r) => r.slug)).not.toContain("thirdhome");
    expect(result.noteCodes).toContain("thirdhome_needs_second_home");
  });

  it("rent always includes renter_lease note", () => {
    const result = scoreQuiz({
      ...base,
      housing_status: "rent",
      trip_length: "weeks",
      simultaneous_ok: "yes",
      budget_membership: "mid",
      luxury: "normal",
      travel_style: "volume",
    });
    expect(result.noteCodes).toContain("renter_lease");
  });
});
