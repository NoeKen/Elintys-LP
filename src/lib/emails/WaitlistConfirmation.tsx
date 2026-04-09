import type { WaitlistRole } from "@/lib/waitlist";
type WaitlistLocale = "fr" | "en";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const ROLE_COPY: Record<
  WaitlistLocale,
  Record<
    WaitlistRole,
    {
      intro: string;
      highlights: Array<{ title: string; description: string }>;
    }
  >
> = {
  fr: {
    organisateur: {
      intro:
        "Vous êtes maintenant sur la liste d'attente Elintys en tant qu'organisateur d'événements. Vous serez parmi les premiers à accéder à la plateforme qui centralise chaque étape de vos événements.",
      highlights: [
        {
          title: "Créer sans friction",
          description:
            "Donnez vie à vos événements en quelques minutes avec un parcours conçu pour aller vite, sans bricolage entre plusieurs outils.",
        },
        {
          title: "Connecter vos partenaires",
          description:
            "Retrouvez vos lieux, vos prestataires, vos billets et vos invités dans le même tableau de bord.",
        },
        {
          title: "Organiser pleinement",
          description:
            "Passez moins de temps à synchroniser et plus de temps à concevoir une vraie expérience pour vos participants.",
        },
      ],
    },
    prestataire: {
      intro:
        "Vous êtes maintenant sur la liste d'attente Elintys en tant que prestataire de services. Vous serez parmi les premiers à rejoindre l'écosystème qui connecte les prestataires directement aux événements.",
      highlights: [
        {
          title: "Gagner en visibilité",
          description:
            "Soyez visible précisément quand un organisateur cherche à équiper son événement, sans dépendre seulement du bouche-à-oreille.",
        },
        {
          title: "Recevoir des demandes utiles",
          description:
            "Accédez à des opportunités liées à de vrais événements, avec le bon contexte pour répondre rapidement.",
        },
        {
          title: "Faire partie de l'écosystème",
          description:
            "Rejoignez une plateforme pensée pour mieux connecter les talents aux besoins réels du terrain.",
        },
      ],
    },
    gestionnaire: {
      intro:
        "Vous êtes maintenant sur la liste d'attente Elintys en tant que gestionnaire d'espace. Vous serez parmi les premiers à recevoir des demandes qualifiées directement liées à des événements structurés.",
      highlights: [
        {
          title: "Recevoir des demandes cadrées",
          description:
            "Date, capacité, contexte et besoins clés arrivent dans une demande structurée, pas dans une conversation floue.",
        },
        {
          title: "Mettre votre lieu en avant",
          description:
            "Présentez votre espace à des organisateurs qui cherchent activement un lieu adapté à leur événement.",
        },
        {
          title: "Fluidifier vos réservations",
          description:
            "Gagnez du temps dès le premier échange grâce à des informations plus complètes et plus utiles.",
        },
      ],
    },
    visiteur: {
      intro:
        "Vous êtes maintenant sur la liste d'attente Elintys. Vous serez parmi les premiers à découvrir les événements locaux sur la plateforme.",
      highlights: [
        {
          title: "Découvrir plus facilement",
          description:
            "Accédez à une nouvelle manière d'explorer les événements locaux depuis une plateforme pensée pour l'expérience.",
        },
        {
          title: "Suivre les lancements",
          description:
            "Recevez les premières nouvelles sur l'ouverture de la plateforme et ses événements disponibles.",
        },
        {
          title: "Participer tôt",
          description:
            "Faites partie des premiers inscrits à découvrir Elintys pendant sa phase de lancement.",
        },
      ],
    },
  },
  en: {
    organisateur: {
      intro:
        "You are now on the Elintys waitlist as an event organizer. You will be among the first to access the platform that centralizes every step of your events.",
      highlights: [
        {
          title: "Create without friction",
          description:
            "Bring your events to life in minutes with a journey designed to move fast, without patching together multiple tools.",
        },
        {
          title: "Connect your partners",
          description:
            "Keep your venues, vendors, tickets, and guests in the same dashboard.",
        },
        {
          title: "Stay fully present",
          description:
            "Spend less time syncing systems and more time designing a real experience for your attendees.",
        },
      ],
    },
    prestataire: {
      intro:
        "You are now on the Elintys waitlist as a service provider. You will be among the first to join the ecosystem that connects providers directly to events.",
      highlights: [
        {
          title: "Gain visibility",
          description:
            "Be seen exactly when an organizer is looking to equip an event, without relying only on word of mouth.",
        },
        {
          title: "Receive useful requests",
          description:
            "Access opportunities tied to real events, with the context you need to respond quickly.",
        },
        {
          title: "Join the ecosystem",
          description:
            "Become part of a platform designed to connect talent with real on-the-ground demand.",
        },
      ],
    },
    gestionnaire: {
      intro:
        "You are now on the Elintys waitlist as a venue manager. You will be among the first to receive qualified requests directly tied to structured events.",
      highlights: [
        {
          title: "Receive structured requests",
          description:
            "Date, capacity, context, and key needs arrive in a structured request, not in a vague conversation.",
        },
        {
          title: "Showcase your venue",
          description:
            "Present your space to organizers who are actively looking for the right venue.",
        },
        {
          title: "Speed up bookings",
          description:
            "Save time from the very first exchange thanks to clearer and more useful information.",
        },
      ],
    },
    visiteur: {
      intro:
        "You are now on the Elintys waitlist. You will be among the first to discover local events on the platform.",
      highlights: [
        {
          title: "Discover more easily",
          description:
            "Access a new way to explore local events through a platform designed around the experience.",
        },
        {
          title: "Follow the launch",
          description:
            "Get first updates on the platform opening and the events available there.",
        },
        {
          title: "Join early",
          description:
            "Be among the first people to discover Elintys during launch.",
        },
      ],
    },
  },
};

interface WaitlistConfirmationProps {
  firstName: string;
  role: WaitlistRole;
  email: string;
  locale: WaitlistLocale;
}

export default function waitlistConfirmationEmail({
  firstName,
  role,
  email,
  locale,
}: WaitlistConfirmationProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elintys.com";
  const safeFirstName = escapeHtml(firstName);
  const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;
  const copy = ROLE_COPY[locale][role];
  const emailCopy =
    locale === "fr"
      ? {
          title: "Vous êtes sur la liste !",
          greeting: `Bonjour ${safeFirstName},`,
          followUp:
            "On vous contactera dès que les portes s'ouvrent. D'ici là, gardez un oeil sur votre boîte mail !",
          highlightsTitle: "Ce qui vous attend",
          button: "En savoir plus →",
          footer:
            "Vous recevez cet email car vous vous êtes inscrit sur",
          unsubscribe: "Se désabonner",
        }
      : {
          title: "You're on the list!",
          greeting: `Hello ${safeFirstName},`,
          followUp:
            "We'll reach out as soon as the doors open. Until then, keep an eye on your inbox!",
          highlightsTitle: "What to expect",
          button: "Learn more →",
          footer: "You are receiving this email because you signed up on",
          unsubscribe: "Unsubscribe",
        };

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="padding:0 0 32px 0;">
                <p style="margin:0;font-size:24px;font-weight:700;color:#0D9488;letter-spacing:-0.5px;">Elintys</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 24px 0;">
                <h1 style="margin:0;font-size:32px;font-weight:700;color:#1C2B3A;line-height:1.2;">
                  ${emailCopy.title}
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 32px 0;">
                <p style="margin:0;font-size:16px;color:#1C2B3A;line-height:1.6;">${emailCopy.greeting}</p>
                <p style="margin:16px 0 0 0;font-size:16px;color:#1C2B3A;line-height:1.6;">
                  ${copy.intro}
                </p>
                <p style="margin:16px 0 0 0;font-size:16px;color:#1C2B3A;line-height:1.6;">
                  ${emailCopy.followUp}
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F9FAFB;border-radius:12px;">
                  <tr>
                    <td style="padding:28px 32px;">
                      <h2 style="margin:0 0 20px 0;font-size:18px;font-weight:600;color:#1C2B3A;">${emailCopy.highlightsTitle}</h2>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${copy.highlights
                          .map(
                            (item, index) => `
                              <tr>
                                <td style="padding:0 0 ${index === copy.highlights.length - 1 ? "0" : "16px"} 0;">
                                  <table role="presentation" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="vertical-align:top;padding-right:12px;padding-top:2px;">
                                        <div style="width:8px;height:8px;border-radius:50%;background-color:#0D9488;margin-top:6px;"></div>
                                      </td>
                                      <td>
                                        <p style="margin:0;font-size:15px;color:#1C2B3A;line-height:1.6;">
                                          <strong>${escapeHtml(item.title)}</strong> - ${escapeHtml(item.description)}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            `
                          )
                          .join("")}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 40px 0;">
                <a
                  href="${siteUrl}"
                  style="display:inline-block;padding:14px 28px;background-color:#0D9488;color:#ffffff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;"
                >
                  ${emailCopy.button}
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 24px 0;border-top:1px solid #E5E7EB;"></td>
            </tr>

            <tr>
              <td>
                <p style="margin:0;font-size:13px;color:#6B7280;line-height:1.6;">
                  © 2026 Elintys · hello@elintys.com · Montréal, Québec
                </p>
                <p style="margin:8px 0 0 0;font-size:12px;color:#9CA3AF;">
                  ${emailCopy.footer}
                  <a href="${siteUrl}" style="color:#9CA3AF;"> elintys.com</a>.
                  <a href="${unsubscribeUrl}" style="color:#9CA3AF;"> ${emailCopy.unsubscribe}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
