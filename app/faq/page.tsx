import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { CtaBand, FaqList, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "FAQ", description: "Odpowiedzi na pytania o tworzenie stron i sklepów, terminy, materiały, płatność i wsparcie." };

export default function FaqPage() { return <><PageHero eyebrow="FAQ" title="Pytania są częścią" italic="dobrego procesu." text="Zebrałam odpowiedzi na kwestie, które najczęściej pojawiają się przed współpracą. Jeżeli nie ma tu Twojego pytania, po prostu napisz."/><section className="section-space"><div className="container-page grid gap-14 lg:grid-cols-[.55fr_1.45fr]"><div><p className="eyebrow">Warto wiedzieć</p><h2 className="mt-6 font-serif text-4xl leading-tight">Konkretnie<br/>i bez żargonu.</h2><p className="mt-5 max-w-xs text-sm leading-7 text-muted">Techniczne decyzje wyjaśniam prostym językiem. Nie musisz znać systemów ani skrótów, żeby świadomie wybrać.</p></div><FaqList/></div></section><section className="bg-cream/70"><div className="container-page flex flex-col items-start justify-between gap-7 py-16 md:flex-row md:items-center"><div><p className="text-[.62rem] font-bold uppercase tracking-widest text-gold">Nie znalazłaś / nie znalazłeś odpowiedzi?</p><h2 className="mt-3 font-serif text-4xl">Zapytaj bez zobowiązań.</h2></div><Link href="/kontakt" className="btn-primary">Napisz do mnie <Arrow/></Link></div></section><CtaBand/></>; }
