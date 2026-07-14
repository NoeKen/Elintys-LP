import Image from "next/image";
import EmailForm from "@/app/components/ui/EmailForm";
import Section from "@/app/components/ui/premium/Section";
import SectionDivider from "@/app/components/ui/premium/SectionDivider";
import VenueLocationCard from "./VenueLocationCard";
import VenuesHero from "./VenuesHero";
import { venuesContent } from "./venues.content";

// Verbatim from src/app/components/audience/audience-page.config.ts's
// venues.finalCta blocks (FR line ~461, EN line ~849) — reused per the
// plan's UI-only constraint, not new copy.
const finalCta = {
  fr: {
    title: "Faites partie des premiers lieux visibles sur Elintys.",
    description:
      "Rejoignez la bêta et contribuez à définir les outils dont les gestionnaires de lieux ont réellement besoin.",
  },
  en: {
    title: "Be among the first venues visible on Elintys.",
    description: "Join the beta and help define the tools venue managers actually need.",
  },
} as const;

export default function VenuesShowcase({ locale }: { locale: "fr" | "en" }) {
  const { copy, venues } = venuesContent[locale];
  const [firstVenue, ...restVenues] = venues;
  const cta = finalCta[locale];

  return (
    <>
      <VenuesHero copy={copy} heroImageSrc={firstVenue.imageSrc} heroImageAlt={firstVenue.imageAlt} />

      {restVenues.map((venue, index) => (
        <Section
          key={venue.id}
          background={index % 2 === 0 ? "white" : "tinted"}
          data-testid={index === 0 ? "section-white" : index === 1 ? "section-tinted" : undefined}
        >
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={venue.imageSrc}
                alt={venue.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <VenueLocationCard venue={venue} ctaHref="#audience-waitlist" />
          </div>
        </Section>
      ))}

      <SectionDivider variant="gradient-fade" />

      <Section background="dark" id="audience-waitlist">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium text-white md:text-4xl">{cta.title}</h2>
          <p className="mt-3 text-white/80">{cta.description}</p>
          <EmailForm
            source="venues-page"
            defaultRole="gestionnaire"
            inputClassName="border-white/15 bg-white/[0.08] text-white placeholder:text-white/35 focus:border-teal"
            wrapperClassName="mt-8 [&_.text-brand-mid]:text-white/60 [&_select]:text-white"
          />
        </div>
      </Section>
    </>
  );
}
