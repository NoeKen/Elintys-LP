"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="grid md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gradient mb-4">Elyntis</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                {t("footer.tagline")}
              </p>
            </motion.div>
          </div>

          {/* Links Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6">{t("footer.links")}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.features")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.about")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t("nav.contact")}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Legal Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t("footer.legal")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t("footer.privacy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {t("footer.terms")}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} Elyntis. {t("footer.rights")}.
          </p>

          {/* Language Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Language:</span>
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-lg">{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
              <span className="text-sm font-medium">{language === "fr" ? "Français" : "English"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
