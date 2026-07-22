import { describe, expect, it } from "vitest";
import { calculateSavings } from "./savings";

describe("calculateSavings", () => {
  it("computes hotel total, swap cost, and savings", () => {
    const r = calculateSavings({
      nights: 14,
      hotelNightly: 160,
      membershipFee: 220,
      cleaningFee: 80,
      stays: 1,
    });
    expect(r.hotelTotal).toBe(2240);
    expect(r.swapCost).toBe(300);
    expect(r.saved).toBe(1940);
    expect(r.worthIt).toBe(true);
    expect(r.breakEvenNights).toBe(Math.ceil(300 / 160));
  });

  it("applies cleaning per stay", () => {
    const r = calculateSavings({
      nights: 21,
      hotelNightly: 100,
      membershipFee: 200,
      cleaningFee: 50,
      stays: 3,
    });
    expect(r.swapCost).toBe(200 + 150);
    expect(r.hotelTotal).toBe(2100);
    expect(r.saved).toBe(1750);
  });

  it("handles zero hotel rate", () => {
    const r = calculateSavings({
      nights: 7,
      hotelNightly: 0,
      membershipFee: 220,
      cleaningFee: 80,
    });
    expect(r.breakEvenNights).toBeNull();
    expect(r.worthIt).toBe(false);
  });
});
