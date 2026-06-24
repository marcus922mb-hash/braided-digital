import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, CheckIcon } from "@/components/icons";
import { LivePortfolio } from "@/components/live-portfolio";
import { PackagePreview } from "@/components/package-demos";
import { CtaBand, PageHero } from "@/components/ui";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Case study sklepu MA Atelier oraz koncepcyjne dema stron dla małych marek.",
  alternates: canonical("/portfolio"),
};

const decisions = [
  ["Prosta nawigacja", "Klient ma szybko przejść od historii marki do produktów."],
  ["Produkt na pierwszym planie", "Interfejs nie konkuruje ze zdjęciami i detalem rękodzieła."],
  ["Wygodny telefon", "Zakupy i kontakt muszą być proste także na małym ekranie."],
  ["Codzienna obsługa", "Sklep ma być zrozumiały również od zaplecza, przy dodawaniu produktów i realizacji zamówień."],
];

const concepts = [
  {
    slug: "one-page",
    title: "SOMA / gabinet pielęgnacji",
    type: "Pełna strona one page",
    tone: "Hero, oferta zabiegów, historia miejsca, proces, opinie, FAQ i kontakt.",
  },
  {
    slug: "link-w-bio",
    title: "Luna Ceramics",
    type: "Mobilna strona link w bio",
    tone: "Kolekcja, warsztaty, sklep, social media i bezpośredni kontakt w jednym miejscu.",
  },
  {
    slug: "mini-sklep-handmade",
    title: "Mila Handmade",
    type: "Mini sklep internetowy",
    tone: "Kolekcja produktów, ceny, koszyk, historia marki, dostawa i sekcja kontaktowa.",
  },
];

export default function PortfolioPage() {
  return <>
    <PageHero visual="portfolio" eyebrow="Portfolio" title="Jedna prawdziwa marka." italic="Dużo prawdziwej pracy." text="Zamiast dopisywać fikcyjne realizacje, pokazuję dokładnie projekt, który znam od środka. Pozostałe przykłady są jasno oznaczonymi koncepcjami." />
    <section className="case-section">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
        <div data-reveal><p className="kicker kicker-light">Case study / MA Atelier</p><h2 className="section-title mt-6 text-white">Sklep, który sam prowadzę.</h2><p className="mt-7 text-sm leading-7 text-white/60">MA Atelier powstało jako własna marka produktów. Zaprojektowałem strukturę, warstwę wizualną i doświadczenie zakupu, a potem zetknąłem projekt z codziennością: nowymi produktami, pytaniami klientów i realizacją zamówień.</p><a href="https://ma-atelier.pl" target="_blank" rel="noreferrer" className="btn-light mt-8">Otwórz ma-atelier.pl <Arrow/></a></div>
        <div data-reveal><LivePortfolio/></div>
      </div>
    </section>
    <section className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div data-reveal><p className="kicker">Decyzje projektowe</p><h2 className="section-title mt-5">Nie tylko wygląd.</h2></div>
        <div className="grid gap-px bg-ink/12 sm:grid-cols-2">
          {decisions.map(([title,text], index) => <article key={title} className="bg-paper p-7" data-reveal><span className="index">0{index+1}</span><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-ink/60">{text}</p></article>)}
        </div>
      </div>
    </section>
    <section className="border-y border-ink/10 bg-[#e9e1d3]">
      <div className="container-page py-16 md:py-20">
        <div className="max-w-2xl" data-reveal><p className="kicker">Pełne strony demonstracyjne</p><h2 className="section-title mt-5">Wejdź i przewiń jak prawdziwą stronę.</h2><p className="mt-6 text-sm leading-7 text-ink/60">Każde demo ma pełny układ, działającą wersję mobilną i kilka rozbudowanych sekcji. To projekty koncepcyjne, nie realizacje klientów.</p></div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {concepts.map((item,index) => (
            <article key={item.slug} className="demo-project-card" data-reveal>
              <div className="demo-browser">
                <div className="demo-browser-bar"><span/><span/><span/><b>{item.slug}.demo</b></div>
                <PackagePreview slug={item.slug}/>
              </div>
              <div className="demo-project-copy">
                <div className="flex items-center justify-between gap-4"><span className="index">0{index+1}</span><span className="demo-label">Demo koncepcyjne</span></div>
                <p className="mt-5 text-[.58rem] font-bold uppercase tracking-[.14em] text-brass">{item.type}</p>
                <h3>{item.title}</h3>
                <p>{item.tone}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-ink/50"><CheckIcon className="size-4 text-brass"/> Pełna strona i wersja mobilna</div>
                <Link href={`/demo/${item.slug}`} className="btn-primary mt-7 w-full">
                  Otwórz pełne demo <Arrow/>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center" data-reveal><Link href="/cennik" className="text-link">Zobacz wszystkie 6 formatów demo <Arrow/></Link></div>
      </div>
    </section>
    <CtaBand/>
  </>;
}
