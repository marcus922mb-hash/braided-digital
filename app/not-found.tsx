import Link from "next/link";
import { Arrow } from "@/components/icons";

export default function NotFound() { return <section className="grid min-h-[70vh] place-items-center bg-ink px-5 text-center text-white"><div><p className="font-serif text-8xl text-gold-light">404</p><h1 className="mt-4 font-serif text-4xl">Ta strona jeszcze nie istnieje.</h1><p className="mt-4 text-sm text-white/50">Wróć na stronę główną i wybierz właściwy kierunek.</p><Link href="/" className="btn-primary mt-8">Strona główna <Arrow/></Link></div></section>; }
