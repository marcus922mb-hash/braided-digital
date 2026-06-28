import type { Metadata } from "next";
import { Toaster } from "sonner";
import { canonical } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://web.ma-atelier.pl"),
  title: {
    default: "Braided Digital | Strony i sklepy dla małych marek",
    template: "%s | Braided Digital",
  },
  description:
    "Projektuję strony, małe sklepy internetowe i linki w bio dla rękodzieła, lokalnych usług i małych firm. Ceny od 390 zł.",
  keywords: [
    "strony internetowe",
    "sklep internetowy WooCommerce",
    "projektowanie stron",
    "Braided Digital",
    "strony dla handmade",
  ],
  authors: [{ name: "Marek Białkowski" }],
  creator: "Braided Digital",
  alternates: canonical("/"),
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://web.ma-atelier.pl",
    siteName: "Braided Digital",
    title: "Braided Digital | Strony i sklepy dla małych marek",
    description:
      "Strony, sklepy i linki w bio projektowane z myślą o małych firmach i markach handmade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Braided Digital",
    description: "Strony i sklepy dla małych firm. Ceny od 390 zł.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" data-scroll-behavior="smooth">
      <body>
        {children}
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              background: "#0c0c0c",
              border: "1px solid rgba(255,255,255,.08)",
              color: "rgba(232,232,232,.92)",
            },
          }}
        />
      </body>
    </html>
  );
}
