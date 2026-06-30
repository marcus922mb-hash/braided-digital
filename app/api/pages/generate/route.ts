import { NextResponse } from "next/server";
import { requirePanelUser } from "@/features/section-library/http";
import { getSectionLibrarySnapshot, saveGeneratedPage } from "@/features/section-library/service";
import { slugify, nowIso } from "@/features/section-library/utils";
import type { GeneratedPageRecord } from "@/features/section-library/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = (await request.json()) as {
    templateId?: string;
    sectionIds?: string[];
    title?: string;
    slug?: string;
    seoTitle?: string;
    seoDescription?: string;
  };

  const snapshot = await getSectionLibrarySnapshot();
  const template = snapshot.templates.find((item) => item.id === body.templateId);
  const templateRefs = body.sectionIds?.length ? body.sectionIds : (template?.sectionIds ?? []);
  const sections = templateRefs
    .map((ref) => snapshot.sections.find((section) => section.id === ref || section.tags.includes(ref) || section.categoryId === ref))
    .filter(Boolean)
    .map((section) => section!);

  const record: GeneratedPageRecord = {
    id: `page-${Date.now()}`,
    title: body.title ?? "Nowa strona",
    slug: body.slug ?? slugify(body.title ?? "nowa-strona"),
    templateId: body.templateId ?? null,
    status: "draft",
    seoTitle: body.seoTitle ?? body.title ?? "Nowa strona",
    seoDescription: body.seoDescription ?? "Wygenerowana strona z biblioteki sekcji.",
    sectionIds: sections.map((section) => section.id),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    publishedAt: null,
  };

  const result = await saveGeneratedPage(record);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true, page: result.page, sections });
}
