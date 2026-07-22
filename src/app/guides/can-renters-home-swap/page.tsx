import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";

export const metadata: Metadata = {
  title: "Can Renters Home Swap? Lease Rules, Risks & Better Options",
  description:
    "What renters should check before home exchange — leases, guests, insurance — plus house sitting and mid-term alternatives.",
};

export default function Page() {
  return (
    <GuideLayout title="Can renters home swap?" src="can-renters-home-swap">
      <P>
        <strong>Short answer:</strong> sometimes. Your lease and local law
        decide — not the home-exchange app. Many leases ban sublets or limit
        guests. Swapping without permission can risk eviction or non-renewal.
      </P>
      <P className="text-sm text-zinc-500">
        Not legal advice. Confirm your lease and local regulations in writing
        when required.
      </P>

      <H2>What to check</H2>
      <Ul>
        <li>Sublet / assignment clauses</li>
        <li>Guest duration limits and registration rules</li>
        <li>HOA or building policies</li>
        <li>Renter’s insurance — does hosting void coverage?</li>
        <li>Landlord permission (get it in writing)</li>
      </Ul>

      <H2>If yes</H2>
      <P>
        Prefer shorter stays at first, write a clear house manual, and use
        platforms with verification. HomeExchange and Kindred may still be
        options when your lease allows guests/sublets.
      </P>

      <H2>If no or unclear</H2>
      <Ul>
        <li>
          House sitting —{" "}
          <a href="/go/trustedhousesitters?src=can-renters-home-swap" className="underline">
            TrustedHousesitters
          </a>
        </li>
        <li>
          Mid-term furnished —{" "}
          <a href="/go/sabbaticalhomes?src=can-renters-home-swap" className="underline">
            SabbaticalHomes
          </a>
        </li>
        <li>Landlord-approved exchange only after written OK</li>
      </Ul>

      <H2>Risk table</H2>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-950">
            <tr>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Potential upside</th>
              <th className="px-3 py-2">Potential downside</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">Unauthorized guest/sublet swap</td>
              <td className="px-3 py-2">Lodging savings</td>
              <td className="px-3 py-2">Lease breach, eviction, insurance denial</td>
            </tr>
            <tr className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">House sitting abroad</td>
              <td className="px-3 py-2">Free lodging without listing your unit</td>
              <td className="px-3 py-2">Care duties, competitive applications</td>
            </tr>
            <tr className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">Written landlord approval</td>
              <td className="px-3 py-2">Legitimate exchange path</td>
              <td className="px-3 py-2">May be refused; conditions apply</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Alternatives ladder</H2>
      <ol className="list-decimal space-y-1 pl-5">
        <li>House sitting</li>
        <li>Mid-term furnished (pay, but flexible)</li>
        <li>Landlord-approved home exchange</li>
      </ol>

      <Faq
        items={[
          {
            q: "Can I just list my rental anyway?",
            a: "We don’t recommend it. Platform acceptance doesn’t override your lease. Breach risk sits with you.",
          },
          {
            q: "What does the quiz recommend for renters?",
            a: "It boosts sitting and mid-term options and always attaches a lease warning note.",
          },
        ]}
      />

      <p className="mt-8">
        <Link href="/quiz" className="font-medium underline">
          Take the quiz (rent path)
        </Link>
      </p>

      <H2>Related</H2>
      <Ul>
        <li>
          <Link href="/guides/best-home-exchange-sites" className="underline">
            Best home exchange sites
          </Link>
        </li>
        <li>
          <Link
            href="/compare/trustedhousesitters-vs-home-exchange"
            className="underline"
          >
            THS vs home exchange
          </Link>
        </li>
        <li>
          <Link href="/destinations/lisbon" className="underline">
            Lisbon destination
          </Link>
        </li>
      </Ul>
    </GuideLayout>
  );
}
