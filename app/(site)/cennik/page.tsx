import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, CheckIcon } from "@/components/icons";
import { CtaBand, PageHero } from "@/components/ui";
import { pricing } from "@/lib/data";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cennik",
  description: "Orientacyjne ceny stron, linków w bio i sklepów internetowych od 290 zł.",
  alternates: canonical("/cennik"),
};

const smallTasks = [
  ["Konsultacja 60 min", "120 zł", "Rozmowa, sprawdzenie problemu i plan dalszych działań."],
  ["Pomoc techniczna", "od 90 zł/h", "Drobna poprawka WordPress lub WooCommerce."],
  ["Pakiet 3 godzin", "od 250 zł", "Kilka zmian wykonanych w jednym ustalonym zakresie."],
  ["Dodatkowa podstrona", "od 190 zł", "Nowy widok dopasowany do istniejącej strony."],
  ["Dodanie 5 produktów", "od 80 zł", "Wprowadzenie gotowych opisów, zdjęć i cen."],
  ["Podstawowy audyt", "od 150 zł", "Lista problemów i kolejność rekomendowanych poprawek."],
];

export default function PricingPage() {
  return <>
    <PageHero visual="pricing" eyebrow="Cennik orientacyjny" title="Budżet ma pasować do etapu." italic="Nie do ambicji agencji." text="Pakiety są ułożone tak, aby mała marka mogła zacząć sensownie, bez finansowania funkcji potrzebnych dopiero za kilka lat." />
    <section className="section-space">
      <div className="container-page">
        <div className="pricing-grid">
          {pricing.map((plan,index)=><article key={plan.slug} className={plan.featured ? "is-featured" : ""} data-reveal>
            <div className="flex items-start justify-between gap-4"><span className="index">0{index+1} / {plan.tag}</span>{plan.featured && <b>częsty wybór</b>}</div>
            <h2>{plan.title}</h2><strong>{plan.price}</strong><p>{plan.lead}</p>
            <div className="plan-time">Orientacyjny czas: {plan.time}</div>
            <ul>{plan.features.map(item=><li key={item}><CheckIcon className="size-4 text-brass"/>{item}</li>)}</ul>
            <Link href={`/demo/${plan.slug}`} className="text-link mt-5">Zobacz pełne demo <Arrow/></Link>
            <div className="mt-auto flex gap-3 pt-7"><Link href="/kontakt" className="btn-primary flex-1">Zapytaj</Link><Link href="/wycena" className="btn-secondary flex-1">Wycena</Link></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="border-y border-ink/10 bg-[#e9e1d3]">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[.65fr_1.35fr] lg:py-20">
        <div data-reveal><p className="kicker">Małe zadania</p><h2 className="section-title mt-5">Nie wszystko wymaga przebudowy.</h2><p className="mt-5 text-sm leading-7 text-ink/60">Najpierw potwierdzam, co da się realnie wykonać w wybranym czasie.</p></div>
        <div className="small-task-list">
          {smallTasks.map(([title,price,text],index)=><article key={title} data-reveal><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div><strong>{price}</strong></article>)}
        </div>
      </div>
    </section>
    <section className="section-space">
      <div className="container-page grid gap-5 md:grid-cols-3">
        {[
          ["Cena przed startem","Po poznaniu zakresu otrzymujesz konkretną wycenę. Dodatkowe prace wymagają wcześniejszego uzgodnienia."],
          ["Płatność etapami","Przy większych stronach i sklepach koszt można podzielić zgodnie z kolejnymi etapami realizacji."],
          ["Koszty zewnętrzne","Domena, hosting i płatne licencje nie są ukryte w cenie. Omawiam je osobno przed startem."],
        ].map(([title,text],i)=><article className="border border-ink/12 p-7" key={title} data-reveal><span className="index">0{i+1}</span><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-ink/60">{text}</p></article>)}
      </div>
    </section>
    <CtaBand/>
  </>;
}
