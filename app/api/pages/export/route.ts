import { NextResponse } from "next/server";
import { requirePanelUser } from "@/features/section-library/http";
import { getSectionLibrarySnapshot } from "@/features/section-library/service";
import { createZip } from "@/features/section-library/zip";
import { sectionsToHtmlDocument, sectionsToJson, sectionsToReactPage } from "@/features/section-library/renderers";
import { slugify } from "@/features/section-library/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = (await request.json()) as {
    format?: "react" | "next" | "html" | "css" | "tailwind" | "json" | "zip";
    sectionIds?: string[];
    title?: string;
    description?: string;
    slug?: string;
  };
  const format = body.format ?? "json";
  const snapshot = await getSectionLibrarySnapshot();
  const sections = (body.sectionIds?.length ? body.sectionIds : snapshot.sections.slice(0, 8).map((section) => section.id))
    .map((id) => snapshot.sections.find((section) => section.id === id))
    .filter(Boolean)
    .map((section) => section!);
  const title = body.title ?? "Nowa strona";
  const description = body.description ?? "Wygenerowana z biblioteki sekcji.";
  const slug = body.slug ?? slugify(title);

  if (format === "html") {
    const html = sectionsToHtmlDocument(sections, { title, description, slug });
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  if (format === "react" || format === "next") {
    const code = sectionsToReactPage(sections, { title, description, slug });
    return new NextResponse(code, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  if (format === "zip") {
    const html = sectionsToHtmlDocument(sections, { title, description, slug });
    const json = JSON.stringify(sectionsToJson(sections, { title, description, slug }), null, 2);
    const page = sectionsToReactPage(sections, { title, description, slug });
    const zip = createZip([
      { name: "README.md", content: `# ${title}\n\n${description}\n` },
      { name: "app/page.tsx", content: page },
      { name: "app/preview.html", content: html },
      { name: "content.json", content: json },
    ]);
    return new NextResponse(Buffer.from(zip), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${slug}.zip"`,
      },
    });
  }

  return NextResponse.json(sectionsToJson(sections, { title, description, slug }));
}
