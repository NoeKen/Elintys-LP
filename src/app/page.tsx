
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Audience from "./components/Audience";
import Vision from "./components/Vision";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <Audience />
      <Vision />
      <FinalCTA />
      <Footer />
    </main>
  );
}
