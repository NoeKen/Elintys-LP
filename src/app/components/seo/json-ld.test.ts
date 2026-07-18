import { describe, expect, it } from "vitest";
import {
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/json-ld";
import { legalConfig } from "@/config/legal";

describe("JsonLd schemas", () => {
  it("generates valid organization, website, and software schemas", () => {
    expect(organizationJsonLd()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: legalConfig.projectName,
      url: legalConfig.website.canonicalUrl,
      logo: "https://www.elintys.com/images/elintys-logo.png",
      email: legalConfig.contactEmail,
      founder: {
        "@type": "Person",
        name: legalConfig.operatorName,
      },
    });
    expect(websiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      inLanguage: ["fr-CA", "en-CA"],
    });
    expect(softwareApplicationJsonLd("en")).toMatchObject({
      "@type": "SoftwareApplication",
      url: "https://www.elintys.com",
    });
    const serialized = JSON.stringify([
      organizationJsonLd(),
      websiteJsonLd(),
      softwareApplicationJsonLd("fr"),
    ]);
    expect(serialized).not.toMatch(
      /taxID|vatID|legalName|identifier|address|foundingDate|numberOfEmployees|telephone|sameAs|aggregateRating|review|offers|priceCurrency|null|undefined/
    );
  });

  it("generates FAQPage data from visible FAQ items", () => {
    const data = faqPageJsonLd([["Question?", "Answer."]], "fr");

    expect(data).toMatchObject({
      "@type": "FAQPage",
      inLanguage: "fr-CA",
    });
    expect(data.mainEntity).toHaveLength(1);
  });
});
