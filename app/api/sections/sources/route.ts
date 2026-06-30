import { NextResponse } from "next/server";
import { saveSource } from "@/features/section-library/service";
import { requirePanelUser } from "@/features/section-library/http";
import { sectionImportFormSchema } from "@/features/section-library/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const parsed = sectionImportFormSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Nieprawidłowy formularz." }, { status: 400 });
  }

  const sourceUrl = parsed.data.repositoryUrl;
  const sourceName = parsed.data.sourceName?.trim() || sourceUrl.replace(/\/?\.git$/i, "").split("/").filter(Boolean).slice(-2).join("/");

  const result = await saveSource({
    id: sourceName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    name: parsed.data.sourceName?.trim() || sourceName,
    description: parsed.data.sourceDescription?.trim() || `Źródło komponentów z ${sourceUrl}`,
    githubUrl: sourceUrl,
    technology: "React + Tailwind",
    license: parsed.data.license?.trim() || "Wymaga sprawdzenia",
    author: parsed.data.author?.trim() || null,
    lastSyncedAt: null,
    componentCount: 0,
    sectionCount: 0,
    syncStatus: "idle",
    autoSync: Boolean(parsed.data.autoSync ?? true),
    tags: [],
    categories: ["menu-i-nawigacje", "sekcje-hero", "sekcje-ofertowe"],
    thumbnailUrl: null,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true, source: result.source });
}
