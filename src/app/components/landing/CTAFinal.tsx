"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import EmailForm from "@/app/components/ui/EmailForm";
import { useTranslations } from "next-intl";

export default function CTAFinal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const t = useTranslations("ctaFinal");

  return (
    <section id="cta" className="relative overflow-hidden bg-ink px-6 py-28" ref={ref}>
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
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal-mid"
        >
          {t("badge")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-4 text-[clamp(2rem,5vw,3rem)] font-[500] leading-tight tracking-tight text-white"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mb-10 text-base text-white/50"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8 max-w-md"
        >
          <EmailForm
            source="cta"
            buttonLabel={t("button")}
            inputClassName="border-white/15 bg-white/[0.08] text-white placeholder:text-white/30 focus:border-teal"
            buttonClassName="bg-teal hover:bg-teal-dark"
            wrapperClassName="[&_.text-brand-mid]:text-white/60"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="text-center text-xs text-white/30"
        >
          {t("reassurance")}
        </motion.div>
      </div>
    </section>
  );
}
