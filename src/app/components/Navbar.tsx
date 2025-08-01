"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const navItems = [
    {
      label: language === "fr" ? "Accueil" : "Home",
      href: "#hero",
    },
    {
      label: language === "fr" ? "Problème" : "Problem",
      href: "#problem",
    },
    {
      label: language === "fr" ? "Solution" : "Solution",
      href: "#solution",
    },
    {
      label: language === "fr" ? "Fonctionnalités" : "Features",
      href: "#features",
    },
    {
      label: language === "fr" ? "Vision" : "Vision",
      href: "#vision",
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.div
              className="mt-2"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/elintys-logo.png"
                alt="Elintys Logo"
                width={180}
                height={45}
                className="mx-auto"
                priority
              />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA and Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "fr" ? "EN" : "FR"}</span>
            </Button>
            <Button
              onClick={() => scrollToSection("#cta")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {language === "fr" ? "Commencer" : "Get Started"}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "fr" ? "EN" : "FR"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <Button
                  onClick={() => scrollToSection("#cta")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {language === "fr" ? "Commencer" : "Get Started"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
