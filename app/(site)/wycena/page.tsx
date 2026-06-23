import type { Metadata } from "next";
import { EstimateForm } from "@/components/estimate-form";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kalkulator wyceny strony internetowej — Braided Digital",
  description:
    "Sprawdź orientacyjną cenę swojej strony internetowej lub sklepu handmade. Formularz zajmuje 2 minuty — bez zobowiązań, bez spamu, konkretna liczba.",
  alternates: canonical("/wycena"),
  openGraph: {
    title: "Kalkulator wyceny — Braided Digital",
    description:
      "Odpowiedz na kilka pytań i dowiedz się, ile może kosztować Twój projekt. Strony od 390 zł, sklepy od 2490 zł.",
  },
};

export default function WycenaPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-ink text-white">
        <div className="container-page py-16 text-center md:py-24">
          <p className="eyebrow mx-auto w-fit">Darmowa wycena · bez zobowiązań</p>
          <h1
            className="mt-7 font-serif leading-[.92]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            Ile kosztuje
            <br />
            <em className="font-normal text-gold-light">Twoja strona?</em>
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-white/55">
            Odpowiedz na kilka pytań — wyliczymy orientacyjną wycenę i przygotujemy brief projektu.
            Zajmuje to 2 minuty.
          </p>
        </div>
      </section>

      {/* Promo note */}
      <section className="border-b border-gold/30 bg-[#fdf6e3]">
        <div className="container-page py-5 text-center">
          <p className="text-sm font-medium">
            <span className="mr-2 inline-block rounded-sm bg-gold px-2 py-0.5 text-[.58rem] font-bold uppercase tracking-widest text-white">
              Oferta specjalna
            </span>
            Realizacja strony dla pierwszej osoby —{" "}
            <strong className="text-gold">całkowicie GRATIS.</strong>{" "}
            <span className="text-muted">Płacisz tylko za domenę (~50 zł/rok) i hosting (~100–200 zł/rok).</span>
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-space">
        <div className="container-page">
          <EstimateForm />
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-black/8 bg-cream/60">
        <div className="container-page grid grid-cols-2 gap-4 py-8 text-center md:grid-cols-4">
          {[
            "Bezpłatna wycena",
            "Stała cena przed startem",
            "Możliwy podział płatności",
            "Wsparcie po wdrożeniu",
          ].map((item) => (
            <p key={item} className="text-[.62rem] font-bold uppercase tracking-widest text-muted">
              {item}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
