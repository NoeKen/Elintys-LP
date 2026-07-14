import type { VenuesLocaleContent } from "./venues.types";

export const venuesContent: Record<"fr" | "en", VenuesLocaleContent> = {
  fr: {
    copy: {
      eyebrow: "Pour les gestionnaires de lieux",
      title: "Transformez votre espace en destination événementielle.",
      description:
        "Présentez votre lieu, ses capacités, ses services et son atmosphère. Permettez aux organisateurs de mieux comprendre votre espace avant même le premier échange.",
      primaryCta: "Rejoindre la bêta",
      secondaryCta: "Découvrir l'expérience lieu",
      reassurance: ["Fiche immersive", "Demandes contextualisées", "Données de démonstration"],
    },
    venues: [
      {
        id: "loft-industriel",
        name: "Loft industriel",
        imageSrc:
          "https://images.unsplash.com/photo-1776090188612-a2dab458ce14?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Loft industriel aux briques apparentes préparé pour un événement",
        eventTypes: ["Lancement", "Corporatif"],
        capacity: "80 à 220 personnes",
        location: "Montréal, Qc",
        highlights: ["Plafonds 6m", "Quai de chargement", "Cuisine traiteur"],
        ctaLabel: "Vérifier la disponibilité",
      },
      {
        id: "jardin-botanique",
        name: "Jardin d'hiver",
        imageSrc:
          "https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Jardin d'hiver vitré avec verdure abondante",
        eventTypes: ["Mariage", "Privé"],
        capacity: "40 à 150 personnes",
        location: "Laval, Qc",
        highlights: ["Verrière chauffée", "Jardin attenant", "Éclairage naturel"],
        ctaLabel: "Demander une estimation",
      },
      {
        id: "salle-de-bal",
        name: "Salle de bal patrimoniale",
        imageSrc:
          "https://images.unsplash.com/photo-1776671069226-24e6d422a61b?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Salle de bal patrimoniale avec lustres et parquet",
        eventTypes: ["Conférence", "Culturel"],
        capacity: "150 à 400 personnes",
        location: "Québec, Qc",
        highlights: ["Scène intégrée", "Vestiaire", "Accès accessible"],
        ctaLabel: "Prendre contact",
      },
      {
        id: "toit-terrasse",
        name: "Toit-terrasse panoramique",
        imageSrc:
          "https://images.unsplash.com/photo-1759393363620-a2b1f461a1e2?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Toit-terrasse au coucher du soleil avec vue sur la ville",
        eventTypes: ["Expérience immersive", "Corporatif"],
        capacity: "30 à 120 personnes",
        location: "Montréal, Qc",
        highlights: ["Vue panoramique", "Bar extérieur", "Chauffage d'appoint"],
        ctaLabel: "Vérifier la disponibilité",
      },
    ],
  },
  en: {
    copy: {
      eyebrow: "For venue managers",
      title: "Turn your space into an event destination.",
      description:
        "Present your venue, capacities, services, and atmosphere. Help organizers understand your space before the first conversation.",
      primaryCta: "Join the beta",
      secondaryCta: "Explore the venue experience",
      reassurance: ["Immersive listing", "Contextual requests", "Demo data"],
    },
    venues: [
      {
        id: "industrial-loft",
        name: "Industrial loft",
        imageSrc:
          "https://images.unsplash.com/photo-1776090188612-a2dab458ce14?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Exposed-brick industrial loft set up for an event",
        eventTypes: ["Launch", "Corporate"],
        capacity: "80 to 220 guests",
        location: "Montreal, QC",
        highlights: ["6m ceilings", "Loading dock", "Catering kitchen"],
        ctaLabel: "Check availability",
      },
      {
        id: "winter-garden",
        name: "Glass winter garden",
        imageSrc:
          "https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Glass winter garden filled with greenery",
        eventTypes: ["Wedding", "Private"],
        capacity: "40 to 150 guests",
        location: "Laval, QC",
        highlights: ["Heated glasshouse", "Adjoining garden", "Natural light"],
        ctaLabel: "Request an estimate",
      },
      {
        id: "heritage-ballroom",
        name: "Heritage ballroom",
        imageSrc:
          "https://images.unsplash.com/photo-1776671069226-24e6d422a61b?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Heritage ballroom with chandeliers and hardwood floor",
        eventTypes: ["Conference", "Cultural"],
        capacity: "150 to 400 guests",
        location: "Quebec City, QC",
        highlights: ["Built-in stage", "Coat check", "Accessible entrance"],
        ctaLabel: "Get in touch",
      },
      {
        id: "panoramic-rooftop",
        name: "Panoramic rooftop",
        imageSrc:
          "https://images.unsplash.com/photo-1759393363620-a2b1f461a1e2?w=1600&q=75&auto=format&fit=crop",
        imageAlt: "Sunset rooftop with a city skyline view",
        eventTypes: ["Immersive experience", "Corporate"],
        capacity: "30 to 120 guests",
        location: "Montreal, QC",
        highlights: ["Panoramic view", "Outdoor bar", "Patio heaters"],
        ctaLabel: "Check availability",
      },
    ],
  },
};
