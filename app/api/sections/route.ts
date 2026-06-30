import { NextResponse } from "next/server";
import { getSectionLibrarySnapshot, saveSection } from "@/features/section-library/service";
import { requirePanelUser } from "@/features/section-library/http";
import type { SectionRecord } from "@/features/section-library/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const snapshot = await getSectionLibrarySnapshot();
  return NextResponse.json({ sections: snapshot.sections, categories: snapshot.categories, sources: snapshot.sources });
}

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = (await request.json()) as SectionRecord;
  if (!body?.id || !body?.name) {
    return NextResponse.json({ error: "Nieprawidłowy rekord sekcji." }, { status: 400 });
  }

  const result = await saveSection(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, section: result.section });
}

