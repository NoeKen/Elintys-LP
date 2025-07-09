
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useState, createContext, useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

interface LanguageContextType {
  language: "fr" | "en";
  setLanguage: (lang: "fr" | "en") => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.features": "Fonctionnalités",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    
    // Hero
    "hero.title": "La plateforme tout-en-un pour vos événements",
    "hero.subtitle": "Organisez, découvrez et vivez des événements inoubliables. Connectez organisateurs, lieux et prestataires en un seul endroit.",
    "hero.cta": "Rejoindre Elyntis",
    
    // Features
    "features.title": "Tout ce dont vous avez besoin",
    "features.subtitle": "Une plateforme complète pour tous vos besoins événementiels",
    "features.events.title": "Événements",
    "features.events.desc": "Créez et découvrez des événements uniques près de chez vous",
    "features.venues.title": "Lieux",
    "features.venues.desc": "Trouvez l'espace parfait pour votre événement",
    "features.services.title": "Prestataires",
    "features.services.desc": "Connectez-vous avec les meilleurs professionnels",
    
    // Audience
    "audience.title": "Pour qui ?",
    "audience.subtitle": "Elyntis s'adapte à tous vos besoins",
    "audience.visitors.title": "Visiteurs",
    "audience.visitors.desc": "Découvrez des événements passionnants près de chez vous",
    "audience.organizers.title": "Organisateurs",
    "audience.organizers.desc": "Créez et gérez vos événements facilement",
    "audience.owners.title": "Propriétaires",
    "audience.owners.desc": "Louez vos espaces pour des événements",
    "audience.providers.title": "Prestataires",
    "audience.providers.desc": "Présentez vos services et trouvez des clients",
    
    // CTA Form
    "cta.title": "Prêt à commencer ?",
    "cta.subtitle": "Rejoignez la communauté Elyntis dès aujourd'hui",
    "cta.email.placeholder": "Votre adresse email",
    "cta.status.placeholder": "Je suis...",
    "cta.status.visitor": "Visiteur",
    "cta.status.organizer": "Organisateur",
    "cta.status.owner": "Propriétaire de lieu",
    "cta.status.provider": "Prestataire",
    "cta.button": "S'inscrire gratuitement",
    
    // Footer
    "footer.tagline": "La plateforme événementielle de demain",
    "footer.links": "Liens utiles",
    "footer.legal": "Mentions légales",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",
    "footer.rights": "Tous droits réservés"
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.about": "About",
    "nav.contact": "Contact",
    
    // Hero
    "hero.title": "The all-in-one platform for your events",
    "hero.subtitle": "Organize, discover and experience unforgettable events. Connect organizers, venues and service providers in one place.",
    "hero.cta": "Join Elyntis",
    
    // Features
    "features.title": "Everything you need",
    "features.subtitle": "A complete platform for all your event needs",
    "features.events.title": "Events",
    "features.events.desc": "Create and discover unique events near you",
    "features.venues.title": "Venues",
    "features.venues.desc": "Find the perfect space for your event",
    "features.services.title": "Service Providers",
    "features.services.desc": "Connect with the best professionals",
    
    // Audience
    "audience.title": "Who is it for?",
    "audience.subtitle": "Elyntis adapts to all your needs",
    "audience.visitors.title": "Visitors",
    "audience.visitors.desc": "Discover exciting events near you",
    "audience.organizers.title": "Organizers",
    "audience.organizers.desc": "Create and manage your events easily",
    "audience.owners.title": "Venue Owners",
    "audience.owners.desc": "Rent your spaces for events",
    "audience.providers.title": "Service Providers",
    "audience.providers.desc": "Showcase your services and find clients",
    
    // CTA Form
    "cta.title": "Ready to get started?",
    "cta.subtitle": "Join the Elyntis community today",
    "cta.email.placeholder": "Your email address",
    "cta.status.placeholder": "I am a...",
    "cta.status.visitor": "Visitor",
    "cta.status.organizer": "Organizer",
    "cta.status.owner": "Venue Owner",
    "cta.status.provider": "Service Provider",
    "cta.button": "Sign up for free",
    
    // Footer
    "footer.tagline": "The event platform of tomorrow",
    "footer.links": "Useful links",
    "footer.legal": "Legal notice",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.rights": "All rights reserved"
  }
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
        <button
          onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-gray-100"
        >
          <span className="text-lg">{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
          <span>{language === "fr" ? "FR" : "EN"}</span>
        </button>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <html lang={language}>
      <head>
        <title>Elyntis - Plateforme événementielle tout-en-un</title>
        <meta name="description" content="Organisez, découvrez et vivez des événements inoubliables avec Elyntis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
          <LanguageToggle />
          {children}
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
