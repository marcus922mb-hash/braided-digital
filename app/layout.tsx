import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { canonical } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://web.ma-atelier.pl"),
  title: {
    default: "MA Atelier Web Studio | Strony, które zarabiają",
    template: "%s | MA Atelier Web",
  },
  description:
    "Nowoczesne strony internetowe, sklepy WooCommerce i automatyzacje AI. Indywidualny projekt, mobile-first, SEO od pierwszej linii kodu. Ceny od 390 zł.",
  keywords: [
    "strony internetowe",
    "sklep internetowy WooCommerce",
    "automatyzacje AI",
    "projektowanie stron",
    "MA Atelier Web",
    "web studio Polska",
  ],
  authors: [{ name: "MA Atelier Web Studio" }],
  creator: "MA Atelier Web Studio",
  alternates: canonical("/"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://web.ma-atelier.pl",
    siteName: "MA Atelier Web Studio",
    title: "MA Atelier Web Studio | Strony, które zarabiają",
    description:
      "Nowoczesne strony internetowe, sklepy WooCommerce i automatyzacje AI stworzone z myślą o rozwoju Twojej firmy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MA Atelier Web Studio",
    description: "Strony internetowe, sklepy WooCommerce i automatyzacje AI. Ceny od 390 zł.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
