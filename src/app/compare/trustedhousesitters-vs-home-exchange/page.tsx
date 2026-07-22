import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";

export const metadata: Metadata = {
  title: "TrustedHousesitters vs Home Exchange: Which Free-Stay Path Fits?",
  description:
    "Compare house sitting and home exchange on cost, pets, flexibility, and whether you need a home to offer.",
};

export default function Page() {
  return (
    <GuideLayout
      title="TrustedHousesitters vs home exchange"
      src="ths-vs-home-exchange"
    >
      <P>
        <strong>Verdict:</strong> Choose home exchange when you can offer a home
        and want reciprocal travel. Choose TrustedHousesitters when you can’t
        (or won’t) list a place and are willing to care for pets/homes in
        exchange for lodging.
      </P>

      <div className="not-prose my-6 flex flex-wrap gap-3">
        <a
          href="/go/trustedhousesitters?src=ths-vs-home-exchange"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Visit TrustedHousesitters
        </a>
        <a
          href="/go/homeexchange?src=ths-vs-home-exchange"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          Visit HomeExchange
        </a>
        <Link
          href="/quiz"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          Quiz
        </Link>
      </div>

      <H2>Side-by-side</H2>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-950">
            <tr>
              <th className="px-3 py-2"> </th>
              <th className="px-3 py-2">TrustedHousesitters</th>
              <th className="px-3 py-2">Home exchange</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Need a home?", "No", "Usually yes"],
              ["Pets", "Often the job", "Optional filter"],
              ["Membership", "Yes (sitter/owner)", "Yes (annual common)"],
              ["Freedom during stay", "Care schedule first", "Guest norms"],
              ["You earn rent?", "No", "No — reciprocity / points"],
            ].map((row) => (
              <tr
                key={row[0]}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                <td className="px-3 py-2 font-medium">{row[0]}</td>
                <td className="px-3 py-2">{row[1]}</td>
                <td className="px-3 py-2">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Effort & competition</H2>
      <P>
        Sits are applications — profiles, reviews, and message quality matter.
        Swaps are negotiation and listing quality. Popular cities are competitive
        on both.
      </P>

      <H2>Cost</H2>
      <P>
        Both use memberships. Neither pays you rent. Compare nights saved with
        the{" "}
        <Link href="/tools/savings-calculator" className="underline">
          calculator
        </Link>
        .
      </P>

      <H2>Stacking</H2>
      <P>
        Common pattern: exchange membership for reciprocal trips + sitting for
        destinations where you can’t match a home. See also{" "}
        <Link
          href="/guides/home-exchange-vs-airbnb-vs-house-sitting"
          className="underline"
        >
          three-way comparison
        </Link>
        .
      </P>

      <H2>Who should pick what</H2>
      <Ul>
        <li>No home / renter without permission → sitting first</li>
        <li>Owner with flexible dates → home exchange first</li>
        <li>Pet lover who likes care work → sitting can be the whole strategy</li>
      </Ul>

      <Faq
        items={[
          {
            q: "Is TrustedHousesitters a home exchange network?",
            a: "No. It’s house/pet sitting. Lodging is free in exchange for care, not a reciprocal home trade.",
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
          <Link href="/guides/can-renters-home-swap" className="underline">
            Can renters home swap?
          </Link>
        </li>
      </Ul>
    </GuideLayout>
  );
}
