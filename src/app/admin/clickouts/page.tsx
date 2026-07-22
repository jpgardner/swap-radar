import type { Metadata } from "next";
import { listAffiliateConfig } from "@/lib/affiliates";
import { clickoutStats, listClickouts } from "@/lib/clickouts";

export const metadata: Metadata = {
  title: "Clickouts admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ClickoutsAdminPage() {
  const [items, stats, affiliates] = await Promise.all([
    listClickouts(50),
    clickoutStats(),
    Promise.resolve(listAffiliateConfig()),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Clickouts</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Stored in <code>.data/clickouts.jsonl</code>. API:{" "}
        <code>GET /api/clickouts</code>
        {process.env.CLICKOUTS_ADMIN_TOKEN
          ? " (Bearer token required)"
          : " (open in dev — set CLICKOUTS_ADMIN_TOKEN in prod)"}
      </p>

      <section className="mt-8">
        <h2 className="font-semibold">Stats (recent file window)</h2>
        <p className="mt-1 text-sm">Total: {stats.total}</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500">By platform</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(stats.byPlatform).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500">By source</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(stats.bySource).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold">Affiliate resolution</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {affiliates.map((a) => (
            <li key={a.slug} className="flex flex-wrap gap-2">
              <span className="font-medium">{a.slug}</span>
              <span className="text-zinc-500">{a.source}</span>
              <span className="text-zinc-400">{a.envKey}</span>
              <span className="truncate text-zinc-500">{a.urlPreview}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold">Latest 50</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Platform</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Affiliate</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-zinc-100 dark:border-zinc-800"
                >
                  <td className="px-3 py-2 whitespace-nowrap text-zinc-500">
                    {row.ts}
                  </td>
                  <td className="px-3 py-2">{row.platform}</td>
                  <td className="px-3 py-2">{row.source}</td>
                  <td className="px-3 py-2">{row.affiliateSource}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-zinc-500" colSpan={4}>
                    No clickouts yet. Visit /go/homeexchange?src=test
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
