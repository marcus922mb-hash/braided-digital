import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { CtaBand, PageHero } from "@/components/ui";
import { faqs } from "@/lib/data";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Odpowiedzi na pytania o czas, koszt, materiały, hosting i obsługę strony.",
  alternates: canonical("/faq"),
};

export default function FaqPage() {
  return <>
    <PageHero visual="faq" eyebrow="FAQ" title="Najpierw konkrety." italic="Potem decyzja." text="Najczęstsze pytania o współpracę, koszty i to, co dzieje się po publikacji." />
    <section className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
        <aside data-reveal><p className="kicker">Kategorie</p><p className="mt-5 max-w-xs text-sm leading-7 text-ink/55">Zakres projektu ustalam indywidualnie, ale podstawowe zasady są takie same dla każdej realizacji.</p><Link href="/kontakt" className="text-link mt-7">Zapytaj bezpośrednio <Arrow/></Link></aside>
        <div className="faq-clean">
          {faqs.map((item,index)=><details key={item.q} data-reveal><summary><span>0{index+1}</span><strong>{item.q}</strong><i>+</i></summary><p>{item.a}</p></details>)}
        </div>
      </div>
    </section>
    <CtaBand/>
  </>;
}
