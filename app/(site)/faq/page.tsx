"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

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

const faqs = [
  { q: "Ile trwa realizacja strony?",
    a: "To zależy od złożoności projektu. Prosta wizytówka lub landing page — 3–7 dni. Strona wielostronicowa — 2–4 tygodnie. Sklep WooCommerce — 4–7 tygodni. Dokładny harmonogram ustalamy przed startem i trzymam się go." },
  { q: "Czy muszę przygotować treści i zdjęcia?",
    a: "Teksty możesz napisać samodzielnie lub zlecić ich przygotowanie (dodatkowa opłata). Zdjęcia najlepiej Twoje — nadają autentyczności. Jeśli ich brakuje, korzystamy z legalnych stocków. Ważne, żebyś miał gotowe podstawowe informacje: czym się zajmujesz, kto jest Twoim klientem i co oferujesz." },
  { q: "Czy strona będzie wyglądać dobrze na telefonie?",
    a: "Tak — responsywność mobilna jest standardem, nie dodatkiem. Każda strona jest projektowana i testowana na telefonie, tablecie i komputerze. Ponad 70% ruchu pochodzi z urządzeń mobilnych, więc nie ma tu kompromisów." },
  { q: "Czy po oddaniu będę mógł samodzielnie edytować treści?",
    a: "Tak. Przy projektach WordPress/WooCommerce dostajesz panel administracyjny i szkolenie jak go obsługiwać. Przy stronach Next.js ustalamy wygodny przepływ — możesz zgłaszać zmiany lub mamy prosty CMS." },
  { q: "Jak wygląda płatność?",
    a: "Przy mniejszych projektach (do 990 zł): 50% przed startem, 50% po oddaniu. Przy większych: 40% przed startem, 30% po zatwierdzeniu projektu, 30% przed wdrożeniem. Dostępne przelewy bankowe i Przelewy24." },
  { q: "Czy pracujesz z WordPress czy Next.js?",
    a: "Obie technologie. WordPress/WooCommerce sprawdza się gdy klient chce wygodny panel do zarządzania treścią lub dużym sklepem. Next.js wybieram gdy liczy się prędkość, SEO i unikalny design. Dobieramy technologię do potrzeb — nie odwrotnie." },
  { q: "Co z hostingiem i domeną?",
    a: "Pomagam skonfigurować i uruchomić stronę na wybranym hostingu — mogę też polecić dobre opcje dopasowane do projektu. Koszt domeny i hostingu nie jest wliczony w cenę projektu, ale łącznie to zwykle 100–300 zł/rok." },
  { q: "Czy oferujesz wsparcie po wdrożeniu?",
    a: "Tak. Przez 30 dni po wdrożeniu poprawki objęte zakresem projektu są bezpłatne. Dalsze wsparcie w pakietach opieki technicznej (od 200 zł/mies.) lub rozliczane godzinowo." },
  { q: "Skąd masz klientów? Czy możesz pokazać realizacje?",
    a: "Klienci trafiają przez polecenia, social media i wyszukiwarkę. Realizacje (z zgodą klientów) pokazuję w zakładce Portfolio. Część projektów jest objęta NDA — ale mogę opowiedzieć o procesie podczas rozmowy." },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.05, ease }} className="border-b border-white/7">
      <button onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition hover:text-[#D4AF37]/80">
        <span className="text-sm font-light text-white md:text-base">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} className="shrink-0 text-[#D4AF37]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }}>
            <p className="pb-6 pr-8 text-sm leading-8 text-[#A0A0A0]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(212,175,55,0.07), transparent)" }} />
        <div className="mx-auto max-w-4xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Często zadawane pytania</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] text-white">
            Masz pytania?<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Mam odpowiedzi.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#A0A0A0]">
            Zebrałem najczęstsze pytania klientów. Jeśli nie znajdziesz odpowiedzi — napisz do mnie bezpośrednio.
          </motion.p>
        </div>
      </section>

      {/* Accordion */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} i={i} />
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="border-t border-white/5 bg-[#0D0D0D] px-6 py-20">
        <Fade className="mx-auto max-w-3xl grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Nie znalazłeś odpowiedzi?</p>
            <h2 className="mb-4 text-2xl font-light text-white">Napisz bezpośrednio.</h2>
            <p className="text-sm leading-7 text-[#A0A0A0]">
              Każda marka jest inna. Chętnie odpowiem na szczegółowe pytania dotyczące Twojego projektu.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link href="/kontakt" className="flex items-center justify-center gap-2 bg-[#D4AF37] py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
              Napisz wiadomość <ArrowRight size={13} />
            </Link>
            <a href="https://wa.me/48730195530" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center border border-white/15 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/70 transition hover:border-[#D4AF37]/40 hover:text-white">
              WhatsApp
            </a>
          </div>
        </Fade>
      </section>
    </div>
  );
}
