import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Swap Radar
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/quiz" className="hover:text-zinc-900 dark:hover:text-white">
            Quiz
          </Link>
          <Link
            href="/compare"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            Compare
          </Link>
          <Link
            href="/tools/savings-calculator"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            Calculator
          </Link>
          <Link
            href="/guides/best-home-exchange-sites"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            Guides
          </Link>
          <Link
            href="/quiz"
            className="rounded-full bg-zinc-900 px-3 py-1.5 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Find your fit
          </Link>
        </nav>
      </div>
    </header>
  );
}
