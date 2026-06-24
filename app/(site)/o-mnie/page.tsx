import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow, CheckIcon } from "@/components/icons";
import { CtaBand, PageHero } from "@/components/ui";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "O mnie",
  description: "Marek Białkowski, twórca Braided Digital i właściciel sklepu MA Atelier.",
  alternates: canonical("/o-mnie"),
};

const lessons = [
  ["Strona żyje po publikacji", "Produkty się zmieniają, pojawiają się pytania klientów, a treści trzeba poprawiać. Projekt musi być wygodny także po stronie właściciela."],
  ["Telefon jest pierwszym ekranem", "Klient ma szybko znaleźć produkt, cenę, dostawę i kontakt bez powiększania tekstu ani szukania przycisku."],
  ["Mały budżet wymaga kolejności", "Nie każda funkcja jest potrzebna na start. Najpierw buduję podstawę, którą można rozwinąć wraz ze sprzedażą."],
  ["Technologia ma być zrozumiała", "Domena, hosting i panel nie powinny być tajemnicą. Po wdrożeniu wiesz, co jest Twoje i jak działa."],
];

const timeline = [
  ["01", "Własna marka", "MA Atelier zaczęło się od pomysłu na produkty i potrzebowało miejsca, które będzie czymś więcej niż profil w social media."],
  ["02", "Pierwszy sklep", "Projektowałem strukturę, karty produktów, wersję mobilną oraz drogę od poznania marki do zamówienia."],
  ["03", "Codzienna praktyka", "Obsługa produktów i klientów pokazała mi, gdzie estetyczny projekt spotyka się z realnym biznesem."],
  ["04", "Braided Digital", "Dziś przekładam te doświadczenia na strony i sklepy dla innych małych marek, bez udawania wielkiej agencji."],
];

export default function AboutPage() {
  return <>
    <PageHero visual="about" eyebrow="O mnie" title="Projektuję jako deweloper." italic="Myślę jak właściciel sklepu." text="Nazywam się Marek Białkowski. Stworzyłem MA Atelier, a doświadczenie zdobyte przy własnej marce przekładam na strony dla innych małych firm." />

    <section className="section-space">
      <div className="container-page grid gap-14 lg:grid-cols-[.78fr_1.22fr]">
        <div className="about-portrait about-portrait-rich" data-reveal>
          <Image src="/images/hero-process.webp" alt="Stanowisko pracy przy projektowaniu sklepu internetowego" fill sizes="(max-width: 1024px) 100vw, 38vw" className="about-photo"/>
          <div className="about-photo-overlay"/>
          <div className="portrait-orbit"><span>MB</span><i/><i/></div>
          <div className="portrait-code">
            <span>01 / PROJEKT</span><span>02 / KOD</span><span>03 / SPRZEDAŻ</span>
          </div>
          <p>Marek Białkowski<br/>Chylin / Polska<br/>projekty realizowane zdalnie</p>
        </div>
        <div data-reveal>
          <p className="kicker">Skąd Braided Digital</p>
          <h2 className="section-title mt-6">Kod, sprzedaż i codzienna praca<br/><em>w jednym splocie.</em></h2>
          <div className="about-copy mt-8">
            <p>Nie zaczynałem od wymyślenia nazwy studia i listy usług. Najpierw powstało MA Atelier – marka, przy której trzeba było połączyć produkt, estetykę, stronę, płatności oraz zwykłą codzienność małej sprzedaży.</p>
            <p>Budując sklep, widziałem obie strony ekranu. Z jednej klient szukał produktu i informacji o dostawie. Z drugiej trzeba było dodawać zdjęcia, pilnować opisów, odpowiadać na wiadomości i realizować zamówienia.</p>
            <p>To doświadczenie stało się podstawą Braided Digital. Projektuję spokojnie, tłumaczę decyzje i nie dokładam funkcji tylko po to, żeby projekt wyglądał na większy.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/portfolio" className="btn-primary">Zobacz MA Atelier <Arrow/></Link><Link href="/kontakt" className="btn-secondary">Porozmawiaj ze mną</Link></div>
        </div>
      </div>
    </section>

    <section className="about-story">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-[.62fr_1.38fr] lg:py-28">
        <div data-reveal><p className="kicker kicker-light">Droga do studia</p><h2 className="section-title mt-6 text-white">Nie teoria.<br/><em>Własny projekt.</em></h2><p className="mt-6 max-w-sm text-sm leading-7 text-white/50">Każdy etap MA Atelier dołożył jeden element do sposobu, w jaki dziś pracuję z klientami.</p></div>
        <div className="about-timeline">
          {timeline.map(([n,title,text])=><article key={n} data-reveal><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div data-reveal><p className="kicker">Czego nauczył mnie własny sklep</p><h2 className="section-title mt-6">Projekt ma działać<br/><em>także w poniedziałek rano.</em></h2></div>
          <div className="about-lessons">
            {lessons.map(([title,text],i)=><article key={title} data-reveal><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-ink/10 bg-[#e9e1d3]">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div data-reveal><p className="kicker">Mój warsztat</p><h2 className="section-title mt-6">Technologia dobrana<br/>do zadania.</h2><p className="mt-6 max-w-md text-sm leading-7 text-ink/60">Nie sprzedaję jednego narzędzia każdemu. Dobieram rozwiązanie do tego, kto będzie później obsługiwać stronę i jak ma się rozwijać.</p></div>
          <div className="workshop-board" data-reveal>
            <div className="workshop-browser"><div><span/><span/><span/></div><strong>web.ma-atelier.pl</strong><i/><i/><i/></div>
            <div className="workshop-tools">
              {["Next.js","React","TypeScript","Tailwind CSS","WordPress","WooCommerce","Vercel","SEO techniczne"].map(tool=><span key={tool}>{tool}</span>)}
            </div>
            <div className="workshop-note">Najpierw potrzeba.<br/>Potem narzędzie.</div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="container-page">
        <div className="text-center" data-reveal><p className="kicker mx-auto w-fit">Jak wygląda współpraca ze mną</p><h2 className="section-title mx-auto mt-6 max-w-4xl">Jedna osoba odpowiada<br/>za cały projekt.</h2></div>
        <div className="mt-12 grid gap-px bg-ink/12 md:grid-cols-3">
          {[
            ["Rozmawiasz z wykonawcą", "Nie przekazuję projektu między działami. Ja ustalam zakres, projektuję, wdrażam i odpowiadam na pytania."],
            ["Mówię wprost o granicach", "Jeśli coś nie ma sensu w Twoim budżecie albo na danym etapie, powiem to przed rozpoczęciem prac."],
            ["Zostawiam porządek", "Po publikacji dostajesz dostęp, instrukcję i jasną informację, co można rozwijać później."],
          ].map(([title,text],i)=><article key={title} className="bg-paper p-7 md:p-9" data-reveal><span className="index">0{i+1}</span><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-ink/60">{text}</p><CheckIcon className="mt-8 size-5 text-brass"/></article>)}
        </div>
      </div>
    </section>
    <CtaBand/>
  </>;
}
