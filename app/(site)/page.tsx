import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { LivePortfolio } from "@/components/live-portfolio";
import { canonical } from "@/lib/seo";
import { faqs, pricing, processSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Strony i sklepy dla małych marek",
  description:
    "Braided Digital projektuje strony, sklepy internetowe i linki w bio dla rękodzieła, lokalnych usług i małych firm. Ceny od 390 zł.",
  alternates: canonical("/"),
};

const audiences = [
  {
    number: "01",
    title: "Sprzedajesz rękodzieło",
    text: "Instagram już nie wystarcza, a duży sklep jest na ten moment zbyt kosztowny. Zaczniemy od rozwiązania, które da się później rozbudować.",
  },
  {
    number: "02",
    title: "Prowadzisz małą usługę",
    text: "Klient powinien w minutę zrozumieć, co robisz, ile to mniej więcej kosztuje i jak się z Tobą skontaktować.",
  },
  {
    number: "03",
    title: "Masz stronę, ale coś nie działa",
    text: "Poprawię WordPress lub WooCommerce, uporządkuję wersję mobilną albo dodam konkretną funkcję bez budowania wszystkiego od nowa.",
  },
];

const services = [
  { number: "01", title: "Link w bio", price: "od 490 zł", time: "5–7 dni", text: "Własny, spójny adres zamiast przypadkowej listy linków.", href: "/oferta#link-bio" },
  { number: "02", title: "Strona one page", price: "od 990 zł", time: "1–2 tyg.", text: "Oferta, historia marki, odpowiedzi i kontakt na jednej dobrze ułożonej stronie.", href: "/oferta#strony" },
  { number: "03", title: "Mały sklep handmade", price: "od 2490 zł", time: "3–5 tyg.", text: "Produkty, płatności i wysyłka przygotowane bez zbędnego rozmachu.", href: "/oferta#sklepy" },
  { number: "04", title: "Pomoc WordPress", price: "od 120 zł", time: "od 1 godz.", text: "Drobne poprawki, nowe sekcje, konfiguracja i porządkowanie sklepu.", href: "/oferta#wordpress" },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="thread thread-hero" aria-hidden="true" />
        <div className="container-page grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-24">
          <div className="relative z-10" data-reveal>
            <p className="kicker">Studio internetowe dla małych marek</p>
            <h1 className="editorial-title mt-7 max-w-4xl">
              Dobra strona nie musi udawać <em>dużej agencji.</em>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-ink/65">
              Projektuję strony i małe sklepy dla ludzi, którzy własnymi rękami
              budują biznes. Sam prowadzę MA Atelier, więc znam ten temat także
              od strony zamówień, produktów i codziennej obsługi.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/kontakt" className="btn-primary">Opowiedz o projekcie <Arrow /></Link>
              <Link href="/portfolio" className="btn-secondary">Zobacz MA Atelier</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-ink/12 pt-5 text-[.67rem] font-semibold uppercase tracking-[.12em] text-ink/50">
              <span>Strony od 390 zł</span><span>Praca zdalna</span><span>Kontakt bezpośrednio ze mną</span>
            </div>
          </div>

          <div className="hero-workbench" data-reveal>
            <div className="browser-card">
              <div className="browser-bar"><span /><span /><span /><b>ma-atelier.pl</b></div>
              <div className="shop-preview">
                <div className="shop-nav"><strong>MA ATELIER</strong><span>SKLEP&nbsp;&nbsp; O MARCE&nbsp;&nbsp; KOSZYK</span></div>
                <div className="shop-photo"><span>RĘCZNIE TWORZONE<br /><i>dla ważnych chwil</i></span></div>
                <div className="shop-products"><i /><i /><i /></div>
              </div>
            </div>
            <p className="workbench-note">01 / Własna marka jako poligon prawdziwych decyzji</p>
            <div className="material-tag">Design + wdrożenie + codzienna obsługa</div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white/35">
        <div className="container-page grid md:grid-cols-[.7fr_1.3fr]">
          <div className="border-b border-ink/10 py-12 md:border-b-0 md:border-r md:pr-12" data-reveal>
            <p className="kicker">Dla kogo</p>
            <h2 className="section-title mt-5">Mała firma.<br />Konkretny etap.</h2>
          </div>
          <div className="divide-y divide-ink/10 md:pl-12">
            {audiences.map((item) => (
              <article key={item.number} className="grid gap-4 py-8 sm:grid-cols-[3rem_14rem_1fr]" data-reveal>
                <span className="index">{item.number}</span>
                <h3 className="font-serif text-2xl leading-tight">{item.title}</h3>
                <p className="text-sm leading-7 text-ink/60">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2 md:items-end" data-reveal>
            <div><p className="kicker">Co mogę zrobić</p><h2 className="section-title mt-5">Dobieramy zakres,<br />nie nadmiar.</h2></div>
            <p className="max-w-lg text-sm leading-7 text-ink/60 md:justify-self-end">Możesz zacząć od jednego ekranu, małego sklepu albo kilku godzin pomocy. Każda opcja ma jasny punkt startowy.</p>
          </div>
          <div className="service-ledger mt-14">
            {services.map((service) => (
              <Link key={service.number} href={service.href} className="service-row group" data-reveal>
                <span className="index">{service.number}</span>
                <div><h3>{service.title}</h3><p>{service.text}</p></div>
                <div className="service-meta"><strong>{service.price}</strong><span>{service.time}</span></div>
                <Arrow className="service-arrow" />
              </Link>
            ))}
          </div>
          <Link href="/oferta" className="text-link mt-8">Pełny zakres usług <Arrow /></Link>
        </div>
      </section>

      <section className="case-section">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[.82fr_1.18fr] lg:py-28">
          <div className="lg:sticky lg:top-32 lg:self-start" data-reveal>
            <p className="kicker kicker-light">Prawdziwa realizacja</p>
            <h2 className="section-title mt-5 text-white">MA Atelier<br /><em>od środka.</em></h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/60">
              Nie projektowałem sklepu „dla przykładowej marki”. Zbudowałem go
              dla własnych produktów i nadal odpowiadam za to, jak działa.
            </p>
            <dl className="case-facts mt-10">
              <div><dt>Zakres</dt><dd>marka, sklep, mobile, sprzedaż</dd></div>
              <div><dt>Rola</dt><dd>projekt, wdrożenie, właściciel</dd></div>
              <div><dt>Adres</dt><dd><a href="https://ma-atelier.pl" target="_blank" rel="noreferrer">ma-atelier.pl ↗</a></dd></div>
            </dl>
            <Link href="/portfolio" className="btn-light mt-9">Przeczytaj case study <Arrow /></Link>
          </div>
          <div data-reveal><LivePortfolio /></div>
        </div>
      </section>

      <section className="section-space overflow-hidden">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div data-reveal><p className="kicker">Jak pracuję</p><h2 className="section-title mt-5">Bez sprintu<br />przez chaos.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-ink/60">Na każdym etapie wiesz, czego potrzebuję i co dostaniesz w następnej kolejności.</p></div>
            <div className="process-stack">
              {processSteps.map((step) => (
                <article key={step.number} data-reveal>
                  <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#e9e1d3]">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]" data-reveal>
            <div><p className="kicker">Budżet bez zgadywania</p><h2 className="section-title mt-5">Możesz zacząć mało.</h2><p className="mt-5 max-w-md text-sm leading-7 text-ink/60">Najmniejszy pakiet kosztuje 390 zł. Przy większych projektach płatność można podzielić na etapy.</p></div>
            <div className="grid gap-px bg-ink/12 sm:grid-cols-3">
              {pricing.slice(0, 3).map((plan) => <article key={plan.slug} className="bg-[#e9e1d3] p-6"><p className="index">{plan.tag}</p><h3 className="mt-8 font-serif text-2xl">{plan.title}</h3><strong className="mt-2 block text-brass">{plan.price}</strong><p className="mt-4 text-xs leading-6 text-ink/55">{plan.lead}</p></article>)}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/cennik" className="btn-primary">Zobacz cały cennik <Arrow /></Link><Link href="/wycena" className="btn-secondary">Policz własny zakres</Link></div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div data-reveal><p className="kicker">Zanim napiszesz</p><h2 className="section-title mt-5">Kilka prostych odpowiedzi.</h2></div>
          <div className="faq-clean">
            {faqs.slice(0, 4).map((item, index) => (
              <details key={item.q} data-reveal>
                <summary><span>0{index + 1}</span><strong>{item.q}</strong><i>+</i></summary>
                <p>{item.a}</p>
              </details>
            ))}
            <Link href="/faq" className="text-link mt-7">Wszystkie pytania <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="contact-band">
        <div className="thread thread-contact" aria-hidden="true" />
        <div className="container-page relative grid gap-8 py-20 md:grid-cols-[1.2fr_.8fr] md:items-end" data-reveal>
          <div><p className="kicker kicker-light">Pierwsza rozmowa nic nie kosztuje</p><h2 className="section-title mt-5 max-w-3xl text-white">Napisz, co tworzysz.<br /><em>Resztę uporządkujemy.</em></h2></div>
          <div className="md:justify-self-end"><Link href="/kontakt" className="btn-brass">Opowiedz o projekcie <Arrow /></Link><p className="mt-4 text-xs text-white/45">Odpowiadam osobiście w 1–2 dni robocze.</p></div>
        </div>
      </section>
    </>
  );
}
