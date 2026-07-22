import type {
  BudgetMembership,
  HousingStatus,
  LuxuryLevel,
  PetsKidsFlag,
  SimultaneousOk,
  TravelStyle,
  TripLength,
} from "./types";

export type QuestionOption<T extends string> = {
  value: T;
  label: string;
};

export type QuizQuestion =
  | {
      id: "housing_status";
      prompt: string;
      multi: false;
      options: QuestionOption<HousingStatus>[];
    }
  | {
      id: "trip_length";
      prompt: string;
      multi: false;
      options: QuestionOption<TripLength>[];
    }
  | {
      id: "simultaneous_ok";
      prompt: string;
      multi: false;
      options: QuestionOption<SimultaneousOk>[];
    }
  | {
      id: "budget_membership";
      prompt: string;
      multi: false;
      options: QuestionOption<BudgetMembership>[];
    }
  | {
      id: "luxury";
      prompt: string;
      multi: false;
      options: QuestionOption<LuxuryLevel>[];
    }
  | {
      id: "travel_style";
      prompt: string;
      multi: false;
      options: QuestionOption<TravelStyle>[];
    }
  | {
      id: "pets_kids";
      prompt: string;
      multi: true;
      options: QuestionOption<PetsKidsFlag>[];
    }
  | {
      id: "destinations";
      prompt: string;
      multi: true;
      optional: true;
      options: QuestionOption<string>[];
    };

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "housing_status",
    prompt: "What best describes your housing?",
    multi: false,
    options: [
      { value: "own_primary", label: "I own (or fully control) my primary home" },
      { value: "own_second", label: "I have a second / vacation home" },
      { value: "rent", label: "I rent my primary home" },
      { value: "no_home", label: "I don’t have a home to offer" },
    ],
  },
  {
    id: "trip_length",
    prompt: "How long do you usually want to stay?",
    multi: false,
    options: [
      { value: "weekend", label: "Weekends / long weekends" },
      { value: "weeks", label: "1–2 weeks" },
      { value: "month", label: "About a month" },
      { value: "long", label: "1–3+ months" },
      { value: "mixed", label: "Mix of short and long" },
    ],
  },
  {
    id: "simultaneous_ok",
    prompt: "Can you leave home when guests arrive (true simultaneous swap)?",
    multi: false,
    options: [
      { value: "yes", label: "Yes — classic swap works for me" },
      { value: "no", label: "No — I need flexible / non-simultaneous timing" },
      { value: "either", label: "Either works" },
    ],
  },
  {
    id: "budget_membership",
    prompt: "What will you spend on memberships this year?",
    multi: false,
    options: [
      { value: "free", label: "Prefer free / pay-per-use only" },
      { value: "low", label: "Up to ~$150" },
      { value: "mid", label: "About $150–300" },
      { value: "high", label: "$300+ is fine if it fits" },
    ],
  },
  {
    id: "luxury",
    prompt: "What kind of places are you aiming for?",
    multi: false,
    options: [
      { value: "normal", label: "Normal homes / apartments" },
      { value: "nice", label: "Nice, well-kept places" },
      { value: "luxury", label: "High-end / luxury second homes" },
    ],
  },
  {
    id: "travel_style",
    prompt: "What matters most?",
    multi: false,
    options: [
      { value: "volume", label: "Maximum choice of cities and homes" },
      { value: "trust", label: "Vetting, cleaning, protection, polish" },
      { value: "community", label: "Warm community / personal matching" },
      { value: "design", label: "Design-forward / creative homes" },
      { value: "work", label: "Work-friendly long stays / academic mid-term" },
    ],
  },
  {
    id: "pets_kids",
    prompt: "Any of these apply?",
    multi: true,
    options: [
      { value: "pets_have", label: "I have pets that stay or travel" },
      { value: "pets_ok", label: "I’m fine hosting pets" },
      { value: "kids", label: "Traveling with kids" },
      { value: "none", label: "None of these" },
    ],
  },
  {
    id: "destinations",
    prompt: "Any destinations in mind? (optional)",
    multi: true,
    optional: true,
    options: [
      { value: "lisbon", label: "Lisbon" },
      { value: "mexico-city", label: "Mexico City" },
      { value: "barcelona", label: "Barcelona" },
      { value: "paris", label: "Paris" },
      { value: "new-york", label: "New York" },
      { value: "london", label: "London" },
      { value: "bali", label: "Bali" },
      { value: "buenos-aires", label: "Buenos Aires" },
      { value: "berlin", label: "Berlin" },
      { value: "tokyo", label: "Tokyo" },
    ],
  },
];
