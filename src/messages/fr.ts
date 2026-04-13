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
    signature: "— {nom}, fondateur d'Elintys · Montréal, Québec",
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
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Conditions", href: "/conditions" },
    ],
    rights: "Tous droits réservés.",
  },
  legal: {
    backToHome: "← Retour à l'accueil",
    privacyPolicy: {
      metadata: {
        title: "Politique de confidentialité — Elintys",
        description: "Politique de confidentialité d'Elintys, conforme à la Loi 25 du Québec.",
      },
      title: "Politique de confidentialité",
      lastUpdated: "Dernière mise à jour : Avril 2026 · Conforme à la Loi 25 (Québec)",
      sections: {
        identity: {
          title: "1. Identité du responsable du traitement",
          body:
            "La présente politique est établie par Elintys (en cours d'incorporation au Canada), représentée par Noe Kenfack, fondateur. Adresse : Montréal, Québec, Canada. Courriel : ",
        },
        collectedData: {
          title: "2. Renseignements personnels collectés",
          headers: ["Renseignement", "Finalité"],
          rows: [
            ["Prénom", "Identifier la personne et personnaliser les communications"],
            [
              "Adresse courriel",
              "Canal de communication principal - accès bêta et mises à jour",
            ],
            [
              "Rôle / profil",
              "Catégorie (organisateur, prestataire, gestionnaire de lieu, visiteur) - adapter les communications et le produit",
            ],
          ],
          footnote:
            "Aucune autre donnée n'est collectée (pas de téléphone, pas de paiement, pas de localisation).",
        },
        purposes: {
          title: "3. Finalités du traitement",
          items: [
            "Constituer la liste d'attente et envoyer un accès prioritaire à la bêta",
            "Envoyer un courriel de confirmation immédiat après inscription",
            "Transmettre des informations sur l'avancement du projet et le lancement",
            "Analyser les profils inscrits pour orienter les décisions produit",
            "Contacter les inscrits lors du lancement officiel",
          ],
          body:
            "Les données ne sont pas vendues ni utilisées à des fins publicitaires pour des tiers.",
        },
        legalBasis: {
          title: "4. Base légale du traitement",
          body:
            "La collecte repose sur le consentement explicite exprimé au moment de l'inscription. Ce consentement est libre, éclairé, et peut être retiré à tout moment.",
        },
        processors: {
          title: "5. Sous-traitants et transferts hors Québec",
          headers: ["Sous-traitant", "Usage"],
          rows: [
            [
              "Firebase / Firestore (Google)",
              "Stockage des données d'inscription. Hébergé aux États-Unis.",
              "https://firebase.google.com/support/privacy",
              "firebase.google.com/support/privacy",
            ],
            [
              "Resend",
              "Envoi des courriels de confirmation. Hébergé aux États-Unis.",
              "https://resend.com/legal/privacy-policy",
              "resend.com/legal/privacy-policy",
            ],
            [
              "Vercel",
              "Hébergement du site. Hébergé aux États-Unis.",
              "https://vercel.com/legal/privacy-policy",
              "vercel.com/legal/privacy-policy",
            ],
          ],
          body:
            "Elintys s'assure que ces sous-traitants offrent un niveau de protection comparable à la Loi 25, notamment via leurs politiques de conformité RGPD et certifications SOC 2.",
        },
        retention: {
          title: "6. Durée de conservation",
          intro: "Les données sont conservées :",
          items: [
            "Jusqu'au lancement public, au-delà duquel elles sont transférées si la personne crée un compte",
            "Ou jusqu'à la demande de suppression par la personne",
            "En l'absence des deux, suppression au plus tard 24 mois après l'inscription",
          ],
        },
        rights: {
          title: "7. Droits des personnes concernées",
          headers: ["Droit", "Description"],
          rows: [
            ["Droit d'accès", "Obtenir copie des renseignements détenus"],
            ["Droit de rectification", "Faire corriger des informations inexactes"],
            [
              "Retrait du consentement",
              "Se désabonner à tout moment via le lien dans nos courriels ou en nous contactant",
            ],
            ["Droit à l'effacement", "Demander la suppression des données"],
            ["Droit de portabilité", "Recevoir ses données dans un format structuré"],
          ],
          beforeEmail: "Pour exercer ces droits : ",
          afterEmail: " - Réponse dans 30 jours.",
        },
        security: {
          title: "8. Mesures de sécurité",
          items: [
            "Accès à Firestore restreint via règles de sécurité et authentification Firebase",
            "Communications chiffrées HTTPS/TLS",
            "Clés API stockées en variables d'environnement, non exposées côté client",
            "Accès aux données limité au principe du moindre privilège",
            "Aucune donnée financière collectée",
          ],
        },
        cookies: {
          title: "9. Cookies et traceurs",
          body:
            "Le site utilise uniquement les cookies techniques strictement nécessaires. Aucun cookie publicitaire ni traçage tiers. Aucune régie publicitaire n'a accès aux données des visiteurs.",
        },
        changes: {
          title: "10. Modifications",
          body:
            "Elintys peut modifier cette politique à tout moment. En cas de modification substantielle, les inscrits seront informés par courriel au moins 30 jours avant l'entrée en vigueur.",
        },
        contact: {
          title: "11. Contact et plainte",
          emailLabel: "Courriel : ",
          complaintPrefix: "En cas de plainte non résolue : Commission d'accès à l'information du Québec (CAI) - ",
          complaintLinkLabel: "www.cai.gouv.qc.ca",
          complaintLinkHref: "https://www.cai.gouv.qc.ca",
        },
      },
    },
    terms: {
      metadata: {
        title: "Conditions d'utilisation — Elintys",
        description: "Conditions d'utilisation d'Elintys pour la liste d'attente pré-lancement.",
      },
      title: "Conditions d'utilisation",
      lastUpdated: "Dernière mise à jour : Avril 2026 · Conforme à la Loi 25 (Québec)",
      sections: {
        purpose: {
          title: "1. Objet",
          body:
            "Les présentes conditions régissent l'inscription à la liste d'attente d'Elintys (elintys.com). En vous inscrivant, vous les acceptez dans leur intégralité.",
        },
        serviceNature: {
          title: "2. Nature du service à ce stade",
          body:
            "Elintys est en phase de développement pré-lancement. L'inscription ne constitue pas un contrat de service, ne crée aucune obligation financière, et ne garantit pas un accès au produit final. L'accès bêta sera accordé par ordre d'inscription selon les priorités de l'équipe. Elintys se réserve le droit de modifier, reporter ou annuler le lancement sans préavis.",
        },
        commitments: {
          title: "3. Engagements de l'inscrit",
          items: [
            "Fournir des informations exactes (prénom, courriel, rôle)",
            "Ne pas usurper l'identité d'une autre personne",
            "Ne pas procéder à des inscriptions multiples pour cumuler des accès prioritaires",
          ],
        },
        elintysCommitments: {
          title: "4. Engagements d'Elintys",
          items: [
            "Traiter vos renseignements conformément à la",
            "Vous informer de l'avancement du projet par courriel",
            "Ne jamais vendre vos données à des tiers",
            "Vous permettre de vous désabonner à tout moment, sans frais",
          ],
          privacyLinkLabel: "Politique de confidentialité",
        },
        intellectualProperty: {
          title: "5. Propriété intellectuelle",
          body:
            "L'ensemble des éléments du site (nom, logo, textes, design, code) est la propriété exclusive d'Elintys. Toute reproduction non autorisée est interdite.",
        },
        liability: {
          title: "6. Limitation de responsabilité",
          body:
            "Elintys ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site, ni des interruptions de service liées à des causes extérieures.",
        },
        governingLaw: {
          title: "7. Droit applicable",
          body:
            "Ces conditions sont régies par les lois du Québec, Canada (Loi 25, Code civil du Québec). Tout litige sera soumis aux tribunaux du district judiciaire de Montréal.",
        },
        changes: {
          title: "8. Modifications",
          body:
            "Elintys peut modifier ces conditions à tout moment. Les inscrits seront notifiés par courriel en cas de changement substantiel.",
        },
      },
    },
  },
  form: {
    buttonLabel: "Rejoindre la liste d'attente",
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
    consentPrefix: "En vous inscrivant, vous acceptez notre",
    privacyLinkLabel: "Politique de confidentialité",
    consentMiddle: "et nos",
    termsLinkLabel: "Conditions d'utilisation",
    consentSuffix: ", et consentez à recevoir des communications d'Elintys.",
  },
  metadata: {
    home: {
      title: "Elintys — L'événementiel réinventé",
      description:
        "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Créez, équipez, vendez, gérez et accueillez — sans friction. Rejoignez la liste d'attente.",
      twitterDescription:
        "Elintys réunit organisateurs, prestataires et gestionnaires de lieux dans un seul écosystème. Rejoignez la liste d'attente.",
    },
  },
} as const;

export default fr;
