
"use client";

import { motion } from "framer-motion";
import { Search, Users, MapPin, Calendar, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Découverte d'événements",
      items: [
        "Recherche locale d'événements par date, thème ou lieu",
        "Suggestions personnalisées",
        "Filtres : gratuit/payant, ambiance, public cible, etc."
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Prestataires événementiels",
      items: [
        "Mise en relation avec des décorateurs, traiteurs, DJs, photographes…",
        "Fiches de services avec notes, avis et portfolio",
        "Demande de devis ou réservation rapide"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Lieux & espaces à louer",
      items: [
        "Annuaire de salles et lieux atypiques disponibles",
        "Planning de disponibilité",
        "Réservation intégrée"
      ],
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🔧 Fonctionnalités principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les outils qui révolutionnent l'organisation d'événements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-4`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        <span>Fonctionnalité clé</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-1 text-purple-500" />
                        <span>Bientôt disponible</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Et bien plus encore...
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              elintys évolue constamment pour répondre aux besoins de la communauté événementielle. 
              Rejoignez-nous pour façonner l'avenir de l'organisation d'événements !
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
