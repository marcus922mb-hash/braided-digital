import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Proces współpracy",
  description: "Cztery czytelne etapy współpracy przy stronie lub sklepie internetowym.",
  alternates: canonical("/proces"),
};

const steps = [
  { n:"01", title:"Rozmowa i diagnoza", time:"1–2 dni", text:"Opowiadasz, co sprzedajesz lub jaką usługę oferujesz. Pytam o klientów, materiały i obecne problemy.", result:"Otrzymujesz propozycję zakresu i orientacyjny budżet." },
  { n:"02", title:"Plan i materiały", time:"przed startem", text:"Ustalam strukturę strony, listę potrzebnych treści, termin oraz etapy płatności. Wszystko zapisujemy przed rozpoczęciem.", result:"Wiesz, co powstanie, ile kosztuje i czego potrzebuję od Ciebie." },
  { n:"03", title:"Projekt i wdrożenie", time:"zależnie od pakietu", text:"Buduję kolejne widoki i udostępniam podgląd. Uwagi zbieramy w ustalonych rundach, zamiast poprawiać stronę po jednym zdaniu.", result:"Dostajesz działającą wersję do sprawdzenia na komputerze i telefonie." },
  { n:"04", title:"Publikacja i przekazanie", time:"ostatni etap", text:"Podpinam domenę, sprawdzam formularze i kluczowe ścieżki. Przekazuję dostępy oraz krótką instrukcję.", result:"Strona jest online, a Ty wiesz, jak z niej korzystać." },
];

export default function ProcessPage() {
  return <>
    <PageHero visual="process" eyebrow="Proces" title="Wiesz, co dzieje się teraz." italic="I co będzie dalej." text="Prosty proces chroni czas po obu stronach. Bez technicznego żargonu i bez obietnicy nieskończonych poprawek." />
    <section className="section-space">
      <div className="container-page">
        <div className="process-timeline">
          {steps.map(step=><article key={step.n} data-reveal>
            <div><span className="index">{step.n}</span><p>{step.time}</p></div>
            <div><h2>{step.title}</h2><p>{step.text}</p></div>
            <aside><strong>Po tym etapie</strong><p>{step.result}</p></aside>
          </article>)}
        </div>
      </div>
    </section>
    <section className="border-y border-ink/10 bg-[#e9e1d3]">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2" data-reveal>
        <div><p className="kicker">Co przyspiesza realizację</p><h2 className="mt-6 font-serif text-4xl">Jedna osoba do decyzji i materiały przekazane razem.</h2></div>
        <div className="text-sm leading-8 text-ink/60"><p>Nie musisz mieć gotowego profesjonalnego briefu. Wystarczy rzetelny opis oferty, podstawowe zdjęcia i możliwość zebrania uwag w jednym miejscu.</p><p className="mt-4">Jeżeli potrzebujesz pomocy z kolejnością treści, przygotuję strukturę i pytania pomocnicze.</p></div>
      </div>
    </section>
    <CtaBand/>
  </>;
}
