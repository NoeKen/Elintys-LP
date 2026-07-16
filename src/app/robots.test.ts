import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("allows public pages and declares the canonical sitemap", () => {
    const result = robots();

    expect(result.sitemap).toBe("https://www.elintys.com/sitemap.xml");
    expect(result.host).toBe("https://www.elintys.com");
    expect(JSON.stringify(result.rules)).toContain("/api/");
    expect(JSON.stringify(result.rules)).not.toContain("/fr/");
    expect(JSON.stringify(result.rules)).not.toContain("/_next/");
  });
});
