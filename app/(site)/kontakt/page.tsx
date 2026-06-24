import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z Markiem Białkowskim w sprawie strony, sklepu lub pomocy WordPress.",
  alternates: canonical("/kontakt"),
};

export default function ContactPage() {
  return <>
    <PageHero visual="contact" eyebrow="Kontakt" title="Nie potrzebujesz briefu." italic="Wystarczy początek." text="Napisz, czym zajmuje się Twoja marka, co już masz i co obecnie najbardziej przeszkadza. Odpowiadam osobiście." />
    <section className="section-space">
      <div className="container-page grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <aside data-reveal>
          <p className="kicker">Bezpośredni kontakt</p>
          <h2 className="mt-6 font-serif text-4xl">Marek Białkowski</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-ink/60">Braided Digital<br/>Chylin 35, 62-710 Władysławów<br/>projekty realizowane zdalnie</p>
          <div className="mt-8 border-y border-ink/12">
            <a href="https://wa.me/48730195530" target="_blank" rel="noreferrer" className="contact-line"><WhatsAppIcon className="size-5"/><span><small>WhatsApp</small>+48 730 195 530</span></a>
            <a href="mailto:ma.atelier.kontakt@gmail.com" className="contact-line"><span className="text-xl">@</span><span><small>E-mail</small>ma.atelier.kontakt@gmail.com</span></a>
          </div>
          <p className="mt-6 text-xs leading-6 text-ink/45">Zwykle odpowiadam w ciągu 1–2 dni roboczych. W pilnej sprawie najlepiej napisać na WhatsApp.</p>
        </aside>
        <div className="contact-form-card" data-reveal>
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-ink/12 pb-5"><div><p className="index">Formularz zapytania</p><h2 className="mt-2 font-serif text-3xl">Kilka zdań wystarczy.</h2></div><span className="hidden text-right text-[.6rem] uppercase tracking-widest text-ink/35 sm:block">Wiadomość otworzy się<br/>w WhatsApp</span></div>
          <ContactForm/>
        </div>
      </div>
    </section>
  </>;
}
