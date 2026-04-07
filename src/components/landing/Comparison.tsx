"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Cell = "✓" | "✗" | "Partiel";

interface Row {
  feature: string;
  eventbrite: Cell;
  weezevent: Cell;
  annuaires: Cell;
  elintys: Cell;
  bold?: boolean;
}

const ROWS: Row[] = [
  {
    feature: "Billetterie",
    eventbrite: "✓",
    weezevent: "✓",
    annuaires: "✗",
    elintys: "✓",
  },
  {
    feature: "Marketplace prestataires",
    eventbrite: "✗",
    weezevent: "✗",
    annuaires: "Partiel",
    elintys: "✓",
  },
  {
    feature: "Gestion invités",
    eventbrite: "Partiel",
    weezevent: "Partiel",
    annuaires: "✗",
    elintys: "✓",
  },
  {
    feature: "Découverte",
    eventbrite: "✓",
    weezevent: "Partiel",
    annuaires: "✗",
    elintys: "✓",
  },
  {
    feature: "Scan QR natif",
    eventbrite: "✓",
    weezevent: "✓",
    annuaires: "✗",
    elintys: "✓",
  },
  {
    feature: "Parcours intégré FR",
    eventbrite: "✗",
    weezevent: "Partiel",
    annuaires: "✗",
    elintys: "✓",
    bold: true,
  },
];

function CellContent({ value }: { value: Cell; isElintys?: boolean }) {
  if (value === "✓") return <span className="text-teal font-semibold">✓</span>;
  if (value === "✗") return <span className="text-brand-border">✗</span>;
  return <span className="text-amber-500 text-xs font-medium">Partiel</span>;
}

export default function Comparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-brand-bg px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Comparaison
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          Elintys face aux alternatives.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-10 max-w-xl text-base text-brand-mid"
        >
          Aucun autre outil ne couvre l&apos;ensemble du parcours événementiel
          en français.
        </motion.p>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="overflow-hidden rounded-2xl border border-brand-border"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border bg-brand-bg">
                <th className="px-5 py-4 text-left text-xs font-semibold text-brand-soft">
                  Fonctionnalité
                </th>
                {["Eventbrite", "Weezevent", "Annuaires"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-center text-xs font-semibold text-brand-soft"
                  >
                    {h}
                  </th>
                ))}
                <th className="bg-teal-light px-5 py-4 text-center text-xs font-semibold text-teal">
                  Elintys
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white">
              {ROWS.map((row) => (
                <tr key={row.feature}>
                  <td
                    className={cn(
                      "px-5 py-4 text-xs text-brand-mid",
                      row.bold && "font-semibold text-ink"
                    )}
                  >
                    {row.feature}
                  </td>
                  {[row.eventbrite, row.weezevent, row.annuaires].map(
                    (val, i) => (
                      <td key={i} className="px-5 py-4 text-center text-sm">
                        <CellContent value={val} />
                      </td>
                    )
                  )}
                  <td className="bg-teal-light/40 px-5 py-4 text-center text-sm font-medium text-teal">
                    <CellContent value={row.elintys} isElintys />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
