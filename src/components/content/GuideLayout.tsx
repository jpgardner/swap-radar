import type { ReactNode } from "react";
import Link from "next/link";
import { AffiliateDisclosure } from "./AffiliateDisclosure";
import { CtaRow } from "./CtaRow";

export function GuideLayout({
  title,
  updated = "July 2026",
  children,
  src = "guide",
}: {
  title: string;
  updated?: string;
  children: ReactNode;
  src?: string;
}) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <p className="text-sm text-zinc-500">Updated {updated}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <div className="mt-4">
        <AffiliateDisclosure />
      </div>
      <div className="prose-swap mt-8 space-y-4 text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium text-zinc-500">Next steps</p>
        <CtaRow src={src} />
      </div>
      <p className="mt-8 text-xs text-zinc-500">
        Swap Radar is a comparison and planning guide. We don’t host bookings or
        mirror other sites’ full home catalogs.{" "}
        <Link href="/" className="underline">
          Home
        </Link>
      </p>
    </article>
  );
}

export function P({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`leading-relaxed ${className}`.trim()}>{children}</p>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
      {children}
    </h2>
  );
}

export function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
      {children}
    </ul>
  );
}
