export interface LeadData {
  name: string;
  tagline: string;
  primaryColor: string;
  secondaryColor?: string;
  heroTitle: string;
  heroSubtitle: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  ctaText: string;
  knowledgeBase: string;
}
