"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Lightbulb } from "lucide-react";

export default function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Team collaboration background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Équipe passionnée travaillant ensemble"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-semibold">Une équipe passionnée</p>
                <p className="text-sm opacity-90">Technologie × Événementiel</p>
              </div>
            </div>

            {/* Floating icons */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Lightbulb className="w-7 h-7 text-white" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Pourquoi Elyntis ?
            </motion.h2>
            
            <motion.div
              className="space-y-6 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Users className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                <p>
                  Nous sommes une équipe passionnée par l'événementiel et la technologie.
                </p>
              </motion.div>
              
              <motion.div
                className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-lg"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.8)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-6 h-6 text-rose-600 mt-1 flex-shrink-0" />
                <p>
                  Nous avons vécu les galères de l'organisation d'événements, et nous construisons l'outil que nous aurions aimé avoir.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-semibold text-xl text-center">
                  Rejoignez-nous dans cette aventure.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
