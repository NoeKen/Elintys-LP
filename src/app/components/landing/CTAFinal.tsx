"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import EmailForm from "@/app/components/ui/EmailForm";

const TRUST_ITEMS = [
  "Accès bêta gratuit",
  "Aucun spam",
  "Désabonnement en 1 clic",
  "Plateforme bilingue FR/EN",
];

export default function CTAFinal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-ink px-6 py-28"
      ref={ref}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: 800,
          height: 500,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(13,148,136,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal-mid"
        >
          Accès prioritaire — places limitées
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-4 text-[clamp(2rem,5vw,3rem)] font-[500] leading-tight tracking-tight text-white"
        >
          Prêt à simplifier vos événements ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-10 text-base text-white/40"
        >
          Rejoignez la liste d&apos;attente et soyez parmi les premiers à
          découvrir Elintys.
        </motion.p>

        {/* EmailForm dark */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 mx-auto max-w-md"
        >
          <EmailForm
            source="cta"
            placeholder="votre@email.com"
            buttonLabel="Rejoindre la liste"
            inputClassName="bg-white/[0.08] border-white/15 text-white placeholder:text-white/30 focus:border-teal"
            buttonClassName="bg-teal hover:bg-teal-dark"
            wrapperClassName="[&_.text-brand-mid]:text-white/60"
          />
        </motion.div>

        {/* Trust items */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-xs text-white/30"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-teal/40 text-[9px] text-teal-mid">
                ✓
              </span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
