"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const t = useTranslations("faq");
  const items = t.raw("items") as [string, string][];

  return (
    <section id="faq" className="bg-brand-bg px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          {t("badge")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-10 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          <Accordion.Root type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
            {items.map(([q, a], i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-brand-border bg-white"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-[500] text-ink">
                    {q}
                    <span
                      className={cn(
                        "ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-border text-base font-light text-ink transition-all duration-200",
                        "group-data-[state=open]:rotate-45 group-data-[state=open]:bg-ink group-data-[state=open]:text-white group-data-[state=open]:border-ink"
                      )}
                    >
                      +
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brand-mid">
                    {a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
