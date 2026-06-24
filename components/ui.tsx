import Link from "next/link";
import Image from "next/image";
import { Arrow, CheckIcon, PlusIcon } from "./icons";
import { faqs, services } from "@/lib/data";
import { LivePortfolio } from "./live-portfolio";

type HeroVisual = "offer" | "portfolio" | "process" | "pricing" | "faq" | "contact" | "estimate" | "about";

export function PageHero({ eyebrow, title, italic, text, visual }: { eyebrow: string; title: string; italic?: string; text: string; visual?: HeroVisual }) {
  return <section className="page-hero"><div className="thread page-hero-thread" aria-hidden="true"/><div className={`container-page relative grid items-center gap-12 py-20 md:py-28 ${visual ? "lg:grid-cols-[1.2fr_.8fr]" : ""}`}><div className="hero-copy-enter"><p className="kicker">{eyebrow}</p><h1 className={`editorial-title mt-7 ${visual ? "" : "max-w-5xl"}`}>{title} {italic && <em>{italic}</em>}</h1><p className="mt-8 max-w-2xl text-sm leading-7 text-ink/60 md:text-base">{text}</p></div>{visual && <EditorialVisual variant={visual}/>}</div></section>;
}

const heroImages: Record<HeroVisual, string> = {
  offer:     "/images/hero-offer.webp",
  portfolio: "/images/hero-portfolio.webp",
  process:   "/images/hero-process.webp",
  pricing:   "/images/hero-pricing.webp",
  faq:       "/images/hero-faq.webp",
  contact:   "/images/hero-contact.webp",
  estimate:  "/images/hero-estimate.webp",
  about:     "/images/hero-about.webp",
};

function EditorialVisual({ variant }: { variant: HeroVisual }) {
  const image = heroImages[variant];
  return <div className={`editorial-visual visual-${variant}`} aria-hidden="true">
    <Image className="visual-photo" src={image} alt="" fill sizes="(max-width: 1024px) 100vw, 38vw" priority={variant === "about"}/>
    <div className="visual-photo-shade"/>
    <div className="visual-grid"/>
    {variant === "offer" && <><div className="visual-screen screen-a"><span>WEB</span><i/><i/><i/></div><div className="visual-screen screen-b"><span>SHOP</span><i/><i/></div><div className="visual-phone"><i/><i/><i/></div></>}
    {variant === "portfolio" && <><div className="visual-frame frame-a"><i/></div><div className="visual-frame frame-b"><i/></div><div className="visual-caption">MA / 01</div></>}
    {variant === "process" && <><div className="visual-path"/>{["01","02","03","04"].map((n,i)=><span key={n} className={`visual-node node-${i+1}`}>{n}</span>)}</>}
    {variant === "pricing" && <>{["390","990","2490"].map((price,i)=><div key={price} className={`visual-price price-${i+1}`}><small>OD</small><strong>{price}</strong><span>PLN</span></div>)}</>}
    {variant === "faq" && <><div className="visual-bubble bubble-a">Ile trwa projekt?</div><div className="visual-bubble bubble-b">Czy pomagasz z treścią?</div><div className="visual-bubble bubble-c">Tak. Ustalamy zakres.</div></>}
    {variant === "contact" && <><div className="visual-pin"><span>BD</span></div><div className="visual-contact-line"/><div className="visual-message">Napisz kilka zdań.<br/><b>Odpowiem osobiście.</b></div></>}
    {variant === "estimate" && <><div className="visual-chart">{[34,58,82,68].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="visual-total"><small>TWÓJ ZAKRES</small><strong>z pozycji,<br/>nie z przypadku</strong></div></>}
    {variant === "about" && <><div className="visual-desk"><div className="desk-screen"><span>&lt;/&gt;</span></div><div className="desk-note">MA ATELIER<br/>→ BRAIDED DIGITAL</div><div className="desk-cup"/></div></>}
  </div>;
}

export function ServiceGrid({ limit }: { limit?: number }) {
  return <div className="grid border-l border-t border-black/10 md:grid-cols-2 xl:grid-cols-4">{services.slice(0, limit).map((service) => { const Icon = service.icon; return <article key={service.title} className="card-lift relative border-b border-r border-black/10 bg-paper p-7 md:p-9"><span className="absolute right-6 top-5 text-[.6rem] font-bold tracking-widest text-gold">{service.number}</span><Icon className="size-9 text-gold"/><h3 className="mt-10 font-serif text-3xl leading-none">{service.title}</h3><p className="mt-5 text-sm leading-7 text-muted">{service.short}</p><ul className="mt-7 space-y-2 border-t border-black/8 pt-5">{service.details.map((item) => <li key={item} className="flex items-center gap-2 text-xs"><CheckIcon className="size-4 text-gold"/>{item}</li>)}</ul></article>; })}</div>;
}

export function CtaBand() {
  return <section className="contact-band"><div className="container-page flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-end md:py-20" data-reveal><div><p className="kicker kicker-light">Masz już punkt zaczepienia?</p><h2 className="section-title mt-5 max-w-3xl text-white">Napisz kilka zdań.<br/><em>Resztę uporządkujemy.</em></h2></div><Link href="/kontakt" className="btn-brass shrink-0">Opowiedz o projekcie <Arrow /></Link></div></section>;
}

export function FaqList({ limit }: { limit?: number }) {
  return <div className="divide-y divide-black/10 border-y border-black/10">{faqs.slice(0, limit).map((item, i) => <details key={item.q} className="group"><summary className="flex items-center gap-5 py-6 md:py-8"><span className="text-[.62rem] font-bold text-gold">0{i + 1}</span><h3 className="flex-1 font-serif text-xl md:text-2xl">{item.q}</h3><PlusIcon className="faq-plus size-5 text-gold"/></summary><p className="max-w-3xl pb-7 pl-10 text-sm leading-7 text-muted md:pb-8">{item.a}</p></details>)}</div>;
}

export function PortfolioMockup() {
  return <div className="relative overflow-hidden bg-[#d9d0c2] p-3 md:p-8"><LivePortfolio/><div className="pointer-events-none absolute bottom-6 left-5 bg-ink px-4 py-3 text-[.55rem] uppercase tracking-[.18em] text-white shadow-xl md:bottom-12 md:left-10">Podgląd strony na żywo · 1:1</div></div>;
}
