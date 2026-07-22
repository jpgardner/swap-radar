import type { Metadata } from "next";
import Link from "next/link";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";

type Props = {
  searchParams: Promise<{ destination?: string; nights?: string }>;
};

export const metadata: Metadata = {
  title: "Home exchange savings calculator",
  description:
    "Estimate lodging savings from home exchange vs hotels — break-even nights, membership, and cleaning.",
};

export default async function SavingsCalculatorPage({ searchParams }: Props) {
  const sp = await searchParams;
  const destination = sp.destination ?? "lisbon";
  const nights = sp.nights ? Number(sp.nights) : 14;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-sm font-medium text-zinc-500">Free tool</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        Home exchange savings calculator
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Run break-even math before you buy a membership. Hotel baselines are
        rough mid-range defaults — edit them to match your trip.
      </p>
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>
      <div className="mt-8">
        <SavingsCalculator
          defaultDestination={destination}
          defaultNights={Number.isFinite(nights) ? nights : 14}
        />
      </div>
      <div className="mt-8 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          Next:{" "}
          <Link href="/quiz" className="font-medium underline">
            take the quiz
          </Link>{" "}
          or read{" "}
          <Link
            href="/guides/is-home-exchange-worth-it"
            className="font-medium underline"
          >
            is home exchange worth it?
          </Link>
        </p>
      </div>
    </div>
  );
}
