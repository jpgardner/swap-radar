export type SavingsInput = {
  nights: number;
  hotelNightly: number;
  membershipFee: number;
  cleaningFee: number;
  /** Optional number of separate stays (cleaning applied per stay) */
  stays?: number;
};

export type SavingsResult = {
  hotelTotal: number;
  swapCost: number;
  saved: number;
  breakEvenNights: number | null;
  summary: string;
  worthIt: boolean;
};

/**
 * Break-even nights: nights where hotel cost covers membership + cleaning for one stay.
 * breakEven = (membership + cleaning) / hotelNightly  (ceiling)
 */
export function calculateSavings(input: SavingsInput): SavingsResult {
  const nights = Math.max(0, Number(input.nights) || 0);
  const hotelNightly = Math.max(0, Number(input.hotelNightly) || 0);
  const membershipFee = Math.max(0, Number(input.membershipFee) || 0);
  const cleaningFee = Math.max(0, Number(input.cleaningFee) || 0);
  const stays = Math.max(1, Math.floor(Number(input.stays) || 1));

  const hotelTotal = nights * hotelNightly;
  const swapCost = membershipFee + cleaningFee * stays;
  const saved = hotelTotal - swapCost;

  let breakEvenNights: number | null = null;
  if (hotelNightly > 0) {
    breakEvenNights = Math.ceil((membershipFee + cleaningFee) / hotelNightly);
  }

  const worthIt = saved > 0 && nights > 0;

  let summary: string;
  if (nights <= 0 || hotelNightly <= 0) {
    summary = "Enter nights and a hotel nightly rate to estimate savings.";
  } else if (breakEvenNights !== null && nights < breakEvenNights) {
    summary = `At ~$${hotelNightly}/night, you need about ${breakEvenNights} nights this year for membership + cleaning to break even. You’re at ${nights}.`;
  } else if (saved >= 0) {
    summary = `Estimated lodging savings: $${Math.round(saved).toLocaleString()} vs hotels (${nights} nights). Break-even ~${breakEvenNights} nights.`;
  } else {
    summary = `This scenario costs ~$${Math.round(Math.abs(saved)).toLocaleString()} more than hotels — lengthen the trip or lower assumed fees.`;
  }

  return {
    hotelTotal,
    swapCost,
    saved,
    breakEvenNights,
    summary,
    worthIt,
  };
}
