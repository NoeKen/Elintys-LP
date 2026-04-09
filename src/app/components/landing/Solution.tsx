"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const QR_CELLS = Array.from({ length: 16 });

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { messages } = useI18n();
  const copy = messages.solution;
  const steps = copy.steps.map((label, index) => ({ n: String(index + 1), label }));

  return (
    <section
      id="solution"
      className="bg-gradient-to-br from-[#F0FDFB] via-white to-[#EEF2FF] px-6 py-24"
      ref={ref}
    >
      <div className="mx-auto max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-teal/20 bg-teal-light px-4 py-1.5 text-xs font-medium text-teal-dark"
        >
          {copy.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-3 text-[2.1rem] font-[500] leading-tight tracking-tight text-ink"
        >
          {copy.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-14 max-w-3xl text-base leading-relaxed text-brand-mid"
        >
          {copy.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-14 -mx-6 overflow-x-auto px-6"
        >
          <div className="relative grid min-w-[480px] grid-cols-6 gap-4">
            <div className="pointer-events-none absolute left-[4%] right-[4%] top-5 z-0 h-px bg-gradient-to-r from-teal-mid to-teal-light" />
            {steps.map((step) => (
              <motion.div
                key={step.n}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center gap-2 text-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 16px 32px -18px rgba(13,148,136,0.65)",
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white shadow-md"
                >
                  {step.n}
                </motion.div>
                <p className="text-[11px] leading-tight text-brand-mid">
                  {step.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <motion.div
            whileHover={{ y: -10, scale: 1.01 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="rounded-2xl bg-ink p-8 transition-shadow hover:shadow-[0_26px_60px_-30px_rgba(13,17,23,0.5)] md:col-span-2"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-teal/20 px-2.5 py-0.5 text-[10px] font-semibold text-teal-mid">
                {steps[0].n} → {steps[1].n}
              </span>
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">{copy.cards.createTitle}</h3>
            <p className="mb-6 text-sm text-white/40">{copy.cards.createText}</p>
            <div className="flex gap-3">
              {[
                { title: steps[0].label, fields: copy.cards.createFieldsA },
                { title: steps[1].label, fields: copy.cards.createFieldsB },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="mb-3 text-xs font-semibold text-white/60">{card.title}</p>
                  <div className="flex flex-col gap-2">
                    {card.fields.map((field) => (
                      <div key={field} className="flex items-center gap-2">
                        <span className="w-16 shrink-0 text-[10px] text-white/30">{field}</span>
                        <div className="h-5 flex-1 rounded-md bg-white/10" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10, scale: 1.015 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="rounded-2xl bg-teal p-8 transition-shadow hover:shadow-[0_26px_60px_-30px_rgba(13,148,136,0.55)]"
          >
            <span className="mb-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white">
              {steps[2].n}
            </span>
            <h3 className="mb-1 text-lg font-medium text-white">{copy.cards.equipTitle}</h3>
            <p className="mb-5 text-sm text-white/70">{copy.cards.equipText}</p>
            <div className="rounded-xl bg-white/15 p-3">
              <div className="mb-2 rounded-lg bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-white">
                {copy.cards.equipTitle}
              </div>
              {copy.cards.providers.map(([type, status]) => (
                <motion.div
                  key={type}
                  whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.18)" }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mb-1 flex items-center justify-between rounded-lg bg-white/10 px-3 py-1.5"
                >
                  <span className="text-[11px] text-white">{type}</span>
                  <span className="text-[11px] font-medium text-white">{status}</span>
                </motion.div>
              ))}
              <div className="mt-3 grid grid-cols-4 gap-1">
                {QR_CELLS.map((_, i) => (
                  <div key={i} className="aspect-square rounded-sm bg-white/20" />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-white p-8 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(13,17,23,0.28)]"
          >
            <span className="mb-2 inline-block rounded-full border border-brand-border bg-brand-bg px-2.5 py-0.5 text-[10px] font-semibold text-brand-mid">
              {steps[3].n}
            </span>
            <h3 className="mb-1 text-lg font-medium text-ink">{copy.cards.sellTitle}</h3>
            <p className="mb-5 text-sm text-brand-mid">{copy.cards.sellText}</p>
            <div className="rounded-xl bg-brand-bg p-4">
              <div className="mb-3 rounded-lg bg-white px-3 py-2 text-[11px] font-semibold text-ink shadow-sm">
                {copy.cards.sellTitle}
              </div>
              {copy.cards.tickets.map(([label, pct], index) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-brand-mid">{label}</span>
                    <span className="font-medium text-ink">{pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                    <div
                      className={`h-full rounded-full ${index === 0 ? "bg-teal" : index === 1 ? "bg-amber-400" : "bg-ink"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl border border-brand-border bg-white p-8 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(13,17,23,0.28)]"
          >
            <span className="mb-2 inline-block rounded-full border border-brand-border bg-brand-bg px-2.5 py-0.5 text-[10px] font-semibold text-brand-mid">
              {steps[4].n}
            </span>
            <h3 className="mb-3 text-lg font-medium text-ink">{copy.cards.manageTitle}</h3>
            <p className="text-sm leading-relaxed text-brand-mid">
              {copy.cards.manageText}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl bg-ink p-8 transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(13,17,23,0.5)]"
          >
            <span className="mb-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/50">
              {steps[5].n}
            </span>
            <h3 className="mb-3 text-lg font-medium text-white">{copy.cards.welcomeTitle}</h3>
            <p className="text-sm leading-relaxed text-white/40">{copy.cards.welcomeText}</p>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 flex items-center gap-3 text-sm text-brand-mid"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-light text-base text-teal">
            →
          </span>
          <span>{copy.tagline}</span>
        </motion.p>
      </div>
    </section>
  );
}
