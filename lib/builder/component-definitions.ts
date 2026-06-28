import type { ComponentDefinition, PropSchema } from "@/features/builder/types";

export const COMPONENT_DEFINITIONS: ComponentDefinition[] = [
  // ── LAYOUT ──────────────────────────────────────────────
  {
    type: "navbar",
    label: "Nawigacja",
    category: "layout",
    description: "Górna belka nawigacyjna z logo i linkami",
    defaultProps: {
      logoText: "Twoja Firma",
      logoUrl: "/",
      links: [
        { label: "O nas", href: "#o-nas" },
        { label: "Usługi", href: "#uslugi" },
        { label: "Kontakt", href: "#kontakt" },
      ],
      ctaText: "Skontaktuj się",
      ctaUrl: "#kontakt",
      sticky: true,
    },
    defaultStyles: { background: "#ffffff", paddingTop: "1rem", paddingBottom: "1rem" },
  },
  {
    type: "footer",
    label: "Stopka",
    category: "layout",
    description: "Stopka strony z linkami i prawami autorskimi",
    defaultProps: {
      logoText: "Twoja Firma",
      copyright: "© 2025 Twoja Firma. Wszelkie prawa zastrzeżone.",
      columns: [
        { title: "Firma", links: [{ label: "O nas", href: "#" }, { label: "Kariera", href: "#" }] },
        { title: "Usługi", links: [{ label: "Strony www", href: "#" }, { label: "SEO", href: "#" }] },
        { title: "Kontakt", links: [{ label: "Napisz do nas", href: "#" }, { label: "LinkedIn", href: "#" }] },
      ],
    },
    defaultStyles: { background: "#111111", color: "#ffffff", paddingTop: "4rem", paddingBottom: "2rem" },
  },
  // ── CONTENT ─────────────────────────────────────────────
  {
    type: "hero",
    label: "Hero",
    category: "content",
    description: "Sekcja powitalna z tytułem, opisem i przyciskiem CTA",
    defaultProps: {
      title: "Tworzymy wyjątkowe strony internetowe",
      subtitle: "Profesjonalne strony www dla firm, które chcą wyróżnić się na rynku.",
      ctaText: "Skontaktuj się",
      ctaUrl: "#kontakt",
      ctaSecondText: "Zobacz realizacje",
      ctaSecondUrl: "#realizacje",
      backgroundImage: "",
      overlayOpacity: 0.5,
    },
    defaultStyles: {
      background: "#1a1a2e",
      color: "#ffffff",
      paddingTop: "8rem",
      paddingBottom: "8rem",
      textAlign: "center",
      minHeight: "80vh",
    },
  },
  {
    type: "about",
    label: "O nas",
    category: "content",
    description: "Sekcja przedstawiająca firmę z tekstem i zdjęciem",
    defaultProps: {
      title: "Kim jesteśmy",
      content: "Jesteśmy zespołem pasjonatów tworzących nowoczesne rozwiązania cyfrowe. Od lat pomagamy firmom budować silną obecność online.",
      imageUrl: "",
      imageAlt: "Zdjęcie zespołu",
      layout: "left",
      badge: "O nas",
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  {
    type: "services",
    label: "Usługi",
    category: "content",
    description: "Siatka kart usług z ikonami i opisami",
    defaultProps: {
      title: "Nasze usługi",
      subtitle: "Kompleksowa obsługa Twojego biznesu online",
      columns: 3,
      items: [
        { icon: "Globe", title: "Strony internetowe", description: "Profesjonalne strony www dopasowane do Twojej marki." },
        { icon: "Smartphone", title: "Aplikacje mobilne", description: "Natywne i webowe aplikacje mobilne." },
        { icon: "BarChart", title: "Marketing cyfrowy", description: "Kampanie reklamowe i pozycjonowanie." },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" },
  },
  {
    type: "features",
    label: "Cechy",
    category: "content",
    description: "Lista cech i korzyści produktu lub usługi",
    defaultProps: {
      title: "Dlaczego my?",
      subtitle: "Wybierz profesjonalistów z doświadczeniem",
      items: [
        { icon: "CheckCircle", title: "Szybka realizacja", description: "Projekty dostarczamy w terminie." },
        { icon: "Shield", title: "Bezpieczeństwo", description: "Najwyższe standardy bezpieczeństwa." },
        { icon: "Headphones", title: "Wsparcie 24/7", description: "Zawsze jesteśmy do Twojej dyspozycji." },
        { icon: "Star", title: "Wysoka jakość", description: "Dbamy o każdy detal projektu." },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  {
    type: "gallery",
    label: "Galeria",
    category: "content",
    description: "Siatka zdjęć realizacji lub portfolio",
    defaultProps: {
      title: "Nasze realizacje",
      subtitle: "Zobacz wybrane projekty",
      columns: 3,
      items: [
        { imageUrl: "", alt: "Projekt 1", caption: "Strona firmowa" },
        { imageUrl: "", alt: "Projekt 2", caption: "Sklep online" },
        { imageUrl: "", alt: "Projekt 3", caption: "Aplikacja mobilna" },
        { imageUrl: "", alt: "Projekt 4", caption: "Landing page" },
        { imageUrl: "", alt: "Projekt 5", caption: "Portal informacyjny" },
        { imageUrl: "", alt: "Projekt 6", caption: "System CRM" },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  {
    type: "testimonials",
    label: "Opinie",
    category: "content",
    description: "Opinie i referencje klientów",
    defaultProps: {
      title: "Co mówią nasi klienci",
      subtitle: "Zaufali nam i polecają nas dalej",
      items: [
        { name: "Anna Kowalska", role: "CEO", company: "TechStartup", quote: "Świetna współpraca i profesjonalne podejście. Polecam z całego serca!", avatar: "" },
        { name: "Marek Nowak", role: "Dyrektor marketingu", company: "BrandAgency", quote: "Strona przekroczyła nasze oczekiwania. Konwersja wzrosła o 40%.", avatar: "" },
        { name: "Katarzyna Wiśniewska", role: "Właścicielka", company: "BoutiqueShop", quote: "Profesjonalizm i terminowość na najwyższym poziomie.", avatar: "" },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem", background: "#f9f9f9" },
  },
  {
    type: "faq",
    label: "FAQ",
    category: "content",
    description: "Najczęściej zadawane pytania w formie akordeonu",
    defaultProps: {
      title: "Często zadawane pytania",
      subtitle: "Odpowiedzi na Twoje pytania",
      items: [
        { question: "Ile kosztuje strona internetowa?", answer: "Ceny zaczynają się od 2 000 zł. Ostateczna wycena zależy od zakresu projektu." },
        { question: "Ile trwa realizacja?", answer: "Standardowy projekt realizujemy w 2-4 tygodnie." },
        { question: "Czy oferujecie wsparcie po wdrożeniu?", answer: "Tak, oferujemy różne pakiety wsparcia i utrzymania." },
        { question: "Czy mogę edytować stronę samodzielnie?", answer: "Oczywiście — dostarczamy intuicyjny panel administracyjny." },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  {
    type: "pricing",
    label: "Cennik",
    category: "content",
    description: "Tabela cenowa z pakietami i funkcjami",
    defaultProps: {
      title: "Cennik",
      subtitle: "Wybierz pakiet dopasowany do potrzeb",
      items: [
        { name: "Starter", price: "1 990", period: "jednorazowo", features: ["Do 5 podstron", "Formularz kontaktowy", "Responsywność", "SSL"], highlighted: false, ctaText: "Wybierz" },
        { name: "Business", price: "3 990", period: "jednorazowo", features: ["Do 15 podstron", "Blog", "SEO bazowe", "Panel CMS", "Wsparcie 3 mies."], highlighted: true, ctaText: "Najpopularniejszy" },
        { name: "Enterprise", price: "8 990", period: "jednorazowo", features: ["Nielimitowane podstrony", "Sklep online", "SEO zaawansowane", "Integracje API", "Wsparcie 12 mies."], highlighted: false, ctaText: "Wybierz" },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" },
  },
  {
    type: "cta",
    label: "CTA",
    category: "content",
    description: "Sekcja wezwania do działania",
    defaultProps: {
      title: "Gotowy na nową stronę?",
      subtitle: "Skontaktuj się z nami i otrzymaj bezpłatną wycenę.",
      primaryText: "Bezpłatna wycena",
      primaryUrl: "#kontakt",
      secondaryText: "Zobacz portfolio",
      secondaryUrl: "#portfolio",
    },
    defaultStyles: {
      background: "#d4a83a",
      color: "#000000",
      paddingTop: "5rem",
      paddingBottom: "5rem",
      textAlign: "center",
    },
  },
  {
    type: "statistics",
    label: "Statystyki",
    category: "content",
    description: "Liczby i wskaźniki sukcesu",
    defaultProps: {
      title: "Nasze liczby",
      items: [
        { number: "150+", label: "Projektów" },
        { number: "8 lat", label: "Doświadczenia" },
        { number: "98%", label: "Zadowolonych klientów" },
        { number: "24/7", label: "Wsparcie" },
      ],
    },
    defaultStyles: { paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" },
  },
  {
    type: "team",
    label: "Zespół",
    category: "content",
    description: "Prezentacja członków zespołu",
    defaultProps: {
      title: "Nasz zespół",
      subtitle: "Eksperci, którzy zadbają o Twój projekt",
      columns: 4,
      items: [
        { name: "Jan Kowalski", role: "CEO & Founder", bio: "15 lat doświadczenia w branży IT.", imageUrl: "" },
        { name: "Anna Nowak", role: "Lead Designer", bio: "Specjalistka od UX/UI.", imageUrl: "" },
        { name: "Piotr Wiśniewski", role: "CTO", bio: "Architekt systemów i rozwiązań webowych.", imageUrl: "" },
        { name: "Maria Jabłońska", role: "Marketing Manager", bio: "Ekspertka od marketingu cyfrowego.", imageUrl: "" },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" },
  },
  {
    type: "timeline",
    label: "Historia",
    category: "content",
    description: "Oś czasu z historią firmy lub projektu",
    defaultProps: {
      title: "Nasza historia",
      subtitle: "Jak doszliśmy do tego, gdzie jesteśmy",
      items: [
        { year: "2015", title: "Założenie firmy", description: "Zaczęliśmy od małego studia projektowego." },
        { year: "2018", title: "Pierwszych 50 klientów", description: "Rozrosliśmy się do 8-osobowego zespołu." },
        { year: "2021", title: "Ekspansja", description: "Otworzyliśmy drugie biuro w Krakowie." },
        { year: "2024", title: "150+ projektów", description: "Zostaliśmy uznanym liderem rynku." },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  {
    type: "steps",
    label: "Kroki",
    category: "content",
    description: "Proces krok po kroku",
    defaultProps: {
      title: "Jak działamy",
      subtitle: "Prosty proces realizacji projektu",
      items: [
        { step: "01", title: "Rozmowa", description: "Poznajemy Twoje potrzeby i cele biznesowe." },
        { step: "02", title: "Wycena", description: "Przygotowujemy szczegółową ofertę." },
        { step: "03", title: "Realizacja", description: "Projektujemy i wdrażamy stronę." },
        { step: "04", title: "Wdrożenie", description: "Strona trafia na serwer i zaczyna działać." },
      ],
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  {
    type: "contact",
    label: "Kontakt",
    category: "content",
    description: "Formularz kontaktowy z danymi firmy",
    defaultProps: {
      title: "Kontakt",
      subtitle: "Napisz do nas lub zadzwoń",
      email: "kontakt@twojafirma.pl",
      phone: "+48 123 456 789",
      address: "ul. Przykładowa 1, 00-001 Warszawa",
      showForm: true,
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  // ── MEDIA ────────────────────────────────────────────────
  {
    type: "video",
    label: "Wideo",
    category: "media",
    description: "Osadzone wideo z YouTube lub Vimeo",
    defaultProps: {
      title: "Obejrzyj nasz film",
      videoUrl: "",
      poster: "",
      caption: "",
      autoplay: false,
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" },
  },
  {
    type: "map",
    label: "Mapa",
    category: "media",
    description: "Mapa Google Maps z lokalizacją firmy",
    defaultProps: {
      title: "Gdzie nas znajdziesz",
      address: "ul. Przykładowa 1, 00-001 Warszawa",
      embedUrl: "",
      zoom: 15,
    },
    defaultStyles: { paddingTop: "3rem", paddingBottom: "0" },
  },
  // ── SOCIAL & FEEDS ────────────────────────────────────────
  {
    type: "newsletter",
    label: "Newsletter",
    category: "social",
    description: "Formularz zapisu do newslettera",
    defaultProps: {
      title: "Bądź na bieżąco",
      subtitle: "Zapisz się do naszego newslettera i otrzymuj najnowsze informacje.",
      placeholder: "Twój adres email",
      buttonText: "Zapisz się",
      privacyText: "Nie wysyłamy spamu. W każdej chwili możesz się wypisać.",
    },
    defaultStyles: {
      paddingTop: "5rem",
      paddingBottom: "5rem",
      textAlign: "center",
      background: "#f5f5f5",
    },
  },
  {
    type: "instagram",
    label: "Instagram Feed",
    category: "social",
    description: "Feed z Instagrama (wymaga integracji API)",
    defaultProps: {
      title: "Śledź nas na Instagramie",
      handle: "@twojafirma",
      profileUrl: "",
      count: 9,
    },
    defaultStyles: { paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" },
  },
  {
    type: "tiktok",
    label: "TikTok Feed",
    category: "social",
    description: "Feed z TikToka (placeholder — wymaga integracji)",
    defaultProps: {
      title: "Znajdź nas na TikToku",
      handle: "@twojafirma",
      count: 6,
    },
    defaultStyles: { paddingTop: "4rem", paddingBottom: "4rem", textAlign: "center" },
  },
  // ── COMMERCE ─────────────────────────────────────────────
  {
    type: "woo-products",
    label: "Produkty WooCommerce",
    category: "commerce",
    description: "Siatka produktów z WooCommerce (placeholder)",
    defaultProps: {
      title: "Nasze produkty",
      subtitle: "Sprawdź naszą ofertę",
      count: 6,
      category: "",
      columns: 3,
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  // ── BLOG ─────────────────────────────────────────────────
  {
    type: "blog",
    label: "Blog",
    category: "commerce",
    description: "Najnowsze wpisy blogowe (placeholder)",
    defaultProps: {
      title: "Aktualności",
      subtitle: "Najnowsze artykuły i porady",
      count: 3,
      category: "",
      showDate: true,
    },
    defaultStyles: { paddingTop: "5rem", paddingBottom: "5rem" },
  },
  {
    type: "linkinbio",
    label: "Link in Bio",
    category: "social",
    description: "Strona profilu z listą linków (Linktree style)",
    defaultProps: {
      name: "Twoje Imię / Marka",
      bio: "Krótki opis — kim jesteś i czym się zajmujesz.",
      avatarUrl: "",
      avatarPlaceholder: true,
      backgroundStyle: "gradient",
      backgroundColor: "#1a1a2e",
      accentColor: "#b08d57",
      links: [
        { label: "Moja strona", url: "https://example.com", icon: "Globe" },
        { label: "Instagram", url: "https://instagram.com", icon: "Instagram" },
        { label: "Sklep online", url: "https://example.com/sklep", icon: "ShoppingBag" },
        { label: "Napisz do mnie", url: "mailto:hello@example.com", icon: "Mail" },
      ],
      socials: [
        { platform: "instagram", url: "" },
        { platform: "tiktok", url: "" },
        { platform: "facebook", url: "" },
      ],
    },
    defaultStyles: {
      background: "#1a1a2e",
      color: "#ffffff",
      paddingTop: "3rem",
      paddingBottom: "3rem",
      minHeight: "100vh",
      textAlign: "center",
    },
  },
];

export const COMPONENT_CATEGORIES = [
  { key: "layout", label: "Układ" },
  { key: "content", label: "Treść" },
  { key: "media", label: "Media" },
  { key: "social", label: "Social" },
  { key: "commerce", label: "Sklep / Blog" },
] as const;

export function getComponentDefinition(type: string): ComponentDefinition | undefined {
  return COMPONENT_DEFINITIONS.find((d) => d.type === type);
}

export const PROP_SCHEMAS: PropSchema[] = [
  {
    type: "hero",
    fields: [
      { key: "title", label: "Tytuł", type: "text", placeholder: "Wpisz tytuł hero" },
      { key: "subtitle", label: "Podtytuł", type: "textarea", placeholder: "Wpisz podtytuł" },
      { key: "ctaText", label: "Tekst przycisku CTA", type: "text" },
      { key: "ctaUrl", label: "Link CTA", type: "text" },
      { key: "ctaSecondText", label: "Drugi przycisk (tekst)", type: "text" },
      { key: "ctaSecondUrl", label: "Drugi przycisk (link)", type: "text" },
      { key: "backgroundImage", label: "Zdjęcie tła (URL)", type: "image" },
    ],
  },
  {
    type: "navbar",
    fields: [
      { key: "logoText", label: "Tekst logo", type: "text" },
      { key: "logoUrl", label: "Link logo", type: "text" },
      { key: "ctaText", label: "Przycisk CTA (tekst)", type: "text" },
      { key: "ctaUrl", label: "Przycisk CTA (link)", type: "text" },
      { key: "sticky", label: "Przyklejona nawigacja", type: "boolean" },
      {
        key: "links", label: "Linki nawigacji", type: "list",
        itemFields: [
          { key: "label", label: "Etykieta", type: "text" },
          { key: "href", label: "Link", type: "text" },
        ],
      },
    ],
  },
  {
    type: "about",
    fields: [
      { key: "badge", label: "Etykietka", type: "text" },
      { key: "title", label: "Tytuł", type: "text" },
      { key: "content", label: "Treść", type: "textarea" },
      { key: "imageUrl", label: "Zdjęcie (URL)", type: "image" },
      { key: "imageAlt", label: "Alt zdjęcia", type: "text" },
      {
        key: "layout", label: "Układ", type: "select",
        options: [{ value: "left", label: "Zdjęcie po lewej" }, { value: "right", label: "Zdjęcie po prawej" }, { value: "center", label: "Wyśrodkowany" }],
      },
    ],
  },
  {
    type: "services",
    fields: [
      { key: "title", label: "Tytuł sekcji", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "columns", label: "Kolumny", type: "select",
        options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }],
      },
      {
        key: "items", label: "Usługi", type: "list",
        itemFields: [
          { key: "title", label: "Nazwa usługi", type: "text" },
          { key: "description", label: "Opis", type: "textarea" },
          { key: "icon", label: "Ikona (Lucide)", type: "text" },
        ],
      },
    ],
  },
  {
    type: "features",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "items", label: "Cechy", type: "list",
        itemFields: [
          { key: "title", label: "Tytuł", type: "text" },
          { key: "description", label: "Opis", type: "textarea" },
          { key: "icon", label: "Ikona", type: "text" },
        ],
      },
    ],
  },
  {
    type: "gallery",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "columns", label: "Kolumny", type: "select",
        options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }],
      },
      {
        key: "items", label: "Zdjęcia", type: "list",
        itemFields: [
          { key: "imageUrl", label: "URL zdjęcia", type: "image" },
          { key: "alt", label: "Alt tekst", type: "text" },
          { key: "caption", label: "Podpis", type: "text" },
        ],
      },
    ],
  },
  {
    type: "testimonials",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "items", label: "Opinie", type: "list",
        itemFields: [
          { key: "name", label: "Imię i nazwisko", type: "text" },
          { key: "role", label: "Stanowisko", type: "text" },
          { key: "company", label: "Firma", type: "text" },
          { key: "quote", label: "Cytat", type: "textarea" },
          { key: "avatar", label: "Zdjęcie (URL)", type: "image" },
        ],
      },
    ],
  },
  {
    type: "faq",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "items", label: "Pytania i odpowiedzi", type: "list",
        itemFields: [
          { key: "question", label: "Pytanie", type: "text" },
          { key: "answer", label: "Odpowiedź", type: "textarea" },
        ],
      },
    ],
  },
  {
    type: "pricing",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "items", label: "Pakiety", type: "list",
        itemFields: [
          { key: "name", label: "Nazwa pakietu", type: "text" },
          { key: "price", label: "Cena", type: "text" },
          { key: "period", label: "Okres", type: "text" },
          { key: "ctaText", label: "Tekst przycisku", type: "text" },
          { key: "highlighted", label: "Wyróżniony", type: "boolean" },
        ],
      },
    ],
  },
  {
    type: "cta",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "textarea" },
      { key: "primaryText", label: "Przycisk główny (tekst)", type: "text" },
      { key: "primaryUrl", label: "Przycisk główny (link)", type: "text" },
      { key: "secondaryText", label: "Przycisk drugi (tekst)", type: "text" },
      { key: "secondaryUrl", label: "Przycisk drugi (link)", type: "text" },
    ],
  },
  {
    type: "statistics",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      {
        key: "items", label: "Statystyki", type: "list",
        itemFields: [
          { key: "number", label: "Liczba / wartość", type: "text" },
          { key: "label", label: "Etykieta", type: "text" },
        ],
      },
    ],
  },
  {
    type: "team",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "columns", label: "Kolumny", type: "select",
        options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }],
      },
      {
        key: "items", label: "Członkowie zespołu", type: "list",
        itemFields: [
          { key: "name", label: "Imię i nazwisko", type: "text" },
          { key: "role", label: "Stanowisko", type: "text" },
          { key: "bio", label: "Bio", type: "textarea" },
          { key: "imageUrl", label: "Zdjęcie (URL)", type: "image" },
        ],
      },
    ],
  },
  {
    type: "timeline",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "items", label: "Punkty osi czasu", type: "list",
        itemFields: [
          { key: "year", label: "Rok / data", type: "text" },
          { key: "title", label: "Tytuł", type: "text" },
          { key: "description", label: "Opis", type: "textarea" },
        ],
      },
    ],
  },
  {
    type: "steps",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      {
        key: "items", label: "Kroki", type: "list",
        itemFields: [
          { key: "step", label: "Numer kroku", type: "text" },
          { key: "title", label: "Tytuł", type: "text" },
          { key: "description", label: "Opis", type: "textarea" },
        ],
      },
    ],
  },
  {
    type: "contact",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Telefon", type: "text" },
      { key: "address", label: "Adres", type: "text" },
      { key: "showForm", label: "Pokaż formularz", type: "boolean" },
    ],
  },
  {
    type: "footer",
    fields: [
      { key: "logoText", label: "Tekst logo", type: "text" },
      { key: "copyright", label: "Prawa autorskie", type: "text" },
    ],
  },
  {
    type: "video",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "videoUrl", label: "URL wideo (YouTube/Vimeo)", type: "text" },
      { key: "caption", label: "Podpis", type: "text" },
      { key: "autoplay", label: "Autoodtwarzanie", type: "boolean" },
    ],
  },
  {
    type: "map",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "address", label: "Adres", type: "text" },
      { key: "embedUrl", label: "URL embed mapy (Google Maps)", type: "text" },
    ],
  },
  {
    type: "newsletter",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "textarea" },
      { key: "placeholder", label: "Placeholder pola email", type: "text" },
      { key: "buttonText", label: "Tekst przycisku", type: "text" },
      { key: "privacyText", label: "Nota prywatności", type: "text" },
    ],
  },
  {
    type: "instagram",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "handle", label: "Nazwa użytkownika (@)", type: "text" },
      { key: "profileUrl", label: "Link do profilu", type: "text" },
      { key: "count", label: "Liczba postów", type: "number" },
    ],
  },
  {
    type: "tiktok",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "handle", label: "Nazwa użytkownika (@)", type: "text" },
      { key: "count", label: "Liczba filmów", type: "number" },
    ],
  },
  {
    type: "woo-products",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      { key: "count", label: "Liczba produktów", type: "number" },
      { key: "category", label: "Kategoria (slug)", type: "text" },
      {
        key: "columns", label: "Kolumny", type: "select",
        options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }],
      },
    ],
  },
  {
    type: "blog",
    fields: [
      { key: "title", label: "Tytuł", type: "text" },
      { key: "subtitle", label: "Podtytuł", type: "text" },
      { key: "count", label: "Liczba wpisów", type: "number" },
      { key: "category", label: "Kategoria", type: "text" },
      { key: "showDate", label: "Pokaż datę", type: "boolean" },
    ],
  },
];

export function getPropSchema(type: string): PropSchema | undefined {
  return PROP_SCHEMAS.find((s) => s.type === type);
}
