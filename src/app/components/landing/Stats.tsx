"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    value: "$2.4Md",
    label: "Marché événementiel au Canada",
  },
  {
    value: "8.5M",
    label: "Participants à des événements au Québec/an",
  },
  {
    value: "0",
    label: "Solution tout-en-un existante sur ce marché",
  },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="marche"
      className="relative overflow-hidden bg-ink px-6 py-24"
      ref={ref}
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: 700,
          height: 400,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(13,148,136,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/40"
        >
          Le marché
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-white"
        >
          Un marché massif, sans solution centralisée.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-14 max-w-xl text-base text-white/40"
        >
          L&apos;industrie événementielle canadienne est en pleine croissance,
          et personne ne l&apos;a encore digitalisée bout en bout.
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="grid grid-cols-1 divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/5 md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col items-center px-8 py-10 text-center"
            >
              <p className="mb-2 text-5xl font-[500] text-teal-mid">{s.value}</p>
              <p className="text-sm text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
