"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { blurReveal, getMotionVariants } from "./motion";

export type SectionBackground = "white" | "tinted" | "dark";

export interface SectionProps {
  background?: SectionBackground;
  children: React.ReactNode;
  className?: string;
  id?: string;
  "data-testid"?: string;
}

const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  white: "bg-white",
  tinted: "bg-surface",
  dark: "bg-petrol-dark text-white",
};

export default function Section({
  background = "white",
  children,
  className,
  id,
  "data-testid": testId,
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseVariants = getMotionVariants(Boolean(prefersReducedMotion), blurReveal);
  // Server-side rendering always assumes no motion preference (matchMedia is
  // unavailable), so the initial markup is baked from `blurReveal`, which
  // includes `filter: blur(8px)`. When the client detects
  // `prefers-reduced-motion: reduce`, `getMotionVariants` swaps in a variant
  // that never mentions `filter` at all — Framer Motion only writes keys
  // present in the active variant, so that stale SSR `filter` value is never
  // cleared. Pin `filter: none` explicitly on both states in the
  // reduced-motion path so hydration always converges to no blur.
  const variants = prefersReducedMotion
    ? {
        hidden: { ...baseVariants.hidden, filter: "none" },
        visible: { ...baseVariants.visible, filter: "none" },
      }
    : baseVariants;

  return (
    <motion.section
      id={id}
      data-testid={testId}
      data-background={background}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={cn(
        "py-24 md:py-[120px] px-6",
        BACKGROUND_CLASSES[background],
        className
      )}
    >
      {children}
    </motion.section>
  );
}
