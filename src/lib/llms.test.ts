import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("llms.txt", () => {
  it("publishes official public references without alternate domains", () => {
    const content = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

    expect(content).toContain("# Elintys");
    expect(content).toContain("https://www.elintys.com/fr");
    expect(content).toContain("https://www.elintys.com/en");
    expect(content).toContain("https://www.elintys.com/sitemap.xml");
    expect(content).not.toContain("elintys.ca");
    expect(content).not.toContain("vercel.app");
  });
});
