export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  brandName: string;
  description: string;
  contactEmail: string;
  phone: string;
  hours: string;
  address: string;
  facebookUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroStats: { label: string; value: string }[];
  announcementText: string;
  announcementEnabled: boolean;
  ctaBannerTitle: string;
  ctaBannerSubtitle: string;
  ctaBannerButtonText: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullOverview: string;
  category: string;
  iconName: string;
  deliverables: string[];
  approach: { step: string; title: string; description: string }[];
  metrics: { value: string; label: string }[];
  featured: boolean;
  order: number;
  updatedAt: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  serviceCategory: string;
  location: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  keyMetric: string;
  metricLabel: string;
  metrics: { value: string; label: string }[];
  clientQuote: string;
  clientAuthor: string;
  clientRole: string;
  featured: boolean;
  order: number;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishedDate: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  linkedinUrl?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  rating: number;
  featured: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface CustomSection {
  id: string;
  key: string; // e.g., 'home_values', 'home_approach', 'home_difference', 'custom_promo'
  title: string;
  subtitle: string;
  badge?: string;
  page: string; // 'home' | 'about' | 'services' | 'all'
  contentJson: string; // serialized custom content/cards/items
  enabled: boolean;
  order: number;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceNeeded?: string;
  message: string;
  source: string; // 'contact_page' | 'consultation_modal' | 'service_inquiry'
  status: 'new' | 'in_progress' | 'contacted' | 'archived';
  createdAt: string;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  services: Service[];
  caseStudies: CaseStudy[];
  blogs: BlogPost[];
  team: TeamMember[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  customSections: CustomSection[];
  leads: LeadSubmission[];
}
