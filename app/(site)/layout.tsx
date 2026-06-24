import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollEffects } from "@/components/scroll-effects";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio-shell">
      <div data-scroll-progress className="scroll-progress" aria-hidden="true" />
      <ScrollEffects />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
