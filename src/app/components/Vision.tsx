
"use client";

import { motion } from "framer-motion";
import { Target, Users, Heart } from "lucide-react";

export default function Vision() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🎯 Notre vision
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Elyntis est né d'un constat simple : organiser ou participer à un événement local reste encore un parcours du combattant. Entre la recherche de prestataires, la location d'un lieu, la billetterie et la communication, tout est éparpillé.
            </p>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-600 mb-3 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Notre ambition ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Centraliser l'univers de l'événementiel dans une seule application. Qu'il s'agisse d'un anniversaire, d'un concert, d'un salon professionnel ou d'un mariage, <strong>Elyntis connecte toutes les parties prenantes</strong> : organisateurs, prestataires, lieux et participants.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Nous croyons en un écosystème plus fluide, plus accessible, plus humain. Un espace numérique où chaque événement, petit ou grand, peut prendre vie plus simplement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-90" />
                  <h4 className="font-semibold mb-2">Connexion</h4>
                  <p className="text-sm opacity-90">Toutes les parties prenantes réunies</p>
                </div>
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3 opacity-90" />
                  <h4 className="font-semibold mb-2">Simplicité</h4>
                  <p className="text-sm opacity-90">Une expérience fluide et humaine</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
                  <Target className="w-8 h-8" />
                </div>
                <p className="mt-3 font-medium">L'événementiel centralisé</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
