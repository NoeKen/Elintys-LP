import type { WorkflowStep } from "./organizers.types";

export default function AnchorNav({ steps }: { steps: WorkflowStep[] }) {
  return (
    <nav
      aria-label="Workflow steps"
      className="sticky top-[72px] z-40 overflow-x-auto border-b border-brand-border bg-white/95 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-6xl gap-6 px-6 py-3 text-sm">
        {steps.map((step, index) => (
          <li key={step.id} className="shrink-0">
            <a href={`#${step.id}`} className="text-brand-mid hover:text-ink">
              {index + 1}. {step.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
