"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

function InfoCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold text-ink">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-teal" />
            <p className="text-sm leading-relaxed text-brand-mid">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhyNow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { messages } = useI18n();
  const copy = messages.whyNow;

  return (
    <section ref={ref} className="bg-brand-bg px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          {copy.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-4 max-w-3xl text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          {copy.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-10 max-w-3xl text-base leading-relaxed text-brand-mid"
        >
          {copy.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <InfoCard title={copy.leftTitle} items={copy.left} />
          <InfoCard title={copy.rightTitle} items={copy.right} />
        </motion.div>
      </div>
    </section>
  );
}
