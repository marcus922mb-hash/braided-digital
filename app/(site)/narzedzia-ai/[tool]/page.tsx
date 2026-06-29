import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getToolById, AI_TOOLS, TOOL_CATEGORIES } from "@/features/ai-hub/tools";
import { ToolWorkspace } from "@/features/ai-hub/components/tool-workspace";
import { canonical } from "@/lib/seo";

type Props = { params: Promise<{ tool: string }> };

export async function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ tool: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) return {};
  return {
    title: `${tool.name} | Narzędzia AI | Braided Digital`,
    description: tool.description,
    alternates: canonical(`/narzedzia-ai/${tool.id}`),
  };
}

export default async function ToolPage({ params }: Props) {
  const { tool: toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) notFound();

  const categoryLabel = TOOL_CATEGORIES[tool.category] ?? tool.category;

  const relatedTools = AI_TOOLS.filter(
    (t) => t.id !== tool.id && t.category === tool.category
  ).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-page pt-8 pb-0">
        <nav className="aihub-breadcrumb">
          <Link href="/narzedzia-ai">Narzędzia AI</Link>
          <span>/</span>
          <span>{categoryLabel}</span>
          <span>/</span>
          <span>{tool.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="section-space">
        <div className="container-page">
          <div className="aihub-tool-layout">
            {/* Left — form / workspace */}
            <div className="aihub-tool-main">
              <div className="aihub-tool-header">
                {tool.badge && <span className="aihub-badge">{tool.badge}</span>}
                <p className="kicker">{categoryLabel}</p>
                <h1 className="editorial-title mt-4">{tool.name}</h1>
                <p className="aihub-tool-desc mt-4">{tool.description}</p>
              </div>

              <ToolWorkspace tool={{ id: tool.id, fields: tool.fields, ctaLabel: tool.ctaLabel }} />
            </div>

            {/* Right — info sidebar */}
            <aside className="aihub-tool-sidebar">
              {/* Example snippet */}
              <div className="aihub-sidebar-card">
                <p className="sidebar-label">Przykładowy wynik</p>
                <pre className="aihub-snippet">{tool.exampleSnippet}</pre>
              </div>

              {/* What you get */}
              <div className="aihub-sidebar-card">
                <p className="sidebar-label">Co otrzymujesz</p>
                <ul className="aihub-gets">
                  <li>✓ Wynik wygenerowany przez AI</li>
                  <li>✓ Gotowy do użycia na stronie</li>
                  <li>✓ Bez rejestracji i karty</li>
                  <li>✓ Możesz kopiować i edytować</li>
                </ul>
              </div>

              {/* CTA */}
              <div className="aihub-sidebar-cta">
                <p className="sidebar-label">Chcesz gotową stronę?</p>
                <p>
                  AI generuje podstawę. Braided Digital tworzy
                  profesjonalne strony z indywidualnym designem,
                  SEO i pełnym wdrożeniem.
                </p>
                <Link href="/kontakt" className="btn-primary mt-4 w-full text-center">
                  Porozmawiajmy →
                </Link>
              </div>

              {/* Related tools */}
              {relatedTools.length > 0 && (
                <div className="aihub-sidebar-card">
                  <p className="sidebar-label">Podobne narzędzia</p>
                  <div className="aihub-related">
                    {relatedTools.map((t) => (
                      <Link key={t.id} href={`/narzedzia-ai/${t.id}`} className="aihub-related-item">
                        <strong>{t.name}</strong>
                        <span>{t.tagline}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
