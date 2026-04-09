"use client";

import { useI18n } from "@/contexts/I18nContext";

export default function Marquee() {
  const { messages } = useI18n();
  const copy = messages.marquee;
  const doubled = [...copy.items, ...copy.items];

  return (
    <section className="overflow-hidden border-y border-brand-border bg-brand-bg py-5">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-brand-soft">
        {copy.label}
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
