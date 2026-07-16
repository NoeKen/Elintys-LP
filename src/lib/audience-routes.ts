import { localizedRoutes } from "@/lib/localized-routes";

export const audienceRouteMap = {
  events: localizedRoutes.organizers,
  providers: localizedRoutes.providers,
  venues: localizedRoutes.venues,
} as const;

export const audienceSolutionLinks = {
  fr: [
    { label: "Organisateurs", href: audienceRouteMap.events.fr },
    { label: "Prestataires", href: audienceRouteMap.providers.fr },
    { label: "Lieux", href: audienceRouteMap.venues.fr },
  ],
  en: [
    { label: "Organizers", href: audienceRouteMap.events.en },
    { label: "Providers", href: audienceRouteMap.providers.en },
    { label: "Venues", href: audienceRouteMap.venues.en },
  ],
} as const;
