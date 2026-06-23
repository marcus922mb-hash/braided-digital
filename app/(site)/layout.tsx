import { MaNav } from "@/components/ma-web/ma-nav";
import { MaFooter } from "@/components/ma-web/ma-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { ScrollEffects } from "@/components/scroll-effects";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-ma="dark">
      <div data-scroll-progress className="scroll-progress" aria-hidden="true" />
      <ScrollEffects />
      <MaNav />
      <main>{children}</main>
      <MaFooter />
      <CookieConsent />
    </div>
  );
}
