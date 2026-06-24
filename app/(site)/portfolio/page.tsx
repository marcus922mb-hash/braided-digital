"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, ExternalLink } from "lucide-react";

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

type Project = {
  id: string; title: string; type: string; tag: string;
  palette: [string, string]; desc: string; result: string; tech: string[];
};

const projects: Project[] = [
  { id: "01", title: "Studio kosmetyczne", type: "One Page", tag: "Beauty",
    palette: ["#1a1218", "#c8a0b0"], desc: "Elegancka strona one-page dla studio beauty. Rezerwacja online, galeria zabiegów, cennik z animowanymi kartami. Wzrost konwersji o 40% w pierwszym miesiącu.",
    result: "+40% rezerwacji", tech: ["Next.js", "Framer Motion", "Calendly"] },
  { id: "02", title: "Sklep z biżuterią handmade", type: "WooCommerce", tag: "Handmade",
    palette: ["#0f1a14", "#7fb592"], desc: "Sklep dla projektantki biżuterii. Ponad 80 unikalnych produktów, płatności Przelewy24, integracja z kurierem InPost. Sprzedaż od pierwszego dnia.",
    result: "80+ produktów, 0 awarii", tech: ["WordPress", "WooCommerce", "Przelewy24"] },
  { id: "03", title: "Architekt wnętrz", type: "Strona firmowa", tag: "Design",
    palette: ["#181410", "#c4a882"], desc: "Portfolio i strona usługowa dla architektki wnętrz. Galeryjny układ realizacji z filtrowaniem, formularz briefu projektu i animowane przejścia między podstronami.",
    result: "3x więcej zapytań", tech: ["Next.js", "TypeScript", "Framer Motion"] },
  { id: "04", title: "Trener personalny", type: "Landing Page", tag: "Sport",
    palette: ["#0a0f1a", "#5b8ad4"], desc: "Landing page pod kampanię Meta Ads. Struktura AIDA, wideo w tle, zegar odliczający do promocji. CTR wzrósł o 60% względem poprzedniej strony.",
    result: "+60% CTR z reklam", tech: ["Next.js", "Google Analytics"] },
  { id: "05", title: "Kawiarnia rzemieślnicza", type: "One Page", tag: "Gastronomia",
    palette: ["#110f08", "#b8934a"], desc: "Strona dla kawiarni specialty coffee. Menu online, mapa i godziny, Instagram feed. Wdrożona w 5 dni, gotowa na otwarcie lokalu.",
    result: "Wdrożona w 5 dni", tech: ["WordPress", "Elementor Pro"] },
  { id: "06", title: "Kancelaria prawna", type: "Strona firmowa", tag: "Prawo",
    palette: ["#080c12", "#8096b4"], desc: "Profesjonalna wielostronicowa witryna kancelarii. Blog prawniczy z SEO, formularz kontaktowy z automatyczną odpowiedzią, cookiebot RODO-compliant.",
    result: "Top 3 Google lokalnie", tech: ["WordPress", "SEO", "Yoast"] },
];

const categories = ["Wszystkie", "One Page", "WooCommerce", "Strona firmowa", "Landing Page"];

export default function PortfolioPage() {
  const [cat, setCat] = useState("Wszystkie");
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  const filtered = cat === "Wszystkie" ? projects : projects.filter((p) => p.type === cat);

  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(212,175,55,0.07), transparent)" }} />
        <div className="mx-auto max-w-5xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Portfolio</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] text-white">
            Projekty, które<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              mówią same za siebie.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#A0A0A0]">
            Każdy projekt zaczyna się od rozmowy, a kończy na wynikach. Oto wybrane realizacje — zero szablonów, zero przypadkowych decyzji.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-10 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-6 py-4">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 px-4 py-2 text-[.62rem] font-bold uppercase tracking-widest transition ${cat === c ? "bg-[#D4AF37] text-[#0A0A0A]" : "border border-white/10 text-[#A0A0A0] hover:border-[#D4AF37]/40 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-16">
        <div ref={gridRef} className="mx-auto max-w-7xl grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article key={project.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: i * 0.06, ease }}
                className="group relative cursor-pointer bg-[#0A0A0A] transition hover:bg-[#0f0f0f]"
                onClick={() => setSelected(project)}>
                {/* Coloured preview */}
                <div className="aspect-video w-full"
                  style={{ background: `linear-gradient(135deg, ${project.palette[0]}, ${project.palette[1]}20)` }}>
                  <div className="flex h-full items-center justify-center gap-2">
                    <span className="text-[.54rem] font-bold uppercase tracking-[.2em] text-white/30">{project.id}</span>
                    <div className="h-px w-8" style={{ background: project.palette[1] + "60" }} />
                    <span className="text-[.54rem] font-bold uppercase tracking-[.2em] text-white/30">{project.tag}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-1 text-[.6rem] font-bold uppercase tracking-wider text-[#D4AF37]/70">{project.type}</p>
                  <h3 className="mb-2 text-xl font-light text-white group-hover:text-[#f0d878] transition">{project.title}</h3>
                  <p className="mb-4 text-xs leading-6 text-[#A0A0A0] line-clamp-2">{project.desc}</p>
                  <div className="flex items-center gap-2 text-[.6rem] font-bold uppercase tracking-wider text-[#D4AF37]">
                    <span>{project.result}</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex items-center gap-2 border border-[#D4AF37]/50 bg-black/50 px-5 py-2.5 text-[.62rem] font-bold uppercase tracking-widest text-[#D4AF37]">
                    Szczegóły
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.4, ease }}
              className="fixed inset-x-4 bottom-4 top-4 z-50 m-auto max-w-2xl overflow-y-auto border border-white/10 bg-[#0D0D0D] p-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px]">
              <button onClick={() => setSelected(null)}
                className="absolute right-5 top-5 flex size-9 items-center justify-center border border-white/10 text-[#A0A0A0] transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]">
                <X size={16} />
              </button>
              <div className="mb-6 aspect-video w-full"
                style={{ background: `linear-gradient(135deg, ${selected.palette[0]}, ${selected.palette[1]}30)` }} />
              <p className="mb-2 text-[.6rem] font-bold uppercase tracking-widest text-[#D4AF37]">{selected.type} · {selected.tag}</p>
              <h2 className="mb-4 text-3xl font-light text-white">{selected.title}</h2>
              <p className="mb-6 text-sm leading-8 text-[#A0A0A0]">{selected.desc}</p>
              <div className="mb-6 border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-5 py-4">
                <span className="text-[.6rem] font-bold uppercase tracking-wider text-[#D4AF37]/70">Wynik</span>
                <p className="mt-1 text-xl font-light text-white">{selected.result}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span key={t} className="border border-white/10 px-3 py-1 text-[.6rem] uppercase tracking-wider text-[#A0A0A0]">{t}</span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="border-t border-white/5 bg-[#0D0D0D] px-6 py-24 text-center">
        <Fade className="mx-auto max-w-2xl">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light text-white">
            Twój projekt<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              może być następny.
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/wycena" className="flex items-center gap-2 bg-[#D4AF37] px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-[#0A0A0A] transition hover:bg-[#f0d878]">
              Bezpłatna wycena <ArrowRight size={14} />
            </Link>
            <Link href="/kontakt" className="flex items-center gap-2 border border-white/20 px-7 py-4 text-[.7rem] font-bold uppercase tracking-[.14em] text-white/70 transition hover:border-white/50 hover:text-white">
              Porozmawiajmy
            </Link>
          </div>
        </Fade>
      </section>
    </div>
  );
}
