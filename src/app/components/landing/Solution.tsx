"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  { n: "1", label: "Créer l'événement" },
  { n: "2", label: "Personnaliser" },
  { n: "3", label: "Billetterie" },
  { n: "4", label: "Gérer les invités" },
  { n: "5", label: "Prestataires" },
  { n: "6", label: "Scan & Analytics" },
];

const QR_CELLS = Array.from({ length: 16 });

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="solution"
      className="bg-gradient-to-br from-[#F0FDFB] via-white to-[#EEF2FF] px-6 py-24"
      ref={ref}
    >
      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-teal/20 bg-teal-light px-4 py-1.5 text-xs font-medium text-teal-dark"
        >
          La solution Elintys
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          Un parcours complet, en 6 étapes fluides.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-14 max-w-xl text-base text-brand-mid"
        >
          De la création à l&apos;analyse post-événement, tout est connecté dans
          une seule plateforme.
        </motion.p>

        {/* Step ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-14 overflow-x-auto -mx-6 px-6"
        >
        <div className="relative grid min-w-[480px] grid-cols-6 gap-4">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-[4%] right-[4%] top-5 z-0 h-px bg-gradient-to-r from-teal-mid to-teal-light" />
          {STEPS.map((s) => (
            <motion.div
              key={s.n}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center gap-2 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.08, boxShadow: "0 16px 32px -18px rgba(13,148,136,0.65)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white shadow-md"
              >
                {s.n}
              </motion.div>
              <p className="text-[11px] leading-tight text-brand-mid">{s.label}</p>
            </motion.div>
          ))}
        </div>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {/* Card 1 — col-span-2, bg-ink */}
          <motion.div
            whileHover={{ y: -10, scale: 1.01 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="rounded-2xl bg-ink p-8 md:col-span-2 transition-shadow hover:shadow-[0_26px_60px_-30px_rgba(13,17,23,0.5)]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-teal/20 px-2.5 py-0.5 text-[10px] font-semibold text-teal-mid">
                Étapes 1 → 2
              </span>
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">
              Création & personnalisation
            </h3>
            <p className="mb-6 text-sm text-white/40">
              Configurez votre événement en quelques minutes.
            </p>
            {/* Mini UI mock */}
            <div className="flex gap-3">
              {[
                { title: "Créer", fields: ["Titre", "Date", "Lieu"] },
                { title: "Personnaliser", fields: ["Couverture", "Prix", "Capacité"] },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="mb-3 text-xs font-semibold text-white/60">{card.title}</p>
                  <div className="flex flex-col gap-2">
                    {card.fields.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-2"
                      >
                        <span className="text-[10px] text-white/30 w-14 shrink-0">{f}</span>
                        <div className="h-5 flex-1 rounded-md bg-white/10" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 2 — bg-teal */}
          <motion.div
            whileHover={{ y: -10, scale: 1.015 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="rounded-2xl bg-teal p-8 transition-shadow hover:shadow-[0_26px_60px_-30px_rgba(13,148,136,0.55)]"
          >
            <span className="mb-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white">
              Étape 3
            </span>
            <h3 className="mb-1 text-lg font-medium text-white">Billetterie</h3>
            <p className="mb-5 text-sm text-white/70">
              Ventes, catégories et QR codes générés automatiquement.
            </p>
            {/* TicketMock */}
            <div className="rounded-xl bg-white/15 p-3">
              <div className="mb-2 rounded-lg bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-white">
                Concert de Jazz — Montréal
              </div>
              {[
                { type: "VIP", price: "150 $" },
                { type: "Régulier", price: "75 $" },
                { type: "Étudiant", price: "45 $" },
              ].map((t) => (
                <motion.div
                  key={t.type}
                  whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.18)" }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mb-1 flex items-center justify-between rounded-lg bg-white/10 px-3 py-1.5"
                >
                  <span className="text-[11px] text-white">{t.type}</span>
                  <span className="text-[11px] font-medium text-white">{t.price}</span>
                </motion.div>
              ))}
              {/* QR grid 4×4 */}
              <div className="mt-3 grid grid-cols-4 gap-1">
                {QR_CELLS.map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm bg-white/20"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3 — bg-white border */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-white p-8 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(13,17,23,0.28)]"
          >
            <span className="mb-2 inline-block rounded-full border border-brand-border bg-brand-bg px-2.5 py-0.5 text-[10px] font-semibold text-brand-mid">
              Étape 4
            </span>
            <h3 className="mb-1 text-lg font-medium text-ink">Gestion invités</h3>
            <p className="mb-5 text-sm text-brand-mid">
              Suivez les confirmations en temps réel.
            </p>
            {/* GuestMock */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Confirmés", pct: 68, color: "bg-teal" },
                { label: "En attente", pct: 24, color: "bg-amber-400" },
                { label: "Invités", pct: 8, color: "bg-brand-border" },
              ].map((g) => (
                <motion.div
                  key={g.label}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-brand-mid">{g.label}</span>
                    <span className="font-medium text-ink">{g.pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-brand-bg">
                    <div
                      className={`h-full rounded-full ${g.color}`}
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 4 — bg-white border */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-white p-8 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(13,17,23,0.28)]"
          >
            <span className="mb-2 inline-block rounded-full border border-brand-border bg-brand-bg px-2.5 py-0.5 text-[10px] font-semibold text-brand-mid">
              Étape 5
            </span>
            <h3 className="mb-3 text-lg font-medium text-ink">
              Marketplace prestataires
            </h3>
            <p className="text-sm text-brand-mid leading-relaxed">
              Trouvez et mandatez les meilleurs prestataires locaux directement
              depuis la plateforme. Traiteurs, DJ, photographes, décorateurs…
            </p>
          </motion.div>

          {/* Card 5 — bg-ink */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl bg-ink p-8 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(13,17,23,0.5)]"
          >
            <span className="mb-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/50">
              Étape 6
            </span>
            <h3 className="mb-3 text-lg font-medium text-white">
              Scan & Analytics
            </h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Scan QR natif à l&apos;entrée, suivi des présences en direct et
              tableau de bord post-événement avec toutes vos données.
            </p>
          </motion.div>
        </motion.div>

        {/* Tagline finale */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 flex items-center gap-3 text-sm text-brand-mid"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-light text-teal text-base">
            →
          </span>
          <span>
            Plus de <strong>friction</strong>, plus de{" "}
            <strong>dispersion</strong> — juste un{" "}
            <strong>parcours fluide</strong> du début à la fin.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
