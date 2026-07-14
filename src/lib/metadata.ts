import type { Metadata } from "next";

export function getOpenGraphLocale(locale: string) {
  return locale === "fr" ? "fr_CA" : "en_CA";
}

export function buildPageMetadata(
  locale: string,
  title: string,
  description: string,
  twitterDescription = description,
  alternates?: {
    canonicalPath: string;
    languages?: Record<string, string>;
  }
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elintys.com";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: alternates
      ? {
          canonical: new URL(alternates.canonicalPath, siteUrl).toString(),
          languages: Object.fromEntries(
            Object.entries(alternates.languages ?? {}).map(([language, path]) => [
              language,
              new URL(path, siteUrl).toString(),
            ])
          ),
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: getOpenGraphLocale(locale),
      siteName: "Elintys",
      url: alternates ? new URL(alternates.canonicalPath, siteUrl).toString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: twitterDescription,
    },
  };
}
