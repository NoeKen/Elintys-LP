export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface ProofBenefit {
  title: string;
  description: string;
}

export interface OrganizersCopy {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  reassurance: string[];
  mockupTitle: string;
  mockupLabel: string;
  mockupItems: Array<{ label: string; value: string }>;
  workflowTitle: string;
  workflowSubtitle: string;
  steps: WorkflowStep[];
  benefitsTitle: string;
  benefits: ProofBenefit[];
  earlyAccessTitle: string;
  earlyAccessDescription: string;
  earlyAccessItems: string[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaButton: string;
}

export interface OrganizersLocaleContent {
  copy: OrganizersCopy;
}
