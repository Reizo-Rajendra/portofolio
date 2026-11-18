// ============================================================
// Portfolio Data Types
// ============================================================

export interface Building {
  id: string;
  name: string;
  subtitle: string;
  asset: string;
  x: number;
  y: number;
  door: { x: number; y: number };
  labelY: number;
}

export interface Education {
  year: string;
  degree: string;
  institution: string;
  status: string;
  details: string;
}

export interface AboutMe {
  eyebrow: string;
  title: string;
  titleSub: string;
  lead: string;
  note: string;
  coreStack: string[];
  education: Education[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  placement?: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  cover: string;
  images: string[];
  stack: string[];
  links: ProjectLink[];
  highlights: ProjectHighlight[];
  published?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
}

export interface SocialLink {
  icon: string;
  name: string;
  description: string;
  href: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  socials: SocialLink[];
}

// ============================================================
// Contact Form / Resend API Types
// ============================================================

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactApiResponse {
  ok: boolean;
  message: string;
}
