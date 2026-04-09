"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";

type Cell = "✓" | "✗" | "Partiel" | "Partial";

function CellContent({ value, partialLabel }: { value: Cell; partialLabel: string }) {
  if (value === "✓") return <span className="font-semibold text-teal">✓</span>;
  if (value === "✗") return <span className="text-brand-border">✗</span>;
  return <span className="text-xs font-medium text-amber-500">{partialLabel}</span>;
}

export default function Comparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { messages } = useI18n();
  const copy = messages.comparison;

  return (
    <section className="bg-white px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-brand-bg px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          {copy.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          {copy.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-10 max-w-xl text-base text-brand-mid"
        >
          {copy.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="overflow-hidden rounded-2xl border border-brand-border"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-brand-border bg-brand-bg">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-brand-soft">
                    {copy.featureLabel}
                  </th>
                  {copy.headers.slice(0, 3).map((header) => (
                    <th
                      key={header}
                      className="px-5 py-4 text-center text-xs font-semibold text-brand-soft"
                    >
                      {header}
                    </th>
                  ))}
                  <th className="bg-teal-light px-5 py-4 text-center text-xs font-semibold text-teal">
                    {copy.headers[3]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border bg-white">
                {copy.rows.map((row, rowIndex) => (
                  <tr key={row[0]}>
                    <td
                      className={cn(
                        "px-5 py-4 text-xs text-brand-mid",
                        rowIndex === copy.rows.length - 1 && "font-semibold text-ink"
                      )}
                    >
                      {row[0]}
                    </td>
                    {row.slice(1, 4).map((value, index) => (
                      <td key={index} className="px-5 py-4 text-center text-sm">
                        <CellContent value={value as Cell} partialLabel={copy.partial} />
                      </td>
                    ))}
                    <td className="bg-teal-light/40 px-5 py-4 text-center text-sm font-medium text-teal">
                      <CellContent value={row[4] as Cell} partialLabel={copy.partial} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
