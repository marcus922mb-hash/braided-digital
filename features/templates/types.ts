import type { BuilderComponent, BuilderPageSettings } from "@/features/builder/types";

export const TEMPLATE_GROUPS = [
  "handmade",
  "beauty",
  "restaurant",
  "services",
  "medical",
  "creative",
  "ecommerce",
] as const;

export type TemplateGroup = (typeof TEMPLATE_GROUPS)[number];

export type TemplateColors = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  dark: string;
  light: string;
};

export type TemplateDefinition = {
  id: string;
  name: string;
  industry: string;
  group: TemplateGroup;
  summary: string;
  style: string;
  tags: string[];
  rating: number;
  featured?: boolean;
  colors: TemplateColors;
  fonts: { heading: string; body: string };
  animations: string[];
  sections: string[];
  copy: {
    eyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    aboutTitle: string;
    aboutText: string;
    services: string[];
    ctaTitle: string;
  };
};

export type ResolvedTemplate = TemplateDefinition & {
  components: BuilderComponent[];
  settings: BuilderPageSettings;
};
