"use client";

import { useState } from "react";

export function LivePortfolio() {
  const [loaded, setLoaded] = useState(false);
  return <div className="overflow-hidden border border-black/15 bg-white shadow-2xl"><div className="flex h-9 items-center gap-2 border-b border-black/10 bg-[#f3f0eb] px-4"><span className="size-2.5 rounded-full bg-[#d9a79c]"/><span className="size-2.5 rounded-full bg-[#dfc78b]"/><span className="size-2.5 rounded-full bg-[#94b59a]"/><span className="mx-auto rounded bg-white px-12 py-1 text-[.45rem] text-black/45 md:px-24">ma-atelier.pl</span></div>{loaded ? <iframe src="https://ma-atelier.pl" title="Aktualny podgląd strony MA Atelier" className="h-[470px] w-full bg-white md:h-[650px]"/> : <div className="grid h-[470px] place-items-center bg-[#f8f2ea] px-6 text-center md:h-[650px]"><div className="max-w-md"><p className="eyebrow mx-auto w-fit">Zewnętrzna zawartość</p><h3 className="mt-5 font-serif text-4xl">Podgląd MA Atelier na żywo</h3><p className="mt-4 text-xs leading-6 text-muted">Po uruchomieniu przeglądarka połączy się z ma-atelier.pl. Ta zewnętrzna strona może korzystać z własnych plików cookies i narzędzi analitycznych.</p><button type="button" onClick={() => setLoaded(true)} className="btn-primary mt-7">Uruchom podgląd 1:1</button></div></div>}</div>;
}
