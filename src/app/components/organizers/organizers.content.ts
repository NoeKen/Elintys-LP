import type { OrganizersLocaleContent } from "./organizers.types";

export const organizersContent: Record<"fr" | "en", OrganizersLocaleContent> = {
  fr: {
    copy: {
      eyebrow: "Pour les organisateurs",
      title: "Créez votre événement. Elintys connecte tout le reste.",
      description:
        "De la première idée à l'accueil des participants, Elintys réunit vos lieux, vos prestataires, votre billetterie, vos invités et vos outils de suivi dans un seul espace.",
      primaryCta: "Rejoindre la bêta",
      secondaryCta: "Découvrir le parcours organisateur",
      reassurance: ["Accès bêta gratuit", "Aucun engagement", "Votre feedback façonne le produit"],
      mockupTitle: "Tableau de bord organisateur",
      mockupLabel: "Aperçu du produit",
      mockupItems: [
        { label: "Invités", value: "Liste centralisée" },
        { label: "Billets", value: "Catégories prêtes" },
        { label: "Lieu", value: "Demande suivie" },
        { label: "Scan", value: "Préparation mobile" },
      ],
      workflowTitle: "Votre événement avance à votre rythme.",
      workflowSubtitle:
        "Chaque étape peut commencer simplement, puis s'enrichir au moment où votre projet devient plus concret.",
      steps: [
        { id: "create", title: "Créer", description: "Donnez vie à votre événement avec son titre, sa date, son visuel et ses informations essentielles." },
        { id: "define-needs", title: "Définir les besoins", description: "Clarifiez les services, capacités et contraintes nécessaires avant de chercher." },
        { id: "find-venue", title: "Trouver un lieu", description: "Comparez les espaces selon leur capacité, leur emplacement, leurs services et leur disponibilité." },
        { id: "find-providers", title: "Trouver des prestataires", description: "Identifiez les professionnels qui correspondent au format de votre événement." },
        { id: "publish", title: "Publier", description: "Préparez une page claire pour partager les informations utiles au bon moment." },
        { id: "sell-or-invite", title: "Vendre ou inviter", description: "Configurez vos billets, vos invitations et vos règles d'accès." },
        { id: "welcome", title: "Accueillir", description: "Préparez le scan et l'accueil depuis une interface mobile." },
        { id: "track", title: "Suivre", description: "Gardez l'avancement, les ventes et les confirmations dans un même espace." },
      ],
      benefitsTitle: "Plus de temps pour l'événement. Moins de temps à coordonner les outils.",
      benefits: [
        { title: "Tout centraliser", description: "Regrouper l'essentiel de votre événement dans un même fil de travail." },
        { title: "Réduire les erreurs", description: "Limiter les doubles saisies, oublis et versions contradictoires." },
        { title: "Mieux collaborer", description: "Connecter les partenaires autour d'informations plus claires." },
        { title: "Suivre l'avancement", description: "Comprendre rapidement ce qui est prêt et ce qui reste à faire." },
        { title: "Simplifier l'accueil", description: "Préparer les invités, billets et accès avant le jour J." },
        { title: "Améliorer l'expérience", description: "Donner aux participants un parcours plus fluide." },
      ],
      earlyAccessTitle: "Pourquoi rejoindre la bêta comme organisateur ?",
      earlyAccessDescription:
        "Les premiers organisateurs aideront à calibrer les workflows, les modules de billetterie, l'accueil et les priorités produit.",
      earlyAccessItems: ["Accès prioritaire", "Produit influencé par vos retours", "Échanges directs avec l'équipe"],
      finalCtaTitle: "Votre prochain événement mérite un meilleur point de départ.",
      finalCtaDescription:
        "Rejoignez les premiers organisateurs qui participeront à la bêta d'Elintys et contribueront à façonner la plateforme.",
      finalCtaButton: "Obtenir un accès prioritaire",
    },
  },
  en: {
    copy: {
      eyebrow: "For organizers",
      title: "Create your event. Elintys connects everything else.",
      description:
        "From the first idea to welcoming attendees, Elintys brings venues, providers, ticketing, guests, and tracking tools into one workspace.",
      primaryCta: "Join the beta",
      secondaryCta: "Explore the organizer journey",
      reassurance: ["Free beta access", "No commitment", "Your feedback shapes the product"],
      mockupTitle: "Organizer dashboard",
      mockupLabel: "Product preview",
      mockupItems: [
        { label: "Guests", value: "Centralized list" },
        { label: "Tickets", value: "Categories ready" },
        { label: "Venue", value: "Request tracked" },
        { label: "Check-in", value: "Mobile preparation" },
      ],
      workflowTitle: "Your event moves at your pace.",
      workflowSubtitle: "Each step can start simply, then grow as your event becomes more concrete.",
      steps: [
        { id: "create", title: "Create", description: "Add the title, date, visual, and essential event details." },
        { id: "define-needs", title: "Define needs", description: "Clarify services, capacity, and constraints before searching." },
        { id: "find-venue", title: "Find a venue", description: "Compare spaces by capacity, location, services, and availability." },
        { id: "find-providers", title: "Find providers", description: "Identify professionals that match your event format." },
        { id: "publish", title: "Publish", description: "Prepare a clear page to share useful information at the right time." },
        { id: "sell-or-invite", title: "Sell or invite", description: "Configure tickets, invitations, and access rules." },
        { id: "welcome", title: "Welcome", description: "Prepare scanning and guest check-in from a mobile interface." },
        { id: "track", title: "Track", description: "Keep progress, sales, and confirmations in the same workspace." },
      ],
      benefitsTitle: "More time for the event. Less time coordinating tools.",
      benefits: [
        { title: "Centralize everything", description: "Bring the essentials of your event into one workflow." },
        { title: "Reduce errors", description: "Limit duplicate entry, omissions, and conflicting versions." },
        { title: "Collaborate better", description: "Connect partners around clearer information." },
        { title: "Track progress", description: "See what is ready and what still needs attention." },
        { title: "Simplify check-in", description: "Prepare guests, tickets, and access before event day." },
        { title: "Improve the experience", description: "Give attendees a smoother journey." },
      ],
      earlyAccessTitle: "Why join the beta as an organizer?",
      earlyAccessDescription:
        "Early organizers will help shape workflows, ticketing modules, check-in, and product priorities.",
      earlyAccessItems: ["Priority access", "Product shaped by your feedback", "Direct conversations with the team"],
      finalCtaTitle: "Your next event deserves a better starting point.",
      finalCtaDescription:
        "Join the first organizers who will participate in the Elintys beta and help shape the platform.",
      finalCtaButton: "Get early access",
    },
  },
};
