import { describe, expect, it } from "vitest";
import en from "@/messages/en";
import fr from "@/messages/fr";

describe("legal messages", () => {
  it("uses interpolation placeholders for mutable legal facts", () => {
    const legalContent = JSON.stringify([fr.legal, en.legal]);

    expect(fr.legal.privacyPolicy.sections.identity.body).toContain("{operatorName}");
    expect(fr.legal.privacyPolicy.sections.rpr.body).toContain("{privacyOfficerEmail}");
    expect(fr.legal.privacyPolicy.lastUpdated).toContain("{lastUpdated}");
    expect(en.legal.privacyPolicy.sections.identity.body).toContain("{operatorName}");
    expect(en.legal.privacyPolicy.sections.rpr.body).toContain("{privacyOfficerEmail}");
    expect(en.legal.privacyPolicy.lastUpdated).toContain("{lastUpdated}");
    expect(legalContent).not.toContain("Aurel Noe Kenfack");
    expect(legalContent).not.toContain("contact@elintys.com");
    expect(legalContent).not.toMatch(/\[(?:Prénom|First name|Nom|Name|Adresse|Address|À compléter|To be completed)/i);
    expect(legalContent).not.toMatch(/\bNEQ\b/i);
    expect(legalContent).not.toContain("privacy@elintys.com");
  });
});
