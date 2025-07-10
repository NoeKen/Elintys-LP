"use client";

import Image from "next/image";
import { MapPin, Ticket, Link, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Solution() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: MapPin,
      title: language === "fr" ? "Un seul espace pour tout centraliser" : "A single space to centralize everything",
      description: language === "fr" ? "Gérez tous vos événements depuis une interface unique" : "Manage all your events from a single interface",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Ticket,
      title: language === "fr" ? "Billetterie, prestataires et lieux en quelques clics" : "Ticketing, providers and venues in a few clicks",
      description: language === "fr" ? "Trouvez et réservez tout ce dont vous avez besoin rapidement" : "Find and book everything you need quickly",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Link,
      title: language === "fr" ? "Connectez organisateurs, prestataires et publics" : "Connect organizers, providers and audiences",
      description: language === "fr" ? "Une plateforme qui unit tous les acteurs de l'événementiel" : "A platform that unites all players in the event industry",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: BarChart3,
      title: language === "fr" ? "Suivi simplifié, gestion efficace" : "Simplified monitoring, effective management",
      description: language === "fr" ? "Tableaux de bord intuitifs pour piloter vos événements" : "Intuitive dashboards to manage your events",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Solution background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {language === "fr" ? "Une solution unique, pensée pour vous" : "A unique solution, designed for you"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "fr" 
              ? "Nous construisons une plateforme simple et puissante pour faciliter chaque étape de l'organisation d'événements."
              : "We are building a simple and powerful platform to facilitate every step of event organization."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -10
              }}
            >
              <motion.div 
                className={`w-16 h-16 mx-auto mb-4 ${feature.color} rounded-full flex items-center justify-center`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
}
