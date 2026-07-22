import type { Metadata } from "next";
import Link from "next/link";
import { PLATFORMS } from "@/data/platforms";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";
import { CtaRow } from "@/components/content/CtaRow";

export const metadata: Metadata = {
  title: "Best Home Exchange Sites (2026) — Compared by Model, Cost & Fit",
  description:
    "Compare the best home exchange and home swap platforms by fees, flexibility, insurance, and who they’re for. Free quiz to get a match.",
};

export default function Page() {
  return (
    <GuideLayout
      title="Best home exchange sites in 2026"
      src="best-home-exchange-sites"
    >
      <P>
        Hotel and Airbnb nights add up fast. Home exchange offsets lodging by
        trading access to homes — simultaneously, via points, or with credits.
        The hard part isn’t “is exchange real?” It’s picking the right network
        for your housing, trip length, and risk tolerance.
      </P>
      <P>
        This guide ranks the platforms we score in Swap Radar’s quiz. We verify
        fees and claims periodically (
        <code className="text-sm">last_verified</code> on each card) and route
        you through tracked links — we don’t scrape full home catalogs.
      </P>

      <div className="not-prose my-6">
        <CtaRow src="best-home-exchange-sites" />
      </div>

      <H2>How we evaluate</H2>
      <Ul>
        <li>Membership and per-stay cost shape</li>
        <li>Model: simultaneous, points, credits, sitting, mid-term</li>
        <li>Coverage and scale (qualitative — no fake live counts)</li>
        <li>Trust: verification, insurance language, invite-only gates</li>
        <li>Whether renters can realistically participate</li>
      </Ul>

      <H2>Quick picks</H2>
      <Ul>
        <li>
          <strong>Best overall scale:</strong> HomeExchange
        </li>
        <li>
          <strong>Best flexible credits:</strong> Kindred
        </li>
        <li>
          <strong>Best luxury second home:</strong> ThirdHome
        </li>
        <li>
          <strong>Best if you have no home to offer:</strong> TrustedHousesitters
        </li>
        <li>
          <strong>Best community vibe:</strong> People Like Us
        </li>
      </Ul>

      <H2>Comparison</H2>
      <P>
        Full structured table:{" "}
        <Link href="/compare" className="underline">
          /compare
        </Link>
        . Prefer personalization?{" "}
        <Link href="/quiz" className="underline">
          Take the quiz
        </Link>
        .
      </P>

      <H2>Platform blurbs</H2>
      {PLATFORMS.map((p) => (
        <div key={p.slug} className="mt-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {p.name}
          </h3>
          <P>{p.shortBlurb}</P>
          <P>
            <strong>Pricing:</strong> {p.pricingSummary}. {p.pricingDetail}
          </P>
          <P>
            <strong>Pros:</strong> {p.coverageNotes}{" "}
            <strong>Trust notes:</strong> {p.insuranceSummary}
          </P>
          <P>
            <strong>Renters:</strong> {p.renterOk ? "Possible with caveats" : "Generally not a fit"}.
            {p.inviteOnly ? " Application/invite required." : ""}
          </P>
          <p>
            <a
              href={`/go/${p.slug}?src=best-home-exchange-sites`}
              className="text-sm font-medium underline"
            >
              Visit {p.name}
            </a>
            <span className="text-xs text-zinc-500">
              {" "}
              · verified {p.lastVerifiedAt}
            </span>
          </p>
        </div>
      ))}

      <H2>Home exchange vs house sitting</H2>
      <P>
        Exchange is reciprocal (you offer a home or earn points/credits). House
        sitting trades care work for lodging — better if you can’t list a place.
        Deep dive:{" "}
        <Link
          href="/guides/home-exchange-vs-airbnb-vs-house-sitting"
          className="underline"
        >
          home exchange vs Airbnb vs house sitting
        </Link>
        .
      </P>

      <H2>How to choose</H2>
      <P>
        Start with housing status (own / rent / no home), then timing flexibility,
        then trip length. Or skip the guesswork:{" "}
        <Link href="/quiz" className="underline">
          90-second quiz
        </Link>
        . Run{" "}
        <Link href="/tools/savings-calculator" className="underline">
          break-even nights
        </Link>{" "}
        before paying for membership.
      </P>

      <Faq
        items={[
          {
            q: "Is home exchange free?",
            a: "Stays often have no nightly rent, but most networks charge membership and sometimes cleaning or service fees. Flights are separate.",
          },
          {
            q: "Is it safe?",
            a: "Risk is real whenever strangers access homes. Prefer platforms with ID verification, reviews, and clear damage processes — and write house rules.",
          },
          {
            q: "Can renters join?",
            a: "Sometimes. Your lease and local rules decide. See our renters guide before listing guests.",
          },
          {
            q: "How long can you stay?",
            a: "Weekends through multi-month stays exist. Longer trips often use points, credits, or mid-term platforms rather than pure simultaneous swaps.",
          },
        ]}
      />

      <H2>Related</H2>
      <Ul>
        <li>
          <Link href="/guides/how-home-exchange-works" className="underline">
            How home exchange works
          </Link>
        </li>
        <li>
          <Link href="/compare/kindred-vs-homeexchange" className="underline">
            Kindred vs HomeExchange
          </Link>
        </li>
        <li>
          <Link href="/guides/is-home-exchange-worth-it" className="underline">
            Is home exchange worth it?
          </Link>
        </li>
        <li>
          <Link href="/guides/can-renters-home-swap" className="underline">
            Can renters home swap?
          </Link>
        </li>
        <li>
          <Link href="/guides/long-stay-home-exchange" className="underline">
            Long-stay home exchange
          </Link>
        </li>
      </Ul>
    </GuideLayout>
  );
}
