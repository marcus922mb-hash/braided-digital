import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollEffects } from "@/components/scroll-effects";
import { canonical } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "MA Atelier Web Studio",
  "description": "Studio tworzenia stron i sklepów internetowych dla małych marek, rękodzieła i usługodawców.",
  "url": siteConfig.url,
  "email": siteConfig.email,
  "telephone": siteConfig.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chylin 35",
    "addressLocality": "Władysławów",
    "postalCode": "62-710",
    "addressCountry": "PL",
  },
  "areaServed": { "@type": "Country", "name": "PL" },
  "priceRange": "zł zł",
  "knowsLanguage": "pl-PL",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "MA Atelier Web Studio | Strony i sklepy",
    template: "%s | MA Atelier Web",
  },
  description:
    "Projektuję estetyczne strony internetowe i sklepy online. Indywidualny projekt, mobile-first. Ceny od 390 zł.",
  authors: [{ name: "MA Atelier Web Studio" }],
  creator: "MA Atelier Web Studio",
  alternates: canonical("/"),
  robots: { index: true, follow: true },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div data-scroll-progress className="scroll-progress" aria-hidden="true" />
      <ScrollEffects />
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
