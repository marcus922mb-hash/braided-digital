import { BagIcon, GlobeIcon, LinkIcon, ToolsIcon } from "@/components/icons";

export const navItems = [
  { href: "/oferta", label: "Oferta" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/proces", label: "Proces" },
  { href: "/cennik", label: "Cennik" },
  { href: "/o-mnie", label: "O mnie" },
  { href: "/faq", label: "FAQ" },
];

export const services = [
  { icon: GlobeIcon, number: "01", title: "Strony internetowe", short: "Przemyślane witryny, które budują zaufanie i prowadzą klienta do kontaktu.", details: ["indywidualny projekt", "wersja mobilna", "podstawowe SEO", "wdrożenie i instrukcja"] },
  { icon: BagIcon, number: "02", title: "Sklepy online", short: "Estetyczne i wygodne sklepy, w których produkt gra pierwszą rolę.", details: ["konfiguracja sprzedaży", "płatności i dostawy", "karty produktów", "wsparcie po starcie"] },
  { icon: LinkIcon, number: "03", title: "Link w bio", short: "Mała strona o dużym znaczeniu: wszystkie ważne miejsca Twojej marki w jednym.", details: ["spójność z marką", "czytelne CTA", "szybkie wdrożenie", "własna domena"] },
  { icon: ToolsIcon, number: "04", title: "WordPress & WooCommerce", short: "Pomoc techniczna, poprawki i rozwój istniejącej strony bez zbędnego chaosu.", details: ["naprawy i aktualizacje", "nowe podstrony", "optymalizacja", "konsultacje 1:1"] },
];

export const processSteps = [
  { number: "01", title: "Poznajmy się", text: "Krótka rozmowa o Twojej marce, odbiorcach i celu projektu. Ustalamy, czego naprawdę potrzebujesz." },
  { number: "02", title: "Kierunek i plan", text: "Porządkuję zakres, strukturę i styl. Otrzymujesz jasną wycenę oraz harmonogram bez niedopowiedzeń." },
  { number: "03", title: "Projekt i budowa", text: "Tworzę kolejne elementy, pokazuję postępy i zbieram feedback w uporządkowanych rundach." },
  { number: "04", title: "Start i wsparcie", text: "Testuję stronę, pomagam z publikacją i pokazuję Ci, jak swobodnie korzystać z gotowego rozwiązania." },
];

type PricingPlan = {
  slug: string;
  title: string;
  price: string;
  time: string;
  tag: string;
  lead: string;
  features: string[];
  featured?: boolean;
  handmade?: boolean;
};

export const pricing: PricingPlan[] = [
  { slug: "cyfrowa-wizytowka", title: "Cyfrowa wizytówka", price: "od 290 zł", time: "3-5 dni", tag: "Dobry początek", lead: "Prosta, estetyczna strona z najważniejszymi informacjami dla marki, która dopiero rusza.", features: ["jedna sekcja / ekran", "opis i dane kontaktowe", "wersja mobilna", "przycisk WhatsApp"] },
  { slug: "link-w-bio", title: "Link w bio", price: "od 390 zł", time: "5-7 dni", tag: "Dla social media", lead: "Własne miejsce na wszystkie linki, produkty i kontakt - spójne z charakterem marki.", features: ["do 8 linków lub sekcji", "indywidualne kolory", "wersja mobilna", "podpięcie domeny"] },
  { slug: "one-page", title: "One page", price: "od 690 zł", time: "1-2 tygodnie", tag: "Najlepszy na start", lead: "Pełna strona na jednym ekranie przewijania dla usług, rękodzieła i marek osobistych.", features: ["do 6 rozbudowanych sekcji", "oferta i o marce", "formularz kontaktowy", "podstawowe SEO"], featured: true },
  { slug: "strona-firmowa", title: "Strona firmowa", price: "od 1 390 zł", time: "2-4 tygodnie", tag: "Więcej przestrzeni", lead: "Wielostronicowy serwis dla firmy, która ma szerszą ofertę i chce budować widoczność.", features: ["do 5 podstron", "indywidualny kierunek", "formularz i SEO", "instrukcja obsługi"] },
  { slug: "mini-sklep-handmade", title: "Mini sklep handmade", price: "od 1 790 zł", time: "3-5 tygodni", tag: "Dla rękodzieła", lead: "Lekki sklep dla niewielkiej kolekcji - idealny, gdy sprzedajesz własne produkty w małych seriach.", features: ["do 10 produktów", "płatności i dostawa", "kupony rabatowe", "szkolenie z zamówień"], handmade: true },
  { slug: "sklep-online", title: "Sklep online", price: "od 2 890 zł", time: "4-7 tygodni", tag: "Pełna sprzedaż", lead: "Rozbudowany sklep dla marki gotowej rozwijać ofertę i prowadzić regularną sprzedaż online.", features: ["do 30 produktów", "kategorie i filtry", "płatności i dostawy", "analityka i szkolenie"] },
];

export const faqs = [
  { q: "Ile trwa stworzenie strony?", a: "Najczęściej od 3 do 5 tygodni. Sklep internetowy zwykle wymaga 5-8 tygodni. Dokładny termin zależy od zakresu i sprawnego przekazania materiałów." },
  { q: "Czy muszę mieć gotowe teksty i zdjęcia?", a: "Nie musisz mieć wszystkiego na pierwszą rozmowę. Pomogę Ci ustalić, jakie materiały będą potrzebne, przygotuję strukturę treści i podpowiem, jak zaplanować zdjęcia." },
  { q: "Czy strona będzie działać na telefonie?", a: "Tak. Każdy projekt przygotowuję i testuję na telefonach, tabletach oraz komputerach. Mobilna wygoda jest częścią procesu, nie dodatkiem." },
  { q: "Czy będę samodzielnie edytować stronę?", a: "Tak, jeśli wybierzemy rozwiązanie z panelem zarządzania. Przy przekazaniu otrzymasz krótką instrukcję dopasowaną do Twojej strony." },
  { q: "Jak wygląda płatność?", a: "Standardowo dzielę płatność na etapy: zadatek rezerwujący termin i pozostałą kwotę przed publikacją. Przy większych projektach możliwy jest dodatkowy etap." },
  { q: "Czy pomagasz także z istniejącym WordPressem?", a: "Tak. Mogę poprawić wygląd, dodać funkcje, uporządkować WooCommerce, rozwiązać konkretny problem lub zaplanować dalszy rozwój." },
  { q: "Czy zapewniasz domenę i hosting?", a: "Pomogę je wybrać i skonfigurować. Usługi są kupowane bezpośrednio na Twoje dane, dzięki czemu zachowujesz pełną kontrolę nad projektem." },
];
