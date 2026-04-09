"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

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
  const { messages } = useI18n();
  const copy = messages.hero;

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
          {copy.badge}
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="mb-5 text-[clamp(2rem,5vw,3.25rem)] font-[500] leading-tight tracking-tight text-ink"
        >
          {copy.title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-[680px] text-base leading-relaxed text-brand-mid"
        >
          {copy.subtitle}
        </motion.p>

        <motion.div variants={itemVariants} className="mb-4">
          <motion.a
            href="#cta"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-mid"
          >
            {copy.primaryCta}
          </motion.a>
        </motion.div>

        <motion.a
          variants={itemVariants}
          href="#probleme"
          whileHover={{ x: 6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mb-10 text-sm text-brand-soft transition-colors hover:text-brand-mid"
        >
          {copy.secondaryCta}
        </motion.a>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
          {copy.trust.map((item) => (
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
