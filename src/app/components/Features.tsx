
"use client";

import { CheckCircle, Zap, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Features() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featureItems = [
    {
      icon: Zap,
      title: language === "fr" ? "Centralisation & Simplicité" : "Centralization & Simplicity",
      description: language === "fr" ? "Gérez tout depuis un seul endroit : lieux, prestataires, billetterie, et communication." : "Manage everything from one place: venues, providers, ticketing, and communication.",
    },
    {
      icon: Users,
      title: language === "fr" ? "Connexion & Communauté" : "Connection & Community",
      description: language === "fr" ? "Mettez en relation organisateurs, participants et prestataires pour des événements plus riches." : "Connect organizers, attendees, and providers for richer events.",
    },
    {
      icon: CheckCircle,
      title: language === "fr" ? "Outils Intuitifs" : "Intuitive Tools",
      description: language === "fr" ? "Des fonctionnalités pensées pour vous faire gagner du temps et de l'efficacité à chaque étape." : "Features designed to save you time and efficiency at every step.",
    },
    {
      icon: Shield,
      title: language === "fr" ? "Confiance & Sécurité" : "Trust & Security",
      description: language === "fr" ? "Une plateforme fiable pour des transactions sécurisées et des partenariats de qualité." : "A reliable platform for secure transactions and quality partnerships.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {language === "fr" ? "Pourquoi choisir Elyntis ?" : "Why choose Elyntis?"}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {language === "fr" ? "Nous réinventons l'organisation d'événements." : "We are reinventing event organization."}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-10">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
