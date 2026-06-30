import { NextResponse } from "next/server";
import { getSectionLibrarySnapshot, saveTemplate } from "@/features/section-library/service";
import { requirePanelUser } from "@/features/section-library/http";
import type { SectionPageTemplate } from "@/features/section-library/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }
  const snapshot = await getSectionLibrarySnapshot();
  return NextResponse.json({ templates: snapshot.templates });
}

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const template = (await request.json()) as SectionPageTemplate;
  if (!template?.id || !template?.name) {
    return NextResponse.json({ error: "Nieprawidłowy szablon." }, { status: 400 });
  }

  const result = await saveTemplate(template);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, template: result.template });
}

