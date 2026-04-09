import type { Metadata } from "next";

import Navbar from "@/app/components/landing/Navbar";
import Hero from "@/app/components/landing/Hero";
import Marquee from "@/app/components/landing/Marquee";
import Problem from "@/app/components/landing/Problem";
import Solution from "@/app/components/landing/Solution";
import SocialProof from "@/app/components/landing/SocialProof";
import Comparison from "@/app/components/landing/Comparison";
import WhyNow from "@/app/components/landing/WhyNow";
import FAQ from "@/app/components/landing/FAQ";
import CTAFinal from "@/app/components/landing/CTAFinal";
import Footer from "@/app/components/landing/Footer";

export const metadata: Metadata = {
  title: "Elintys — L'événementiel réinventé",
  description:
    "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Créez, équipez, vendez, gérez et accueillez — sans friction. Rejoignez la liste d'attente.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Elintys — L'événementiel réinventé",
    description:
      "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Créez, équipez, vendez, gérez et accueillez — sans friction. Rejoignez la liste d'attente.",
    type: "website",
    locale: "fr_CA",
    siteName: "Elintys",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elintys — L'événementiel réinventé",
    description:
      "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Rejoignez la liste d'attente.",
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
        <SocialProof />
        {/* <Comparison /> */}
        <WhyNow />
        <FAQ />
        <CTAFinal />
        <Footer />
      </main>
    </>
  );
}
