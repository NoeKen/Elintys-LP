import CTAFinal from "@/app/components/landing/CTAFinal";
import FAQ from "@/app/components/landing/FAQ";
import Footer from "@/app/components/landing/Footer";
import Hero from "@/app/components/landing/Hero";
import Marquee from "@/app/components/landing/Marquee";
import Navbar from "@/app/components/landing/Navbar";
import Problem from "@/app/components/landing/Problem";
import SocialProof from "@/app/components/landing/SocialProof";
import Solution from "@/app/components/landing/Solution";
import WhyNow from "@/app/components/landing/WhyNow";
import { getOpenGraphLocale, isValidLocale, type SiteLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

function getMetadataForLocale(locale: SiteLocale): Metadata {
  if (locale === "fr") {
    return {
      title: "Elintys — L'événementiel réinventé",
      description:
        "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Créez, équipez, vendez, gérez et accueillez — sans friction. Rejoignez la liste d'attente.",
      robots: { index: true, follow: true },
      openGraph: {
        title: "Elintys — L'événementiel réinventé",
        description:
          "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Créez, équipez, vendez, gérez et accueillez — sans friction. Rejoignez la liste d'attente.",
        type: "website",
        locale: getOpenGraphLocale(locale),
        siteName: "Elintys",
      },
      twitter: {
        card: "summary_large_image",
        title: "Elintys — L'événementiel réinventé",
        description:
          "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Rejoignez la liste d'attente.",
      },
    };
  }

  return {
    title: "Elintys — Events, reinvented",
    description:
      "Elintys brings organizers, service providers, and venue managers together in one ecosystem. Create, equip, sell, manage, and welcome — without friction. Join the waitlist.",
    robots: { index: true, follow: true },
    openGraph: {
      title: "Elintys — Events, reinvented",
      description:
        "Elintys brings organizers, service providers, and venue managers together in one ecosystem. Create, equip, sell, manage, and welcome — without friction. Join the waitlist.",
      type: "website",
      locale: getOpenGraphLocale(locale),
      siteName: "Elintys",
    },
    twitter: {
      card: "summary_large_image",
      title: "Elintys — Events, reinvented",
      description:
        "Elintys brings organizers, service providers, and venue managers together in one ecosystem. Join the waitlist.",
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return getMetadataForLocale(locale);
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Solution />
        <SocialProof />
        <WhyNow />
        <FAQ />
        <CTAFinal />
        <Footer />
      </main>
    </>
  );
}
