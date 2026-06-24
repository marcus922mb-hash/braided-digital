"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Globe, Rocket, ShoppingCart, Bot, Search, Headphones, ArrowRight, Check } from "lucide-react";

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

const services = [
  { icon: Globe, num: "01", title: "Strony internetowe", price: "od 990 zł",
    desc: "Indywidualnie zaprojektowana witryna, która reprezentuje Twoją markę 24/7. Każdy piksel przemyślany, każda sekcja nakierowana na konwersję.",
    features: ["Unikatowy projekt graficzny", "Responsywność na każde urządzenie", "SEO od pierwszej linii kodu", "Google PageSpeed 90+", "Formularz + WhatsApp", "Wdrożenie i instrukcja"],
  },
  { icon: Rocket, num: "02", title: "Landing Page", price: "od 390 zł",
    desc: "Jedna strona, jeden cel. Landing page zoptymalizowany pod kampanie reklamowe, leady lub sprzedaż konkretnego produktu. Gotowy w 3–5 dni.",
    features: ["Struktura sprzedażowa AIDA", "Optymalizacja pod konwersję", "Integracja z Google Ads / Meta", "Szybkie wdrożenie (3–5 dni)", "A/B testing ready", "Analityka zdarzeń"],
  },
  { icon: ShoppingCart, num: "03", title: "Sklepy WooCommerce", price: "od 2490 zł",
    desc: "Pełnofunkcjonalny sklep z płatnościami, zarządzaniem magazynem i integracjami kurierów. Sprzedawaj online bez ograniczeń.",
    features: ["Płatności Przelewy24 / Stripe", "Integracja kurierów", "System zarządzania produktami", "Kupony i promocje", "Faktury automatyczne", "Szkolenie z obsługi"],
  },
  { icon: Bot, num: "04", title: "Automatyzacje AI", price: "od 800 zł",
    desc: "Chatboty, automatyczne odpowiedzi na zapytania i przepływy pracy zasilane AI. Oszczędź czas i obsługuj klientów 24/7 bez dodatkowych pracowników.",
    features: ["Chatbot na stronę / WhatsApp", "Automatyczne emaile", "Integracja n8n / Make", "GPT-4 powered assistant", "CRM automation", "Raportowanie"],
  },
  { icon: Search, num: "05", title: "Pozycjonowanie SEO", price: "od 500 zł",
    desc: "Techniczna i treściowa optymalizacja SEO. Więcej klientów bez płacenia za reklamy — pojawiasz się tam, gdzie Twoi klienci szukają.",
    features: ["Audyt techniczny SEO", "Optymalizacja słów kluczowych", "Link building", "Google Search Console", "Strategia contentu", "Miesięczne raporty"],
  },
  { icon: Headphones, num: "06", title: "Opieka techniczna", price: "od 200 zł/mies.",
    desc: "Stały monitoring, regularne aktualizacje i wsparcie techniczne. Abyś mógł skupić się na biznesie, a nie na awariach i wtyczkach.",
    features: ["Monitoring dostępności 24/7", "Aktualizacje WP / wtyczek", "Backupy automatyczne", "Wsparcie WhatsApp", "Poprawki na bieżąco", "Raport miesięczny"],
  },
];

const included = [
  "Indywidualny projekt — zero szablonów",
  "Responsywność telefon / tablet / komputer",
  "Techniczne SEO i meta tagi",
  "Certyfikat SSL (HTTPS)",
  "Google Analytics i Search Console",
  "Optymalizacja prędkości ładowania",
  "Formularz kontaktowy / chat",
  "Instrukcja i wsparcie po starcie",
];

export default function OfertaPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.07), transparent)" }} />
        <div className="mx-auto max-w-5xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Pełna oferta</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] text-white">
            Technologia, która<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              pracuje dla Ciebie.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#A0A0A0]">
            Od pierwszej strony po rozbudowany sklep i automatyzacje AI. Zakres dobieramy dokładnie
            do Twoich potrzeb — bez przepłacania za zbędne funkcje.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/wycena" className="flex items-center gap-2 bg-[#D4AF37] px-7 py-3.5 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
              Bezpłatna wycena <ArrowRight size={14} />
            </Link>
            <Link href="/kontakt" className="flex items-center gap-2 border border-white/20 px-7 py-3.5 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/80 transition hover:border-white/50 hover:text-white">
              Porozmawiajmy
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service cards */}
      <section className="px-6 pb-24">
        <div ref={gridRef} className="mx-auto max-w-7xl grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.article key={svc.num} initial={{ opacity: 0, y: 28 }} animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="group relative overflow-hidden bg-[#0A0A0A] p-8 transition-colors duration-300 hover:bg-[#0f0f0f]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.05), transparent 65%)" }} />
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center border border-white/8 transition-all group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/8">
                    <Icon size={20} className="text-[#A0A0A0] transition-colors group-hover:text-[#D4AF37]" />
                  </div>
                  <span className="text-[.56rem] font-bold uppercase tracking-widest text-[#D4AF37]/50">{svc.num}</span>
                </div>
                <h2 className="mb-1 text-xl font-light text-white">{svc.title}</h2>
                <p className="mb-4 text-[.65rem] font-bold tracking-wider text-[#D4AF37]">{svc.price}</p>
                <p className="mb-6 text-sm leading-7 text-[#A0A0A0]">{svc.desc}</p>
                <ul className="space-y-2 border-t border-white/5 pt-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-xs text-[#A0A0A0]">
                      <Check size={11} className="shrink-0 text-[#D4AF37]" />{f}
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Included in every project */}
      <section className="border-y border-white/5 bg-[#0D0D0D] px-6 py-24">
        <div className="mx-auto max-w-7xl grid items-center gap-16 lg:grid-cols-2">
          <Fade>
            <p className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">W standardzie każdego projektu</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight text-white">
              Nie musisz się<br />
              <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                o nic martwić.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-8 text-[#A0A0A0]">
              Każdy projekt — niezależnie od pakietu — zawiera pełen zestaw niezbędnych elementów.
              Bez ukrytych kosztów, bez dodatków płatnych z osobna.
            </p>
          </Fade>
          <div className="grid gap-3 sm:grid-cols-2">
            {included.map((item, i) => (
              <Fade key={item} delay={i * 0.06}>
                <div className="flex items-start gap-3 border border-white/5 px-4 py-3.5 transition hover:border-[#D4AF37]/20">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15">
                    <Check size={10} className="text-[#D4AF37]" />
                  </span>
                  <span className="text-sm text-[#A0A0A0]">{item}</span>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.06), transparent)" }} />
        <Fade className="mx-auto max-w-3xl">
          <p className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Nie wiesz, co wybrać?</p>
          <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] font-light text-white">
            Zacznijmy od rozmowy.<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Dobierzemy wszystko razem.
            </span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/wycena" className="flex items-center gap-2 bg-[#D4AF37] px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
              Sprawdź wycenę <ArrowRight size={14} />
            </Link>
            <a href="https://wa.me/48730195530" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/80 transition hover:border-[#D4AF37]/50 hover:text-white">
              WhatsApp
            </a>
          </div>
        </Fade>
      </section>
    </div>
  );
}
