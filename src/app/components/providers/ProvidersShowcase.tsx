import EmailForm from "@/app/components/ui/EmailForm";
import Section from "@/app/components/ui/premium/Section";
import SectionDivider from "@/app/components/ui/premium/SectionDivider";
import FloatingCard from "@/app/components/ui/premium/FloatingCard";
import CategoryGrid from "./CategoryGrid";
import ProviderPortfolioCard from "./ProviderPortfolioCard";
import ProvidersHero from "./ProvidersHero";
import { providersContent } from "./providers.content";

export default function ProvidersShowcase({ locale }: { locale: "fr" | "en" }) {
  const { copy, providers, incomingRequests } = providersContent[locale];
  const mosaicImages = providers.map((provider) => ({
    src: provider.imageSrc,
    alt: provider.imageAlt,
  }));

  return (
    <>
      <ProvidersHero
        copy={copy}
        mosaicImages={mosaicImages}
        primaryCtaHref="#provider-waitlist"
        secondaryCtaHref="#provider-directory"
      />

      <Section background="white">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {providers.map((provider) => (
            <ProviderPortfolioCard key={provider.id} provider={provider} />
          ))}
        </div>
      </Section>

      <Section background="tinted">
        <CategoryGrid copy={copy} />
      </Section>

      <Section background="white" id="provider-directory">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-ink md:text-4xl">
            {locale === "fr" ? "Demandes reçues récemment" : "Recently received requests"}
          </h2>
          <p className="mt-3 text-brand-mid">
            {locale === "fr"
              ? "Un aperçu illustratif du type de demandes que les prestataires reçoivent une fois leur profil en ligne."
              : "An illustrative preview of the kind of requests providers receive once their profile is live."}
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {incomingRequests.map((request) => (
              <li key={request.organizerName} className="rounded-2xl border border-brand-border bg-white p-5">
                <p className="text-sm font-medium text-ink">{request.organizerName}</p>
                <p className="text-xs uppercase tracking-wide text-brand-mid">{request.eventType}</p>
                <p className="mt-3 text-sm text-brand-mid">{request.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section background="tinted">
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
      </Section>

      <SectionDivider variant="gradient-fade" />

      <Section background="dark" id="provider-waitlist">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium text-white md:text-4xl">{copy.finalCtaTitle}</h2>
          <p className="mt-3 text-white/80">{copy.finalCtaDescription}</p>
          <EmailForm
            source="providers-page"
            defaultRole="prestataire"
            buttonLabel={copy.finalCtaButton}
            inputClassName="border-white/15 bg-white/[0.08] text-white placeholder:text-white/35 focus:border-teal"
            wrapperClassName="mt-8 [&_.text-brand-mid]:text-white/60 [&_select]:text-white"
          />
        </div>
      </Section>
    </>
  );
}
