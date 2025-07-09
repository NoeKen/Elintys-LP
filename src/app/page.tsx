
"use client";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Audience from "./components/Audience";
import CTAForm from "./components/CTAForm";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Audience />
      <CTAForm />
      <Footer />
    </main>
  );
}
