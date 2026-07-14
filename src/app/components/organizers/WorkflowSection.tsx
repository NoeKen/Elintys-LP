import StepCard from "./StepCard";
import type { WorkflowStep } from "./organizers.types";

export default function WorkflowSection({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: WorkflowStep[];
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-medium text-ink md:text-4xl">{title}</h2>
        <p className="mt-3 text-brand-mid">{subtitle}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.id} id={step.id} className="scroll-mt-24">
            <StepCard step={step} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
