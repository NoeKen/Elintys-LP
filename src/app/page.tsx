import type { Metadata } from "next";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Stats from "@/components/landing/Stats";
import Comparison from "@/components/landing/Comparison";
import FAQ from "@/components/landing/FAQ";
import CTAFinal from "@/components/landing/CTAFinal";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Elintys — Tout le parcours événementiel. Un seul endroit.",
  description:
    "Elintys centralise la billetterie, la gestion des invités, les prestataires et le scan d'entrée pour les organisateurs d'événements au Québec.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Elintys — Tout le parcours événementiel. Un seul endroit.",
    description:
      "La première plateforme tout-en-un pour les événements au Québec. Billetterie, invités, prestataires, scan QR — en français.",
    type: "website",
    locale: "fr_CA",
    siteName: "Elintys",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elintys — Tout le parcours événementiel. Un seul endroit.",
    description:
      "La première plateforme tout-en-un pour les événements au Québec.",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Solution />
        <Stats />
        <Comparison />
        <FAQ />
        <CTAFinal />
        <Footer />
      </main>
    </>
  );
}
