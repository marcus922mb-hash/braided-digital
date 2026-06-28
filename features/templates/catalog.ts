import beauty from "@/templates/beauty/catalog.json";
import creative from "@/templates/creative/catalog.json";
import ecommerce from "@/templates/ecommerce/catalog.json";
import handmade from "@/templates/handmade/catalog.json";
import medical from "@/templates/medical/catalog.json";
import restaurant from "@/templates/restaurant/catalog.json";
import services from "@/templates/services/catalog.json";
import onepage from "@/templates/onepage/catalog.json";
import linkinbio from "@/templates/linkinbio/catalog.json";
import type { BuilderComponent, ComponentType } from "@/features/builder/types";
import type { ResolvedTemplate, TemplateDefinition } from "./types";

const rawCatalog = [
  ...handmade,
  ...beauty,
  ...restaurant,
  ...services,
  ...medical,
  ...creative,
  ...ecommerce,
  ...onepage,
  ...linkinbio,
] as unknown as TemplateDefinition[];

const animationSequence = ["fadeIn", "slideUp", "reveal", "zoomIn"] as const;

function block(
  template: TemplateDefinition,
  type: ComponentType,
  label: string,
  props: Record<string, unknown>,
  index: number,
  styles: BuilderComponent["styles"] = {}
): BuilderComponent {
  return {
    id: `${template.id}-${type}-${index}`,
    type,
    label,
    props,
    styles: {
      paddingTop: "6rem",
      paddingBottom: "6rem",
      background: index % 2 ? template.colors.light : template.colors.neutral,
      color: template.colors.dark,
      ...styles,
    },
    animations: {
      type: animationSequence[index % animationSequence.length],
      duration: 650,
      delay: Math.min(index * 40, 240),
      easing: "ease-out",
    },
    visibility: { desktop: true, tablet: true, mobile: true },
    children: [],
  };
}

// ── Standard multi-section website ───────────────────────────

function resolveTemplate(template: TemplateDefinition): ResolvedTemplate {
  const { copy, colors } = template;
  const components: BuilderComponent[] = [
    block(template, "navbar", "Nawigacja", {
      logoText: template.name,
      links: [
        { label: "O nas", href: "#o-nas" },
        { label: "Oferta", href: "#uslugi" },
        { label: "Galeria", href: "#galeria" },
        { label: "Kontakt", href: "#kontakt" },
      ],
      ctaText: "Kontakt",
      ctaUrl: "#kontakt",
      sticky: true,
    }, 0, { paddingTop: "1.25rem", paddingBottom: "1.25rem", background: colors.light }),
    block(template, "hero", "Hero", {
      badge: copy.eyebrow,
      title: copy.heroTitle,
      subtitle: copy.heroSubtitle,
      ctaText: "Poznaj ofertę",
      ctaUrl: "#uslugi",
      ctaSecondText: "Zobacz realizacje",
      ctaSecondUrl: "#galeria",
      backgroundImage: "",
      imagePlaceholder: true,
      replaceImageAction: "upload",
      overlayOpacity: 0.45,
    }, 1, {
      background: colors.dark,
      color: colors.light,
      minHeight: "88vh",
      paddingTop: "10rem",
      paddingBottom: "10rem",
    }),
    block(template, "about", "About", {
      badge: "O nas",
      title: copy.aboutTitle,
      content: copy.aboutText,
      imageUrl: "",
      imageAlt: `${template.industry} — zdjęcie pracowni`,
      imagePlaceholder: true,
      replaceImageAction: "upload",
      layout: "left",
    }, 2),
    block(template, "services", "Oferta", {
      title: "Oferta",
      subtitle: "Zakres dopasowany do Twoich potrzeb",
      columns: 3,
      items: copy.services.map((title, itemIndex) => ({
        icon: ["Sparkles", "Layers", "Heart"][itemIndex] ?? "Check",
        title,
        description: `Profesjonalna usługa ${title.toLowerCase()} prowadzona z dbałością o jakość i każdy detal.`,
      })),
    }, 3, { background: colors.light }),
    block(template, "cta", "CTA", {
      title: copy.ctaTitle,
      subtitle: "Napisz do nas — odpowiemy z konkretną propozycją kolejnego kroku.",
      primaryText: "Zacznijmy rozmowę",
      primaryUrl: "#kontakt",
      secondaryText: "Poznaj nas bliżej",
      secondaryUrl: "#o-nas",
    }, 4, { background: colors.primary, color: colors.light, textAlign: "center" }),
    block(template, "gallery", "Galeria", {
      title: "Wybrane realizacje",
      subtitle: "Jakość najlepiej widać w szczegółach",
      columns: 3,
      items: Array.from({ length: 6 }, (_, itemIndex) => ({
        imageUrl: "",
        imagePlaceholder: true,
        replaceImageAction: "upload",
        alt: `${template.industry} — realizacja ${itemIndex + 1}`,
        caption: `Realizacja ${String(itemIndex + 1).padStart(2, "0")}`,
      })),
    }, 5),
    block(template, "testimonials", "Opinie", {
      title: "Zaufanie zbudowane współpracą",
      subtitle: "Opinie klientów",
      items: [
        { name: "Anna K.", role: "Klientka", company: "", quote: "Wysoka jakość, świetny kontakt i efekt lepszy niż oczekiwałam.", avatar: "" },
        { name: "Michał R.", role: "Klient", company: "", quote: "Cały proces był przejrzysty, sprawny i dopracowany w każdym szczególe.", avatar: "" },
        { name: "Karolina M.", role: "Klientka", company: "", quote: "To dokładnie ten poziom estetyki i obsługi, którego szukałam.", avatar: "" },
      ],
    }, 6, { background: colors.dark, color: colors.light }),
    block(template, "faq", "FAQ", {
      title: "Najczęściej zadawane pytania",
      subtitle: "Wszystko, co warto wiedzieć przed rozpoczęciem",
      items: [
        { question: "Jak wygląda pierwszy krok?", answer: "Zaczynamy od krótkiej rozmowy o potrzebach, terminie i oczekiwanym efekcie." },
        { question: "Ile trwa realizacja?", answer: "Termin zależy od zakresu. Po konsultacji otrzymasz konkretny harmonogram." },
        { question: "Czy oferta jest dopasowana indywidualnie?", answer: "Tak. Zakres i wycenę przygotowujemy po poznaniu Twojej sytuacji." },
        { question: "Jak mogę zarezerwować termin?", answer: "Skorzystaj z formularza lub zadzwoń — potwierdzimy najbliższy dostępny termin." },
      ],
    }, 7),
    block(template, "contact", "Kontakt", {
      badge: "Kontakt",
      title: "Porozmawiajmy",
      subtitle: "Opowiedz krótko, czego potrzebujesz. Wrócimy z odpowiedzią.",
      email: "hello@twojamarka.pl",
      phone: "+48 000 000 000",
      address: "Warszawa, Polska",
      showForm: true,
      formTitle: "Napisz wiadomość",
    }, 8, { background: colors.light }),
    block(template, "footer", "Stopka", {
      logoText: template.name,
      copyright: `© 2026 ${template.name}. Wszelkie prawa zastrzeżone.`,
      columns: [
        { title: "Menu", links: [{ label: "O nas", href: "#o-nas" }, { label: "Oferta", href: "#uslugi" }] },
        { title: "Informacje", links: [{ label: "FAQ", href: "#faq" }, { label: "Kontakt", href: "#kontakt" }] },
        { title: "Social", links: [{ label: "Instagram", href: "#" }, { label: "Facebook", href: "#" }] },
      ],
    }, 9, { background: colors.dark, color: colors.light, paddingTop: "5rem", paddingBottom: "2rem" }),
  ];

  return buildResolvedTemplate(template, components);
}

// ── One Page (minimal, no navbar/footer redundancy) ───────────

function resolveOnePage(template: TemplateDefinition): ResolvedTemplate {
  const { copy, colors } = template;
  const sectionTypes = template.sections as string[];

  const allBlocks: BuilderComponent[] = [
    block(template, "hero", "Hero", {
      badge: copy.eyebrow,
      title: copy.heroTitle,
      subtitle: copy.heroSubtitle,
      ctaText: "Sprawdź ofertę",
      ctaUrl: "#oferta",
      ctaSecondText: "Kontakt",
      ctaSecondUrl: "#kontakt",
      backgroundImage: "",
      imagePlaceholder: true,
      overlayOpacity: 0.5,
    }, 0, { background: colors.dark, color: colors.light, minHeight: "100vh", paddingTop: "8rem", paddingBottom: "8rem" }),
  ];

  let idx = 1;

  if (sectionTypes.includes("about")) {
    allBlocks.push(block(template, "about", "O nas", {
      badge: "O nas",
      title: copy.aboutTitle,
      content: copy.aboutText,
      imageUrl: "",
      imagePlaceholder: true,
      layout: "left",
    }, idx++));
  }

  if (sectionTypes.includes("features")) {
    allBlocks.push(block(template, "features", "Cechy", {
      title: "Dlaczego my?",
      subtitle: "Kilka powodów, dla których warto",
      columns: 3,
      items: copy.services.map((title, i) => ({
        icon: ["Zap", "Shield", "Star", "Heart"][i] ?? "Check",
        title,
        description: `${title} — z dbałością o każdy szczegół.`,
      })),
    }, idx++, { background: colors.light }));
  }

  if (sectionTypes.includes("services")) {
    allBlocks.push(block(template, "services", "Oferta", {
      title: "Oferta",
      subtitle: "Dopasowane do Twoich potrzeb",
      columns: Math.min(copy.services.length, 3),
      items: copy.services.map((title, i) => ({
        icon: ["Sparkles", "Layers", "Heart", "Star"][i] ?? "Check",
        title,
        description: `${title} — profesjonalnie i z zaangażowaniem.`,
      })),
    }, idx++, { background: colors.neutral }));
  }

  if (sectionTypes.includes("pricing")) {
    allBlocks.push(block(template, "pricing", "Cennik", {
      title: "Cennik",
      subtitle: "Przejrzyste i uczciwe stawki",
      items: copy.services.map((title, i) => ({
        name: title,
        price: ["od 500 zł", "od 800 zł", "wycena indywidualna"][i] ?? "wycena",
        features: ["Wycena", "Realizacja", "Wsparcie"],
        cta: "Zapytaj",
        ctaUrl: "#kontakt",
        highlighted: i === 1,
      })),
    }, idx++, { background: colors.light }));
  }

  if (sectionTypes.includes("gallery")) {
    allBlocks.push(block(template, "gallery", "Galeria", {
      title: "Realizacje",
      subtitle: "Wybrane projekty",
      columns: 3,
      items: Array.from({ length: 4 }, (_, i) => ({
        imageUrl: "", imagePlaceholder: true, replaceImageAction: "upload",
        alt: `${template.industry} — realizacja ${i + 1}`,
        caption: `Projekt ${i + 1}`,
      })),
    }, idx++));
  }

  allBlocks.push(block(template, "cta", "CTA", {
    title: copy.ctaTitle,
    subtitle: "Napisz do nas. Odpowiemy z konkretną propozycją.",
    primaryText: "Skontaktuj się",
    primaryUrl: "#kontakt",
  }, idx++, { background: colors.primary, color: colors.light, textAlign: "center" }));

  allBlocks.push(block(template, "contact", "Kontakt", {
    badge: "Kontakt",
    title: "Napisz do nas",
    subtitle: "Chętnie odpowiemy na każde pytanie.",
    email: "hello@twojamarka.pl",
    phone: "+48 000 000 000",
    address: "Polska",
    showForm: true,
    formTitle: "Wiadomość",
  }, idx++, { background: colors.neutral }));

  return buildResolvedTemplate(template, allBlocks);
}

// ── Link in Bio ───────────────────────────────────────────────

function resolveLinkInBio(template: TemplateDefinition): ResolvedTemplate {
  const { copy, colors } = template;
  const components: BuilderComponent[] = [
    {
      id: `${template.id}-linkinbio-0`,
      type: "linkinbio",
      label: "Link in Bio",
      props: {
        name: template.name,
        bio: copy.aboutText,
        avatarUrl: "",
        avatarPlaceholder: true,
        backgroundStyle: "gradient",
        backgroundColor: colors.dark,
        accentColor: colors.primary,
        links: copy.services.map((label, i) => ({
          label,
          url: "#",
          icon: ["Globe", "Instagram", "ShoppingBag", "Mail", "Youtube", "Phone"][i] ?? "Link",
        })),
        socials: [
          { platform: "instagram", url: "" },
          { platform: "tiktok", url: "" },
          { platform: "facebook", url: "" },
        ],
      },
      styles: {
        background: colors.dark,
        color: colors.light,
        paddingTop: "2rem",
        paddingBottom: "2rem",
        minHeight: "100vh",
        textAlign: "center",
      },
      animations: { type: "fadeIn", duration: 500, delay: 0, easing: "ease-out" },
      visibility: { desktop: true, tablet: true, mobile: true },
      children: [],
    },
  ];

  return buildResolvedTemplate(template, components);
}

// ── Shared builder ────────────────────────────────────────────

function buildResolvedTemplate(template: TemplateDefinition, components: BuilderComponent[]): ResolvedTemplate {
  const { colors } = template;
  return {
    ...template,
    components,
    settings: {
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      fontFamily: template.fonts.body,
      colors,
      fonts: template.fonts,
      animationLibrary: ["fade", "slide", "scale", "reveal", "parallax", "sticky sections", "hover effects", "Framer Motion"],
      seo: {
        title: `${template.name} — ${template.industry}`,
        description: template.summary,
      },
      notFound: {
        title: "Ta strona wymknęła się z kadru",
        description: "Nie znaleźliśmy tego adresu. Wróć na stronę główną i spróbuj ponownie.",
        cta: "Wróć na stronę główną",
      },
      sourceTemplateId: template.id,
    },
  };
}

function resolveAny(template: TemplateDefinition): ResolvedTemplate {
  if (template.group === "one-page") return resolveOnePage(template);
  if (template.group === "link-in-bio") return resolveLinkInBio(template);
  return resolveTemplate(template);
}

export const templates = rawCatalog.map(resolveAny);

export function getTemplateById(id: string) {
  return templates.find((template) => template.id === id);
}
