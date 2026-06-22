import { NextRequest, NextResponse } from "next/server";
import type { LeadFormData, ApiResponse, LeadSubmission } from "@/lib/types";
import { calculateEstimate } from "@/lib/estimate";
import { processLead } from "@/lib/lead-workflow";

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await request.json()) as Partial<LeadFormData>;

    if (!body.projectType) {
      return NextResponse.json(
        { success: false, error: "Wybierz rodzaj projektu." },
        { status: 400 }
      );
    }

    const formData: LeadFormData = {
      projectType: body.projectType,
      hasDomain: body.hasDomain ?? false,
      hasHosting: body.hasHosting ?? false,
      pagesCount: body.pagesCount ?? "1",
      needsShop: body.needsShop ?? false,
      productsCount: body.productsCount ?? "1-10",
      needsContactForm: body.needsContactForm ?? true,
      needsWhatsApp: body.needsWhatsApp ?? false,
      needsSEO: body.needsSEO ?? false,
      hasContent: body.hasContent ?? false,
      budget: body.budget ?? "1000-3000",
      timeline: body.timeline ?? "1-miesiac",
      description: body.description ?? "",
      name: body.name ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
    };

    const estimate = calculateEstimate(formData);
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const submission: LeadSubmission = {
      id: leadId,
      submittedAt: new Date().toISOString(),
      formData,
      estimate,
    };

    // Fire and forget — does not block the response
    void processLead(submission);

    return NextResponse.json({ success: true, estimate, leadId });
  } catch (err) {
    console.error("[API /lead] Error:", err);
    return NextResponse.json(
      { success: false, error: "Wystąpił błąd po stronie serwera. Spróbuj ponownie." },
      { status: 500 }
    );
  }
}
