import { describe, expect, it } from "vitest";
import { legalConfig } from "./legal";
import {
  formatPolicyLastUpdated,
  getLegalMessageValues,
  getPrivacyOfficerIdentity,
  getPublicOperatorIdentity,
  getRegistrationStatusMessageKey,
  hasPublicBusinessAddress,
  hasPublicNeq,
  isBusinessRegistered,
} from "@/lib/legal";

describe("legalConfig", () => {
  it("keeps current public legal facts explicit and non-fictitious", () => {
    expect(legalConfig.projectName).toBe("Elintys");
    expect(legalConfig.operatorName).toBe("Aurel Noe Kenfack");
    expect(legalConfig.contactEmail).toBe("contact@elintys.com");
    expect(legalConfig.privacyOfficerName).toBe("Aurel Noe Kenfack");
    expect(legalConfig.privacyOfficerEmail).toBe("contact@elintys.com");
    expect(legalConfig.registration.status).toBe("unregistered");
    expect(legalConfig.registration.legalName).toBeNull();
    expect(legalConfig.registration.legalForm).toBeNull();
    expect(legalConfig.registration.neq).toBeNull();
    expect(legalConfig.registration.registrationDate).toBeNull();
    expect(legalConfig.address.publicAddress).toBeNull();
    expect(legalConfig.website.canonicalUrl).toBe("https://www.elintys.com");
    expect(legalConfig.policies.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("formats policy dates without timezone drift", () => {
    expect(formatPolicyLastUpdated("fr")).toBe("18 juillet 2026");
    expect(formatPolicyLastUpdated("en")).toBe("July 18, 2026");
  });

  it("returns current helper values and hides absent public business data", () => {
    expect(isBusinessRegistered()).toBe(false);
    expect(hasPublicBusinessAddress()).toBe(false);
    expect(hasPublicNeq()).toBe(false);
    expect(getPublicOperatorIdentity()).toBe("Aurel Noe Kenfack");
    expect(getPrivacyOfficerIdentity()).toBe("Aurel Noe Kenfack");
    expect(getLegalMessageValues("en")).toMatchObject({
      projectName: "Elintys",
      operatorName: "Aurel Noe Kenfack",
      contactEmail: "contact@elintys.com",
      privacyOfficerName: "Aurel Noe Kenfack",
      privacyOfficerEmail: "contact@elintys.com",
      canonicalUrl: "https://www.elintys.com",
      lastUpdated: "July 18, 2026",
    });
  });

  it("maps all registration statuses exhaustively", () => {
    expect(getRegistrationStatusMessageKey("unregistered")).toBe(
      "legal.registrationStatus.unregistered"
    );
    expect(getRegistrationStatusMessageKey("registration-pending")).toBe(
      "legal.registrationStatus.pending"
    );
    expect(getRegistrationStatusMessageKey("registered")).toBe(
      "legal.registrationStatus.registered"
    );
  });
});
