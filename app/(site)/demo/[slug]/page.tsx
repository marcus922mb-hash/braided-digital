import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { defaultConfigs } from "@/lib/demo-configs";
import { DemoContinuation, DemoTopbar, PackageDemo } from "@/components/package-demos";
import { pricing } from "@/lib/data";
import { canonical } from "@/lib/seo";
import {
  getPublicDemoBySlug,
  isPastIsoDate,
  trackPublicDemoView,
} from "@/features/demos/queries/demo-queries";
import { parseDemoContent } from "@/features/demos/types";
import { HandmadeJewelryTemplate } from "@/features/demos/templates/handmade-jewelry-template";
import { DemoPrintTrigger } from "./demo-print-trigger";

export function generateStaticParams() {
  return pricing.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const { data: demo } = await getPublicDemoBySlug(slug);
  if (demo) {
    const content = parseDemoContent(demo.content);
    return {
      title: content.seo.title || demo.title,
      description: content.seo.description,
      robots: { index: false, follow: false },
    };
  }
  const plan = pricing.find((item) => item.slug === slug);
  if (!plan) return {};
  return {
    title: `Demo: ${plan.title}`,
    description: `Przykładowa prezentacja strony w pakiecie ${plan.title} od Braided Digital. Zobacz jak może wyglądać Twoje miejsce w sieci.`,
    alternates: canonical(`/demo/${slug}`),
    robots: { index: false, follow: true },
  };
}

function PublicDemoMessage({ message }: { message: string }) {
  return (
    <main className="demo-public-state">
      <div>
        <h1>{message}</h1>
        <p>Skontaktuj się z MA Atelier Studio, jeśli link powinien być aktywny.</p>
      </div>
    </main>
  );
}

export default async function DemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ print?: string }>;
}) {
  await connection();
  const { slug } = await params;
  const { print } = await searchParams;
  const { data: demo } = await getPublicDemoBySlug(slug);

  if (demo) {
    if (!demo.is_active || demo.status === "inactive") {
      return <PublicDemoMessage message="To demo jest obecnie niedostępne." />;
    }
    if (demo.expires_at && isPastIsoDate(demo.expires_at)) {
      return <PublicDemoMessage message="To demo wygasło." />;
    }

    await trackPublicDemoView(demo);
    return (
      <>
        {print === "1" && <DemoPrintTrigger />}
        <HandmadeJewelryTemplate demo={demo} />
      </>
    );
  }

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
