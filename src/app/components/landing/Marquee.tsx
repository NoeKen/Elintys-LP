const ITEMS = [
  "Mariages",
  "Conférences",
  "Galas corporatifs",
  "Festivals",
  "Ateliers",
  "Soirées privées",
  "Lancements de produits",
  "Concerts",
  "Salons professionnels",
  "Anniversaires",
  "Formations",
  "Séminaires",
];

const DOUBLED = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <section className="border-y border-brand-border bg-brand-bg overflow-hidden py-5">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-brand-soft">
        Tous types d&apos;événements
      </p>
      <div className="flex w-max animate-marquee gap-10">
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm font-medium text-brand-mid"
          >
            {item}
            <span className="ml-10 text-brand-border">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
