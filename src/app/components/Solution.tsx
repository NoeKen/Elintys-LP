
import { MapPin, Ticket, Link, BarChart3 } from "lucide-react";

export default function Solution() {
  const features = [
    {
      icon: MapPin,
      title: "Un seul espace pour tout centraliser",
      description: "Gérez tous vos événements depuis une interface unique"
    },
    {
      icon: Ticket,
      title: "Billetterie, prestataires et lieux en quelques clics",
      description: "Trouvez et réservez tout ce dont vous avez besoin rapidement"
    },
    {
      icon: Link,
      title: "Connectez organisateurs, prestataires et publics",
      description: "Une plateforme qui unit tous les acteurs de l'événementiel"
    },
    {
      icon: BarChart3,
      title: "Suivi simplifié, gestion efficace",
      description: "Tableaux de bord intuitifs pour piloter vos événements"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Une solution unique, pensée pour vous
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous construisons une plateforme simple et puissante pour faciliter chaque étape de l'organisation d'événements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
