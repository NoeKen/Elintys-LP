import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Footer from "@/app/components/landing/Footer";
import Navbar from "@/app/components/landing/Navbar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  JsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/app/components/seo/JsonLd";
import { absoluteUrl, siteConfig, type SiteLocale } from "@/config/site";
import "../globals.css";

const geistSans = localFont({
  src: "../../pages/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../../pages/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Elintys — La plateforme événementielle connectée",
    template: "%s",
  },
  description:
    "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un même écosystème pour planifier, équiper, gérer et faire vivre des événements.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "event technology",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Elintys — La plateforme événementielle connectée",
    description:
      "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un même écosystème.",
    url: siteConfig.url,
    locale: "fr_CA",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImagePath),
        width: 1200,
        height: 630,
        alt: "Identité Elintys pour le partage social",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elintys — La plateforme événementielle connectée",
    description:
      "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un même écosystème.",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImagePath),
        alt: "Identité Elintys pour le partage social",
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const siteLocale = locale as SiteLocale;
  const htmlLang = siteLocale === "en" ? "en-CA" : "fr-CA";

  return (
    <html lang={htmlLang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <JsonLd
            data={[organizationJsonLd(), websiteJsonLd(), softwareApplicationJsonLd(siteLocale)]}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
