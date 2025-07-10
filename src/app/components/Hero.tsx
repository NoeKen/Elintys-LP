"use client";

import Image from "next/image";
import CTAForm from "./CTAForm";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Event background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-gray-900/70 to-blue-900/80"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/elyntis-white-1-mcwlukfj.png"
            alt="Elyntis Logo"
            width={180}
            height={45}
            className="mx-auto"
            priority
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {language === "fr" 
            ? "La plateforme tout-en-un pour vos événements" 
            : "The all-in-one platform for your events"}
        </motion.h1>
        
        <motion.p 
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {language === "fr"
            ? "Organisez, découvrez et vivez des événements inoubliables."
            : "Organize, discover and experience unforgettable events."}
          <br />
          {language === "fr"
            ? "Connectez organisateurs, lieux et prestataires en un seul endroit."
            : "Connect organizers, venues and providers in one place."}
        </motion.p>
        
        <motion.p 
          className="max-w-4xl mx-auto text-base text-gray-400 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {language === "fr"
            ? "Créez, gérez et vivez vos événements plus facilement que jamais grâce à une interface intuitive et des outils pensés pour chaque acteur de l'événementiel."
            : "Create, manage and experience your events more easily than ever thanks to an intuitive interface and tools designed for each player in the event industry."}
        </motion.p>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <CTAForm variant="dark" />
        </motion.div>
      </div>

      {/* Floating elements animation */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 bg-indigo-400/20 rounded-full"
        animate={{
          y: [0, 20, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
}
