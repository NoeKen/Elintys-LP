"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const JOIN_NOW_ITEMS = [
  "Accès prioritaire à la bêta avant le lancement public",
  "Tarif fondateur réservé aux premiers inscrits",
  "Votre feedback influence directement les fonctionnalités",
  "Accès direct à l'équipe — pas un ticket de support",
];

const PRODUCT_ITEMS = [
  "Un seul endroit pour tout votre événement",
  "Vos prestataires et votre lieu connectés à votre tableau de bord",
  "Billetterie, invités, scan d'entrée — sans changer d'onglet",
  "Plus de temps à organiser. Moins à synchroniser.",
];

function InfoCard({ title, items }: { title: string; items: string[] }) {
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

  return (
    <section ref={ref} className="bg-brand-bg px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Pourquoi maintenant
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-4 max-w-3xl text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          Les premiers arrivés construisent quelque chose avec nous.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-10 max-w-3xl text-base leading-relaxed text-brand-mid"
        >
          Elintys n&apos;est pas encore lancé. C&apos;est une opportunité rare :
          celle d&apos;influencer une plateforme avant qu&apos;elle existe
          complètement. Les early adopters ne sont pas juste des utilisateurs —
          ils sont co-constructeurs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <InfoCard title="En rejoignant aujourd'hui" items={JOIN_NOW_ITEMS} />
          <InfoCard title="Avec le produit" items={PRODUCT_ITEMS} />
        </motion.div>
      </div>
    </section>
  );
}
