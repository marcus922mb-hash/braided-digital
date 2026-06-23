import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollEffects } from "@/components/scroll-effects";
import { canonical } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Braided Digital",
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
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Usługi tworzenia stron i sklepów internetowych",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Strona internetowa", "description": "Indywidualny projekt strony www od 390 zł" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sklep internetowy", "description": "E-commerce dla małych marek od 2490 zł" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Link w bio", "description": "Strona z linkami dla social media od 490 zł" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wsparcie WordPress i WooCommerce", "description": "Pomoc techniczna, poprawki i rozwój od 120 zł/h" } },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Braided Digital | Strony i sklepy dla małych marek",
    template: "%s | Braided Digital",
  },
  description:
    "Projektuję estetyczne strony internetowe i sklepy online dla małych firm, marek handmade i usługodawców. Indywidualny projekt, mobile-first. Ceny od 390 zł.",
  keywords: [
    "strony internetowe dla małych firm",
    "sklepy internetowe handmade",
    "projektowanie stron internetowych",
    "WordPress WooCommerce",
    "link w bio własna domena",
    "freelancer web design Polska",
  ],
  authors: [{ name: "Braided Digital" }],
  creator: "Braided Digital",
  alternates: canonical("/"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    siteName: "Braided Digital",
    title: "Braided Digital | Strony i sklepy dla małych marek",
    description:
      "Estetyczne strony i sklepy tworzone dla małych marek, rękodzieła i usługodawców. Indywidualny projekt, jasny proces, wsparcie po starcie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Braided Digital | Strony i sklepy dla małych marek",
    description: "Strony, sklepy i cyfrowe wsparcie dla małych marek. Ceny od 390 zł.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div data-scroll-progress className="scroll-progress" aria-hidden="true" />
        <ScrollEffects />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
