import { absoluteUrl, siteConfig, type SiteLocale } from "@/config/site";
import { legalConfig } from "@/config/legal";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: legalConfig.projectName,
    url: legalConfig.website.canonicalUrl,
    logo: absoluteUrl(siteConfig.logoPath),
    email: legalConfig.contactEmail,
    founder: {
      "@type": "Person",
      name: legalConfig.operatorName,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["fr-CA", "en-CA"],
  };
}

export function softwareApplicationJsonLd(locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteConfig.url,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    description:
      locale === "fr"
        ? "Plateforme evenementielle qui connecte organisateurs, prestataires, gestionnaires de lieux et participants."
        : "Event platform connecting organizers, service providers, venue managers, and attendees.",
  };
}

export function faqPageJsonLd(items: [string, string][], locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
