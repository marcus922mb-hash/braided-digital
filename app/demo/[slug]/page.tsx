import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoContinuation, DemoTopbar, PackageDemo } from "@/components/package-demos";
import { pricing } from "@/lib/data";

export function generateStaticParams() {
  return pricing.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const plan = pricing.find((item) => item.slug === slug);
  if (!plan) return {};
  return {
    title: `Demo: ${plan.title}`,
    description: `Przykładowa prezentacja strony w pakiecie ${plan.title} od Braided Digital.`,
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = pricing.find((item) => item.slug === slug);
  if (!plan) notFound();
  return <><DemoTopbar title={plan.title}/><PackageDemo slug={slug}/><DemoContinuation slug={slug}/><section className="bg-gold px-5 py-12 text-center text-white"><p className="text-[.6rem] font-bold uppercase tracking-[.2em] text-white/65">Koniec prezentacji</p><h2 className="mt-3 font-serif text-4xl">Twoja strona będzie zaprojektowana dla Twojej marki.</h2></section></>;
}
