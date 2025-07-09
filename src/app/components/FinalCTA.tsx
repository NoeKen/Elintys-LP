
import CTAForm from "./CTAForm";

export default function FinalCTA() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Prêt à rejoindre l'aventure ?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Inscrivez-vous pour suivre notre lancement et recevoir un accès prioritaire à la version bêta.
        </p>
        
        <div className="max-w-md mx-auto">
          <CTAForm variant="dark" />
        </div>
      </div>
    </section>
  );
}
