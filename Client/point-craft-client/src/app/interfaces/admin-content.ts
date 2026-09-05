// Bilingual shapes matching the *AdminDto records in WebAPI/Controllers/Admin*Controller.cs —
// the admin edits both locales at once in one form, unlike the public, locale-flattened
// interfaces in content.ts.

export interface TrustPointAdmin {
  id: string;
  icon: string;
  labelEn: string;
  labelRu: string;
  sortOrder: number;
}

export interface ServiceAdmin {
  id: string;
  icon: string;
  titleEn: string;
  titleRu: string;
  descriptionEn: string;
  descriptionRu: string;
  featuresEn: string[];
  featuresRu: string[];
  audienceEn: string;
  audienceRu: string;
  sortOrder: number;
}

export interface TechStackAreaAdmin {
  id: string;
  icon: string;
  areaEn: string;
  areaRu: string;
  technologies: string[];
  benefitEn: string;
  benefitRu: string;
  sortOrder: number;
}

export interface ProcessStepAdmin {
  id: string;
  titleEn: string;
  titleRu: string;
  descriptionEn: string;
  descriptionRu: string;
  sortOrder: number;
}

export interface CaseStudyResultAdmin {
  labelEn: string;
  labelRu: string;
  value: string;
}

export interface CaseStudyAdmin {
  id: string;
  titleEn: string;
  titleRu: string;
  taskEn: string;
  taskRu: string;
  solutionEn: string;
  solutionRu: string;
  results: CaseStudyResultAdmin[];
  sortOrder: number;
}
