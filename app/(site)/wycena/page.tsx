"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EstimateForm } from "@/components/estimate-form";

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

export default function WycenaPage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-12 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(212,175,55,0.07), transparent)" }} />
        <div className="mx-auto max-w-4xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Bezpłatna wycena · 2 minuty</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] text-white">
            Ile kosztuje<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Twoja strona?
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-lg text-base leading-8 text-[#A0A0A0]">
            Odpowiedz na kilka pytań — wyliczymy orientacyjną wycenę i przygotujemy brief projektu.
            Bez zobowiązań, bez spamu, konkretna liczba.
          </motion.p>
        </div>
      </section>

      {/* Promo note */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }}
        className="border-y border-[#D4AF37]/20 bg-[#D4AF37]/5 px-6 py-4 text-center">
        <p className="text-sm text-white/70">
          <span className="mr-2 inline-block bg-[#D4AF37] px-2 py-0.5 text-[.52rem] font-bold uppercase tracking-widest text-[#0A0A0A]">Oferta specjalna</span>
          Realizacja strony dla pierwszej osoby —{" "}
          <strong className="text-[#D4AF37]">całkowicie GRATIS.</strong>{" "}
          <span className="text-[#A0A0A0]">Płacisz tylko za domenę (~50 zł/rok) i hosting (~100–200 zł/rok).</span>
        </p>
      </motion.div>

      {/* Form */}
      <section className="px-6 py-16">
        <Fade className="mx-auto max-w-3xl">
          <div className="border border-white/8 bg-white/2 p-8 md:p-12">
            <EstimateForm />
          </div>
        </Fade>
      </section>

      {/* Trust bar */}
      <section className="border-t border-white/5 bg-[#0D0D0D] px-6 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 text-center md:grid-cols-4">
          {["Bezpłatna wycena", "Stała cena przed startem", "Możliwy podział płatności", "Wsparcie po wdrożeniu"].map((item, i) => (
            <Fade key={item} delay={i * 0.07}>
              <p className="text-[.6rem] font-bold uppercase tracking-widest text-[#A0A0A0]">{item}</p>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
}
