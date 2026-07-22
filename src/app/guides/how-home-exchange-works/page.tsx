import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/content/Faq";
import { GuideLayout, H2, P, Ul } from "@/components/content/GuideLayout";
import { CtaRow } from "@/components/content/CtaRow";

export const metadata: Metadata = {
  title: "How Home Exchange Works: Swaps, Points & Credits Explained",
  description:
    "Simultaneous swaps, GuestPoints/credits, memberships, insurance, and what home exchange actually costs.",
};

export default function Page() {
  return (
    <GuideLayout title="How home exchange works" src="how-home-exchange-works">
      <P>
        Home exchange means two households trade the use of their homes so each
        offsets lodging costs. Sometimes you leave when they arrive
        (simultaneous). Sometimes you host when you can and travel later
        (points or credits). The shared idea: lodging without nightly rent.
      </P>

      <H2>Three models</H2>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-950">
            <tr>
              <th className="px-3 py-2">Model</th>
              <th className="px-3 py-2">How it works</th>
              <th className="px-3 py-2">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2 font-medium">Simultaneous</td>
              <td className="px-3 py-2">A stays in B’s home while B stays in A’s</td>
              <td className="px-3 py-2">Classic HomeExchange / HomeLink swaps</td>
            </tr>
            <tr className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2 font-medium">Points</td>
              <td className="px-3 py-2">Host to earn points; spend later elsewhere</td>
              <td className="px-3 py-2">HomeExchange GuestPoints-style</td>
            </tr>
            <tr className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2 font-medium">Credits</td>
              <td className="px-3 py-2">Host nights → travel nights in a verified pool</td>
              <td className="px-3 py-2">Kindred</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Lifecycle of a swap</H2>
      <Ul>
        <li>Create a listing with honest photos and house rules</li>
        <li>Search and request (or accept requests)</li>
        <li>Agree dates, guests, cars/pets, and contingencies</li>
        <li>Verify IDs / membership requirements</li>
        <li>Stay, communicate, leave the home as agreed</li>
        <li>Review and resolve any issues through the platform process</li>
      </Ul>

      <H2>What you pay (and don’t)</H2>
      <P>
        You typically pay membership, sometimes cleaning or service fees, plus
        your own travel. You usually don’t pay nightly rent to the other member.
        Run the numbers:{" "}
        <Link href="/tools/savings-calculator" className="underline">
          savings calculator
        </Link>
        .
      </P>

      <H2>Trust stack</H2>
      <P>
        Platforms differ on ID checks, reviews, deposits, cleaning, and damage
        protection. Read current terms — marketing pages change. Never skip a
        house manual and emergency contacts.
      </P>

      <H2>Who it works for</H2>
      <Ul>
        <li>Owners (or fully controlling primary residents) with flexible dates</li>
        <li>People open to hosting or earning points/credits</li>
        <li>Travelers who want local homes instead of hotels</li>
      </Ul>
      <P>
        Renters: only with lease permission. No home to offer: look at house
        sitting or mid-term rentals instead.
      </P>

      <H2>Step-by-step first trip</H2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          <Link href="/quiz" className="underline">
            Pick a platform
          </Link>{" "}
          that matches your housing and flexibility
        </li>
        <li>List your home accurately (or apply as a sitter)</li>
        <li>Start with a shorter stay if you’re nervous</li>
        <li>Document condition with photos before/after</li>
        <li>Leave the place better than you found it</li>
      </ol>

      <div className="not-prose my-6">
        <CtaRow src="how-home-exchange-works" />
      </div>

      <Faq
        items={[
          {
            q: "Do both people have to travel on the same dates?",
            a: "Only for simultaneous swaps. Points and credit systems let you host and travel at different times.",
          },
          {
            q: "What if something breaks?",
            a: "Contact the owner immediately, document damage, and use the platform’s dispute or insurance process. Prevention beats claims — clear rules help.",
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
          <Link href="/compare/kindred-vs-homeexchange" className="underline">
            Kindred vs HomeExchange
          </Link>
        </li>
        <li>
          <Link
            href="/guides/home-exchange-vs-airbnb-vs-house-sitting"
            className="underline"
          >
            vs Airbnb vs house sitting
          </Link>
        </li>
      </Ul>
    </GuideLayout>
  );
}
