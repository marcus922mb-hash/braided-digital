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
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/92 backdrop-blur-xl">
      <div className="container-page flex h-[78px] items-center justify-between gap-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Braided Digital - strona główna">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span className="leading-none"><span className="block font-serif text-[1.25rem] font-medium tracking-[.04em]">BRAIDED</span><span className="mt-1 block text-[.48rem] font-bold tracking-[.38em] text-brass">DIGITAL</span></span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Główna nawigacja">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${pathname === item.href ? "is-active" : ""}`}>{item.label}</Link>)}
        </nav>
        <Link href="/kontakt" className="btn-primary hidden min-h-[2.75rem]! lg:inline-flex">Opowiedz o projekcie</Link>
        <button type="button" className="grid size-11 place-items-center border border-ink/15 xl:hidden" aria-label={open ? "Zamknij menu" : "Otwórz menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>
      <div className={`overflow-hidden border-ink/10 bg-paper transition-[max-height,border] duration-500 xl:hidden ${open ? "max-h-[620px] border-t" : "max-h-0"}`}>
        <nav className="container-page flex flex-col py-5" aria-label="Mobilna nawigacja">
          {navItems.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-ink/10 py-3.5 font-serif text-2xl"><span>{item.label}</span><span className="font-sans text-[.6rem] text-brass">0{index + 1}</span></Link>)}
          <Link href="/kontakt" onClick={() => setOpen(false)} className="btn-primary mt-5">Opowiedz o projekcie</Link>
        </nav>
      </div>
    </header>
  );
}
