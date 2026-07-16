"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { localizedRoutes } from "@/lib/localized-routes";
import type { SiteLocale } from "@/config/site";

interface FaqPageContentProps {
  locale: SiteLocale;
  eyebrow: string;
  title: string;
  intro: string;
  items: [string, string][];
}

export default function FaqPageContent({
  locale,
  eyebrow,
  title,
  intro,
  items,
}: FaqPageContentProps) {
  return (
    <div className="bg-brand-bg px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-teal">
          {eyebrow}
        </p>
        <h1 className="mb-5 text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.04] tracking-tight text-ink">
          {title}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-brand-mid">{intro}</p>

        <Accordion.Root type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
          {items.map(([question, answer], index) => (
            <Accordion.Item
              key={question}
              value={`item-${index}`}
              className="overflow-hidden rounded-xl border border-brand-border bg-white"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-base font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
                  {question}
                  <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-border text-base font-light text-ink transition-all duration-200 group-data-[state=open]:rotate-45 group-data-[state=open]:border-ink group-data-[state=open]:bg-ink group-data-[state=open]:text-white">
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="px-5 pb-5 text-sm leading-relaxed text-brand-mid">{answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-10">
          <Link
            href={`${localizedRoutes.home[locale]}#cta`}
            className="inline-flex min-h-11 items-center rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            {locale === "fr" ? "Rejoindre la liste d'attente" : "Join the waitlist"}
          </Link>
        </div>
      </div>
    </div>
  );
}
