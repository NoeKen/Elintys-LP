"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { fadeUp, getMotionVariants, staggerContainer } from "@/app/components/ui/premium/motion";
import type { VenuesCopy } from "./venues.types";

export default function VenuesHero({
  copy,
  heroImageSrc,
  heroImageAlt,
}: {
  copy: VenuesCopy;
  heroImageSrc: string;
  heroImageAlt: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = getMotionVariants(Boolean(prefersReducedMotion), fadeUp);

  return (
    <div className="relative h-[100vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src={heroImageSrc}
        alt={heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-petrol-dark/70 via-petrol-dark/10 to-transparent" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-12 md:pb-20"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm font-medium uppercase tracking-wide text-white/80"
        >
          {copy.eyebrow}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mt-3 max-w-2xl text-[36px] font-medium leading-tight tracking-tight text-white md:text-[64px]"
        >
          {copy.title}
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-4 max-w-xl text-lg text-white/90">
          {copy.description}
        </motion.p>
      </motion.div>
    </div>
  );
}
