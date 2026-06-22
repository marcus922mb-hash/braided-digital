"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { navItems } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-paper/90 backdrop-blur-xl">
      <div className="container-page flex h-[76px] items-center justify-between gap-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Braided Digital - strona główna">
          <span className="grid size-9 rotate-45 place-items-center border border-gold/70"><span className="-rotate-45 font-serif text-xl text-gold">B</span></span>
          <span className="leading-none"><span className="block font-serif text-[1.35rem] font-medium tracking-[.06em]">BRAIDED</span><span className="mt-1 block text-[.52rem] font-bold tracking-[.42em] text-gold">DIGITAL</span></span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Główna nawigacja">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={`text-[.66rem] font-bold uppercase tracking-[.12em] transition hover:text-gold ${pathname === item.href ? "text-gold" : ""}`}>{item.label}</Link>)}
        </nav>
        <Link href="/kontakt" className="btn-primary hidden !min-h-[2.75rem] lg:inline-flex">Porozmawiajmy</Link>
        <button type="button" className="grid size-11 place-items-center border border-black/15 xl:hidden" aria-label={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>
      <div className={`overflow-hidden border-black/8 bg-paper transition-[max-height,border] duration-500 xl:hidden ${open ? "max-h-[620px] border-t" : "max-h-0"}`}>
        <nav className="container-page flex flex-col py-5" aria-label="Mobilna nawigacja">
          {navItems.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-black/8 py-3.5 font-serif text-2xl"><span>{item.label}</span><span className="font-sans text-[.6rem] text-gold">0{index + 1}</span></Link>)}
          <Link href="/kontakt" onClick={() => setOpen(false)} className="btn-primary mt-5">Porozmawiajmy</Link>
        </nav>
      </div>
    </header>
  );
}
