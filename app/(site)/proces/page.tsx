"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle, Compass, Layers, Rocket, CheckCircle } from "lucide-react";

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

const steps = [
  {
    icon: MessageCircle, num: "01", title: "Poznajmy się",
    time: "Dzień 1–2",
    desc: "Zaczynamy od rozmowy — przez WhatsApp, email lub videocall. Opowiadasz o marce, celach i klientach. Nie musisz mieć gotowego briefu ani wizji. Zadaję właściwe pytania.",
    details: ["Bezpłatna konsultacja", "Analiza Twojej branży", "Wstępna propozycja zakresu", "Orientacyjna wycena"],
  },
  {
    icon: Compass, num: "02", title: "Kierunek i plan",
    time: "Dzień 3–5",
    desc: "Na podstawie rozmowy przygotowuję szczegółową ofertę z zakresem, harmonogramem i ceną. Ustalamy wszystko przed podpisaniem umowy — żadnych niespodzianek w trakcie.",
    details: ["Szczegółowa wycena", "Harmonogram prac", "Umowa i zaliczka", "Dostęp do Trello projektu"],
  },
  {
    icon: Layers, num: "03", title: "Projekt i budowa",
    time: "Główna faza",
    desc: "Projektuję wygląd, a po akceptacji buduję stronę. Na bieżąco dostajesz podgląd postępów. Dwie rundy poprawek w każdej fazie są wliczone w cenę.",
    details: ["Makiety i projekt graficzny", "Dwie rundy poprawek", "Podgląd na żywo (staging)", "Optymalizacja prędkości"],
  },
  {
    icon: Rocket, num: "04", title: "Start i wsparcie",
    time: "Ostatni dzień + 30 dni",
    desc: "Wdrażam stronę na Twoją domenę i konfiguruję niezbędne narzędzia: Analytics, Search Console, formularze. Po starcie jesteś przez 30 dni pod opieką — bez dodatkowych kosztów.",
    details: ["Konfiguracja hostingu i domeny", "Google Analytics + Search Console", "Szkolenie i instrukcja", "30 dni bezpłatnego wsparcia"],
  },
];

const faq2 = [
  { q: "Co muszę przygotować?", a: "Podstawowe info o firmie i klientach. Resztę ustalimy podczas rozmowy." },
  { q: "Co jeśli nie podoba mi się projekt?", a: "Masz dwie rundy poprawek w każdej fazie. Pracujemy dopóki nie będziesz w 100% zadowolony." },
  { q: "Czy mogę śledzić postępy?", a: "Tak — dostajesz dostęp do Trello projektu i podgląd na żywo przez cały czas." },
  { q: "Co po 30 dniach wsparcia?", a: "Możesz wybrać pakiet opieki technicznej lub zgłaszać zmiany rozliczane godzinowo." },
];

export default function ProcesPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-40px" });

  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(212,175,55,0.07), transparent)" }} />
        <div className="mx-auto max-w-5xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Jak pracuję</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] text-white">
            Jasny proces.<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Zero niespodzianek.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#A0A0A0]">
            Od pierwszej rozmowy do wdrożenia — przejrzysty proces, który chroni Twój czas i budżet.
            Wiesz co, kiedy i dlaczego dzieje się na każdym etapie.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section ref={stepsRef} className="px-6 pb-24">
        <div className="mx-auto max-w-7xl space-y-px">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.num} initial={{ opacity: 0, x: -30 }} animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
                className="group grid items-start gap-8 border-b border-white/5 bg-[#0A0A0A] px-0 py-10 transition hover:bg-[#0f0f0f] md:grid-cols-[auto_1fr_1fr] md:gap-12">
                {/* Left */}
                <div className="flex items-start gap-5 md:flex-col md:gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center border border-white/8 transition-all group-hover:border-[#D4AF37]/30">
                    <Icon size={22} className="text-[#A0A0A0] transition group-hover:text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="block text-[.52rem] font-bold uppercase tracking-widest text-[#D4AF37]/50">{step.num}</span>
                    <span className="block text-[.58rem] uppercase tracking-widest text-[#A0A0A0]">{step.time}</span>
                  </div>
                </div>
                {/* Middle */}
                <div>
                  <h2 className="mb-3 text-2xl font-light text-white">{step.title}</h2>
                  <p className="text-sm leading-8 text-[#A0A0A0]">{step.desc}</p>
                </div>
                {/* Right */}
                <ul className="space-y-3">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-[#A0A0A0]">
                      <CheckCircle size={13} className="shrink-0 text-[#D4AF37]" />{d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Timeline bar */}
      <section className="border-y border-white/5 bg-[#0D0D0D] px-6 py-14">
        <Fade className="mx-auto max-w-7xl">
          <p className="mb-8 text-center text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Przykładowy harmonogram · One Page</p>
          <div className="relative overflow-x-auto">
            <div className="flex min-w-[600px] items-center">
              {["Rozmowa", "Umowa", "Projekt", "Budowa", "Start"].map((label, i, arr) => (
                <div key={label} className="flex flex-1 flex-col items-center">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease }}
                    className="flex size-8 items-center justify-center border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[.55rem] font-bold text-[#D4AF37]">
                    {i + 1}
                  </motion.div>
                  <div className="mt-2 text-[.58rem] text-center font-bold uppercase tracking-wider text-[#A0A0A0]">{label}</div>
                  {i < arr.length - 1 && (
                    <motion.div className="absolute top-4 h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent"
                      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5, ease }} style={{ left: `${(i + 0.5) * (100 / arr.length)}%`, width: `${100 / arr.length}%`, originX: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </section>

      {/* Quick FAQ */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2">
          <Fade>
            <p className="mb-4 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Często pytają</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-light text-white">
              Odpowiedzi<br />
              <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                na raz.
              </span>
            </h2>
          </Fade>
          <div className="space-y-6">
            {faq2.map((item, i) => (
              <Fade key={item.q} delay={i * 0.08}>
                <div className="border-l-2 border-[#D4AF37]/30 pl-5">
                  <h3 className="mb-1 font-light text-white">{item.q}</h3>
                  <p className="text-sm leading-7 text-[#A0A0A0]">{item.a}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-[#0D0D0D] px-6 py-24 text-center">
        <Fade className="mx-auto max-w-2xl">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light text-white">
            Zacznijmy<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              od rozmowy.
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/wycena" className="flex items-center gap-2 bg-[#D4AF37] px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
              Bezpłatna wycena <ArrowRight size={14} />
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
