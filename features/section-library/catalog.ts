import {
  SECTION_LIBRARY_CATEGORIES,
  type SectionCategory,
  type SectionDifficulty,
  type SectionLicense,
  type SectionPageTemplate,
  type SectionRecord,
  type SectionSource,
  type SectionTechnology,
} from "@/features/section-library/types";
import { dataUriSvg, escapeHtml, nowIso, slugify } from "@/features/section-library/utils";

type FamilyStyle = {
  key: string;
  name: string;
  accent: string;
  surface: string;
  text: string;
  tags: string[];
  license: string;
  technology: SectionTechnology;
  difficulty: SectionDifficulty;
  animated: boolean;
  requiresJavaScript: boolean;
  dependencies: string[];
  isPremium?: boolean;
};

type FamilyVariant = {
  key: string;
  name: string;
  description: string;
  title: string;
  subtitle: string;
  cta: string;
  tags: string[];
  industryTags: string[];
  styleTags: string[];
};

type FamilyDefinition = {
  categoryId: (typeof SECTION_LIBRARY_CATEGORIES)[number];
  categoryName: string;
  prefix: string;
  baseTags: string[];
  sourceUrl?: string;
  author?: string;
  variants: FamilyVariant[];
  styles: FamilyStyle[];
};

const LICENSES: SectionLicense[] = [
  { id: "proprietary", name: "Proprietary", isFree: true, commercialUse: true, attributionRequired: false, status: "known", author: "MA Atelier Studio" },
  { id: "mit", name: "MIT", isFree: true, commercialUse: true, attributionRequired: true, status: "known", author: "Community" },
  { id: "apache-2.0", name: "Apache-2.0", isFree: true, commercialUse: true, attributionRequired: true, status: "known", author: "Community" },
  { id: "unknown", name: "Wymaga sprawdzenia", isFree: false, commercialUse: false, attributionRequired: false, status: "requires_check" },
];

const SOURCES: SectionSource[] = [
  {
    id: "flowbite-react",
    name: "Flowbite React",
    description: "React + Tailwind CSS komponenty dla sekcji, dashboardów i ecommerce.",
    githubUrl: "https://github.com/themesberg/flowbite-react",
    technology: "React + Tailwind",
    license: "MIT",
    author: "Themesberg",
    lastSyncedAt: null,
    componentCount: 0,
    sectionCount: 0,
    syncStatus: "idle",
    autoSync: true,
    tags: ["navbar", "hero", "pricing", "footer", "dashboard"],
    categories: ["menu-i-nawigacje", "sekcje-hero", "sekcje-ofertowe", "sekcje-ecommerce"],
    thumbnailUrl: null,
  },
  {
    id: "meraki-ui",
    name: "Meraki UI",
    description: "Czyste, eleganckie układy HTML + Tailwind.",
    githubUrl: "https://merakiui.com/",
    technology: "HTML + Tailwind",
    license: "MIT",
    author: "Meraki UI",
    lastSyncedAt: null,
    componentCount: 0,
    sectionCount: 0,
    syncStatus: "idle",
    autoSync: true,
    tags: ["hero", "contact", "pricing", "faq", "footer"],
    categories: ["sekcje-hero", "sekcje-ofertowe"],
    thumbnailUrl: null,
  },
  {
    id: "play-tailwind",
    name: "Play Tailwind",
    description: "Zestaw sekcji i landing pages budowanych w Tailwind.",
    githubUrl: "https://play.tailwindcss.com/",
    technology: "Tailwind",
    license: "MIT",
    author: "Community",
    lastSyncedAt: null,
    componentCount: 0,
    sectionCount: 0,
    syncStatus: "idle",
    autoSync: true,
    tags: ["landing", "saas", "startup", "ecommerce"],
    categories: ["sekcje-hero", "sekcje-ofertowe", "sekcje-ecommerce"],
    thumbnailUrl: null,
  },
  {
    id: "seamless-ui",
    name: "Seamless UI",
    description: "Komponenty HTML / React / Next.js do stron produktowych i portfolio.",
    githubUrl: "https://github.com/",
    technology: "React + Tailwind",
    license: "MIT",
    author: "Community",
    lastSyncedAt: null,
    componentCount: 0,
    sectionCount: 0,
    syncStatus: "idle",
    autoSync: true,
    tags: ["hero", "pricing", "contact", "portfolio"],
    categories: ["sekcje-hero", "sekcje-ofertowe"],
    thumbnailUrl: null,
  },
  {
    id: "gravity-ui",
    name: "Gravity UI Page Constructor",
    description: "Komponenty konstruktora stron i dynamicznych layoutów.",
    githubUrl: "https://github.com/",
    technology: "React",
    license: "Apache-2.0",
    author: "Gravity UI",
    lastSyncedAt: null,
    componentCount: 0,
    sectionCount: 0,
    syncStatus: "idle",
    autoSync: true,
    tags: ["page-builder", "templates", "dynamic"],
    categories: ["sekcje-ofertowe", "sekcje-specjalne"],
    thumbnailUrl: null,
  },
  {
    id: "ui-layouts",
    name: "UI Layouts",
    description: "Układy hero, services, gallery, pricing i footer w różnych stylach.",
    githubUrl: "https://github.com/",
    technology: "HTML + React + Tailwind",
    license: "MIT",
    author: "Community",
    lastSyncedAt: null,
    componentCount: 0,
    sectionCount: 0,
    syncStatus: "idle",
    autoSync: true,
    tags: ["hero", "services", "gallery", "faq", "footer"],
    categories: ["menu-i-nawigacje", "sekcje-hero", "sekcje-ofertowe"],
    thumbnailUrl: null,
  },
];

const categories: SectionCategory[] = [
  {
    id: "menu-i-nawigacje",
    name: "Menu i nawigacje",
    description: "Klasyczne menu, sticky nav, mobile menu, mega menu i warianty SaaS / sklepowe.",
    tags: ["navbar", "menu", "navigation", "sticky", "cta"],
  },
  {
    id: "sekcje-hero",
    name: "Sekcje Hero",
    description: "Hero dla firm usługowych, sklepów, portfolio, SaaS, z formą, wideo i animacjami.",
    tags: ["hero", "landing", "headline", "cta", "animated"],
  },
  {
    id: "sekcje-ofertowe",
    name: "Sekcje ofertowe",
    description: "Usługi, pricing, FAQ, opinie, contact, gallery, footer, CTA i bloki specjalistyczne.",
    tags: ["services", "pricing", "faq", "contact", "footer"],
  },
  {
    id: "sekcje-ecommerce",
    name: "Sekcje e-commerce",
    description: "Produkty, kategorie, bestsellery, promocje, koszyk preview i kolekcje.",
    tags: ["ecommerce", "product", "shop", "cart", "collection"],
  },
  {
    id: "sekcje-specjalne",
    name: "Sekcje specjalne",
    description: "Glassmorphism, dark mode, animowane tła, timeline, before/after i duża typografia.",
    tags: ["animated", "glass", "gradient", "dark", "comparison"],
  },
];

function thumb(title: string, accent: string, surface: string, text: string) {
  return dataUriSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${surface}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" rx="48" fill="url(#g)"/>
      <rect x="70" y="70" width="1060" height="660" rx="34" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>
      <text x="110" y="170" fill="${text}" font-size="54" font-weight="700" font-family="Arial, sans-serif">${escapeHtml(title)}</text>
      <rect x="110" y="214" width="280" height="14" rx="7" fill="rgba(255,255,255,0.55)"/>
      <rect x="110" y="260" width="460" height="18" rx="9" fill="rgba(255,255,255,0.28)"/>
      <rect x="110" y="304" width="540" height="18" rx="9" fill="rgba(255,255,255,0.18)"/>
      <rect x="110" y="430" width="310" height="72" rx="18" fill="${accent}" opacity="0.95"/>
      <rect x="110" y="530" width="750" height="140" rx="22" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.14)"/>
    </svg>
  `);
}

function buildReactSectionCode(name: string, title: string, subtitle: string, cta: string, style: FamilyStyle) {
  return `import { ArrowRight } from "lucide-react";

export function ${name}() {
  return (
    <section className="relative overflow-hidden bg-${style.key}-surface text-${style.key}-text">
      <div className="mx-auto grid min-h-[520px] max-w-6xl gap-8 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-${style.key}-accent">Nowa sekcja</p>
          <h2 className="max-w-xl text-4xl font-semibold leading-tight lg:text-6xl">${escapeHtml(title)}</h2>
          <p className="mt-6 max-w-2xl text-base/8 opacity-80">${escapeHtml(subtitle)}</p>
          <a href="#kontakt" className="mt-8 inline-flex items-center gap-2 rounded-full bg-${style.key}-accent px-6 py-3 font-medium text-white">
            ${escapeHtml(cta)} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
          <div className="h-[320px] rounded-[1.5rem] bg-gradient-to-br from-white/20 to-white/5" />
        </div>
      </div>
    </section>
  );
}`;
}

function buildHtmlSectionCode(title: string, subtitle: string, cta: string, style: FamilyStyle) {
  return `<section class="section section--${style.key}">
  <div class="section__inner">
    <div class="section__copy">
      <p class="section__eyebrow">Nowa sekcja</p>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(subtitle)}</p>
      <a href="#kontakt" class="section__cta">${escapeHtml(cta)}</a>
    </div>
    <div class="section__visual"></div>
  </div>
</section>`;
}

function buildStyleCode(style: FamilyStyle, technology: SectionTechnology) {
  if (technology.includes("Tailwind")) {
    return `bg-${style.key}-surface text-${style.key}-text border-${style.key}-accent/20`;
  }
  return `
.section--${style.key} {
  background: ${style.surface};
  color: ${style.text};
}
.section--${style.key} .section__cta {
  background: ${style.accent};
}
`.trim();
}

function buildPreviewHtml(title: string, subtitle: string, style: FamilyStyle) {
  return `<!doctype html>
  <html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html,body{margin:0;height:100%;font-family:Inter,Arial,sans-serif;background:${style.surface};color:${style.text};}
      .wrap{min-height:100%;display:grid;place-items:center;padding:24px}
      .card{width:min(100%,920px);padding:36px;border-radius:28px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(20px)}
      .eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:${style.accent};font-weight:700}
      h1{margin:18px 0 0;font-size:42px;line-height:1.03}
      p{margin:16px 0 0;font-size:16px;line-height:1.7;opacity:.82;max-width:640px}
      .cta{margin-top:24px;display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border-radius:999px;background:${style.accent};color:white;font-weight:700;text-decoration:none}
      .grid{margin-top:30px;display:grid;grid-template-columns:1.2fr .8fr;gap:18px}
      .box{min-height:180px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}
      @media(max-width:720px){h1{font-size:32px}.grid{grid-template-columns:1fr}}
    </style>
  </head>
  <body>
    <div class="wrap">
      <article class="card">
        <span class="eyebrow">Biblioteka Sekcji</span>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
        <a class="cta" href="#kontakt">Umów konsultację</a>
        <div class="grid"><div class="box"></div><div class="box"></div></div>
      </article>
    </div>
  </body>
  </html>`;
}

function makeSectionRecord(
  family: FamilyDefinition,
  variant: FamilyVariant,
  style: FamilyStyle,
  index: number
): SectionRecord {
  const name = `${variant.name} ${style.name}`;
  const slug = `${family.prefix}-${variant.key}-${style.key}-${String(index + 1).padStart(2, "0")}`;
  const title = variant.title;
  const subtitle = variant.subtitle;
  const sectionCodeName = slug
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join("")
    .replace(/[^A-Za-z0-9]/g, "");

  return {
    id: slug,
    slug,
    name,
    categoryId: family.categoryId,
    categoryName: family.categoryName,
    tags: [...new Set([...family.baseTags, ...variant.tags, ...style.tags])],
    thumbnailUrl: thumb(name, style.accent, style.surface, style.text),
    description: variant.description,
    technology: style.technology,
    componentCode:
      style.technology.includes("HTML")
        ? buildHtmlSectionCode(title, subtitle, variant.cta, style)
        : buildReactSectionCode(sectionCodeName || "SectionBlock", title, subtitle, variant.cta, style),
    styleCode: buildStyleCode(style, style.technology),
    dependencies: style.dependencies,
    difficulty: style.difficulty,
    requiresJavaScript: style.requiresJavaScript,
    responsive: true,
    animated: style.animated,
    sourceType: "own",
    sourceUrl: family.sourceUrl ?? null,
    author: family.author ?? "MA Atelier Studio",
    licenseId: style.license === "MIT" ? "mit" : style.license === "Apache-2.0" ? "apache-2.0" : "proprietary",
    licenseName: style.license,
    licenseStatus: "known",
    isFree: true,
    commercialUse: true,
    attributionRequired: false,
    dateAdded: nowIso(),
    status: "active",
    industryTags: variant.industryTags,
    styleTags: variant.styleTags,
    isFavorite: false,
    isPremium: Boolean(style.isPremium),
    previewHtml: buildPreviewHtml(title, subtitle, style),
    previewDarkHtml: buildPreviewHtml(title, subtitle, style),
    aiAnalysis: null,
    variants: [
      {
        id: `${slug}-default`,
        sectionId: slug,
        name: "Domyślny wariant",
        key: "default",
        componentCode: style.technology.includes("HTML")
          ? buildHtmlSectionCode(title, subtitle, variant.cta, style)
          : buildReactSectionCode(sectionCodeName || "SectionBlock", title, subtitle, variant.cta, style),
        styleCode: buildStyleCode(style, style.technology),
        thumbnailUrl: thumb(`${name} - default`, style.accent, style.surface, style.text),
        notes: "Wariant początkowy do edycji.",
        isDefault: true,
      },
    ],
  };
}

function expandFamily(family: FamilyDefinition): SectionRecord[] {
  const result: SectionRecord[] = [];
  family.variants.forEach((variant, variantIndex) => {
    family.styles.forEach((style, styleIndex) => {
      const index = variantIndex * family.styles.length + styleIndex;
      result.push(makeSectionRecord(family, variant, style, index));
    });
  });
  return result;
}

function buildFamilyDefinition(
  categoryId: SectionCategory["id"],
  categoryName: string,
  prefix: string,
  baseTags: string[],
  variants: FamilyVariant[],
  styles: FamilyStyle[],
  sourceUrl?: string,
  author?: string
): FamilyDefinition {
  return {
    categoryId,
    categoryName,
    prefix,
    baseTags,
    variants,
    styles,
    sourceUrl,
    author,
  };
}

const NAVBAR_STYLES: FamilyStyle[] = [
  { key: "light", name: "jasny", accent: "#b68d5e", surface: "#f7f3ed", text: "#171614", tags: ["light", "navbar"], license: "MIT", technology: "React + Tailwind", difficulty: "easy", animated: false, requiresJavaScript: false, dependencies: ["lucide-react"] },
  { key: "dark", name: "dark", accent: "#e8c98b", surface: "#121212", text: "#f5f0e6", tags: ["dark", "navbar"], license: "MIT", technology: "React + Tailwind", difficulty: "easy", animated: true, requiresJavaScript: true, dependencies: ["framer-motion", "lucide-react"] },
];

const HERO_STYLES: FamilyStyle[] = [
  { key: "modern", name: "nowoczesny", accent: "#b68d5e", surface: "#f4efe6", text: "#191815", tags: ["modern", "hero"], license: "MIT", technology: "React + Tailwind", difficulty: "medium", animated: true, requiresJavaScript: true, dependencies: ["framer-motion", "lucide-react"] },
  { key: "luxury", name: "luxury", accent: "#d9b56d", surface: "#111111", text: "#f5efe2", tags: ["luxury", "hero"], license: "MIT", technology: "Next.js + Tailwind", difficulty: "medium", animated: true, requiresJavaScript: true, dependencies: ["framer-motion", "lucide-react"], isPremium: true },
  { key: "glass", name: "glass", accent: "#7da7ff", surface: "#101828", text: "#eff6ff", tags: ["glass", "hero"], license: "MIT", technology: "React + Tailwind", difficulty: "medium", animated: true, requiresJavaScript: true, dependencies: ["framer-motion", "lucide-react"], isPremium: true },
];

const OFFERING_STYLES: FamilyStyle[] = [
  { key: "editorial", name: "editorialny", accent: "#b68d5e", surface: "#f4efe6", text: "#191815", tags: ["minimal", "business"], license: "MIT", technology: "HTML + Tailwind", difficulty: "easy", animated: false, requiresJavaScript: false, dependencies: [] },
  { key: "premium", name: "premium", accent: "#caa86a", surface: "#14110f", text: "#f7f1e6", tags: ["premium", "business"], license: "MIT", technology: "React + Tailwind", difficulty: "medium", animated: false, requiresJavaScript: false, dependencies: ["lucide-react"] },
  { key: "animated", name: "animowany", accent: "#6d8cff", surface: "#0f172a", text: "#eff6ff", tags: ["animated", "business"], license: "MIT", technology: "Next.js + Tailwind", difficulty: "medium", animated: true, requiresJavaScript: true, dependencies: ["framer-motion", "lucide-react"] },
  { key: "glass", name: "glass", accent: "#9f7aea", surface: "#111827", text: "#f8fafc", tags: ["glass", "gradient"], license: "MIT", technology: "React + Tailwind", difficulty: "medium", animated: true, requiresJavaScript: true, dependencies: ["framer-motion", "lucide-react"], isPremium: true },
];

const ECOMMERCE_STYLES: FamilyStyle[] = [
  { key: "shop", name: "sklepowy", accent: "#6f9e6d", surface: "#f4f2ec", text: "#151515", tags: ["ecommerce", "shop"], license: "MIT", technology: "React + Tailwind", difficulty: "easy", animated: false, requiresJavaScript: false, dependencies: ["lucide-react"] },
  { key: "promo", name: "promocyjny", accent: "#f97316", surface: "#111111", text: "#fff7ed", tags: ["ecommerce", "promo"], license: "MIT", technology: "Next.js + Tailwind", difficulty: "medium", animated: true, requiresJavaScript: true, dependencies: ["framer-motion", "lucide-react"] },
];

const SPECIAL_STYLES: FamilyStyle[] = [
  { key: "dark", name: "dark mode", accent: "#8b5cf6", surface: "#09090b", text: "#f4f4f5", tags: ["dark", "special"], license: "MIT", technology: "React + CSS", difficulty: "medium", animated: true, requiresJavaScript: true, dependencies: ["framer-motion"] },
  { key: "gradient", name: "gradientowy", accent: "#f59e0b", surface: "#0f172a", text: "#f8fafc", tags: ["gradient", "special"], license: "MIT", technology: "HTML + Tailwind", difficulty: "easy", animated: false, requiresJavaScript: false, dependencies: [] },
];

const NAVBAR_VARIANTS: FamilyVariant[] = [
  { key: "classic", name: "Klasyczne menu", description: "Prosta, czytelna nawigacja z logo i CTA.", title: "Klasyczne menu", subtitle: "Przejrzysta nawigacja dla strony firmowej.", cta: "Skontaktuj się", tags: ["navbar", "classic"], industryTags: ["business"], styleTags: ["minimal"] },
  { key: "sticky", name: "Sticky navbar", description: "Przyklejone menu, które zostaje przy przewijaniu.", title: "Sticky navbar", subtitle: "Zawsze widoczna nawigacja dla dłuższych stron.", cta: "Zobacz ofertę", tags: ["sticky", "navbar"], industryTags: ["startup", "saas"], styleTags: ["modern"] },
  { key: "transparent", name: "Transparent navbar", description: "Transparentna nawigacja do hero z tłem wideo lub obrazu.", title: "Transparent navbar", subtitle: "Świetnie działa z dużym hero i wideo w tle.", cta: "Poznaj", tags: ["transparent", "navbar"], industryTags: ["portfolio", "luxury"], styleTags: ["luxury"] },
  { key: "mobile", name: "Mobile menu", description: "Menu zoptymalizowane pod urządzenia mobilne.", title: "Mobile menu", subtitle: "Pełna kontrola UX na małych ekranach.", cta: "Otwórz menu", tags: ["mobile", "navbar"], industryTags: ["local-services"], styleTags: ["responsive"] },
  { key: "mega", name: "Mega menu", description: "Rozbudowane menu z wieloma kolumnami i sekcjami.", title: "Mega menu", subtitle: "Dla sklepów i większych serwisów.", cta: "Sprawdź kategorie", tags: ["mega-menu", "navbar"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "sidebar", name: "Sidebar menu", description: "Menu boczne do dashboardów i aplikacji.", title: "Sidebar menu", subtitle: "Idealne dla aplikacji i paneli.", cta: "Zaloguj się", tags: ["sidebar", "navbar"], industryTags: ["saas", "application"], styleTags: ["technical"] },
  { key: "logo", name: "Menu z logo", description: "Nawigacja z mocnym akcentem marki.", title: "Menu z logo", subtitle: "Buduje rozpoznawalność od pierwszego ekranu.", cta: "O marce", tags: ["logo", "navbar"], industryTags: ["branding"], styleTags: ["premium"] },
  { key: "cta", name: "Menu z CTA", description: "Menu z wyróżnionym przyciskiem konwersji.", title: "Menu z CTA", subtitle: "Lepsza konwersja bez zagłuszania layoutu.", cta: "Umów rozmowę", tags: ["cta", "navbar"], industryTags: ["agency", "services"], styleTags: ["agency"] },
  { key: "shop", name: "Menu dla sklepu", description: "Nawigacja z koszykiem, kategoriami i filtrem.", title: "Menu dla sklepu", subtitle: "Przyjazne dla ecommerce i dużych katalogów.", cta: "Koszyk", tags: ["ecommerce", "navbar"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "saas", name: "Menu dla SaaS", description: "Nowoczesne menu produktu z linkami do sekcji i logowania.", title: "Menu dla SaaS", subtitle: "Sprawdza się przy produktach cyfrowych.", cta: "Wypróbuj demo", tags: ["saas", "navbar"], industryTags: ["saas"], styleTags: ["startup"] },
  { key: "animated", name: "Menu z animacjami", description: "Animowane elementy, hover i mikrointerakcje.", title: "Menu z animacjami", subtitle: "Przyciąga uwagę bez nadmiaru ruchu.", cta: "Zobacz animacje", tags: ["animated", "navbar"], industryTags: ["creative"], styleTags: ["animated"] },
];

const HERO_VARIANTS: FamilyVariant[] = [
  { key: "service", name: "Hero dla firm usługowych", description: "Hero pod usługi lokalne i firmy B2B.", title: "Zaprojektuj stronę, która sprzedaje", subtitle: "Gotowe sekcje dla firm usługowych z jasnym CTA i dowodem społecznym.", cta: "Bezpłatna wycena", tags: ["hero", "service"], industryTags: ["business", "local-services"], styleTags: ["modern"] },
  { key: "shop", name: "Hero dla sklepu", description: "Hero pod ecommerce z produktami i promocją.", title: "Twoje produkty w centrum uwagi", subtitle: "Sekcja hero skoncentrowana na konwersji, promocjach i kolekcjach.", cta: "Kup teraz", tags: ["hero", "ecommerce"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "portfolio", name: "Hero dla portfolio", description: "Hero pod portfolio z mocnym wizualem.", title: "Pokaż projekty, które robią wrażenie", subtitle: "Eleganckie układy do prezentacji prac, case studies i referencji.", cta: "Zobacz realizacje", tags: ["hero", "portfolio"], industryTags: ["portfolio", "creative"], styleTags: ["minimal"] },
  { key: "big-text", name: "Hero z dużym tekstem", description: "Typograficzne hero z wyrazistym headline.", title: "Duża typografia", subtitle: "Sekcja, która buduje skalę i pewność marki już na starcie.", cta: "Poznaj markę", tags: ["hero", "typography"], industryTags: ["agency", "startup"], styleTags: ["editorial"] },
  { key: "image", name: "Hero z obrazem", description: "Układ z dużym zdjęciem i kopią.", title: "Pracujemy na pięknym obrazie i precyzyjnym copy", subtitle: "Hero z mocnym wizualem dla stron premium i usług.", cta: "Zobacz więcej", tags: ["hero", "image"], industryTags: ["photography", "luxury"], styleTags: ["luxury"] },
  { key: "video", name: "Hero z wideo", description: "Hero z odtwarzaczem lub tłem wideo.", title: "Wideo, które opowiada historię", subtitle: "Najlepszy wybór dla produktów, studiów i marek premium.", cta: "Odtwórz", tags: ["hero", "video"], industryTags: ["saas", "creative"], styleTags: ["animated"] },
  { key: "animated", name: "Hero z animacją", description: "Dynamiczne przejścia, floating shapes i parallax.", title: "Hero, który żyje", subtitle: "Ruch przyciąga uwagę i pozwala podbić percepcję jakości.", cta: "Sprawdź", tags: ["hero", "animated"], industryTags: ["startup", "agency"], styleTags: ["animated"] },
  { key: "form", name: "Hero z formularzem", description: "Hero z formularzem leadowym lub bookingowym.", title: "Zbieraj leady od pierwszego ekranu", subtitle: "Formularz w hero skraca drogę do konwersji.", cta: "Wyślij zapytanie", tags: ["hero", "form"], industryTags: ["services", "medical"], styleTags: ["responsive"] },
  { key: "reviews", name: "Hero z opiniami", description: "Hero z ocenami i social proof.", title: "Zaufanie jeszcze przed scrollowaniem", subtitle: "Opinie i gwiazdki wzmacniają wiarygodność marki.", cta: "Czytaj opinie", tags: ["hero", "testimonials"], industryTags: ["local-services", "restaurant"], styleTags: ["trust"] },
  { key: "luxury", name: "Hero premium/luxury", description: "Ekskluzywne hero z luksusową typografią.", title: "Wrażenie premium od pierwszego kontaktu", subtitle: "Stworzony dla marek high-end, biżuterii i designu.", cta: "Umów rozmowę", tags: ["hero", "luxury"], industryTags: ["jewelry", "luxury"], styleTags: ["luxury"] },
];

const OFFERING_VARIANTS: Record<string, FamilyVariant[]> = {
  services: [
    { key: "services", name: "Usługi", description: "Siatka usług z ikonami i opisami.", title: "Nasze usługi", subtitle: "Wyjaśnij zakres oferty w kilku kartach.", cta: "Poznaj usługi", tags: ["services"], industryTags: ["services"], styleTags: ["business"] },
    { key: "pricing", name: "Cennik", description: "Klasyczne pakiety cenowe.", title: "Cennik", subtitle: "Pokazuj pakiety i warianty cenowe.", cta: "Wybierz pakiet", tags: ["pricing"], industryTags: ["business"], styleTags: ["premium"] },
    { key: "packages", name: "Pakiety", description: "Pakiety startowe, pro i premium.", title: "Pakiety dopasowane do potrzeb", subtitle: "Idealne do sprzedaży usług i abonamentów.", cta: "Porównaj pakiety", tags: ["packages"], industryTags: ["saas", "services"], styleTags: ["modern"] },
    { key: "comparison", name: "Porównanie pakietów", description: "Tabela porównawcza z highlightem.", title: "Porównanie pakietów", subtitle: "Ułatwia decyzję na etapie wyboru oferty.", cta: "Porównaj", tags: ["comparison"], industryTags: ["saas", "services"], styleTags: ["technical"] },
    { key: "features", name: "Funkcje", description: "Lista funkcji i możliwości produktu.", title: "Funkcje", subtitle: "Pokaż, co realnie dostaje użytkownik.", cta: "Sprawdź funkcje", tags: ["features"], industryTags: ["saas"], styleTags: ["startup"] },
    { key: "benefits", name: "Korzyści", description: "Korzyści biznesowe i emocjonalne.", title: "Korzyści", subtitle: "Nie tylko funkcje, ale też rezultaty.", cta: "Zobacz korzyści", tags: ["benefits"], industryTags: ["business"], styleTags: ["editorial"] },
    { key: "process", name: "Proces współpracy", description: "Kroki realizacji i onboarding.", title: "Proces współpracy", subtitle: "Transparentny proces podnosi zaufanie.", cta: "Jak pracujemy", tags: ["process"], industryTags: ["agency", "services"], styleTags: ["modern"] },
    { key: "cta", name: "Call to action", description: "Sekcja domykająca sprzedaż.", title: "Gotowy, by zacząć?", subtitle: "CTA z dwoma przyciskami i krótkim argumentem.", cta: "Napisz do nas", tags: ["cta"], industryTags: ["business"], styleTags: ["bold"] },
    { key: "faq", name: "FAQ", description: "Pytania i odpowiedzi z akordeonem.", title: "FAQ", subtitle: "Usuń bariery decyzyjne.", cta: "Pokaż pytania", tags: ["faq"], industryTags: ["business"], styleTags: ["minimal"] },
    { key: "testimonials", name: "Opinie klientów", description: "Recenzje i cytaty klientów.", title: "Opinie klientów", subtitle: "Pokaż social proof i cytaty z projektów.", cta: "Czytaj opinie", tags: ["testimonials"], industryTags: ["business"], styleTags: ["trust"] },
    { key: "case-study", name: "Case study", description: "Studium przypadku z rezultatami.", title: "Case study", subtitle: "Pokazuje realne wyniki i przebieg współpracy.", cta: "Zobacz case study", tags: ["case-study"], industryTags: ["agency", "saas"], styleTags: ["technical"] },
    { key: "portfolio", name: "Portfolio", description: "Kafelki realizacji i projektów.", title: "Portfolio", subtitle: "Dla kreatywnych marek i freelancerów.", cta: "Zobacz projekty", tags: ["portfolio"], industryTags: ["portfolio"], styleTags: ["minimal"] },
    { key: "gallery", name: "Galeria", description: "Galeria zdjęć lub realizacji.", title: "Galeria", subtitle: "Wizualna prezentacja produktów i miejsc.", cta: "Przeglądaj galerię", tags: ["gallery"], industryTags: ["restaurant", "hotel"], styleTags: ["visual"] },
    { key: "team", name: "Zespół", description: "Prezentacja ekspertów i twarzy marki.", title: "Zespół", subtitle: "Pokazuje ludzi stojących za marką.", cta: "Poznaj zespół", tags: ["team"], industryTags: ["agency", "medical"], styleTags: ["professional"] },
    { key: "contact", name: "Kontakt", description: "Sekcja kontaktowa z formularzem i danymi.", title: "Kontakt", subtitle: "Wygodny kontakt przez formularz lub telefon.", cta: "Napisz wiadomość", tags: ["contact"], industryTags: ["business", "local-services"], styleTags: ["responsive"] },
    { key: "map", name: "Mapa", description: "Adres, mapa i dane lokalne.", title: "Mapa dojazdu", subtitle: "Idealne dla lokalnych biznesów i miejsc usług.", cta: "Wyznacz trasę", tags: ["map"], industryTags: ["local-services"], styleTags: ["practical"] },
    { key: "forms", name: "Formularze", description: "Formularze kontaktowe i leadowe.", title: "Formularze", subtitle: "Sekcja nastawiona na konwersję leadów.", cta: "Wyślij formularz", tags: ["forms"], industryTags: ["business"], styleTags: ["conversion"] },
    { key: "newsletter", name: "Newsletter", description: "Zapis do newslettera i lead magnet.", title: "Newsletter", subtitle: "Buduj listę mailingową z wartościowym lead magnetem.", cta: "Zapisz mnie", tags: ["newsletter"], industryTags: ["blog", "saas"], styleTags: ["minimal"] },
    { key: "blog", name: "Blog", description: "Kafelki wpisów i archiwum.", title: "Blog", subtitle: "Aktualności, case studies i wiedza branżowa.", cta: "Czytaj blog", tags: ["blog"], industryTags: ["blog"], styleTags: ["editorial"] },
    { key: "footer", name: "Stopka", description: "Kompletna stopka z linkami i CTA.", title: "Stopka", subtitle: "Domknięcie strony z linkami i informacjami.", cta: "Powrót do góry", tags: ["footer"], industryTags: ["business"], styleTags: ["footer"] },
  ],
};

const ECOMMERCE_VARIANTS: FamilyVariant[] = [
  { key: "products", name: "Lista produktów", description: "Katalog produktów z kartami i filtrami.", title: "Lista produktów", subtitle: "Pokaż produkty w przejrzystej siatce.", cta: "Przeglądaj produkty", tags: ["ecommerce", "products"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "product-card", name: "Karta produktu", description: "Duża karta pojedynczego produktu.", title: "Karta produktu", subtitle: "Podkreśla cenę, zdjęcia i warianty.", cta: "Dodaj do koszyka", tags: ["ecommerce", "product"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "categories", name: "Kategorie produktów", description: "Kategorie i podkategorie sklepu.", title: "Kategorie produktów", subtitle: "Pomaga klientom szybciej odnaleźć asortyment.", cta: "Zobacz kategorie", tags: ["categories"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "bestsellers", name: "Bestsellery", description: "Produkty najlepiej sprzedające się.", title: "Bestsellery", subtitle: "Wspiera sprzedaż przez społeczny dowód słuszności.", cta: "Kup bestseller", tags: ["bestsellers"], industryTags: ["ecommerce"], styleTags: ["promo"] },
  { key: "promotions", name: "Promocje", description: "Sekcja z rabatami i promocjami.", title: "Promocje", subtitle: "Wyróżnij czasowe okazje i oferty specjalne.", cta: "Zobacz rabaty", tags: ["promotions"], industryTags: ["ecommerce"], styleTags: ["promo"] },
  { key: "cart-preview", name: "Koszyk preview", description: "Mini podgląd koszyka w sidebarze.", title: "Koszyk preview", subtitle: "Przyspiesza decyzję zakupową i podgląd wartości koszyka.", cta: "Przejdź do kasy", tags: ["cart"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "reviews", name: "Opinie produktów", description: "Opinie i oceny dla produktu.", title: "Opinie produktów", subtitle: "Buduje zaufanie na poziomie kart produktu.", cta: "Czytaj opinie", tags: ["reviews"], industryTags: ["ecommerce"], styleTags: ["trust"] },
  { key: "banner", name: "Banery sprzedażowe", description: "Banery promujące kategorie i sezonowe akcje.", title: "Banery sprzedażowe", subtitle: "Idealne do wyróżniania kampanii sprzedażowych.", cta: "Sprawdź ofertę", tags: ["banner"], industryTags: ["ecommerce"], styleTags: ["promo"] },
  { key: "collections", name: "Kolekcje", description: "Wybrane kolekcje produktów.", title: "Kolekcje", subtitle: "Łatwo grupuj produkty wg linii i stylu.", cta: "Zobacz kolekcje", tags: ["collections"], industryTags: ["ecommerce"], styleTags: ["minimal"] },
  { key: "new", name: "Nowości", description: "Świeże produkty i nowości w katalogu.", title: "Nowości", subtitle: "Promuje nowe dostawy i premiery.", cta: "Nowe produkty", tags: ["new", "ecommerce"], industryTags: ["ecommerce"], styleTags: ["shop"] },
  { key: "featured", name: "Polecane", description: "Polecane produkty i top picks.", title: "Polecane", subtitle: "Sekcja do podbijania najważniejszych pozycji.", cta: "Sprawdź polecane", tags: ["featured"], industryTags: ["ecommerce"], styleTags: ["premium"] },
];

const SPECIAL_VARIANTS: FamilyVariant[] = [
  { key: "animated-bg", name: "Animowane tła", description: "Sekcja z dynamicznym tłem i blurem.", title: "Animowane tła", subtitle: "Wzmacnia nowoczesny i aktywny charakter strony.", cta: "Zobacz efekt", tags: ["animated-background"], industryTags: ["startup"], styleTags: ["animated"] },
  { key: "glassmorphism", name: "Glassmorphism", description: "Szkło, blur i lekkość UI.", title: "Glassmorphism", subtitle: "Świetne dla premium, SaaS i nowoczesnych layoutów.", cta: "Sprawdź szkło", tags: ["glassmorphism"], industryTags: ["saas", "startup"], styleTags: ["glass"] },
  { key: "dark-mode", name: "Dark mode", description: "Ciemna sekcja z wyraźnym kontrastem.", title: "Dark mode", subtitle: "Dla marek premium i technologicznych.", cta: "Tryb ciemny", tags: ["dark-mode"], industryTags: ["saas", "agency"], styleTags: ["dark"] },
  { key: "gradient", name: "Gradientowe", description: "Gradienty i miękkie przejścia.", title: "Gradientowe sekcje", subtitle: "Dodają energii i głębi wizualnej.", cta: "Sprawdź gradient", tags: ["gradient"], industryTags: ["creative"], styleTags: ["gradient"] },
  { key: "3d", name: "3D", description: "Sekcje z efektem przestrzeni 3D.", title: "3D section", subtitle: "Mocny akcent dla nowoczesnych projektów.", cta: "Zobacz 3D", tags: ["3d"], industryTags: ["startup", "creative"], styleTags: ["futuristic"] },
  { key: "scroll", name: "Efekty scroll", description: "Sekcje z reakcją na przewijanie.", title: "Scroll effects", subtitle: "Przyciąga uwagę na długich stronach.", cta: "Uruchom scroll", tags: ["scroll-effects"], industryTags: ["creative"], styleTags: ["animated"] },
  { key: "counters", name: "Liczniki", description: "Liczby i statystyki z animacją.", title: "Liczniki", subtitle: "Pokazuje skalę firmy lub efekt projektu.", cta: "Zobacz liczby", tags: ["counters"], industryTags: ["business"], styleTags: ["technical"] },
  { key: "timeline", name: "Timeline", description: "Oś czasu i historia marki.", title: "Timeline", subtitle: "Idealna do prezentacji historii projektu.", cta: "Oś czasu", tags: ["timeline"], industryTags: ["agency", "portfolio"], styleTags: ["editorial"] },
  { key: "comparison", name: "Porównania", description: "Sekcja porównawcza produktów lub pakietów.", title: "Porównania", subtitle: "Pomaga pokazać przewagi oferty.", cta: "Porównaj", tags: ["comparison"], industryTags: ["business"], styleTags: ["technical"] },
  { key: "before-after", name: "Przed / po", description: "Porównanie efektów przed i po.", title: "Przed / po", subtitle: "Świetne do beauty, renovation i UX.", cta: "Zobacz zmianę", tags: ["before-after"], industryTags: ["beauty", "construction"], styleTags: ["visual"] },
  { key: "icons", name: "Z ikonami", description: "Sekcje z dużym zestawem ikon.", title: "Sekcje z ikonami", subtitle: "Nadają treści lekkości i czytelności.", cta: "Zobacz ikony", tags: ["icons"], industryTags: ["business"], styleTags: ["minimal"] },
  { key: "typography", name: "Duża typografia", description: "Typograficzne sekcje z mocnym layoutem.", title: "Duża typografia", subtitle: "Dla marek śmiałych i rozpoznawalnych.", cta: "Poznaj styl", tags: ["typography"], industryTags: ["luxury", "portfolio"], styleTags: ["editorial"] },
];

function buildSections() {
  return [
    ...expandFamily(buildFamilyDefinition("menu-i-nawigacje", "Menu i nawigacje", "navbar", ["navbar", "menu", "navigation"], NAVBAR_VARIANTS, NAVBAR_STYLES, "https://github.com/themesberg/flowbite-react", "Themesberg")),
    ...expandFamily(buildFamilyDefinition("sekcje-hero", "Sekcje Hero", "hero", ["hero", "landing"], HERO_VARIANTS, HERO_STYLES, "https://github.com/", "Community")),
    ...Object.entries(OFFERING_VARIANTS).flatMap(([familyKey, variants]) =>
      expandFamily(
        buildFamilyDefinition(
          "sekcje-ofertowe",
          "Sekcje ofertowe",
          familyKey,
          ["offer", familyKey],
          variants,
          OFFERING_STYLES,
          "https://github.com/",
          "Community"
        )
      )
    ),
    ...expandFamily(buildFamilyDefinition("sekcje-ecommerce", "Sekcje e-commerce", "ecommerce", ["ecommerce", "shop"], ECOMMERCE_VARIANTS, ECOMMERCE_STYLES, "https://github.com/", "Community")),
    ...expandFamily(buildFamilyDefinition("sekcje-specjalne", "Sekcje specjalne", "special", ["special", "animated"], SPECIAL_VARIANTS, SPECIAL_STYLES, "https://github.com/", "Community")),
  ];
}

const seedSections: SectionRecord[] = buildSections();

const pageTemplates: SectionPageTemplate[] = [
  {
    id: "service-business",
    slug: "firma-uslugowa",
    name: "Szablon dla firmy usługowej",
    industry: "usługi",
    style: "nowoczesny",
    description: "Navbar, hero, usługi, proces, opinie, FAQ, kontakt i footer.",
    sectionIds: seedSections.filter((section) => ["navbar", "hero", "services", "process", "testimonials", "faq", "contact", "footer"].some((tag) => section.tags.includes(tag))).slice(0, 8).map((section) => section.id),
    seoTitle: "Firma usługowa | Nowoczesna strona",
    seoDescription: "Szablon strony usługowej z sekcjami pod konwersję i zaufanie.",
    thumbnailUrl: seedSections[0]?.thumbnailUrl ?? "",
    status: "active",
    isPremium: false,
  },
  {
    id: "shop-template",
    slug: "sklep-internetowy",
    name: "Szablon dla sklepu",
    industry: "sklep internetowy",
    style: "sklepowy",
    description: "Navbar sklepowy, hero, kategorie, bestsellery, nowości i footer.",
    sectionIds: seedSections.filter((section) => ["ecommerce"].some((tag) => section.tags.includes(tag))).slice(0, 8).map((section) => section.id),
    seoTitle: "Sklep internetowy | Sekcje ecommerce",
    seoDescription: "Pełny szablon sklepu z gotowymi sekcjami sprzedażowymi.",
    thumbnailUrl: seedSections.find((section) => section.tags.includes("ecommerce"))?.thumbnailUrl ?? "",
    status: "active",
    isPremium: false,
  },
  {
    id: "portfolio-template",
    slug: "portfolio",
    name: "Szablon dla portfolio",
    industry: "portfolio",
    style: "elegancki",
    description: "Navbar, hero, o mnie, projekty, proces, opinie, kontakt i footer.",
    sectionIds: seedSections.filter((section) => ["portfolio", "gallery", "testimonials", "contact", "footer"].some((tag) => section.tags.includes(tag))).slice(0, 8).map((section) => section.id),
    seoTitle: "Portfolio | Kompletna strona",
    seoDescription: "Szablon portfolio z sekcjami prezentującymi projekty i kontakt.",
    thumbnailUrl: seedSections.find((section) => section.tags.includes("portfolio"))?.thumbnailUrl ?? "",
    status: "active",
    isPremium: false,
  },
  {
    id: "saas-template",
    slug: "saas",
    name: "Szablon SaaS",
    industry: "SaaS",
    style: "startupowy",
    description: "Navbar SaaS, hero, funkcje, pricing, FAQ, kontakt i footer.",
    sectionIds: seedSections.filter((section) => ["saas", "features", "pricing", "faq", "contact", "footer"].some((tag) => section.tags.includes(tag))).slice(0, 8).map((section) => section.id),
    seoTitle: "SaaS | Szablon landing page",
    seoDescription: "Szablon SaaS nastawiony na prezentację funkcji i sprzedaż.",
    thumbnailUrl: seedSections.find((section) => section.tags.includes("saas"))?.thumbnailUrl ?? "",
    status: "active",
    isPremium: true,
  },
];

export { categories as SECTION_LIBRARY_CATEGORY_DATA };
export { seedSections as SECTION_LIBRARY_SEED_SECTIONS };
export { pageTemplates as SECTION_LIBRARY_PAGE_TEMPLATES };
export { SOURCES as SECTION_LIBRARY_SOURCES };
export { LICENSES as SECTION_LIBRARY_LICENSES };

export function getSectionLibrarySeeds() {
  return seedSections;
}

export function getSectionLibrarySources() {
  return SOURCES;
}

export function getSectionLibraryPageTemplates() {
  return pageTemplates;
}

export function getSectionLibraryLicenses() {
  return LICENSES;
}

export function getSectionLibraryCategories() {
  return categories;
}

