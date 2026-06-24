import type { Metadata } from "next";
import { EstimateForm } from "@/components/estimate-form";
import { PageHero } from "@/components/ui";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Wycena online",
  description: "Szczegółowy kalkulator strony, sklepu, landing page, linku w bio lub prac WordPress.",
  alternates: canonical("/wycena"),
};

export default function EstimatePage() {
  return <>
    <PageHero visual="estimate" eyebrow="Wycena online / około 3–5 minut" title="Inny projekt." italic="Inne pytania." text="Kalkulator dopasowuje pytania do rodzaju projektu i pokazuje, z jakich pozycji powstał wynik. Budżet nie obniża ani nie podnosi ceny." />
    <section className="section-space">
      <div className="container-page">
        <div className="estimate-card mx-auto max-w-4xl" data-reveal><EstimateForm/></div>
      </div>
    </section>
  </>;
}
