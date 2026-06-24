"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";

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

export default function KontaktPage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(212,175,55,0.07), transparent)" }} />
        <div className="mx-auto max-w-4xl text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="mb-5 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Kontakt</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-[clamp(3rem,7vw,6rem)] font-light leading-[.95] text-white">
            Porozmawiajmy<br />
            <span style={{ background: "linear-gradient(90deg,#D4AF37,#f0d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              o Twoim projekcie.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#A0A0A0]">
            Nie potrzebujesz gotowego briefu ani dokładnej wizji. Napisz kilka zdań o marce
            i tym, co chcesz osiągnąć. Resztą zajmiemy się razem.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.6fr]">
          {/* Left — contact info */}
          <Fade>
            <div className="sticky top-28">
              <p className="mb-6 text-[.65rem] font-bold uppercase tracking-[.22em] text-[#D4AF37]">Napisz bezpośrednio</p>
              <h2 className="mb-5 text-3xl font-light leading-snug text-white">
                Krótka wiadomość<br />wystarczy.
              </h2>
              <p className="mb-8 text-sm leading-7 text-[#A0A0A0]">
                Odpowiadam osobiście w ciągu 1–2 dni roboczych. W pierwszej wiadomości możesz podać
                link do obecnej strony lub profilu marki.
              </p>

              {/* WhatsApp */}
              <a href="https://wa.me/48730195530" target="_blank" rel="noopener noreferrer"
                className="group mb-4 flex items-center gap-4 border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10">
                <div className="flex size-11 items-center justify-center bg-[#D4AF37]">
                  <MessageCircle size={20} className="text-[#0A0A0A]" />
                </div>
                <div>
                  <span className="block text-[.55rem] font-bold uppercase tracking-widest text-[#D4AF37]">WhatsApp</span>
                  <span className="block text-lg font-light text-white">+48 730 195 530</span>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:ma.atelier.kontakt@gmail.com"
                className="group mb-4 flex items-center gap-4 border border-white/8 p-4 transition hover:border-[#D4AF37]/30">
                <div className="flex size-11 items-center justify-center border border-white/10">
                  <Mail size={18} className="text-[#A0A0A0]" />
                </div>
                <div>
                  <span className="block text-[.55rem] font-bold uppercase tracking-widest text-[#A0A0A0]">E-mail</span>
                  <span className="block text-sm font-light text-white">ma.atelier.kontakt@gmail.com</span>
                </div>
              </a>

              {/* Info */}
              <div className="mt-6 space-y-3">
                {[
                  { icon: MapPin, text: "Działam zdalnie · cała Polska" },
                  { icon: Clock, text: "Odpowiedź w 1–2 dni robocze" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-[#A0A0A0]">
                    <Icon size={14} className="shrink-0 text-[#D4AF37]/60" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          {/* Right — form */}
          <Fade delay={0.15}>
            <div className="border border-white/8 bg-white/2 p-8 md:p-10">
              <p className="mb-7 text-[.62rem] font-bold uppercase tracking-[.2em] text-[#D4AF37]">Formularz zapytania</p>
              <ContactForm />
            </div>
          </Fade>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-white/5 bg-[#0D0D0D] px-6 py-12">
        <div className="mx-auto max-w-7xl grid grid-cols-2 gap-6 md:grid-cols-4">
          {["Bezpłatna wycena", "Stała cena przed startem", "Podział płatności", "Wsparcie po wdrożeniu"].map((item, i) => (
            <Fade key={item} delay={i * 0.07}>
              <p className="text-center text-[.6rem] font-bold uppercase tracking-widest text-[#A0A0A0]">{item}</p>
            </Fade>
          ))}
        </div>
      </section>
    </div>
  );
}
