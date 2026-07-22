export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">FAQ</h2>
      <dl className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="font-medium">{item.q}</dt>
            <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
