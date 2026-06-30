import { NextResponse } from "next/server";
import { requirePanelUser } from "@/features/section-library/http";
import { convertSection } from "@/features/section-library/service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user } = await requirePanelUser();
  if (!user) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = (await request.json()) as {
    source?: string;
    from?: "html" | "react" | "tailwind" | "css";
    to?: "react" | "builder" | "css" | "tailwind";
  };
  if (!body.source || !body.from || !body.to) {
    return NextResponse.json({ error: "Brak danych do konwersji." }, { status: 400 });
  }

  const result = await convertSection({
    source: body.source,
    from: body.from,
    to: body.to,
  });
  return NextResponse.json({ success: true, ...result });
}

