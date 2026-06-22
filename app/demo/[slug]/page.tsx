import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoTopbar } from "@/components/package-demos";
import { DemoLiveWrapper } from "@/components/demo-live";
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
    description: `Przykładowa prezentacja strony w pakiecie ${plan.title} od Braided Digital. Dostosuj kolory i treści w czasie rzeczywistym.`,
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = pricing.find((item) => item.slug === slug);
  if (!plan) notFound();
  return (
    <>
      <DemoTopbar title={plan.title} />
      <DemoLiveWrapper slug={slug} title={plan.title} />
    </>
  );
}
