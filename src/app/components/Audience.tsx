"use client";

import Image from "next/image";
import { Users, Building, Briefcase, PartyPopper } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Audience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const profiles = [
    {
      icon: PartyPopper,
      title: "Visiteurs",
      description: "Découvrez des événements passionnants près de chez vous",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Users,
      title: "Organisateurs",
      description: "Créez et gérez vos événements facilement",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Building,
      title: "Propriétaires",
      description: "Louez vos espaces pour des événements",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Briefcase,
      title: "Prestataires",
      description: "Présentez vos services et trouvez des clients",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Une plateforme pensée pour chaque profil
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Que vous soyez un professionnel ou un particulier, elintys s'adapte à vos besoins.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden group border-0 bg-white/90 backdrop-blur-sm">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={profile.image}
                    alt={profile.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <profile.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="text-xl mb-2">{profile.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{profile.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
