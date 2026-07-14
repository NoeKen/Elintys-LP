import { cn } from "@/lib/utils";

export type SectionDividerVariant = "curve" | "gradient-fade";

export interface SectionDividerProps {
  variant?: SectionDividerVariant;
  className?: string;
}

export default function SectionDivider({
  variant = "gradient-fade",
  className,
}: SectionDividerProps) {
  if (variant === "curve") {
    return (
      <svg
        aria-hidden="true"
        data-testid="section-divider"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("h-20 w-full text-surface", className)}
      >
        <path d="M0,40 C480,90 960,-10 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <div
      aria-hidden="true"
      data-testid="section-divider"
      className={cn(
        "h-24 w-full bg-gradient-to-b from-teal-brand/10 to-transparent",
        className
      )}
    />
  );
}
