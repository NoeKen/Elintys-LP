"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TOOLS = [
  {
    emoji: "🎟️",
    name: "Billetterie",
    tool: "Eventbrite / Billetech",
    accent: "from-rose-100 via-white to-rose-50",
    iconBg: "bg-rose-100",
    tone: "text-rose-600",
  },
  {
    emoji: "📣",
    name: "Promotion",
    tool: "Facebook / Instagram",
    accent: "from-amber-100 via-white to-orange-50",
    iconBg: "bg-amber-100",
    tone: "text-amber-600",
  },
  {
    emoji: "🤝",
    name: "Prestataires",
    tool: "Annuaires éparpillés",
    accent: "from-emerald-100 via-white to-teal-50",
    iconBg: "bg-emerald-100",
    tone: "text-emerald-600",
  },
  {
    emoji: "📋",
    name: "Invités",
    tool: "Google Sheets",
    accent: "from-sky-100 via-white to-cyan-50",
    iconBg: "bg-sky-100",
    tone: "text-sky-600",
  },
  {
    emoji: "📱",
    name: "Scan entrée",
    tool: "Outil séparé",
    accent: "from-violet-100 via-white to-fuchsia-50",
    iconBg: "bg-violet-100",
    tone: "text-violet-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="problem"
      className="border-y border-brand-border bg-brand-bg px-6 py-20"
      ref={ref}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="mx-auto max-w-5xl"
      >
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Le problème actuel
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          Organiser un événement, c&apos;est jongler avec trop d&apos;outils.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-xl text-base text-brand-mid"
        >
          Les organisateurs d&apos;événements utilisent en moyenne 5 outils
          distincts, sans aucune connexion entre eux.
        </motion.p>

        {/* Tool grid */}
        <motion.div
          variants={itemVariants}
          className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5"
        >
          {TOOLS.map((t) => (
            <motion.div
              key={t.name}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white p-6 text-left shadow-[0_20px_60px_-40px_rgba(13,17,23,0.22)] transition-shadow hover:shadow-[0_30px_70px_-36px_rgba(13,17,23,0.3)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${t.accent} opacity-90 transition-transform duration-300 group-hover:scale-105`}
              />
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/70 blur-2xl" />

              <div className="relative flex h-full min-h-[210px] flex-col">
                <div className="mb-6 flex items-start justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${t.iconBg} text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]`}
                  >
                    {t.emoji}
                  </span>
                  <span className="rounded-full border border-black/5 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-soft">
                    Outil
                  </span>
                </div>

                <div className="mb-4">
                  <p className="mb-1 text-lg font-semibold tracking-tight text-ink">
                    {t.name}
                  </p>
                  <p className="text-sm leading-relaxed text-brand-mid">{t.tool}</p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-soft">
                    Fragmenté
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium ${t.tone}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Séparé
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Warning */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-[24px] border border-amber-200/80 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 px-5 py-4 shadow-[0_18px_50px_-38px_rgba(217,119,6,0.55)]"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-amber-900">
              ⚠️&nbsp; Résultat : erreurs de synchronisation, données dispersées
              et expérience dégradée pour les participants.
            </p>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-3 py-1 text-xs font-semibold text-amber-700">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Trop de points de friction
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
