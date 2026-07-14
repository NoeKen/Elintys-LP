"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, getMotionVariants, staggerContainer } from "@/app/components/ui/premium/motion";
import type { ProvidersCopy } from "./providers.types";

export default function ProvidersHero({
  copy,
  mosaicImages,
  primaryCtaHref,
  secondaryCtaHref,
}: {
  copy: ProvidersCopy;
  mosaicImages: Array<{ src: string; alt: string }>;
  primaryCtaHref: string;
  secondaryCtaHref: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = getMotionVariants(Boolean(prefersReducedMotion), fadeUp);

  return (
    <div className="bg-surface px-6 py-24 md:py-[120px]">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium uppercase tracking-wide text-brand-mid"
          >
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
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="grid grid-cols-2 gap-3"
        >
          {mosaicImages.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
