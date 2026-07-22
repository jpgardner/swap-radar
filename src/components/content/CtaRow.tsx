import Link from "next/link";

export function CtaRow({
  src = "guide",
  showCalculator = true,
}: {
  src?: string;
  showCalculator?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/quiz"
        className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Take the 90-second quiz
      </Link>
      {showCalculator && (
        <Link
          href="/tools/savings-calculator"
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          Savings calculator
        </Link>
      )}
      <Link
        href="/compare"
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
      >
        Compare platforms
      </Link>
      <a
        href={`/go/homeexchange?src=${src}`}
        className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
      >
        HomeExchange
      </a>
    </div>
  );
}
