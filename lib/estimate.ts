import type { EstimateResult, LeadFormData, ProjectType } from "./types";

const BASE_PRICES: Record<ProjectType, [number, number]> = {
  landing:   [500,   900],
  wizytowka: [900,  1800],
  bio:       [300,   700],
  sklep:    [1800,  4500],
  wordpress: [200,  1000],
  ai:        [800,  3000],
};

export const PROJECT_LABELS: Record<ProjectType, string> = {
  landing:   "Landing page",
  wizytowka: "Strona wizytówka",
  bio:       "Link w bio",
  sklep:     "Sklep internetowy",
  wordpress: "Poprawki WordPress",
  ai:        "Automatyzacja AI",
};

export function calculateEstimate(data: LeadFormData): EstimateResult {
  const [baseMin, baseMax] = BASE_PRICES[data.projectType] ?? [500, 1000];
  let min = baseMin;
  let max = baseMax;
  const features: string[] = [];

  // Pages
  if (data.pagesCount === "2-5") { min += 200; max += 400; features.push("2–5 podstron"); }
  if (data.pagesCount === "6-10") { min += 500; max += 800; features.push("6–10 podstron"); }
  if (data.pagesCount === "10+") { min += 900; max += 1400; features.push("ponad 10 podstron"); }
  if (data.pagesCount === "1") features.push("one-page / single view");

  // Shop
  const isShop = data.projectType === "sklep" || data.needsShop;
  if (data.needsShop && data.projectType !== "sklep") {
    min += 900; max += 1800; features.push("sklep online");
  }
  if (isShop) {
    if (data.productsCount === "11-30") { min += 200; max += 400; features.push("11–30 produktów"); }
    else if (data.productsCount === "30+") { min += 500; max += 900; features.push("30+ produktów"); }
    else features.push("do 10 produktów na start");
  }

  // Features
  if (data.needsSEO) { min += 200; max += 400; features.push("optymalizacja SEO"); }
  if (data.needsWhatsApp) { min += 100; max += 200; features.push("integracja WhatsApp"); }
  if (data.needsContactForm) features.push("formularz kontaktowy");

  // Content
  if (!data.hasContent) { min += 200; max += 400; features.push("wsparcie przy treściach i grafice"); }

  // Urgency surcharge
  if (data.timeline === "asap") {
    min = Math.round(min * 1.2);
    max = Math.round(max * 1.2);
    features.push("ekspresowa realizacja (+20%)");
  }

  // Round to nearest 10
  min = Math.round(min / 10) * 10;
  max = Math.round(max / 10) * 10;

  const avg = (min + max) / 2;
  let timelineLabel: string;
  if (avg < 800) timelineLabel = "3–7 dni";
  else if (avg < 1500) timelineLabel = "1–2 tygodnie";
  else if (avg < 2500) timelineLabel = "2–4 tygodnie";
  else if (avg < 4000) timelineLabel = "4–6 tygodni";
  else timelineLabel = "6–10 tygodni";

  return {
    minPrice: min,
    maxPrice: max,
    timelineLabel,
    projectTypeLabel: PROJECT_LABELS[data.projectType],
    features,
    briefSummary: buildBrief(data, features),
  };
}

function buildBrief(data: LeadFormData, features: string[]): string {
  const parts: string[] = [];
  parts.push(`Projekt: ${PROJECT_LABELS[data.projectType]}`);
  const scope = features.filter((f) => !f.includes("ekspresowa") && !f.includes("one-page"));
  if (scope.length) parts.push(`Zakres: ${scope.join(", ")}`);
  if (!data.hasDomain) parts.push("Brak domeny — wymaga konfiguracji");
  if (!data.hasHosting) parts.push("Brak hostingu — wymaga konfiguracji");
  if (data.description) parts.push(`Opis klienta: ${data.description}`);
  return parts.join(" · ");
}
