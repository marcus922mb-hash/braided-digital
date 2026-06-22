import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollEffects } from "@/components/scroll-effects";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Braided Digital | Strony i sklepy internetowe",
    template: "%s | Braided Digital",
  },
  description:
    "Projektuję strony internetowe, sklepy online, linki w bio i wspieram małe firmy w WordPress oraz WooCommerce.",
  keywords: [
    "strony internetowe",
    "sklepy internetowe",
    "WordPress",
    "WooCommerce",
    "link w bio",
    "projektowanie stron",
  ],
  authors: [{ name: "Braided Digital" }],
  creator: "Braided Digital",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    siteName: "Braided Digital",
    title: "Braided Digital | Cyfrowa przestrzeń dla Twojej marki",
    description:
      "Nowoczesne strony i sklepy online tworzone z myślą o małych firmach.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Braided Digital",
    description: "Strony, sklepy i cyfrowe wsparcie dla małych marek.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <div data-scroll-progress className="scroll-progress" aria-hidden="true" />
        <ScrollEffects />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
