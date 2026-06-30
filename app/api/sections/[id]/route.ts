import { NextResponse } from "next/server";
import { deleteSection, duplicateSection, getSectionById, saveSection } from "@/features/section-library/service";
import { requirePanelUser } from "@/features/section-library/http";
import type { SectionRecord } from "@/features/section-library/types";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const { id } = await params;
  const section = await getSectionById(id);
  if (!section) {
    return NextResponse.json({ error: "Nie znaleziono sekcji." }, { status: 404 });
  }
  return NextResponse.json({ section });
}

export async function PUT(request: Request, { params }: Params) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as SectionRecord;
  const section = { ...body, id };
  const result = await saveSection(section);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true, section: result.section });
}

export async function POST(request: Request, { params }: Params) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({} as { action?: string }));
  if ((body as { action?: string }).action === "duplicate") {
    const result = await duplicateSection(id);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true, section: result.section });
  }

  return NextResponse.json({ error: "Nieobsługiwana akcja." }, { status: 400 });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const { id } = await params;
  const result = await deleteSection(id);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

