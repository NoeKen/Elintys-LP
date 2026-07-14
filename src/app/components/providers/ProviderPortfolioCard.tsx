import Image from "next/image";
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import type { ProviderProfile } from "./providers.types";

export default function ProviderPortfolioCard({ provider }: { provider: ProviderProfile }) {
  return (
    <div data-testid={provider.beforeAfter ? "provider-card-before-after" : "provider-card"}>
      <FloatingCard className="flex h-full flex-col gap-4 p-0 overflow-hidden">
        {provider.beforeAfter ? (
          <div className="grid grid-cols-2">
            <div className="relative aspect-square w-full">
              <Image
                src={provider.beforeAfter.beforeSrc}
                alt={provider.beforeAfter.beforeAlt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                Before
              </span>
            </div>
            <div className="relative aspect-square w-full">
              <Image
                src={provider.beforeAfter.afterSrc}
                alt={provider.beforeAfter.afterAlt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                After
              </span>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={provider.imageSrc}
              alt={provider.imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <span className="text-xs font-medium uppercase tracking-wide text-brand-mid">
            {provider.category}
          </span>
          <h3 className="text-xl font-medium text-ink">{provider.name}</h3>
          <p className="text-sm text-brand-mid">{provider.tagline}</p>
          <blockquote className="mt-auto border-t border-brand-border pt-3 text-sm italic text-ink">
            &ldquo;{provider.review.quote}&rdquo;
            <footer className="mt-1 text-xs not-italic text-brand-mid">
              {provider.review.authorName} — {provider.review.authorRole}
            </footer>
          </blockquote>
        </div>
      </FloatingCard>
    </div>
  );
}
