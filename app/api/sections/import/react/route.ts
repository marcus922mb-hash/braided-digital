import { NextResponse } from "next/server";
import { requirePanelUser } from "@/features/section-library/http";
import { componentToEditableSection } from "@/features/section-library/converters";
import { saveSection } from "@/features/section-library/service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = (await request.json()) as { code?: string; content?: string };
  const code = body.code ?? body.content ?? "";
  if (!code.trim()) {
    return NextResponse.json({ error: "Brak kodu React." }, { status: 400 });
  }

  const converted = componentToEditableSection(code);
  const section = {
    ...demoSectionFromConverted(converted),
    componentCode: converted.componentCode,
    styleCode: converted.styleCode,
  };
  await saveSection(section);
  return NextResponse.json({ success: true, section });
}

function demoSectionFromConverted(converted: ReturnType<typeof componentToEditableSection>) {
  return {
    id: `react-${Date.now()}`,
    slug: `react-${Date.now()}`,
    name: converted.sectionName,
    categoryId: "sekcje-ofertowe" as const,
    categoryName: "Sekcje ofertowe",
    tags: converted.tags,
    thumbnailUrl: "",
    description: converted.notes[0] ?? "Zaimportowana sekcja React.",
    technology: converted.technology,
    componentCode: converted.componentCode,
    styleCode: converted.styleCode,
    dependencies: [],
    difficulty: "medium" as const,
    requiresJavaScript: true,
    responsive: true,
    animated: false,
    sourceType: "generated_ai" as const,
    sourceUrl: null,
    author: null,
    licenseId: "proprietary",
    licenseName: "Proprietary",
    licenseStatus: "requires_check" as const,
    isFree: false,
    commercialUse: false,
    attributionRequired: false,
    dateAdded: new Date().toISOString(),
    status: "draft" as const,
    industryTags: [],
    styleTags: [],
    isFavorite: false,
    isPremium: false,
    previewHtml: `<div style="padding:24px"><pre>${converted.componentCode.slice(0, 500)}</pre></div>`,
    previewDarkHtml: `<div style="padding:24px;background:#111;color:#fff"><pre>${converted.componentCode.slice(0, 500)}</pre></div>`,
    aiAnalysis: null,
    variants: [],
  };
}

