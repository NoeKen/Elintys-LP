"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PORTRAITS = [
  {
    title: "L'organisateur",
    description:
      "Jongle entre une plateforme de billetterie, un tableur d'invités, des recherches Google pour ses prestataires, et une app de scan le jour J. Il gère des outils, pas son événement.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-teal">
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M6 2.8v2.4M14 2.8v2.4M3 8.2h14M6.5 11.2h2.5M11 11.2h2.5M6.5 14h2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Le prestataire",
    description:
      "Talentueux et disponible, mais invisible. Il dépend du bouche-à-oreille et d'annuaires génériques — sans connexion directe aux événements qui ont besoin de lui.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-teal">
        <path
          d="M10 2.7l2.2 4.45 4.92.72-3.56 3.47.84 4.9L10 13.96 5.58 16.24l.84-4.9L2.86 7.87l4.92-.72L10 2.7Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Le gestionnaire de lieu",
    description:
      "Son espace est prêt. Mais les demandes arrivent par email, sans contexte, sans date claire, sans nombre de participants. Chaque réservation commence par une conversation floue.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-teal">
        <path
          d="M3.5 16.5h13M5 16.5V8.4L10 4.8l5 3.6v8.1M7.5 16.5v-4.2h5v4.2M8 9.2h.01M12 9.2h.01"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
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
    <section id="probleme" className="border-y border-brand-border bg-brand-bg px-6 py-20" ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="mx-auto max-w-5xl"
      >
        <motion.span
          variants={itemVariants}
          className="mb-5 inline-flex items-center rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-medium text-brand-mid"
        >
          Le problème
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          Dans l&apos;événementiel, tout le monde subit la même fragmentation.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-3xl text-base leading-relaxed text-brand-mid"
        >
          L&apos;industrie événementielle est vivante, créative et en pleine
          croissance. Pourtant, les outils qui la soutiennent sont dispersés,
          déconnectés, et conçus en silos.
        </motion.p>

        <motion.div variants={itemVariants} className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PORTRAITS.map((portrait) => (
            <motion.div
              key={portrait.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-teal-light">
                {portrait.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-ink">{portrait.title}</h3>
              <p className="text-sm leading-relaxed text-brand-mid">{portrait.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p variants={itemVariants} className="mx-auto max-w-3xl text-center text-base font-medium text-ink">
          Trois acteurs. Un même problème : ils ne sont pas connectés. Elintys change ça.
        </motion.p>
      </motion.div>
    </section>
  );
}
