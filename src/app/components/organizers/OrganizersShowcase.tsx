import EmailForm from "@/app/components/ui/EmailForm";
import Section from "@/app/components/ui/premium/Section";
import SectionDivider from "@/app/components/ui/premium/SectionDivider";
import AnchorNav from "./AnchorNav";
import { organizersContent } from "./organizers.content";
import OrganizersHero from "./OrganizersHero";
import ProofSection from "./ProofSection";
import WorkflowSection from "./WorkflowSection";

export default function OrganizersShowcase({ locale }: { locale: "fr" | "en" }) {
  const { copy } = organizersContent[locale];

  return (
    <>
      <OrganizersHero
        copy={copy}
        primaryCtaHref="#organizer-waitlist"
        secondaryCtaHref={`#${copy.steps[0].id}`}
      />

      <AnchorNav steps={copy.steps} />

      <Section background="white">
        <WorkflowSection title={copy.workflowTitle} subtitle={copy.workflowSubtitle} steps={copy.steps} />
      </Section>

      <Section background="tinted">
        <ProofSection copy={copy} />
      </Section>

      <SectionDivider variant="gradient-fade" />

      <Section background="dark" id="organizer-waitlist">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-medium text-white md:text-4xl">{copy.finalCtaTitle}</h2>
          <p className="mt-3 text-white/80">{copy.finalCtaDescription}</p>
          <EmailForm
            source="events-page"
            defaultRole="organisateur"
            buttonLabel={copy.finalCtaButton}
            inputClassName="border-white/15 bg-white/[0.08] text-white placeholder:text-white/35 focus:border-teal"
            wrapperClassName="mt-8 [&_.text-brand-mid]:text-white/60 [&_select]:text-white"
          />
        </div>
      </Section>
    </>
  );
}
