"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DESTINATIONS } from "@/data/destinations";
import { calculateSavings } from "@/lib/calculator/savings";

type Props = {
  defaultDestination?: string;
  defaultNights?: number;
  compact?: boolean;
};

export function SavingsCalculator({
  defaultDestination = "lisbon",
  defaultNights = 14,
  compact = false,
}: Props) {
  const initial =
    DESTINATIONS.find((d) => d.slug === defaultDestination) ?? DESTINATIONS[0];

  const [destinationSlug, setDestinationSlug] = useState(initial.slug);
  const [nights, setNights] = useState(defaultNights);
  const [hotelNightly, setHotelNightly] = useState(initial.hotelNightlyDefault);
  const [membershipFee, setMembershipFee] = useState(initial.membershipDefault);
  const [cleaningFee, setCleaningFee] = useState(initial.cleaningDefault);
  const [stays, setStays] = useState(1);

  function onDestinationChange(slug: string) {
    setDestinationSlug(slug);
    const d = DESTINATIONS.find((x) => x.slug === slug);
    if (d) {
      setHotelNightly(d.hotelNightlyDefault);
      setMembershipFee(d.membershipDefault);
      setCleaningFee(d.cleaningDefault);
    }
  }

  const result = useMemo(
    () =>
      calculateSavings({
        nights,
        hotelNightly,
        membershipFee,
        cleaningFee,
        stays,
      }),
    [nights, hotelNightly, membershipFee, cleaningFee, stays],
  );

  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${compact ? "p-4" : "p-6"}`}
    >
      {!compact && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Savings calculator</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Hotel baseline vs membership + cleaning. Flights and incidentals not
            included.
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-zinc-500">Destination</span>
          <select
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={destinationSlug}
            onChange={(e) => onDestinationChange(e.target.value)}
          >
            {DESTINATIONS.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.city}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">Nights this year</span>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">Hotel nightly ($)</span>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={hotelNightly}
            onChange={(e) => setHotelNightly(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">Membership fee ($)</span>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={membershipFee}
            onChange={(e) => setMembershipFee(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">Cleaning per stay ($)</span>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={cleaningFee}
            onChange={(e) => setCleaningFee(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-500">Number of stays</span>
          <input
            type="number"
            min={1}
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            value={stays}
            onChange={(e) => setStays(Number(e.target.value))}
          />
        </label>
      </div>

      <div
        className={`mt-5 rounded-xl p-4 ${
          result.worthIt
            ? "bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100"
            : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
        }`}
      >
        <p className="text-2xl font-semibold">
          {result.saved >= 0 ? "+" : "−"}$
          {Math.round(Math.abs(result.saved)).toLocaleString()}
        </p>
        <p className="mt-1 text-sm opacity-90">{result.summary}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <div>
            <dt className="opacity-70">Hotel total</dt>
            <dd className="font-medium">
              ${Math.round(result.hotelTotal).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="opacity-70">Swap costs</dt>
            <dd className="font-medium">
              ${Math.round(result.swapCost).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="opacity-70">Break-even nights</dt>
            <dd className="font-medium">
              {result.breakEvenNights ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="opacity-70">Per night hotel</dt>
            <dd className="font-medium">${hotelNightly}</dd>
          </div>
        </dl>
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/quiz" className="font-medium underline">
            Find the right platform
          </Link>
          <a href="/go/homeexchange?src=calculator" className="underline">
            HomeExchange
          </a>
          <a
            href="/go/trustedhousesitters?src=calculator"
            className="underline"
          >
            TrustedHousesitters
          </a>
        </div>
      )}
    </div>
  );
}
