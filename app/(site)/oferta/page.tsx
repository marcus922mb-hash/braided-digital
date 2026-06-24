import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, CheckIcon } from "@/components/icons";
import { CtaBand, PageHero } from "@/components/ui";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Oferta",
  description: "Strony internetowe, małe sklepy, linki w bio oraz pomoc WordPress i WooCommerce dla małych firm.",
  alternates: canonical("/oferta"),
};

const services = [
  {
    id: "strony", number: "01", title: "Strony internetowe", price: "od 390 zł",
    intro: "Od cyfrowej wizytówki po pełną stronę firmową. Układam treść tak, żeby klient szybko zrozumiał ofertę i wiedział, co zrobić dalej.",
    scope: ["indywidualny układ", "wersja mobilna", "formularz lub WhatsApp", "podstawowe SEO", "wdrożenie domeny"],
    goodFor: "usługi lokalne, marki osobiste, małe pracownie",
  },
  {
    id: "sklepy", number: "02", title: "Sklepy internetowe", price: "od 2490 zł",
    intro: "Niewielki, czytelny sklep dla własnych produktów. Bez funkcji, których nie użyjesz, ale z porządnym procesem zakupu i obsługą zamówień.",
    scope: ["produkty i kategorie", "płatności", "metody dostawy", "kupony", "szkolenie z obsługi"],
    goodFor: "rękodzieło, krótkie serie, małe kolekcje",
  },
  {
    id: "link-bio", number: "03", title: "Link w bio", price: "od 490 zł",
    intro: "Własna mini-strona pod jednym adresem. Zamiast generycznej listy linków dostajesz miejsce spójne z charakterem marki.",
    scope: ["do 8 linków lub sekcji", "kolory marki", "kontakt", "własna domena", "szybkie wdrożenie"],
    goodFor: "Instagram, TikTok, start marki bez pełnej strony",
  },
  {
    id: "wordpress", number: "04", title: "WordPress i WooCommerce", price: "od 120 zł",
    intro: "Pomoc przy stronie, która już istnieje. Najpierw sprawdzam problem i mówię wprost, czy lepiej go naprawić, czy zaplanować większą zmianę.",
    scope: ["poprawki wyglądu", "nowe sekcje", "konfiguracja sklepu", "aktualizacje", "konsultacja 1:1"],
    goodFor: "konkretny problem, mała zmiana, porządkowanie strony",
  },
];

export default function OfertaPage() {
  return <>
    <PageHero visual="offer" eyebrow="Oferta" title="Tyle, ile trzeba." italic="Bez nadmiaru." text="Zakres dobieram do etapu Twojej firmy. Możemy zacząć od małego rozwiązania i zostawić sobie miejsce na późniejszą rozbudowę." />
    <section className="section-space">
      <div className="container-page">
        <div className="offer-list">
          {services.map((service) => (
            <article id={service.id} key={service.id} className="offer-detail" data-reveal>
              <div><span className="index">{service.number}</span><p className="mt-4 text-xs text-ink/45">Najczęściej dla:<br/>{service.goodFor}</p></div>
              <div><h2 className="section-title">{service.title}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-ink/60">{service.intro}</p></div>
              <div><strong className="block text-brass">{service.price}</strong><ul className="mt-5 space-y-3">{service.scope.map(item => <li key={item} className="flex gap-2 text-xs text-ink/65"><CheckIcon className="size-4 shrink-0 text-brass"/>{item}</li>)}</ul><Link href="/kontakt" className="text-link mt-7">Zapytaj o zakres <Arrow/></Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="border-y border-ink/10 bg-[#e9e1d3]">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3" data-reveal>
        <div><p className="index">W każdym projekcie</p><h2 className="mt-5 font-serif text-4xl">Podstawy nie są dodatkiem.</h2></div>
        <div className="text-sm leading-7 text-ink/60">Responsywność, uporządkowana struktura, podstawowe metadane SEO i konfiguracja domeny są częścią realizacji, a nie płatną pozycją dopisywaną na końcu.</div>
        <div className="text-sm leading-7 text-ink/60">Domena, hosting, płatne wtyczki i prowizje operatorów płatności są kosztami zewnętrznymi. Zawsze omawiam je przed startem.</div>
      </div>
    </section>
    <CtaBand />
  </>;
}
