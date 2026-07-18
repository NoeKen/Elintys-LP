import { readFileSync, statSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "./metadata";

describe("buildPageMetadata", () => {
  it("uses the official www domain for canonical, open graph, and social images", () => {
    const metadata = buildPageMetadata(
      "fr",
      "Solution pour organisateurs d'evenements | Elintys",
      "Description",
      "Description",
      { routeKey: "organizers" }
    );

    expect(metadata.alternates?.canonical).toBe("https://www.elintys.com/fr/organisateurs");
    expect(metadata.alternates?.languages).toMatchObject({
      "fr-CA": "https://www.elintys.com/fr/organisateurs",
      "en-CA": "https://www.elintys.com/en/organizers",
      "x-default": "https://www.elintys.com/fr/organisateurs",
    });
    expect(metadata.openGraph?.url).toBe("https://www.elintys.com/fr/organisateurs");
    expect(JSON.stringify(metadata)).not.toContain("elintys.ca");
    expect(JSON.stringify(metadata)).not.toContain("vercel.app");
  });

  it("sets default publisher and sharing image metadata", () => {
    const metadata = buildPageMetadata("en", "About Elintys", "Description", "Description", {
      routeKey: "about",
    });

    expect(metadata.publisher).toBe(siteConfig.name);
    expect(JSON.stringify(metadata.twitter)).toContain("summary_large_image");
    expect(JSON.stringify(metadata.openGraph?.images)).toContain(
      "https://www.elintys.com/images/og/elintys-og.png"
    );
    expect(JSON.stringify(metadata.openGraph?.images)).not.toContain("/og-image.svg");
  });

  it("publishes a raster Open Graph image with the expected dimensions", () => {
    const imagePath = join(process.cwd(), "public/images/og/elintys-og.png");
    const image = readFileSync(imagePath);

    expect(image.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
    expect(statSync(imagePath).size).toBeLessThan(500 * 1024);
  });
});
