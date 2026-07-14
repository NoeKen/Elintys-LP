export interface Review {
  authorName: string;
  authorRole: string;
  quote: string;
}

export interface ProviderProfile {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  tagline: string;
  review: Review;
  beforeAfter?: {
    beforeSrc: string;
    beforeAlt: string;
    afterSrc: string;
    afterAlt: string;
  };
}

export interface IncomingRequest {
  organizerName: string;
  eventType: string;
  message: string;
}

export interface ProvidersCopy {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  reassurance: string[];
  categoriesTitle: string;
  categoriesSubtitle: string;
  categories: string[];
  benefitsTitle: string;
  benefits: Array<{ title: string; description: string }>;
  earlyAccessTitle: string;
  earlyAccessDescription: string;
  earlyAccessItems: string[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaButton: string;
}

export interface ProvidersLocaleContent {
  copy: ProvidersCopy;
  providers: ProviderProfile[];
  incomingRequests: IncomingRequest[];
}
