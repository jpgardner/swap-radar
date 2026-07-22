import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";
import { CtaRow } from "@/components/content/CtaRow";

export const metadata: Metadata = {
  title: "Long-Stay Home Exchange (1–3 Months): How to Make It Work",
  description:
    "Plan multi-week and multi-month home swaps — platforms, timing, visas, and mid-term alternatives.",
};

export default function Page() {
  return (
    <GuideLayout
      title="Long-stay home exchange (1–3 months)"
      src="long-stay-home-exchange"
    >
      <P>
        Month-plus stays are different from vacation weeks. Pure simultaneous
        matches get harder; points, credits, mid-term furnished, and sitting
        chains matter more.
      </P>

      <H2>Why long stays differ</H2>
      <Ul>
        <li>Fewer people free for the exact same dates</li>
        <li>Utilities, mail, and neighbors need a real plan</li>
        <li>Visa and tax residency rules may apply — housing ≠ immigration status</li>
      </Ul>

      <H2>Best platform types</H2>
      <Ul>
        <li>HomeExchange points for non-simultaneous multi-week stays</li>
        <li>Kindred credits when approved in your cities</li>
        <li>SabbaticalHomes-style mid-term for academic/remote months</li>
        <li>House-sitting strings if you can commit to care duties</li>
      </Ul>

      <H2>Timeline</H2>
      <P>
        Start 3–6 months out for reciprocal long stays. Mid-term rentals can
        close faster if budget allows a paid fallback.
      </P>

      <H2>House manual for long stays</H2>
      <Ul>
        <li>Utilities, Wi‑Fi, trash, building access</li>
        <li>Mail/packages and plant/pet care</li>
        <li>Neighbors and emergency contacts</li>
        <li>WFH realities: desk, noise, coworking backup</li>
      </Ul>

      <H2>Money</H2>
      <P>
        Amortize membership across 30/60/90 nights.{" "}
        <Link
          href="/tools/savings-calculator?nights=60&destination=mexico-city"
          className="underline"
        >
          60 nights in Mexico City
        </Link>{" "}
        ·{" "}
        <Link
          href="/tools/savings-calculator?nights=90&destination=lisbon"
          className="underline"
        >
          90 nights in Lisbon
        </Link>
        .
      </P>

      <H2>Visas & tax residency</H2>
      <P>
        A swap or sit does not grant the right to work or reside. Check entry
        rules for your nationality and trip length. When in doubt, professional
        advice beats forum folklore.
      </P>

      <H2>Destination starters</H2>
      <Ul>
        <li>
          <Link href="/destinations/lisbon" className="underline">
            Lisbon
          </Link>
        </li>
        <li>
          <Link href="/destinations/mexico-city" className="underline">
            Mexico City
          </Link>
        </li>
      </Ul>

      <div className="not-prose my-6">
        <CtaRow src="long-stay-home-exchange" />
      </div>

      <Faq
        items={[
          {
            q: "Can I do a 3-month simultaneous swap?",
            a: "Possible but harder. Points, credits, mid-term, or unpaid house sits are more common for multi-month stays.",
          },
          {
            q: "Is SabbaticalHomes a free swap network?",
            a: "Often it’s mid-term furnished housing (sometimes paid). Treat it as a long-stay tool, not pure free exchange.",
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
          <Link href="/guides/can-renters-home-swap" className="underline">
            Can renters home swap?
          </Link>
        </li>
        <li>
          <Link href="/guides/is-home-exchange-worth-it" className="underline">
            Is home exchange worth it?
          </Link>
        </li>
      </Ul>
    </GuideLayout>
  );
}
