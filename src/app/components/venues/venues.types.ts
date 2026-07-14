export interface Venue {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  eventTypes: string[];
  capacity: string;
  location: string;
  highlights: string[];
  ctaLabel: string;
}

export interface VenuesCopy {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  reassurance: string[];
}

export interface VenuesLocaleContent {
  copy: VenuesCopy;
  venues: Venue[];
}
