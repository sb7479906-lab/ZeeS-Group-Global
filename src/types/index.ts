export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  badge?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'WEB' | 'E-COMMERCE' | 'BUSINESS' | 'AI' | 'AUTOMATION' | 'OTHER';
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  isDemo?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend & Cloud' | 'AI & Data' | 'Infrastructure & DevOps';
  icon: string;
  proficiency: number;
  description: string;
  featured?: boolean;
}

export interface AdvantageItem {
  number: string;
  title: string;
  description: string;
  icon: string;
  highlight: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  rawPhone: string;
  whatsappUrl: string;
  email?: string;
}

export interface CryptoFeature {
  title: string;
  tag: string;
  desc: string;
  icon: string;
}
