import { NextResponse } from "next/server";
import { requirePanelUser } from "@/features/section-library/http";
import { generateSimilarSection } from "@/features/section-library/service";
import { saveSection } from "@/features/section-library/service";
import type { SectionRecord } from "@/features/section-library/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const section = (await request.json()) as SectionRecord;
  if (!section?.id) {
    return NextResponse.json({ error: "Brak sekcji." }, { status: 400 });
  }

  const generated = { ...(await generateSimilarSection(section)) } as SectionRecord;
  if (!generated.id) {
    generated.id = `${section.id}-similar-${Date.now()}`;
  }
  const result = await saveSection(generated as SectionRecord);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, section: result.section });
}

