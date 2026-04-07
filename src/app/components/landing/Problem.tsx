"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TOOLS = [
  { emoji: "🎟️", name: "Billetterie", tool: "Eventbrite / Billetech" },
  { emoji: "📣", name: "Promotion", tool: "Facebook / Instagram" },
  { emoji: "🤝", name: "Prestataires", tool: "Annuaires éparpillés" },
  { emoji: "📋", name: "Invités", tool: "Google Sheets" },
  { emoji: "📱", name: "Scan entrée", tool: "Outil séparé" },
];

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="problem"
      className="border-y border-brand-border bg-brand-bg px-6 py-20"
      ref={ref}
    >
      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Le problème actuel
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          Organiser un événement, c&apos;est jongler avec trop d&apos;outils.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-10 max-w-xl text-base text-brand-mid"
        >
          Les organisateurs d&apos;événements utilisent en moyenne 5 outils
          distincts, sans aucune connexion entre eux.
        </motion.p>

        {/* Tool grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-8 overflow-hidden rounded-2xl border border-brand-border bg-white divide-x divide-brand-border grid grid-cols-2 md:grid-cols-5"
        >
          {TOOLS.map((t) => (
            <div key={t.name} className="flex flex-col items-center px-6 py-8 text-center">
              <span className="mb-3 text-2xl">{t.emoji}</span>
              <p className="mb-1 text-xs font-[500] text-ink">{t.name}</p>
              <p className="text-[10px] leading-relaxed text-brand-soft">{t.tool}</p>
            </div>
          ))}
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="rounded-xl border border-yellow-200 bg-yellow-50 px-5 py-4"
        >
          <p className="text-sm font-medium text-yellow-800">
            ⚠️&nbsp; Résultat : erreurs de synchronisation, données dispersées et
            expérience dégradée pour les participants.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
