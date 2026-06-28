import beauty from "@/templates/beauty/catalog.json";
import creative from "@/templates/creative/catalog.json";
import ecommerce from "@/templates/ecommerce/catalog.json";
import handmade from "@/templates/handmade/catalog.json";
import medical from "@/templates/medical/catalog.json";
import restaurant from "@/templates/restaurant/catalog.json";
import services from "@/templates/services/catalog.json";
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
    block(template, "services", "Services", {
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
    block(template, "gallery", "Gallery", {
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
    block(template, "testimonials", "Testimonials", {
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
    block(template, "contact", "Contact", {
      badge: "Kontakt",
      title: "Porozmawiajmy",
      subtitle: "Opowiedz krótko, czego potrzebujesz. Wrócimy z odpowiedzią.",
      email: "hello@twojamarka.pl",
      phone: "+48 000 000 000",
      address: "Warszawa, Polska",
      showForm: true,
      formTitle: "Napisz wiadomość",
    }, 8, { background: colors.light }),
    block(template, "footer", "Footer", {
      logoText: template.name,
      copyright: `© 2026 ${template.name}. Wszelkie prawa zastrzeżone.`,
      columns: [
        { title: "Menu", links: [{ label: "O nas", href: "#o-nas" }, { label: "Oferta", href: "#uslugi" }] },
        { title: "Informacje", links: [{ label: "FAQ", href: "#faq" }, { label: "Kontakt", href: "#kontakt" }] },
        { title: "Social", links: [{ label: "Instagram", href: "#" }, { label: "Facebook", href: "#" }] },
      ],
    }, 9, { background: colors.dark, color: colors.light, paddingTop: "5rem", paddingBottom: "2rem" }),
  ];

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

export const templates = rawCatalog.map(resolveTemplate);

export function getTemplateById(id: string) {
  return templates.find((template) => template.id === id);
}
