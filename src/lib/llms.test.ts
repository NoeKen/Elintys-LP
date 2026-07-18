import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";
import { legalConfig } from "@/config/legal";

describe("llms.txt", () => {
  it("publishes official public references as Markdown links without alternate domains", () => {
    const content = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    const h1Headings = content.match(/^#\s+/gm) ?? [];
    const markdownLinks =
      content.match(/\[[^\]]+\]\(https:\/\/www\.elintys\.com\/[^)]+\)/g) ?? [];

    expect(content).toContain(`# ${legalConfig.projectName}`);
    expect(h1Headings).toHaveLength(1);
    expect(markdownLinks.length).toBeGreaterThanOrEqual(5);
    expect(content).toContain("https://www.elintys.com/fr");
    expect(content).toContain("https://www.elintys.com/en");
    expect(content).toContain("https://www.elintys.com/en/privacy");
    expect(content).toContain("https://www.elintys.com/en/terms");
    expect(content).toContain("https://www.elintys.com/sitemap.xml");
    expect(content).toContain(`Nom : ${legalConfig.projectName}`);
    expect(content).toContain(`Exploitant actuel : ${legalConfig.operatorName}`);
    expect(content).toContain(`Contact : ${legalConfig.contactEmail}`);
    expect(content).toContain(`site officiel d'${legalConfig.projectName}`);
    expect(content).toContain(legalConfig.website.canonicalUrl);
    expect(content).toContain("non encore immatriculé");
    expect(content).not.toContain("elintys.ca");
    expect(content).not.toContain("vercel.app");
    expect(content).not.toContain("localhost");
    expect(content).not.toMatch(/\[(?:Prénom|First name|NEQ|Adresse|Address|À compléter|To be completed)/i);
    expect(content).not.toMatch(/\bNEQ\b/i);
  });
});
