"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Mail, ChevronDown } from "lucide-react";

export default function CTAForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = [
    { key: "visitor", labelKey: "cta.status.visitor" },
    { key: "organizer", labelKey: "cta.status.organizer" },
    { key: "owner", labelKey: "cta.status.owner" },
    { key: "provider", labelKey: "cta.status.provider" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { email, status });
    // Here you would typically send the data to your backend
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("cta.email.placeholder")}
                  className="w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  required
                />
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-4 bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-white/50 transition-all flex items-center justify-between"
                >
                  <span className={status ? "text-gray-900" : "text-gray-500"}>
                    {status 
                      ? t(statusOptions.find(opt => opt.key === status)?.labelKey || "")
                      : t("cta.status.placeholder")
                    }
                  </span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-20"
                  >
                    {statusOptions.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => {
                          setStatus(option.key);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        {t(option.labelKey)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-white text-purple-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("cta.button")}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
