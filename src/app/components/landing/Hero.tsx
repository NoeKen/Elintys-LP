"use client";

import { motion } from "framer-motion";
import EmailForm from "@/app/components/ui/EmailForm";

const TRUST_ITEMS = [
  "Accès bêta gratuit",
  "Aucun engagement",
  "Vous construisez le produit avec nous",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div
          style={{
            width: 800,
            height: 600,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(13,148,136,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={containerVariants}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={itemVariants}
          className="mb-6 inline-flex items-center rounded-full border border-brand-border bg-brand-bg px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Écosystème bêta — Montréal, Québec
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="mb-5 text-[clamp(2rem,5vw,3.25rem)] font-[500] leading-tight tracking-tight text-ink"
        >
          L&apos;événementiel mérite mieux que des outils qui ne se parlent pas.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-[680px] text-base leading-relaxed text-brand-mid"
        >
          Elintys réunit organisateurs, prestataires et gestionnaires de lieux
          dans un seul écosystème — pour que chaque événement soit vécu
          pleinement, pas seulement géré.
        </motion.p>

        <motion.div variants={itemVariants} className="mb-4 w-full max-w-md">
          <EmailForm source="hero" buttonLabel="Rejoindre le mouvement →" />
        </motion.div>

        <motion.a
          variants={itemVariants}
          href="#probleme"
          whileHover={{ x: 6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mb-10 text-sm text-brand-soft transition-colors hover:text-brand-mid"
        >
          Découvrir la plateforme ↓
        </motion.a>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
          {TRUST_ITEMS.map((item) => (
            <motion.span
              key={item}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-2 rounded-full bg-teal-light px-3 py-1.5 text-xs font-medium text-teal-dark"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-white">
                ✓
              </span>
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
