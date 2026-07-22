import Link from "next/link";
import type { Destination } from "@/data/destinations";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { AffiliateDisclosure } from "@/components/content/AffiliateDisclosure";
import { CtaRow } from "@/components/content/CtaRow";

export function DestinationPage({ destination }: { destination: Destination }) {
  const src = `destination-${destination.slug}`;
  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-sm text-zinc-500">
        {destination.country} · Updated July 2026
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        Home exchange in {destination.city}
      </h1>
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>

      <section className="mt-8 space-y-4 text-zinc-700 dark:text-zinc-300">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Why {destination.city}
        </h2>
        <p className="leading-relaxed">{destination.why}</p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Which platforms fit
        </h2>
        <p className="leading-relaxed">{destination.platformNotes}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href={`/go/homeexchange?src=${src}`} className="underline">
            HomeExchange
          </a>
          <a href={`/go/kindred?src=${src}`} className="underline">
            Kindred
          </a>
          <a href={`/go/trustedhousesitters?src=${src}`} className="underline">
            TrustedHousesitters
          </a>
          <a href={`/go/sabbaticalhomes?src=${src}`} className="underline">
            SabbaticalHomes
          </a>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Hotel baseline
        </h2>
        <p className="leading-relaxed">
          Default mid-range hotel estimate:{" "}
          <strong>${destination.hotelNightlyDefault}/night</strong>. Edit freely
          in the calculator — this is a planning default, not a quote.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Best trip lengths
        </h2>
        <p className="leading-relaxed">{destination.tripLengthNotes}</p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Renter notes
        </h2>
        <p className="leading-relaxed">{destination.renterNotes}</p>
        <p className="text-sm text-zinc-500">
          Your lease overrides platform marketing.{" "}
          <Link href="/guides/can-renters-home-swap" className="underline">
            Renters guide
          </Link>
        </p>

        <h2 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Sample savings
        </h2>
      </section>

      <div className="mt-4">
        <SavingsCalculator
          defaultDestination={destination.slug}
          defaultNights={14}
        />
      </div>

      <div className="mt-10">
        <CtaRow src={src} />
      </div>

      <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
        Related:{" "}
        <Link href="/guides/long-stay-home-exchange" className="underline">
          long-stay guide
        </Link>
        {" · "}
        <Link href="/guides/best-home-exchange-sites" className="underline">
          best platforms
        </Link>
        {" · "}
        {destination.slug === "lisbon" ? (
          <Link href="/destinations/mexico-city" className="underline">
            Mexico City
          </Link>
        ) : (
          <Link href="/destinations/lisbon" className="underline">
            Lisbon
          </Link>
        )}
      </p>
    </article>
  );
}
