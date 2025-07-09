
import { Users, Building, Briefcase, PartyPopper } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Audience() {
  const profiles = [
    {
      icon: PartyPopper,
      title: "Visiteurs",
      description: "Découvrez des événements passionnants près de chez vous"
    },
    {
      icon: Users,
      title: "Organisateurs",
      description: "Créez et gérez vos événements facilement"
    },
    {
      icon: Building,
      title: "Propriétaires",
      description: "Louez vos espaces pour des événements"
    },
    {
      icon: Briefcase,
      title: "Prestataires",
      description: "Présentez vos services et trouvez des clients"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Une plateforme pensée pour chaque profil
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Que vous soyez un professionnel ou un particulier, Elyntis s'adapte à vos besoins.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {profiles.map((profile, index) => (
            <Card key={index} className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <profile.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">{profile.title}</CardTitle>
                <CardDescription className="pt-2 text-base">{profile.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
