import type { Metadata } from "next";

import Navbar from "@/app/components/landing/Navbar";
import Hero from "@/app/components/landing/Hero";
import Marquee from "@/app/components/landing/Marquee";
import Problem from "@/app/components/landing/Problem";
import Solution from "@/app/components/landing/Solution";
import Stats from "@/app/components/landing/Stats";
import Comparison from "@/app/components/landing/Comparison";
import FAQ from "@/app/components/landing/FAQ";
import CTAFinal from "@/app/components/landing/CTAFinal";
import Footer from "@/app/components/landing/Footer";

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
