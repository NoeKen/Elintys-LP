
import Image from "next/image";
import CTAForm from "./CTAForm";

export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-blue-900 opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <div className="mb-8">
          <Image 
            src="/elyntis-white-1-mcwlukfj.png"
            alt="Elyntis Logo"
            width={180}
            height={45}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          La plateforme tout-en-un pour vos événements
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-6">
          Organisez, découvrez et vivez des événements inoubliables.
          <br />
          Connectez organisateurs, lieux et prestataires en un seul endroit.
        </p>
        <p className="max-w-4xl mx-auto text-base text-gray-400 mb-10">
          Créez, gérez et vivez vos événements plus facilement que jamais grâce à une interface intuitive et des outils pensés pour chaque acteur de l’événementiel.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <CTAForm variant="dark" />
        </div>
      </div>
    </section>
  );
}
