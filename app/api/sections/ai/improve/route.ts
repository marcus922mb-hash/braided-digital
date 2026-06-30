import { NextResponse } from "next/server";
import { requirePanelUser } from "@/features/section-library/http";
import { improveSection } from "@/features/section-library/service";
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

  const improved = { ...section, ...await improveSection(section) } as SectionRecord;
  const result = await saveSection(improved);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, section: result.section });
}

