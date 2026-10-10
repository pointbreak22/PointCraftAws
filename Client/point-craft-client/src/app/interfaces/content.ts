export interface TrustPoint {
  icon: string;
  label: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  audience: string;
}

export interface ServiceLink {
  slug: string;
  title: string;
}

export interface ServiceDetail {
  service: ServiceCategory;
  body: string;
  relatedProjects: CaseStudy[];
}

export interface TechStackArea {
  id: string;
  icon: string;
  area: string;
  technologies: string[];
  benefit: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface CaseStudyResult {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  task: string;
  solution: string;
  stack: string[];
  url: string | null;
  results: CaseStudyResult[];
}

export interface CaseStudyDetail {
  caseStudy: CaseStudy;
  body: string;
  services: ServiceLink[];
}

export interface ContactRequest {
  name: string;
  contact: string;
  projectType: string;
  message: string;
  website: string;
}

export interface ContactRequestListItem {
  id: string;
  name: string;
  contact: string;
  projectType: string | null;
  message: string;
  createdAtUtc: string;
}
