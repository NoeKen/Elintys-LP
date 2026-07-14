"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverLift, getHoverVariants } from "./motion";

export interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export default function FloatingCard({
  children,
  className,
  glass = false,
}: FloatingCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = getHoverVariants(Boolean(prefersReducedMotion), hoverLift);

  return (
    <motion.div
      data-testid="floating-card"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={variants}
      className={cn(
        "rounded-2xl border border-border-default bg-white p-6",
        glass && "bg-white/70 backdrop-blur-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
