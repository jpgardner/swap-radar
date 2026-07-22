import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";
import { CtaRow } from "@/components/content/CtaRow";

export const metadata: Metadata = {
  title: "Home Exchange vs Airbnb vs House Sitting — Which Saves More?",
  description:
    "Side-by-side costs, effort, and risk: paid stays, reciprocal swaps, and pet/house sitting.",
};

export default function Page() {
  return (
    <GuideLayout
      title="Home exchange vs Airbnb vs house sitting"
      src="he-vs-airbnb-vs-sitting"
    >
      <P>
        Three ways to sleep somewhere that isn’t a hotel: pay (Airbnb),
        reciprocate (home exchange), or care for a place (house sitting). They
        solve different problems — stacking them in one year is normal.
      </P>

      <H2>TL;DR</H2>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-950">
            <tr>
              <th className="px-3 py-2"> </th>
              <th className="px-3 py-2">Airbnb</th>
              <th className="px-3 py-2">Home exchange</th>
              <th className="px-3 py-2">House sitting</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              ["Lodging cost", "Nightly + fees", "Membership-led", "Membership-led"],
              ["Need a home?", "No", "Usually yes", "No"],
              ["Effort", "Low", "Medium–high", "Applications + care"],
              ["Flexibility", "High if budget", "Medium", "Tied to sit dates"],
              ["Best for", "One-way trips", "Repeat travelers", "No home to offer"],
            ].map((row) => (
              <tr
                key={row[0]}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-3 py-2 ${i === 0 ? "font-medium" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>When Airbnb wins</H2>
      <P>
        One-way trips, fixed dates, no home to offer, or zero interest in hosting.
        You pay for control and simplicity.
      </P>

      <H2>When home exchange wins</H2>
      <P>
        You can offer a place (or earn points/credits), travel more than once a
        year, and accept some coordination. Savings show up after break-even
        nights — use the{" "}
        <Link href="/tools/savings-calculator" className="underline">
          calculator
        </Link>
        .
      </P>

      <H2>When house sitting wins</H2>
      <P>
        You don’t have a listable home, you’re fine with pets/plants, and you can
        compete for sits. Start:{" "}
        <a href="/go/trustedhousesitters?src=he-vs-airbnb-vs-sitting" className="underline">
          TrustedHousesitters
        </a>
        .
      </P>

      <H2>Cost scenarios</H2>
      <Ul>
        <li>7 city nights — calculator often favors Airbnb unless membership is already paid</li>
        <li>30 nights — exchange/sitting usually crush hotel math if you secure the stay</li>
        <li>3 trips/year — membership amortizes; hybrid HE + sitting is common</li>
      </Ul>
      <P>
        Prefill:{" "}
        <Link
          href="/tools/savings-calculator?nights=30&destination=lisbon"
          className="underline"
        >
          30 nights in Lisbon
        </Link>
        .
      </P>

      <H2>Hybrid strategy</H2>
      <P>
        Many travelers keep a home-exchange membership for reciprocal trips and
        a sitting membership for destinations where they can’t match.{" "}
        <a href="/go/homeexchange?src=he-vs-airbnb-vs-sitting" className="underline">
          HomeExchange
        </a>{" "}
        +{" "}
        <a href="/go/trustedhousesitters?src=he-vs-airbnb-vs-sitting" className="underline">
          TrustedHousesitters
        </a>
        .
      </P>

      <div className="not-prose my-6">
        <CtaRow src="he-vs-airbnb-vs-sitting" />
      </div>

      <Faq
        items={[
          {
            q: "Is house sitting really free?",
            a: "Lodging is typically free in exchange for care duties. Memberships still cost money, and competition for popular sits is real.",
          },
          {
            q: "Can I use all three in one year?",
            a: "Yes. Pay for speed, swap for savings when you can host, sit when you can’t offer a home.",
          },
        ]}
      />

      <H2>Related</H2>
      <Ul>
        <li>
          <Link
            href="/compare/trustedhousesitters-vs-home-exchange"
            className="underline"
          >
            TrustedHousesitters vs home exchange
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
