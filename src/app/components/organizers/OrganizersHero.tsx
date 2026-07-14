"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { fadeUp, getMotionVariants, staggerContainer } from "@/app/components/ui/premium/motion";
import type { OrganizersCopy } from "./organizers.types";

export default function OrganizersHero({
  copy,
  primaryCtaHref,
  secondaryCtaHref,
}: {
  copy: OrganizersCopy;
  primaryCtaHref: string;
  secondaryCtaHref: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = getMotionVariants(Boolean(prefersReducedMotion), fadeUp);

  return (
    <div className="bg-surface px-6 py-24 md:py-[120px]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center"
      >
        <div>
          <motion.p variants={itemVariants} className="text-sm font-medium uppercase tracking-wide text-brand-mid">
            {copy.eyebrow}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mt-3 text-[36px] font-medium leading-tight tracking-tight text-ink md:text-[56px]"
          >
            {copy.title}
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-4 max-w-lg text-lg text-brand-mid">
            {copy.description}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryCtaHref}
              className="inline-flex min-h-11 items-center rounded-xl bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink-mid"
            >
              {copy.primaryCta}
            </Link>
            <Link
              href={secondaryCtaHref}
              className="inline-flex min-h-11 items-center rounded-xl border border-brand-border px-6 py-3 text-sm font-medium text-ink hover:bg-white"
            >
              {copy.secondaryCta}
            </Link>
          </motion.div>

          <motion.ul variants={itemVariants} className="mt-6 flex flex-wrap gap-3 text-xs text-brand-mid">
            {copy.reassurance.map((item) => (
              <li key={item} className="rounded-full border border-brand-border px-3 py-1">
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-brand-mid">{copy.mockupLabel}</p>
          <h2 className="mt-1 text-lg font-medium text-ink">{copy.mockupTitle}</h2>
          <div className="mt-5 divide-y divide-brand-border">
            {copy.mockupItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 text-sm">
                <span className="text-brand-mid">{item.label}</span>
                <span className="font-medium text-ink">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
