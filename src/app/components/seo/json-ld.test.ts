import { describe, expect, it } from "vitest";
import {
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/json-ld";

describe("JsonLd schemas", () => {
  it("generates valid organization, website, and software schemas", () => {
    expect(organizationJsonLd()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Elintys",
      url: "https://www.elintys.com",
      logo: "https://www.elintys.com/images/elintys-logo.png",
      email: "contact@elintys.com",
    });
    expect(websiteJsonLd()).toMatchObject({
      "@type": "WebSite",
      inLanguage: ["fr-CA", "en-CA"],
    });
    expect(softwareApplicationJsonLd("en")).toMatchObject({
      "@type": "SoftwareApplication",
      url: "https://www.elintys.com/en",
    });
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
