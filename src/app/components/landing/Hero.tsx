"use client";

import { motion } from "framer-motion";
import EmailForm from "@/app/components/ui/EmailForm";

const TRUST_ITEMS = [
  "Accès bêta gratuit",
  "Aucun spam",
  "Désabonnement en 1 clic",
  "Plateforme bilingue FR/EN",
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
      {/* Radial glow */}
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
        {/* Badge */}
        <motion.span
          variants={itemVariants}
          className="mb-6 inline-flex items-center rounded-full border border-brand-border bg-brand-bg px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Bientôt disponible — Montréal, Québec
        </motion.span>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="mb-5 text-[clamp(2rem,5vw,3.25rem)] font-[500] leading-tight tracking-tight text-ink"
        >
          Tout le parcours événementiel.{" "}
          <span className="text-teal">Un seul endroit.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-[500px] text-base leading-relaxed text-brand-mid"
        >
          Elintys centralise la billetterie, la gestion des invités, les
          prestataires et le scan d&apos;entrée — pour que vous puissiez vous
          concentrer sur l&apos;essentiel : votre événement.
        </motion.p>

        {/* EmailForm */}
        <motion.div variants={itemVariants} className="mb-4 w-full max-w-md">
          <EmailForm
            source="hero"
            buttonLabel="Obtenir un accès prioritaire"
          />
        </motion.div>

        {/* Secondary link */}
        <motion.a
          variants={itemVariants}
          href="#solution"
          whileHover={{ x: 6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mb-10 text-sm text-brand-soft transition-colors hover:text-brand-mid"
        >
          Voir comment ça fonctionne →
        </motion.a>

        {/* Trust items */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3"
        >
          {TRUST_ITEMS.map((item) => (
            <motion.span
              key={item}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center gap-2 rounded-full bg-teal-light px-3 py-1.5 text-xs font-medium text-teal-dark"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal text-[10px] text-white font-bold">
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
