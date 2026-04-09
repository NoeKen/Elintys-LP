const fr = {
  navbar: {
    links: [
      { label: "Problème", href: "#probleme" },
      { label: "Solution", href: "#solution" },
      { label: "FAQ", href: "#faq" },
      { label: "Accès bêta", href: "#cta" },
    ],
    cta: "Rejoindre le mouvement",
    languageLabel: "Langue",
  },
  hero: {
    badge: "Écosystème bêta — Montréal, Québec",
    title: "L'événementiel mérite mieux que des outils qui ne se parlent pas.",
    subtitle:
      "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème — pour que chaque événement soit vécu pleinement, pas seulement géré.",
    primaryCta: "Rejoindre le mouvement →",
    secondaryCta: "Découvrir la plateforme ↓",
    trust: [
      "Accès bêta gratuit",
      "Aucun engagement",
      "Vous construisez le produit avec nous",
    ],
  },
  marquee: {
    label: "Tous types d'événements",
    items: [
      "Mariages",
      "Conférences",
      "Galas corporatifs",
      "Festivals",
      "Ateliers",
      "Soirées privées",
      "Lancements de produits",
      "Concerts",
      "Salons professionnels",
      "Anniversaires",
      "Formations",
      "Séminaires",
    ],
  },
  problem: {
    badge: "Le problème",
    title: "Dans l'événementiel, tout le monde subit la même fragmentation.",
    intro:
      "L'industrie événementielle est vivante, créative et en pleine croissance. Pourtant, les outils qui la soutiennent sont dispersés, déconnectés, et conçus en silos.",
    transition:
      "Trois acteurs. Un même problème : ils ne sont pas connectés. Elintys change ça.",
    portraits: [
      {
        title: "L'organisateur",
        description:
          "Jongle entre une plateforme de billetterie, un tableur d'invités, des recherches Google pour ses prestataires, et une app de scan le jour J. Il gère des outils, pas son événement.",
      },
      {
        title: "Le prestataire",
        description:
          "Talentueux et disponible, mais invisible. Il dépend du bouche-à-oreille et d'annuaires génériques — sans connexion directe aux événements qui ont besoin de lui.",
      },
      {
        title: "Le gestionnaire de lieu",
        description:
          "Son espace est prêt. Mais les demandes arrivent par email, sans contexte, sans date claire, sans nombre de participants. Chaque réservation commence par une conversation floue.",
      },
    ],
  },
  solution: {
    badge: "La solution Elintys",
    title: "Un seul endroit. Chaque étape. Chaque acteur connecté.",
    intro:
      "Avec Elintys, vous n'avancez plus seul. Chaque étape de votre événement est connectée à la suivante — et chaque acteur trouve sa place dans l'écosystème.",
    steps: ["Créer", "Trouver un lieu", "Équiper", "Vendre", "Gérer", "Accueillir"],
    cards: {
      createTitle: "Créer et trouver un lieu",
      createText:
        "Donnez vie à votre événement en quelques minutes. Titre, date, lieu, description, visuel. Votre événement existe.",
      createFieldsA: ["Titre", "Date", "Visuel"],
      createFieldsB: ["Capacité", "Quartier", "Demande"],
      equipTitle: "Équiper",
      equipText:
        "Accédez à un catalogue de prestataires locaux. Choisissez, mandatez, avancez. Ils sont là parce qu'ils veulent l'être.",
      providers: [
        ["Photographe", "Disponible"],
        ["Traiteur", "Mandatable"],
        ["DJ", "Réponse rapide"],
      ],
      sellTitle: "Vendre",
      sellText:
        "Créez vos billets, encaissez en ligne. Chaque participant reçoit son QR code automatiquement.",
      tickets: [
        ["Admission générale", "78"],
        ["VIP", "42"],
        ["Invités spéciaux", "21"],
      ],
      manageTitle: "Gérer",
      manageText:
        "Confirmations, liste d'invités, revenus en temps réel. Tout est là. Rien ne manque.",
      welcomeTitle: "Accueillir",
      welcomeText:
        "Scannez les entrées depuis votre téléphone. Votre événement commence. Vous y êtes pleinement.",
    },
    tagline:
      "Ce n'est pas juste un outil de plus. C'est l'écosystème que l'événementiel attendait.",
  },
  socialProof: {
    count:
      "{count} personnes — organisateurs, prestataires et gestionnaires de lieux — ont déjà rejoint la liste.",
    quote:
      "J'ai construit Elintys parce que l'événementiel mérite mieux. Mieux que des outils déconnectés, mieux que des heures perdues à synchroniser ce qui devrait couler de source. Notre ambition est de devenir la plateforme de référence de toute une industrie — en commençant par Montréal.",
    signature: "— [Votre prénom], fondateur d'Elintys · Montréal, Québec",
    coverage:
      "Déjà rejoint par des organisateurs de mariages, conférences, galas, festivals et soirées corporatives — ainsi que par des prestataires et gestionnaires d'espaces.",
  },
  comparison: {
    badge: "Comparaison",
    title: "Elintys face aux alternatives.",
    intro: "Aucun autre outil ne couvre l'ensemble du parcours événementiel en français.",
    headers: ["Eventbrite", "Weezevent", "Annuaires", "Elintys"],
    featureLabel: "Fonctionnalité",
    partial: "Partiel",
    rows: [
      ["Billetterie", "✓", "✓", "✗", "✓"],
      ["Marketplace prestataires", "✗", "✗", "Partiel", "✓"],
      ["Gestion invités", "Partiel", "Partiel", "✗", "✓"],
      ["Découverte", "✓", "Partiel", "✗", "✓"],
      ["Scan QR natif", "✓", "✓", "✗", "✓"],
      ["Parcours intégré FR", "✗", "Partiel", "✗", "✓"],
    ],
  },
  whyNow: {
    badge: "Pourquoi maintenant",
    title: "Les premiers arrivés construisent quelque chose avec nous.",
    intro:
      "Elintys n'est pas encore lancé. C'est une opportunité rare : celle d'influencer une plateforme avant qu'elle existe complètement. Les early adopters ne sont pas juste des utilisateurs — ils sont co-constructeurs.",
    leftTitle: "En rejoignant aujourd'hui",
    rightTitle: "Avec le produit",
    left: [
      "Accès prioritaire à la bêta avant le lancement public",
      "Tarif fondateur réservé aux premiers inscrits",
      "Votre feedback influence directement les fonctionnalités",
      "Accès direct à l'équipe — pas un ticket de support",
    ],
    right: [
      "Un seul endroit pour tout votre événement",
      "Vos prestataires et votre lieu connectés à votre tableau de bord",
      "Billetterie, invités, scan d'entrée — sans changer d'onglet",
      "Plus de temps à organiser. Moins à synchroniser.",
    ],
  },
  faq: {
    badge: "Questions fréquentes",
    title: "Tout ce que vous voulez savoir.",
    items: [
      [
        "Est-ce gratuit pour rejoindre la liste d'attente ?",
        "Oui, totalement gratuit. L'inscription à la liste d'attente ne vous engage à rien. Vous serez parmi les premiers informés au lancement.",
      ],
      [
        "Quand la plateforme sera-t-elle disponible ?",
        "Nous visons un lancement bêta privé d'ici la fin de l'année. Les membres de la liste d'attente auront un accès prioritaire dès l'ouverture.",
      ],
      [
        "Puis-je choisir les modules que j'utilise ?",
        "Oui. Elintys est conçu de façon modulaire : vous pouvez activer uniquement la billetterie, la gestion invités, la marketplace ou le scan — selon vos besoins.",
      ],
      [
        "La plateforme est-elle disponible en anglais ?",
        "Oui. Elintys est une plateforme bilingue (français / anglais) pensée pour le marché québécois et canadien.",
      ],
      [
        "Je suis prestataire — comment ça fonctionne pour moi ?",
        "Créez votre profil prestataire sur Elintys et devenez visible au moment exact où un organisateur cherche à équiper son événement. Photographes, traiteurs, DJ, décorateurs, animateurs — tous les profils sont les bienvenus. L'inscription est gratuite pendant la bêta.",
      ],
      [
        "Je gère un espace événementiel — puis-je le lister sur Elintys ?",
        "Oui. Elintys permet aux propriétaires et gestionnaires d'espaces de lister leur lieu directement sur la plateforme. Vous recevez des demandes qualifiées liées à des événements structurés — avec date, nombre d'invités et contexte. La visibilité est gratuite pendant la bêta.",
      ],
      [
        "Y aura-t-il des frais sur la billetterie et les paiements ?",
        "Nous prévoyons une structure tarifaire transparente avec des frais faibles sur les transactions. Les détails seront communiqués aux membres de la liste d'attente en avant-première.",
      ],
    ],
  },
  ctaFinal: {
    badge: "Accès bêta limité",
    title: "L'événementiel se réinvente. Faites-en partie.",
    subtitle:
      "Les accès bêta sont limités. Inscrivez-vous maintenant — organisateurs, prestataires et gestionnaires de lieux bienvenus.",
    button: "Rejoindre le mouvement →",
    reassurance: "Gratuit · Aucun engagement · Désabonnement en un clic",
  },
  footer: {
    links: [
      { label: "Problème", href: "#probleme" },
      { label: "Solution", href: "#solution" },
      { label: "FAQ", href: "#faq" },
      { label: "Accès bêta", href: "#cta" },
    ],
    rights: "Tous droits réservés.",
  },
  form: {
    firstNamePlaceholder: "Votre prénom",
    rolePlaceholder: "Je suis...",
    emailPlaceholder: "votre@email.com",
    roleOptions: {
      organisateur: "Organisateur d'événements",
      prestataire: "Prestataire de services",
      gestionnaire: "Gestionnaire de lieu / espace",
      visiteur: "Visiteur / participant",
    },
    errors: {
      firstName: "Veuillez entrer votre prénom.",
      role: "Veuillez sélectionner votre rôle.",
      emailRequired: "Veuillez entrer votre adresse email.",
      emailInvalid: "Veuillez entrer une adresse email valide.",
      rateLimit: "Trop de tentatives. Réessayez dans quelques minutes.",
      generic: "Une erreur est survenue. Veuillez réessayer.",
    },
    success: "Bienvenue {firstName} ! Vous êtes sur la liste.",
    exists: "Vous êtes déjà sur la liste ! On vous contacte bientôt.",
  },
} as const;

export default fr;
