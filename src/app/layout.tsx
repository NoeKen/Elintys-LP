import type { Metadata } from "next";
import localFont from "next/font/local";
import { absoluteUrl, siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = localFont({
  src: "../pages/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../pages/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.defaultLocale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
