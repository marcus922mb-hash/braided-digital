"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, Clock, Shield } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

const plans = [
  { title: "Cyfrowa wizytówka", price: "od 390 zł", time: "3–5 dni", tag: "Dobry start",
    lead: "Prosta, estetyczna strona z najważniejszymi informacjami. Idealna gdy dopiero startujesz online.",
    features: ["1 sekcja / ekran", "Opis i dane kontaktowe", "Responsywność mobilna", "Przycisk WhatsApp"], featured: false },
  { title: "Link w bio", price: "od 490 zł", time: "5–7 dni", tag: "Dla social media",
    lead: "Własne miejsce na wszystkie linki, produkty i kontakt — spójne z Twoją marką na Instagramie.",
    features: ["Do 8 linków / sekcji", "Indywidualne kolory", "Responsywność mobilna", "Podpięcie własnej domeny"], featured: false },
  { title: "One Page", price: "od 990 zł", time: "1–2 tygodnie", tag: "Najpopularniejszy",
    lead: "Pełna strona na jednym ekranie. Świetna dla usług, rękodzieła i marek osobistych.",
    features: ["Do 6 rozbudowanych sekcji", "Oferta i o marce", "Formularz kontaktowy", "Podstawowe SEO"], featured: true },
  { title: "Strona firmowa", price: "od 1890 zł", time: "2–4 tygodnie", tag: "Więcej przestrzeni",
    lead: "Wielostronicowy serwis z szerszą ofertą. Budujesz widoczność i zaufanie klientów.",
    features: ["Do 5 podstron", "Indywidualny kierunek", "Formularz i SEO", "Instrukcja obsługi"], featured: false },
  { title: "Mini sklep handmade", price: "od 2490 zł", time: "3–5 tygodni", tag: "Dla rękodzieła",
    lead: "Lekki sklep dla niewielkiej kolekcji. Idealny gdy sprzedajesz własne produkty w małych seriach.",
    features: ["Do 10 produktów", "Płatności i dostawa", "Kupony rabatowe", "Szkolenie z zamówień"], featured: false },
  { title: "Sklep online", price: "od 3990 zł", time: "4–7 tygodni", tag: "Pełna sprzedaż",
    lead: "Rozbudowany sklep dla marki gotowej prowadzić regularną sprzedaż online.",
    features: ["Do 30 produktów", "Kategorie i filtry", "Płatności i dostawy", "Analityka i szkolenie"], featured: false },
];

const smallTasks = [
  { num: "01", title: "Konsultacja 60 min", price: "150 zł", desc: "Rozmowa, audyt problemu i plan działań." },
  { num: "02", title: "1 godzina pomocy", price: "od 120 zł", desc: "Drobna poprawka WordPress lub WooCommerce." },
  { num: "03", title: "Pakiet 3 godzin", price: "od 320 zł", desc: "Kilka zmian, aktualizacja treści lub ustawień." },
  { num: "04", title: "Dodatkowa podstrona", price: "od 250 zł", desc: "Nowa podstrona dopasowana do witryny." },
  { num: "05", title: "Dodanie produktów", price: "od 100 zł", desc: "Wprowadzenie 5 gotowych produktów do sklepu." },
  { num: "06", title: "Podstawowy audyt", price: "od 190 zł", desc: "Lista problemów i priorytetów do poprawki." },
];

export default function CennikPage() {
  const plansRef = useRef<HTMLDivElement>(null);
  const plansInView = useInView(plansRef, { once: true, margin: "-40px" });
  const tasksRef = useRef<HTMLDivElement>(null);
  const tasksInView = useInView(tasksRef, { once: true, margin: "-40px" });

  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(212,175,55,0.07), transparent)" }} />
        <div className="mx-auto max-w-5xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Cennik orientacyjny</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] text-white">
            Dobra strona<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              na każdą kieszeń.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#A0A0A0]">
            Nie musisz być dużą firmą, żeby mieć profesjonalne miejsce w sieci.
            Pakiety ułożone tak, żeby można było zacząć małym krokiem i rozwijać stronę razem z marką.
          </motion.p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-y border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/5">
          {[{ v: "od 390 zł", l: "Najmniejszy pakiet" }, { v: "0 zł", l: "Za wycenę" }, { v: "2–3 raty", l: "Podział płatności" }].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease }} className="px-4 py-8 text-center">
              <span className="block text-[2rem] font-light text-[#D4AF37] md:text-[2.8rem]">{s.v}</span>
              <span className="text-[.6rem] font-bold uppercase tracking-widest text-[#A0A0A0]">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 py-24">
        <div ref={plansRef} className="mx-auto max-w-7xl">
          <Fade className="mb-14 text-center">
            <p className="mb-4 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Pakiety</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light text-white">
              Znajdź swój <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>punkt startowy.</span>
            </h2>
          </Fade>
          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.article key={plan.title} initial={{ opacity: 0, y: 28 }} animate={plansInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className={`relative flex flex-col p-7 transition-colors hover:bg-[#0f0f0f] ${plan.featured ? "bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]/30" : "bg-[#0A0A0A]"}`}>
                {plan.featured && (
                  <span className="absolute right-0 top-0 bg-[#D4AF37] px-3 py-1.5 text-[.52rem] font-bold uppercase tracking-widest text-[#0A0A0A]">Popularny</span>
                )}
                <p className="text-[.56rem] font-bold uppercase tracking-widest text-[#D4AF37]/60">{plan.tag} · {plan.time}</p>
                <h3 className="mt-3 text-xl font-light text-white">{plan.title}</h3>
                <p className="mt-1 text-3xl font-light text-[#D4AF37]">{plan.price}</p>
                <p className="mt-4 flex-1 text-sm leading-7 text-[#A0A0A0]">{plan.lead}</p>
                <ul className="mt-5 space-y-2.5 border-t border-white/5 pt-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#A0A0A0]">
                      <Check size={11} className="shrink-0 text-[#D4AF37]" />{f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Link href="/kontakt" className="flex items-center justify-center border border-white/12 py-2.5 text-[.58rem] font-bold uppercase tracking-wider text-white/50 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]">Zapytaj</Link>
                  <Link href="/wycena" className="flex items-center justify-center bg-[#D4AF37] py-2.5 text-[.58rem] font-bold uppercase tracking-wider text-[#0A0A0A] transition hover:bg-[#f0d878]">Wycena</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Small tasks */}
      <section ref={tasksRef} className="border-y border-white/5 bg-[#060606] px-6 py-24">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Fade>
            <p className="mb-4 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Małe zadania</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-light text-white">
              Nie zawsze<br />
              <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                wielki projekt.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#A0A0A0]">Można zamówić pojedynczą poprawkę lub kilka godzin wsparcia. Najpierw potwierdzam, co da się zrobić w wybranym czasie.</p>
          </Fade>
          <div className="grid gap-px bg-white/5 sm:grid-cols-2">
            {smallTasks.map((t, i) => (
              <motion.div key={t.num} initial={{ opacity: 0, y: 18 }} animate={tasksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="bg-[#060606] p-6 transition hover:bg-[#0D0D0D]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[.54rem] font-bold text-[#D4AF37]/40">{t.num}</span>
                  <strong className="text-lg font-light text-[#D4AF37]">{t.price}</strong>
                </div>
                <h3 className="mb-2 font-light text-white">{t.title}</h3>
                <p className="text-xs leading-6 text-[#A0A0A0]">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment flexibility */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-3">
          {[
            { icon: CreditCard, title: "Elastyczna płatność", desc: "Przy projektach od 990 zł dzielimy na 2 etapy. Sklepy na 3 etapy. Koszt rozkłada się razem z postępem prac." },
            { icon: Shield, title: "Stała cena", desc: "Wycena ustalona przed startem — bez niespodzianek. Wszelkie zmiany zakresu uzgadniamy z wyprzedzeniem." },
            { icon: Clock, title: "Jasny harmonogram", desc: "Przed startem dostajesz termin ukończenia. Dotrzymuję go lub uprzedzam gdy coś się zmienia." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Fade key={item.title} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="mt-1 flex size-10 shrink-0 items-center justify-center border border-[#D4AF37]/20">
                    <Icon size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-light text-lg text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-[#A0A0A0]">{item.desc}</p>
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-[#0D0D0D] px-6 py-24 text-center">
        <Fade className="mx-auto max-w-2xl">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light text-white">
            Gotowy na swoją<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              nową stronę?
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/wycena" className="flex items-center gap-2 bg-[#D4AF37] px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
              Sprawdź wycenę <ArrowRight size={14} />
            </Link>
            <Link href="/kontakt" className="flex items-center gap-2 border border-white/20 px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/70 transition hover:border-white/50 hover:text-white">
              Napisz do mnie
            </Link>
          </div>
        </Fade>
      </section>
    </div>
  );
}
