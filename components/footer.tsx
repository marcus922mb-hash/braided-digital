import Link from "next/link";
import { Arrow, WhatsAppIcon } from "./icons";
import { navItems } from "@/lib/data";
import { CookieSettingsButton } from "./cookie-settings-button";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div><p className="font-serif text-3xl tracking-wide">BRAIDED <span className="text-gold-light">DIGITAL</span></p><p className="mt-5 max-w-md text-sm leading-7 text-white/55">Tworzę cyfrowe miejsca, w których małe marki wyglądają profesjonalnie, mówią własnym głosem i mogą spokojnie rosnąć.</p><div className="mt-7 flex flex-col items-start gap-2"><a href="https://wa.me/48730195530" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm text-gold-light"><WhatsAppIcon className="size-5" /> +48 730 195 530</a><a href="mailto:ma.atelier.kontakt@gmail.com" className="text-xs text-white/55 transition hover:text-white">ma.atelier.kontakt@gmail.com</a><p className="text-xs text-white/35">Chylin 35, 62-710 Władysławów</p></div></div>
          <div><p className="mb-5 text-[.65rem] font-bold uppercase tracking-[.2em] text-gold-light">Na skróty</p><div className="grid gap-2.5">{navItems.slice(0, 5).map((item) => <Link key={item.href} href={item.href} className="text-sm text-white/60 transition hover:text-white">{item.label}</Link>)}</div></div>
          <div><p className="mb-5 text-[.65rem] font-bold uppercase tracking-[.2em] text-gold-light">Zacznijmy</p><Link href="/kontakt" className="group flex items-center justify-between border-b border-white/20 pb-3 font-serif text-2xl">Opowiedz o projekcie <Arrow className="size-5 transition group-hover:translate-x-1" /></Link><p className="mt-5 text-xs leading-6 text-white/45">Działam zdalnie i współpracuję z markami z całej Polski.</p></div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[.62rem] uppercase tracking-[.1em] text-white/35 lg:flex-row lg:items-center lg:justify-between"><p>© {new Date().getFullYear()} Braided Digital</p><div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/regulamin" className="transition hover:text-white">Regulamin</Link><Link href="/polityka-prywatnosci" className="transition hover:text-white">Prywatność</Link><Link href="/polityka-cookies" className="transition hover:text-white">Cookies</Link><CookieSettingsButton/></div></div>
      </div>
    </footer>
  );
}
