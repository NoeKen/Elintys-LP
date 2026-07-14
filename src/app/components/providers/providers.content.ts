import type { ProvidersLocaleContent } from "./providers.types";

const PHOTOGRAPHER_IMG =
  "https://images.unsplash.com/photo-1775879984670-f69d23951851?w=1200&q=75&auto=format&fit=crop";
const CATERING_IMG =
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=75&auto=format&fit=crop";
const DECOR_AFTER_IMG =
  "https://images.unsplash.com/photo-1751257547111-9641cb540f4d?w=1200&q=75&auto=format&fit=crop";
const DECOR_BEFORE_IMG =
  "https://images.unsplash.com/photo-1592226710379-ad1b6a32c7e8?w=1200&q=75&auto=format&fit=crop";
const DJ_IMG =
  "https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?w=1200&q=75&auto=format&fit=crop";

export const providersContent: Record<"fr" | "en", ProvidersLocaleContent> = {
  fr: {
    copy: {
      eyebrow: "Pour les prestataires événementiels",
      title: "Votre prochain client vous cherche peut-être déjà.",
      description:
        "Elintys vous aide à présenter vos services, renforcer votre crédibilité et être découvert par des organisateurs qui préparent activement leurs événements.",
      primaryCta: "Rejoindre la bêta",
      secondaryCta: "Découvrir l'expérience prestataire",
      reassurance: ["Profil professionnel", "Demandes contextualisées", "Marketing optionnel"],
      categoriesTitle: "Tous les métiers qui donnent vie aux événements.",
      categoriesSubtitle: "Une grille de métiers illustrative pour montrer la largeur de l'écosystème.",
      categories: [
        "Photographes",
        "Vidéastes",
        "DJs",
        "Traiteurs",
        "Décorateurs",
        "Animateurs",
        "Techniciens audiovisuels",
        "Agents de sécurité",
        "Fleuristes",
        "Location de matériel",
        "Transport",
        "Coordination événementielle",
        "Artistes",
        "Maîtres de cérémonie",
        "Designers",
        "Services d'impression",
      ],
      benefitsTitle: "Plus de visibilité. Des demandes mieux contextualisées.",
      benefits: [
        { title: "Présence professionnelle", description: "Regrouper vos informations dans une fiche dédiée à l'événementiel." },
        { title: "Meilleure découvrabilité", description: "Augmenter vos chances d'être trouvé dans le bon contexte." },
        { title: "Portfolio centralisé", description: "Présenter vos réalisations sans disperser les liens." },
        { title: "Demandes pertinentes", description: "Recevoir plus de contexte avant de répondre." },
        { title: "Échanges simplifiés", description: "Réduire les répétitions entre premiers contacts." },
        { title: "Réputation durable", description: "Construire une présence spécialisée au fil des collaborations." },
      ],
      earlyAccessTitle: "Soyez parmi les premiers prestataires référencés.",
      earlyAccessDescription:
        "Les prestataires de la bêta contribueront à améliorer les profils, les demandes, la mise en relation et les outils qui leur seront dédiés.",
      earlyAccessItems: ["Accès prioritaire", "Accompagnement initial", "Feedback direct avec l'équipe"],
      finalCtaTitle: "Votre expertise mérite d'être découverte dans le bon contexte.",
      finalCtaDescription:
        "Rejoignez la bêta prestataire et aidez-nous à construire une expérience utile aux professionnels de l'événementiel.",
      finalCtaButton: "Rejoindre la bêta prestataire",
    },
    providers: [
      {
        id: "photographe-studio-lumiere",
        name: "Studio Lumière",
        category: "Photographes",
        imageSrc: PHOTOGRAPHER_IMG,
        imageAlt: "Photographe capturant un moment lors d'un événement décoré de fleurs blanches",
        tagline: "Reportage événementiel discret, lumière naturelle privilégiée.",
        review: {
          authorName: "Camille R.",
          authorRole: "Organisatrice de mariage",
          quote: "Des photos qui racontent vraiment la soirée, pas juste des poses figées.",
        },
      },
      {
        id: "traiteur-table-ronde",
        name: "Table Ronde Traiteur",
        category: "Traiteurs",
        imageSrc: CATERING_IMG,
        imageAlt: "Assiette de saumon soigneusement dressée avec verres à vin en arrière-plan",
        tagline: "Cuisine de saison, présentation soignée pour événements corporatifs et privés.",
        review: {
          authorName: "Marc-Antoine D.",
          authorRole: "Responsable événementiel",
          quote: "Nos invités parlent encore du dressage des assiettes trois mois plus tard.",
        },
      },
      {
        id: "decor-atelier-fleurs",
        name: "Atelier Fleurs & Lumière",
        category: "Décorateurs",
        imageSrc: DECOR_AFTER_IMG,
        imageAlt: "Table de mariage transformée par un drapé blanc et des fleurs colorées abondantes",
        tagline: "Scénographie florale sur mesure, de la salle vide à l'ambiance complète.",
        review: {
          authorName: "Sophie L.",
          authorRole: "Future mariée",
          quote: "Ils ont transformé une salle banale en décor de rêve, exactement comme sur les photos.",
        },
        beforeAfter: {
          beforeSrc: DECOR_BEFORE_IMG,
          beforeAlt: "Salle de réception avant l'intervention du décorateur, sobre et sans fleurs",
          afterSrc: DECOR_AFTER_IMG,
          afterAlt: "La même intention de salle après scénographie florale complète",
        },
      },
      {
        id: "dj-collectif-son",
        name: "Collectif Son",
        category: "DJs",
        imageSrc: DJ_IMG,
        imageAlt: "DJ derrière sa console lumineuse dans une salle animée",
        tagline: "Ambiances sur mesure du cocktail à la piste de danse, tous répertoires.",
        review: {
          authorName: "Julien P.",
          authorRole: "Organisateur corporatif",
          quote: "A su lire la salle et ajuster l'ambiance toute la soirée sans qu'on ait à demander.",
        },
      },
    ],
    incomingRequests: [
      {
        organizerName: "Naomie T.",
        eventType: "Mariage — 120 invités",
        message: "Recherche un traiteur pour un cocktail dînatoire en septembre, allergies aux noix à prévoir.",
      },
      {
        organizerName: "Groupe Alto",
        eventType: "Lancement de produit — 80 personnes",
        message: "Besoin d'un DJ et d'une ambiance lumineuse pour une soirée corporative en centre-ville.",
      },
      {
        organizerName: "Fondation Horizon",
        eventType: "Gala — 200 invités",
        message: "Décor floral pour une salle de réception, thème élégant et sobre, budget à discuter.",
      },
    ],
  },
  en: {
    copy: {
      eyebrow: "For event service providers",
      title: "Your next client may already be looking for you.",
      description:
        "Elintys helps you present your services, strengthen your credibility, and be discovered by organizers actively preparing events.",
      primaryCta: "Join the beta",
      secondaryCta: "Explore the provider experience",
      reassurance: ["Professional profile", "Contextual requests", "Optional marketing consent"],
      categoriesTitle: "All the trades that bring events to life.",
      categoriesSubtitle: "An illustrative trade grid showing the breadth of the ecosystem.",
      categories: [
        "Photographers",
        "Videographers",
        "DJs",
        "Caterers",
        "Decorators",
        "Hosts",
        "AV technicians",
        "Security teams",
        "Florists",
        "Equipment rental",
        "Transport",
        "Event coordination",
        "Artists",
        "Masters of ceremony",
        "Designers",
        "Print services",
      ],
      benefitsTitle: "More visibility. Better contextualized requests.",
      benefits: [
        { title: "Professional presence", description: "Bring your event information into a dedicated profile." },
        { title: "Better discovery", description: "Increase your chances of being found in the right context." },
        { title: "Central portfolio", description: "Show your work without scattering links." },
        { title: "Relevant requests", description: "Receive more context before responding." },
        { title: "Simpler exchanges", description: "Reduce repetition during first contact." },
        { title: "Durable reputation", description: "Build a specialized presence over time." },
      ],
      earlyAccessTitle: "Be among the first providers referenced.",
      earlyAccessDescription:
        "Beta providers will help improve profiles, requests, matchmaking, and tools dedicated to their work.",
      earlyAccessItems: ["Priority access", "Initial onboarding support", "Direct feedback with the team"],
      finalCtaTitle: "Your expertise deserves to be discovered in the right context.",
      finalCtaDescription: "Join the provider beta and help us build an experience useful to event professionals.",
      finalCtaButton: "Join the provider beta",
    },
    providers: [
      {
        id: "photographer-studio-lumiere",
        name: "Studio Lumiere",
        category: "Photographers",
        imageSrc: PHOTOGRAPHER_IMG,
        imageAlt: "Photographer capturing a moment at an event decorated with white flowers",
        tagline: "Discreet event coverage, natural light favored over flash.",
        review: {
          authorName: "Camille R.",
          authorRole: "Wedding organizer",
          quote: "Photos that actually tell the story of the night, not just posed shots.",
        },
      },
      {
        id: "caterer-round-table",
        name: "Round Table Catering",
        category: "Caterers",
        imageSrc: CATERING_IMG,
        imageAlt: "Carefully plated salmon dish with wine glasses in the background",
        tagline: "Seasonal cuisine, refined presentation for corporate and private events.",
        review: {
          authorName: "Marc-Antoine D.",
          authorRole: "Event manager",
          quote: "Guests were still talking about the plating three months later.",
        },
      },
      {
        id: "decor-flower-light-studio",
        name: "Flower & Light Studio",
        category: "Decorators",
        imageSrc: DECOR_AFTER_IMG,
        imageAlt: "Wedding table transformed by a white drape and abundant colorful flowers",
        tagline: "Custom floral scenography, from empty room to full atmosphere.",
        review: {
          authorName: "Sophie L.",
          authorRole: "Bride-to-be",
          quote: "They turned a plain room into a dream setting, exactly like the photos.",
        },
        beforeAfter: {
          beforeSrc: DECOR_BEFORE_IMG,
          beforeAlt: "Reception room before the decorator's work, plain and without flowers",
          afterSrc: DECOR_AFTER_IMG,
          afterAlt: "The same room intent after full floral scenography",
        },
      },
      {
        id: "dj-collective-sound",
        name: "Collective Sound",
        category: "DJs",
        imageSrc: DJ_IMG,
        imageAlt: "DJ behind a lit mixing console in a lively room",
        tagline: "Custom atmospheres from cocktail hour to the dance floor, all genres.",
        review: {
          authorName: "Julien P.",
          authorRole: "Corporate organizer",
          quote: "Read the room and adjusted the vibe all night without ever being asked.",
        },
      },
    ],
    incomingRequests: [
      {
        organizerName: "Naomie T.",
        eventType: "Wedding — 120 guests",
        message: "Looking for a caterer for a September cocktail reception, nut allergies to plan around.",
      },
      {
        organizerName: "Alto Group",
        eventType: "Product launch — 80 people",
        message: "Need a DJ and lighting atmosphere for a downtown corporate evening.",
      },
      {
        organizerName: "Horizon Foundation",
        eventType: "Gala — 200 guests",
        message: "Floral decor for a reception hall, elegant and understated theme, budget to discuss.",
      },
    ],
  },
};
