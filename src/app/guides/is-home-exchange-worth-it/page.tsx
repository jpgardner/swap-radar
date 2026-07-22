import type { Metadata } from "next";
import Link from "next/link";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";

export const metadata: Metadata = {
  title: "Is Home Exchange Worth It? Break-Even Math for 2026",
  description:
    "Run the numbers on home exchange memberships vs hotels and Airbnb — with a free savings calculator.",
};

export default function Page() {
  return (
    <GuideLayout
      title="Is home exchange worth it?"
      src="is-home-exchange-worth-it"
    >
      <P>
        <strong>Short answer:</strong> yes if you complete enough nights and can
        host or sit successfully — math, not vibes. A membership that sits unused
        is just a fee.
      </P>

      <div className="not-prose my-6">
        <SavingsCalculator defaultDestination="lisbon" defaultNights={14} />
      </div>

      <H2>Cost stack</H2>
      <Ul>
        <li>Membership (annual or per network)</li>
        <li>Cleaning / service fees</li>
        <li>Time to list, message, and prepare the home</li>
        <li>Risk and wear (harder to price, still real)</li>
      </Ul>
      <P>Compare against nightly lodging you would have paid.</P>

      <H2>Break-even formula</H2>
      <P>
        Break-even nights ≈ (membership + cleaning per stay) ÷ hotel nightly.
        More stays in a year amortize membership faster. The calculator applies
        cleaning × number of stays.
      </P>

      <H2>Three worked examples</H2>
      <Ul>
        <li>
          <Link
            href="/tools/savings-calculator?nights=7&destination=paris"
            className="underline"
          >
            One short trip (7 nights, Paris)
          </Link>
        </li>
        <li>
          <Link
            href="/tools/savings-calculator?nights=14&destination=lisbon"
            className="underline"
          >
            Two weeks abroad (14 nights, Lisbon)
          </Link>
        </li>
        <li>
          <Link
            href="/tools/savings-calculator?nights=28&destination=london"
            className="underline"
          >
            Three trips totaling ~28 nights (London baseline)
          </Link>
        </li>
      </Ul>

      <H2>Hidden costs</H2>
      <P>
        Linens, deep cleans, broken mugs, time spent messaging, and the
        opportunity cost of hosting when you’d rather lock the door and leave.
        If those stress you out, house sitting or paid stays may be healthier.
      </P>

      <H2>When it’s not worth it</H2>
      <Ul>
        <li>One-off trip with no plan to host</li>
        <li>Lease forbids guests/sublets</li>
        <li>Wrong platform for your luxury bar or cities</li>
        <li>You won’t invest in a decent listing</li>
      </Ul>

      <p className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/quiz" className="font-medium underline">
          Quiz
        </Link>
        <a href="/go/homeexchange?src=is-home-exchange-worth-it" className="underline">
          HomeExchange
        </a>
        <a
          href="/go/trustedhousesitters?src=is-home-exchange-worth-it"
          className="underline"
        >
          TrustedHousesitters
        </a>
      </p>

      <Faq
        items={[
          {
            q: "How many nights until membership pays off?",
            a: "Often a handful of nights in expensive cities — run the calculator with your real hotel comps.",
          },
          {
            q: "Does the calculator include flights?",
            a: "No. It isolates lodging: hotel total vs membership + cleaning.",
          },
        ]}
      />

      <H2>Related</H2>
      <Ul>
        <li>
          <Link href="/guides/best-home-exchange-sites" className="underline">
            Best home exchange sites
          </Link>
        </li>
        <li>
          <Link href="/guides/how-home-exchange-works" className="underline">
            How it works
          </Link>
        </li>
        <li>
          <Link
            href="/guides/home-exchange-vs-airbnb-vs-house-sitting"
            className="underline"
          >
            vs Airbnb vs sitting
          </Link>
        </li>
        <li>
          <Link href="/compare/kindred-vs-homeexchange" className="underline">
            Kindred vs HomeExchange
          </Link>
        </li>
      </Ul>
    </GuideLayout>
  );
}
