import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles, Quote, FileText, Search, ListChecks, Share2, MapPin,
  ScrollText, Shield, HelpCircle, Scan, BarChart3, Receipt,
  FileDown, Palette, Layout, Pen, Bot, Globe, Star,
} from "lucide-react";
import { canonical } from "@/lib/seo";
import { AI_TOOLS, TOOL_CATEGORIES } from "@/features/ai-hub/tools";
import type { ToolCategory } from "@/features/ai-hub/types";

export const metadata: Metadata = {
  title: "Narzędzia AI dla firm | Braided Digital",
  description: "20 darmowych generatorów AI dla małych firm. Twórz nazwy, slogany, teksty SEO, posty social media, regulaminy i więcej — w kilka sekund.",
  alternates: canonical("/narzedzia-ai"),
};

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles, Quote, FileText, Search, ListChecks, Share2, MapPin,
  ScrollText, Shield, HelpCircle, Scan, BarChart3, Receipt,
  FileDown, Palette, Layout, Pen, Bot, Globe, Star,
};

const HOW_IT_WORKS = [
  { num: "01", title: "Wybierz narzędzie", text: "20 generatorów AI dla małych firm. Każde zoptymalizowane pod konkretne zadanie." },
  { num: "02", title: "Wpisz dane firmy", text: "Krótki formularz — branża, nazwa, wyróżnik. Bez rejestracji, bez karty." },
  { num: "03", title: "AI generuje w 30 sekund", text: "Korzystamy z najlepszych modeli językowych z automatycznym fallbackiem." },
  { num: "04", title: "Wdróż lub zamów pełną wersję", text: "Użyj wygenerowanej treści samodzielnie albo zleć nam profesjonalne wdrożenie." },
];

const STATS = [
  { value: "20", label: "Narzędzi AI" },
  { value: "30s", label: "Średni czas generacji" },
  { value: "5", label: "Providerów AI" },
  { value: "0 zł", label: "Koszt demo" },
];

export default function AIHubPage() {
  const categories = Object.entries(TOOL_CATEGORIES) as [ToolCategory, string][];

  return (
    <>
      {/* Hero */}
      <section className="aihub-hero">
        <div className="container-page">
          <p className="kicker">Narzędzia AI dla firm</p>
          <h1 className="editorial-title mt-7 max-w-4xl">
            Twoja firma.<br /><em>Wzmocniona AI.</em>
          </h1>
          <p className="aihub-hero-lead">
            20 generatorów AI dla małych firm polskich. Twórz nazwy, teksty, SEO,
            posty social media i dokumenty prawne — bezpłatnie, bez rejestracji.
          </p>
          <div className="aihub-stats">
            {STATS.map((s) => (
              <div key={s.label} className="aihub-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jak to działa */}
      <section className="section-space border-y border-ink/10 bg-white/35">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="kicker">Jak to działa</p>
              <h2 className="section-title mt-5">Gotowe w 4 krokach.</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-ink/60 md:justify-self-end">
              Nie musisz znać się na AI. Wystarczy opisać firmę — resztą zajmuje się system.
            </p>
          </div>
          <div className="aihub-steps mt-14">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.num} className="aihub-step">
                <span className="index">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narzędzia — po kategoriach */}
      <section className="section-space">
        <div className="container-page">
          <div className="mb-12">
            <p className="kicker">Wszystkie narzędzia</p>
            <h2 className="section-title mt-5">Co możesz wygenerować.</h2>
          </div>

          {categories.map(([category, label]) => {
            const tools = AI_TOOLS.filter((t) => t.category === category);
            if (!tools.length) return null;
            return (
              <div key={category} className="aihub-category">
                <h3 className="aihub-category-title">{label}</h3>
                <div className="aihub-grid">
                  {tools.map((tool) => {
                    const Icon = ICON_MAP[tool.iconName] ?? Sparkles;
                    return (
                      <Link
                        key={tool.id}
                        href={`/narzedzia-ai/${tool.id}`}
                        className="aihub-card"
                      >
                        <div className="aihub-card-icon">
                          <Icon size={20} />
                        </div>
                        <div className="aihub-card-body">
                          <div className="aihub-card-header">
                            <h4>{tool.name}</h4>
                            {tool.badge && (
                              <span className="aihub-badge">{tool.badge}</span>
                            )}
                          </div>
                          <p className="aihub-card-tagline">{tool.tagline}</p>
                        </div>
                        <span className="aihub-card-arrow">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="aihub-cta-section">
        <div className="container-page">
          <div className="aihub-cta-box">
            <p className="kicker kicker-light">Potrzebujesz więcej?</p>
            <h2 className="section-title mt-5 text-white">
              AI generuje szkielet.<br /><em>My budujemy resztę.</em>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">
              Wygenerowane treści to doskonały punkt startowy. Jako Braided Digital
              wdrożymy je w profesjonalną stronę, sklep lub landing page — z designem,
              SEO i obsługą.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/kontakt" className="btn-primary">Porozmawiajmy o projekcie</Link>
              <Link href="/wycena" className="btn-light">Szybka wycena</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
