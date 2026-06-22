export type ProjectType =
  | "wizytowka"
  | "sklep"
  | "landing"
  | "bio"
  | "wordpress"
  | "ai";

export type PagesCount = "1" | "2-5" | "6-10" | "10+";
export type ProductsCount = "1-10" | "11-30" | "30+";
export type Budget = "do-1000" | "1000-3000" | "3000-6000" | "6000+";
export type Timeline = "asap" | "1-miesiac" | "2-3-miesiace" | "bez-presji";

export type LeadFormData = {
  projectType: ProjectType;
  hasDomain: boolean;
  hasHosting: boolean;
  pagesCount: PagesCount;
  needsShop: boolean;
  productsCount: ProductsCount;
  needsContactForm: boolean;
  needsWhatsApp: boolean;
  needsSEO: boolean;
  hasContent: boolean;
  budget: Budget;
  timeline: Timeline;
  description: string;
  name: string;
  email: string;
  phone: string;
};

export type EstimateResult = {
  minPrice: number;
  maxPrice: number;
  timelineLabel: string;
  projectTypeLabel: string;
  features: string[];
  briefSummary: string;
};

export type LeadSubmission = {
  id: string;
  submittedAt: string;
  formData: LeadFormData;
  estimate: EstimateResult;
};

export type ApiResponse = {
  success: boolean;
  estimate?: EstimateResult;
  leadId?: string;
  error?: string;
};
