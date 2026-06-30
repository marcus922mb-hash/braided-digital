import { NextResponse } from "next/server";
import { requirePanelUser } from "@/features/section-library/http";
import { demoPageToSections } from "@/features/section-library/converters";
import { saveSection } from "@/features/section-library/service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = (await request.json()) as { html?: string; content?: string };
  const html = body.html ?? body.content ?? "";
  if (!html.trim()) {
    return NextResponse.json({ error: "Brak kodu HTML." }, { status: 400 });
  }

  const sections = demoPageToSections(html);
  await Promise.all(sections.map((section) => saveSection(section)));
  return NextResponse.json({ success: true, sections });
}

