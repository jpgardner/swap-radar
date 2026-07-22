import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";
import { CtaRow } from "@/components/content/CtaRow";

export const metadata: Metadata = {
  title: "Kindred vs HomeExchange (2026): Credits, Fees & Who Should Join",
  description:
    "Honest comparison of Kindred and HomeExchange — models, cost, flexibility, trust, and which to pick.",
};

export default function Page() {
  return (
    <GuideLayout title="Kindred vs HomeExchange" src="kindred-vs-homeexchange">
      <P>
        Two of the most discussed modern home-swap options. HomeExchange is the
        scale play with simultaneous swaps and points. Kindred is the
        credit-based, verified, app-native community — often invite/application
        gated.
      </P>

      <H2>Quick verdict</H2>
      <Ul>
        <li>
          <strong>Pick Kindred if</strong> you want credits, stronger verification
          polish, and flexible non-simultaneous timing.
        </li>
        <li>
          <strong>Pick HomeExchange if</strong> you want maximum inventory and
          classic simultaneous swaps plus points.
        </li>
        <li>
          <strong>Consider both if</strong> you travel often and can justify two
          memberships after running break-even math.
        </li>
      </Ul>

      <div className="not-prose my-6 flex flex-wrap gap-3">
        <a
          href="/go/kindred?src=kindred-vs-homeexchange"
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Visit Kindred
        </a>
        <a
          href="/go/homeexchange?src=kindred-vs-homeexchange"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          Visit HomeExchange
        </a>
      </div>

      <H2>At a glance</H2>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-950">
            <tr>
              <th className="px-3 py-2"> </th>
              <th className="px-3 py-2">Kindred</th>
              <th className="px-3 py-2">HomeExchange</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Model", "Credits", "Simultaneous + points"],
              ["Access", "Application / invite culture", "Open membership"],
              ["Scale", "Growing, city-variable", "Largest network"],
              ["Ops polish", "Cleaning/protection emphasis", "Plan-dependent"],
              ["Best for", "Flex timing + trust", "Choice + classic swaps"],
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

      <H2>Models</H2>
      <P>
        Kindred: host a night, earn a credit (plus referral paths). HomeExchange:
        negotiate direct simultaneous swaps or use GuestPoints-style balance for
        non-simultaneous travel. Details change — confirm on each site.
      </P>

      <H2>Cost</H2>
      <P>
        HomeExchange skews annual membership. Kindred often emphasizes per-stay
        fees after approval. Neither is “free lodging with zero cost.”{" "}
        <Link href="/tools/savings-calculator" className="underline">
          Calculate break-even
        </Link>
        .
      </P>

      <H2>Inventory & geography</H2>
      <P>
        We don’t publish scraped live counts. Qualitatively, HomeExchange wins on
        breadth; Kindred strength is uneven by city and membership quality bar.
      </P>

      <H2>Who should choose which</H2>
      <P>
        Map to personas in our{" "}
        <Link href="/quiz" className="underline">
          quiz
        </Link>
        : volume seekers → HomeExchange; trust/flex seekers → Kindred; renters →
        read{" "}
        <Link href="/guides/can-renters-home-swap" className="underline">
          renters guide
        </Link>{" "}
        first.
      </P>

      <H2>Can you use both?</H2>
      <P>
        Yes — if you travel enough for two fee structures. Many people start with
        one, then add the second after a successful first swap season.
      </P>

      <Faq
        items={[
          {
            q: "Is Kindred invite-only?",
            a: "It has used application and invite flows. Approval isn’t guaranteed even with a referral.",
          },
          {
            q: "Which is cheaper?",
            a: "Depends on nights hosted, fees that year, and cleaning. Compare total cost of membership + stay fees against nights saved.",
          },
        ]}
      />

      <div className="not-prose mt-8">
        <CtaRow src="kindred-vs-homeexchange" />
      </div>

      <H2>Related</H2>
      <Ul>
        <li>
          <Link href="/guides/best-home-exchange-sites" className="underline">
            Best home exchange sites
          </Link>
        </li>
        <li>
          <Link href="/guides/how-home-exchange-works" className="underline">
            How home exchange works
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
