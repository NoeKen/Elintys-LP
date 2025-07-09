
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../layout";
import { Eye, Calendar, Building, Briefcase } from "lucide-react";

export default function Audience() {
  const { t } = useLanguage();

  const audiences = [
    {
      icon: Eye,
      titleKey: "audience.visitors.title",
      descKey: "audience.visitors.desc",
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: Calendar,
      titleKey: "audience.organizers.title",
      descKey: "audience.organizers.desc",
      color: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: Building,
      titleKey: "audience.owners.title",
      descKey: "audience.owners.desc",
      color: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: Briefcase,
      titleKey: "audience.providers.title",
      descKey: "audience.providers.desc",
      color: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("audience.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("audience.subtitle")}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {audiences.map((audience, index) => (
            <motion.div 
              key={index}
              className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden group"
              variants={itemVariants}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={audience.image} 
                  alt={t(audience.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.color} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <audience.icon className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t(audience.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(audience.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
