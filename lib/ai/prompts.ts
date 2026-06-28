import { DEMO_INDUSTRY_LABELS, DEMO_STYLE_LABELS, parseDemoContent } from "@/features/demos/types";
import type { GenerateDemoContentInput } from "@/lib/ai/types";

export const DEMO_CONTENT_SYSTEM_PROMPT = `Jesteś strategiem marki, copywriterem UX i architektem informacji tworzącym kompletne, profesjonalne strony internetowe dla małych firm.

Tworzysz jeden spójny dokument strony: strukturę, nagłówki, treści, CTA, briefy zdjęć i SEO.

Pisz po polsku.

Styl ma być profesjonalny, konkretny i sprzedażowy, ale nienachalny.

Nie wymyślaj nieprawdziwych danych kontaktowych.

Nie obiecuj efektów, których nie da się zagwarantować.

Nie pisz ogólników typu „najlepsza jakość na rynku”.

Dopasuj język do branży klienta.

Demo ma wyglądać jak prawdziwa strona klienta.

Zwróć wyłącznie poprawny JSON zgodny dokładnie ze wskazanym kontraktem.`;

function labelFromMap<T extends string>(value: string | null, map: Record<T, string>) {
  if (!value) return null;
  return (map as Record<string, string>)[value] ?? value;
}

export function buildDemoContentPrompt(input: GenerateDemoContentInput) {
  const currentContent = parseDemoContent(input.currentContent);

  return `Wygeneruj kompletną stronę demo klienta jako jeden spójny JSON zgodny dokładnie z podanym kontraktem.

Dane klienta:
- Nazwa firmy: ${input.companyName || "brak"}
- Imię i nazwisko klienta: ${input.clientName || "brak"}
- Branża: ${labelFromMap(input.industry, DEMO_INDUSTRY_LABELS) || "brak"}
- Miasto: ${input.city || "brak"}
- Typ strony: ${input.websiteType || input.estimate?.websiteType || "brak"}
- Styl demo: ${labelFromMap(input.style, DEMO_STYLE_LABELS) || "brak"}
- Kolor główny: ${input.primaryColor || "brak"}
- Kolor dodatkowy: ${input.secondaryColor || "brak"}
- Opis działalności: ${input.businessDescription || "brak"}
- Lista usług: ${input.services || "brak"}
- Grupa docelowa: ${input.targetAudience || "brak"}
- Ton komunikacji: ${input.tone || "profesjonalny, ciepły, konkretny"}

Wycena:
${input.estimate ? JSON.stringify(input.estimate, null, 2) : "Brak powiązanej wyceny."}

Obecne treści demo, które możesz ulepszyć:
${JSON.stringify(currentContent, null, 2)}

Wymagana struktura odpowiedzi (nie pomijaj żadnego pola):
{
  "schemaVersion": 2,
  "site": {
    "name": "",
    "language": "pl",
    "style": "",
    "colors": { "primary": "#000000", "secondary": "#000000", "background": "#ffffff", "text": "#111111" }
  },
  "navigation": {
    "logoText": "",
    "links": [{ "label": "", "href": "#sekcja" }],
    "cta": { "label": "", "href": "#kontakt" }
  },
  "headings": {
    "services": { "eyebrow": "", "title": "", "subtitle": "" },
    "features": { "eyebrow": "", "title": "", "subtitle": "" },
    "process": { "eyebrow": "", "title": "", "subtitle": "" },
    "testimonials": { "eyebrow": "", "title": "", "subtitle": "" },
    "faq": { "eyebrow": "", "title": "", "subtitle": "" }
  },
  "hero": {
    "eyebrow": "",
    "title": "",
    "subtitle": "",
    "cta": "",
    "primaryCta": { "label": "", "href": "#kontakt" },
    "secondaryCta": { "label": "", "href": "#o-nas" },
    "image": { "url": "", "alt": "", "description": "", "provider": "placeholder" }
  },
  "about": {
    "eyebrow": "",
    "title": "",
    "content": "",
    "image": { "url": "", "alt": "", "description": "", "provider": "placeholder" }
  },
  "services": [{ "title": "", "description": "", "icon": "" }],
  "features": [{ "title": "", "description": "", "icon": "" }],
  "process": [{ "title": "", "description": "" }],
  "gallery": {
    "eyebrow": "",
    "title": "",
    "subtitle": "",
    "items": [
      { "url": "", "alt": "", "description": "", "provider": "placeholder" }
    ]
  },
  "testimonials": [{ "name": "", "role": "", "content": "" }],
  "faq": [{ "question": "", "answer": "" }],
  "cta": {
    "eyebrow": "",
    "title": "",
    "description": "",
    "primaryCta": { "label": "", "href": "#kontakt" },
    "secondaryCta": { "label": "", "href": "#galeria" }
  },
  "contact": {
    "eyebrow": "",
    "title": "",
    "description": "",
    "cta": "",
    "email": null,
    "phone": null,
    "address": null
  },
  "footer": {
    "description": "",
    "columns": [{ "title": "", "links": [{ "label": "", "href": "#sekcja" }] }],
    "copyright": ""
  },
  "seo": {
    "title": "",
    "description": "",
    "keywords": [""],
    "ogImage": { "url": "", "alt": "", "description": "", "provider": "placeholder" }
  },
  "structure": [
    { "type": "navigation", "id": "nawigacja", "visible": true },
    { "type": "hero", "id": "start", "visible": true },
    { "type": "about", "id": "o-nas", "visible": true },
    { "type": "services", "id": "uslugi", "visible": true },
    { "type": "features", "id": "wyrozniki", "visible": true },
    { "type": "gallery", "id": "galeria", "visible": true },
    { "type": "process", "id": "proces", "visible": true },
    { "type": "testimonials", "id": "opinie", "visible": true },
    { "type": "faq", "id": "faq", "visible": true },
    { "type": "cta", "id": "cta", "visible": true },
    { "type": "contact", "id": "kontakt", "visible": true },
    { "type": "footer", "id": "stopka", "visible": true }
  ]
}

Zasady:
- Zwróć tylko JSON, bez markdown i bez komentarzy.
- Nie twórz adresu e-mail, numeru telefonu ani fizycznego adresu.
- Opinie mają brzmieć jak neutralne przykłady demo, bez nazwisk.
- Pola image.url pozostaw puste, provider ustaw na "placeholder", a description napisz jako precyzyjne zapytanie fotograficzne dopasowane do branży.
- Używaj wyłącznie kotwic do sekcji obecnych w structure.
- Wygeneruj 3-6 usług, 3-4 wyróżniki, 3-4 kroki procesu, 3-6 zdjęć galerii, 2-3 opinie i 4-6 pytań FAQ.
- Tytuł SEO powinien mieć około 50-60 znaków, a opis około 140-160 znaków.
- Teksty mają pasować do małej firmy i wyglądać jak gotowe do pokazania klientowi.`;
}
