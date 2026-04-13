"use client";

import { useTranslations } from "next-intl";

export default function Marquee() {
  const t = useTranslations("marquee");
  const items = t.raw("items") as string[];
  const doubled = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-brand-border bg-brand-bg py-5">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-brand-soft">
        {t("label")}
      </p>
      <div className="flex w-max animate-marquee gap-10">
        {doubled.map((item, i) => (
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
