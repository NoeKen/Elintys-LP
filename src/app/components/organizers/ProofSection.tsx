import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { OrganizersCopy } from "./organizers.types";

export default function ProofSection({ copy }: { copy: OrganizersCopy }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-medium text-ink md:text-4xl">{copy.benefitsTitle}</h2>
      <div className="mt-8 grid gap-6 text-left md:grid-cols-2">
        {copy.benefits.map((benefit) => (
          <FloatingCard key={benefit.title}>
            <h3 className="text-lg font-medium text-ink">{benefit.title}</h3>
            <p className="mt-2 text-sm text-brand-mid">{benefit.description}</p>
          </FloatingCard>
        ))}
      </div>
      <p className="mt-10 text-lg font-medium text-ink">{copy.earlyAccessTitle}</p>
      <p className="mt-2 text-brand-mid">{copy.earlyAccessDescription}</p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        {copy.earlyAccessItems.map((item) => (
          <li key={item} className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-mid">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
