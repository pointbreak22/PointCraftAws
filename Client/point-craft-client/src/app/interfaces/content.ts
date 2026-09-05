export interface TrustPoint {
  icon: string;
  label: string;
}

export interface ServiceCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  audience: string;
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
  title: string;
  task: string;
  solution: string;
  results: CaseStudyResult[];
}

export interface ContactRequest {
  name: string;
  contact: string;
  projectType: string;
  message: string;
}
