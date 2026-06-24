"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Zap, Heart } from "lucide-react";

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

const values = [
  { icon: Palette, title: "Estetyka z sensem", desc: "Strona musi być piękna — ale przede wszystkim musi działać. Projekt tworzy się z myślą o kliencie końcowym, nie o nagrodach." },
  { icon: Code2, title: "Kod, który trwa", desc: "Piszę czysty, zoptymalizowany kod. Żadnych niepotrzebnych wtyczek, żadnego bloatware. Strona ma ładować się szybko za 5 lat." },
  { icon: Zap, title: "Szybkość i wydajność", desc: "Google PageSpeed 90+ to standard, nie opcja. Szybka strona to więcej klientów i lepsze pozycje w wyszukiwarce." },
  { icon: Heart, title: "Partnerstwo, nie usługa", desc: "Nie jestem anonimowym wykonawcą. Traktuję każdy projekt jak swój własny i zależy mi na Twoich wynikach." },
];

const skills = [
  { label: "Next.js / React", level: 95 },
  { label: "TypeScript", level: 90 },
  { label: "WordPress / WooCommerce", level: 88 },
  { label: "SEO & Performance", level: 85 },
  { label: "Automatyzacje AI (n8n, GPT)", level: 80 },
  { label: "UI/UX Design", level: 82 },
];

export default function OMniePage() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-50px" });

  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(212,175,55,0.06), transparent)" }} />
        <div className="mx-auto max-w-7xl grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">O mnie</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-[clamp(3rem,6vw,5.5rem)] font-light leading-[.95] text-white">
              Cześć, jestem<br />
              <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                MA Atelier Web.
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
              className="mt-7 max-w-lg text-base leading-8 text-[#A0A0A0]">
              Projektuję i buduję strony internetowe, sklepy WooCommerce i automatyzacje AI
              dla polskich firm i marek. Działam zdalnie, pracuję solidnie.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-10 flex flex-wrap gap-4">
              <Link href="/kontakt" className="flex items-center gap-2 bg-[#D4AF37] px-7 py-3.5 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
                Porozmawiajmy <ArrowRight size={14} />
              </Link>
              <Link href="/portfolio" className="flex items-center gap-2 border border-white/20 px-7 py-3.5 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/80 transition hover:border-white/50">
                Zobacz realizacje
              </Link>
            </motion.div>
          </div>

          {/* Avatar placeholder */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-full">
            <div className="relative z-10 aspect-square border border-[#D4AF37]/20 bg-[#0D0D0D]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="h-px w-12 bg-[#D4AF37]/40" />
                <span className="text-[.6rem] font-bold uppercase tracking-widest text-[#D4AF37]/60">MA Atelier Web</span>
                <div className="h-px w-12 bg-[#D4AF37]/40" />
              </div>
              <div className="absolute -right-4 -top-4 h-16 w-16 border border-[#D4AF37]/15" />
              <div className="absolute -bottom-4 -left-4 h-12 w-12 border border-[#D4AF37]/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="border-y border-white/5 bg-[#0D0D0D] px-6 py-24">
        <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2">
          <Fade>
            <p className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Historia</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight text-white">
              Strony, które<br />
              <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                mówią same za siebie.
              </span>
            </h2>
          </Fade>
          <div className="space-y-6">
            {[
              { text: "Zaczynałem od prostych stron wizytówkowych. Dziś buduję kompleksowe systemy: sklepy z integracjami kurierów, landing page'e z A/B testami i chatboty AI, które odpowiadają za firmę 24/7." },
              { text: "Każdy projekt traktuję jak własny biznes. Nie wdrażam \"bo tak się robi\" — pytam o cele, analizuję grupę docelową i dobiera technologię, która naprawdę rozwiązuje problem." },
              { text: "Ponad 50 projektów, zero szablonów. Każda strona jest unikatem — zaprojektowanym od zera z myślą o konkretnej marce i jej klientach." },
            ].map((item, i) => (
              <Fade key={i} delay={i * 0.1}>
                <p className="text-sm leading-8 text-[#A0A0A0]">{item.text}</p>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Fade className="mb-14 text-center">
            <p className="mb-4 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Wartości</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light text-white">
              Jak pracuję na co dzień.
            </h2>
          </Fade>
          <div className="grid gap-px bg-white/5 sm:grid-cols-2">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Fade key={v.title} delay={i * 0.1}>
                  <div className="group bg-[#0A0A0A] p-8 transition hover:bg-[#0f0f0f]">
                    <div className="mb-5 flex size-12 items-center justify-center border border-white/8 transition group-hover:border-[#D4AF37]/30">
                      <Icon size={20} className="text-[#A0A0A0] transition group-hover:text-[#D4AF37]" />
                    </div>
                    <h3 className="mb-3 text-xl font-light text-white">{v.title}</h3>
                    <p className="text-sm leading-7 text-[#A0A0A0]">{v.desc}</p>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section ref={skillsRef} className="border-y border-white/5 bg-[#0D0D0D] px-6 py-24">
        <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2">
          <Fade>
            <p className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Technologie</p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight text-white">
              Narzędzia, które<br />
              <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                tworzą rezultaty.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#A0A0A0]">
              Używam sprawdzonych, nowoczesnych technologii. Nic z nimi egzotycznego —
              tylko to, co działa w produkcji i można utrzymać przez lata.
            </p>
          </Fade>
          <div className="space-y-5">
            {skills.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, x: 20 }} animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white">{s.label}</span>
                  <span className="text-[.62rem] text-[#D4AF37]">{s.level}%</span>
                </div>
                <div className="h-px bg-white/8">
                  <motion.div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#f0d878]"
                    initial={{ scaleX: 0 }} animate={skillsInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 + i * 0.08, ease }}
                    style={{ originX: 0, width: `${s.level}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <Fade className="mx-auto max-w-2xl">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light text-white">
            Pracujmy<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              razem.
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/kontakt" className="flex items-center gap-2 bg-[#D4AF37] px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
              Napisz do mnie <ArrowRight size={14} />
            </Link>
            <Link href="/wycena" className="flex items-center gap-2 border border-white/20 px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/70 transition hover:border-white/50 hover:text-white">
              Bezpłatna wycena
            </Link>
          </div>
        </Fade>
      </section>
    </div>
  );
}
