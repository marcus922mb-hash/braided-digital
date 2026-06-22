import Link from "next/link";
import { Arrow, CheckIcon, PlusIcon } from "./icons";
import { faqs, services } from "@/lib/data";
import { LivePortfolio } from "./live-portfolio";

export function PageHero({ eyebrow, title, italic, text }: { eyebrow: string; title: string; italic?: string; text: string }) {
  return <section className="grain overflow-hidden bg-ink text-white"><div className="container-page relative py-24 md:py-32"><div className="absolute -right-24 top-1/2 size-80 -translate-y-1/2 rounded-full border border-gold/20 md:size-[34rem]"/><div className="absolute -right-8 top-1/2 size-56 -translate-y-1/2 rounded-full border border-gold/10 md:size-[27rem]"/><p className="eyebrow reveal">{eyebrow}</p><h1 className="display reveal-delay mt-7 max-w-4xl text-[clamp(3.7rem,9vw,8.5rem)]">{title} {italic && <em className="font-normal text-gold-light">{italic}</em>}</h1><p className="reveal-delay mt-8 max-w-xl text-sm leading-7 text-white/60 md:text-base">{text}</p></div></section>;
}

export function ServiceGrid({ limit }: { limit?: number }) {
  return <div className="grid border-l border-t border-black/10 md:grid-cols-2 xl:grid-cols-4">{services.slice(0, limit).map((service) => { const Icon = service.icon; return <article key={service.title} className="card-lift relative border-b border-r border-black/10 bg-paper p-7 md:p-9"><span className="absolute right-6 top-5 text-[.6rem] font-bold tracking-widest text-gold">{service.number}</span><Icon className="size-9 text-gold"/><h3 className="mt-10 font-serif text-3xl leading-none">{service.title}</h3><p className="mt-5 text-sm leading-7 text-muted">{service.short}</p><ul className="mt-7 space-y-2 border-t border-black/8 pt-5">{service.details.map((item) => <li key={item} className="flex items-center gap-2 text-xs"><CheckIcon className="size-4 text-gold"/>{item}</li>)}</ul></article>; })}</div>;
}

export function CtaBand() {
  return <section className="bg-gold text-white"><div className="container-page flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-16"><div><p className="text-[.65rem] font-bold uppercase tracking-[.22em] text-white/70">Masz pomysł?</p><h2 className="mt-2 font-serif text-4xl leading-none md:text-5xl">Nadajmy mu cyfrową formę.</h2></div><Link href="/kontakt" className="btn-light shrink-0">Opowiedz mi o nim <Arrow /></Link></div></section>;
}

export function FaqList({ limit }: { limit?: number }) {
  return <div className="divide-y divide-black/10 border-y border-black/10">{faqs.slice(0, limit).map((item, i) => <details key={item.q} className="group"><summary className="flex items-center gap-5 py-6 md:py-8"><span className="text-[.62rem] font-bold text-gold">0{i + 1}</span><h3 className="flex-1 font-serif text-xl md:text-2xl">{item.q}</h3><PlusIcon className="faq-plus size-5 text-gold"/></summary><p className="max-w-3xl pb-7 pl-10 text-sm leading-7 text-muted md:pb-8">{item.a}</p></details>)}</div>;
}

export function PortfolioMockup() {
  return <div className="relative overflow-hidden bg-[#d9d0c2] p-3 md:p-8"><LivePortfolio/><div className="pointer-events-none absolute bottom-6 left-5 bg-ink px-4 py-3 text-[.55rem] uppercase tracking-[.18em] text-white shadow-xl md:bottom-12 md:left-10">Podgląd strony na żywo · 1:1</div></div>;
}
