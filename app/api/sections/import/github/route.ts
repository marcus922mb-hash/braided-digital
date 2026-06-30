import { NextResponse } from "next/server";
import { importGitHubRepository, saveSection, saveSource } from "@/features/section-library/service";
import { requirePanelUser } from "@/features/section-library/http";
import { sectionImportFormSchema } from "@/features/section-library/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = sectionImportFormSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: body.error.issues[0]?.message ?? "Nieprawidłowy formularz." }, { status: 400 });
  }

  const result = await importGitHubRepository(body.data);
  if (result.source) {
    await saveSource(result.source);
  }
  await Promise.all(result.sections.map((section) => saveSection(section)));

  return NextResponse.json({
    success: true,
    source: result.source,
    sections: result.sections,
    variants: result.variants,
    filesScanned: result.filesScanned,
    packageDependencies: result.packageDependencies,
    warnings: result.warnings,
  });
}

