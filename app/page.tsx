import { MaNav } from "@/components/ma-web/ma-nav";
import { LoadingScreen } from "@/components/ma-web/loading-screen";
import { Hero } from "@/components/ma-web/hero";
import { Stats } from "@/components/ma-web/stats";
import { Services } from "@/components/ma-web/services";
import { WhyUs } from "@/components/ma-web/why-us";
import { Process } from "@/components/ma-web/process";
import { Portfolio } from "@/components/ma-web/portfolio";
import { Testimonials } from "@/components/ma-web/testimonials";
import { CtaSection } from "@/components/ma-web/cta-section";
import { MaFooter } from "@/components/ma-web/ma-footer";

export default function Home() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <LoadingScreen />
      <MaNav />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Process />
      <Portfolio />
      <Testimonials />
      <CtaSection />
      <MaFooter />
    </div>
  );
}
