import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { WorkflowStep } from "./organizers.types";

export default function StepCard({ step, index }: { step: WorkflowStep; index: number }) {
  return (
    <FloatingCard className="flex h-full flex-col gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/10 text-sm font-medium text-teal-dark">
        {index + 1}
      </span>
      <h3 className="text-lg font-medium text-ink">{step.title}</h3>
      <p className="text-sm text-brand-mid">{step.description}</p>
    </FloatingCard>
  );
}
