import type { Metadata } from "next";
import Link from "next/link";
import { PLATFORMS } from "@/data/platforms";

export const metadata: Metadata = {
  title: "Compare platforms",
  description:
    "Side-by-side home exchange, house sitting, and mid-term platforms — fees, models, and fit.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Compare platforms
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Structured snapshot of the v1 set. Fees change — check{" "}
          <code className="text-sm">last_verified</code> and confirm on each
          site.{" "}
          <Link href="/quiz" className="underline">
            Prefer a recommendation?
          </Link>
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
            <tr>
              <th className="px-4 py-3 font-medium">Platform</th>
              <th className="px-4 py-3 font-medium">Model</th>
              <th className="px-4 py-3 font-medium">Pricing</th>
              <th className="px-4 py-3 font-medium">Renter OK</th>
              <th className="px-4 py-3 font-medium">Invite only</th>
              <th className="px-4 py-3 font-medium">Luxury</th>
              <th className="px-4 py-3 font-medium">Verified</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => (
              <tr
                key={p.slug}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
              >
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {p.model.join(", ")}
                </td>
                <td className="max-w-xs px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {p.pricingSummary}
                </td>
                <td className="px-4 py-3">{p.renterOk ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{p.inviteOnly ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{p.luxury ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-zinc-500">{p.lastVerifiedAt}</td>
                <td className="px-4 py-3">
                  <a
                    href={`/go/${p.slug}?src=compare`}
                    className="font-medium underline"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {PLATFORMS.map((p) => (
          <article
            key={p.slug}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {p.shortBlurb}
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="font-medium text-zinc-500">Insurance / trust</dt>
                <dd>{p.insuranceSummary}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Coverage</dt>
                <dd>{p.coverageNotes}</dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Pricing detail</dt>
                <dd>{p.pricingDetail}</dd>
              </div>
            </dl>
            <a
              href={`/go/${p.slug}?src=compare-card`}
              className="mt-4 inline-flex text-sm font-medium underline"
            >
              Go to {p.name}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
