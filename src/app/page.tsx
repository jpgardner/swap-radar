import Link from "next/link";
import { PLATFORMS } from "@/data/platforms";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          Decision layer for place-trading
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Find the right home exchange — not the loudest one.
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Swap Radar compares home exchange, credit networks, luxury clubs,
          house sitting, and mid-term housing. Take a short quiz, see why we
          ranked platforms for you, then jump out through tracked links.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/quiz"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Take the 90-second quiz
          </Link>
          <Link
            href="/tools/savings-calculator"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Savings calculator
          </Link>
          <Link
            href="/compare"
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Compare platforms
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Guides
        </h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {[
            ["/guides/best-home-exchange-sites", "Best home exchange sites"],
            ["/guides/how-home-exchange-works", "How home exchange works"],
            [
              "/guides/home-exchange-vs-airbnb-vs-house-sitting",
              "Exchange vs Airbnb vs sitting",
            ],
            ["/compare/kindred-vs-homeexchange", "Kindred vs HomeExchange"],
            ["/guides/can-renters-home-swap", "Can renters home swap?"],
            ["/guides/long-stay-home-exchange", "Long-stay (1–3 months)"],
            [
              "/compare/trustedhousesitters-vs-home-exchange",
              "TrustedHousesitters vs exchange",
            ],
            ["/guides/is-home-exchange-worth-it", "Is home exchange worth it?"],
            ["/destinations/lisbon", "Lisbon"],
            ["/destinations/mexico-city", "Mexico City"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Platforms in v1 scoring set
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PLATFORMS.map((p) => (
            <li
              key={p.slug}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold">{p.name}</h3>
                <a
                  href={`/go/${p.slug}?src=home`}
                  className="text-xs font-medium text-zinc-500 underline"
                >
                  Visit
                </a>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {p.shortBlurb}
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                Verified {p.lastVerifiedAt}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
