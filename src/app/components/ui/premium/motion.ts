import type { TargetAndTransition, Variants } from "framer-motion";

const EASE_OUT = "easeOut" as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const floatLoop: Variants = {
  visible: {
    y: [0, -14, 0],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

export const hoverLift: { rest: TargetAndTransition; hover: TargetAndTransition } = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06)" },
  hover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(16, 24, 40, 0.12)",
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

const REDUCED_MOTION_VARIANT: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function getMotionVariants(
  prefersReducedMotion: boolean,
  full: Variants
): Variants {
  return prefersReducedMotion ? REDUCED_MOTION_VARIANT : full;
}

const REDUCED_HOVER: { rest: TargetAndTransition; hover: TargetAndTransition } = {
  rest: { boxShadow: "0 1px 2px rgba(16, 24, 40, 0.06)" },
  hover: {
    boxShadow: "0 12px 24px rgba(16, 24, 40, 0.12)",
    transition: { duration: 0.25, ease: EASE_OUT },
  },
};

export function getHoverVariants(
  prefersReducedMotion: boolean,
  full: { rest: TargetAndTransition; hover: TargetAndTransition }
): { rest: TargetAndTransition; hover: TargetAndTransition } {
  return prefersReducedMotion ? REDUCED_HOVER : full;
}
