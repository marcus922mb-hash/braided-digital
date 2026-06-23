import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultConfigs } from "@/lib/demo-configs";
import { DemoContinuation, DemoTopbar, PackageDemo } from "@/components/package-demos";
import { pricing } from "@/lib/data";
import { canonical } from "@/lib/seo";

export function generateStaticParams() {
  return pricing.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const plan = pricing.find((item) => item.slug === slug);
  if (!plan) return {};
  return {
    title: `Demo: ${plan.title}`,
    description: `Przykładowa prezentacja strony w pakiecie ${plan.title} od Braided Digital. Zobacz jak może wyglądać Twoje miejsce w sieci.`,
    alternates: canonical(`/demo/${slug}`),
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = pricing.find((item) => item.slug === slug);
  if (!plan) notFound();
  const config = defaultConfigs[slug] ?? defaultConfigs["cyfrowa-wizytowka"];
  return (
    <>
      <DemoTopbar title={plan.title} />
      <PackageDemo slug={slug} config={config} />
      <DemoContinuation slug={slug} config={config} />
      <section className="bg-gold px-5 py-12 text-center text-white">
        <p className="text-[.6rem] font-bold uppercase tracking-[.2em] text-white/65">Koniec prezentacji</p>
        <h2 className="mt-3 font-serif text-4xl">Twoja strona będzie zaprojektowana dla Twojej marki.</h2>
      </section>
    </>
  );
}
