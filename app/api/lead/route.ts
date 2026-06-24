import { after, NextRequest, NextResponse } from "next/server";
import type { ApiResponse, LeadFormData, LeadSubmission, ProjectType } from "@/lib/types";
import { calculateEstimate } from "@/lib/estimate";
import { processLead } from "@/lib/lead-workflow";

const PROJECT_TYPES = new Set<ProjectType>(["website", "shop", "landing", "bio", "wordpress"]);

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const raw = await request.json() as Partial<LeadFormData>;
    if (!raw.projectType || !PROJECT_TYPES.has(raw.projectType)) {
      return NextResponse.json({ success: false, error: "Wybierz prawidłowy rodzaj projektu." }, { status: 400 });
    }

    const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
    const formData: LeadFormData = {
      projectType: raw.projectType,
      hasDomain: raw.hasDomain === true,
      hasHosting: raw.hasHosting === true,
      contentStatus: raw.contentStatus ?? "czesciowe",
      budget: raw.budget ?? "1000-2500",
      timeline: raw.timeline ?? "1-miesiac",
      websitePages: raw.websitePages ?? "one-page",
      serviceCount: raw.serviceCount ?? "1-3",
      hasBrandAssets: raw.hasBrandAssets !== false,
      needsContactForm: raw.needsContactForm !== false,
      needsAnalytics: raw.needsAnalytics === true,
      needsBlog: raw.needsBlog === true,
      needsBooking: raw.needsBooking === true,
      needsMultilanguage: raw.needsMultilanguage === true,
      productCount: raw.productCount ?? "1-10",
      productContentReady: raw.productContentReady !== false,
      shopCategoryCount: raw.shopCategoryCount ?? "1-3",
      needsVariants: raw.needsVariants === true,
      needsPayments: raw.needsPayments !== false,
      needsShipping: raw.needsShipping !== false,
      needsInvoicing: raw.needsInvoicing === true,
      needsMigration: raw.needsMigration === true,
      needsCustomerAccounts: raw.needsCustomerAccounts === true,
      needsPromoCodes: raw.needsPromoCodes === true,
      landingSize: raw.landingSize ?? "standard",
      hasBrandAssetsLanding: raw.hasBrandAssetsLanding !== false,
      needsCopywriting: raw.needsCopywriting === true,
      needsAdsTracking: raw.needsAdsTracking === true,
      formComplexity: raw.formComplexity ?? "simple",
      needsVideoSection: raw.needsVideoSection === true,
      needsSocialProof: raw.needsSocialProof === true,
      bioLinks: raw.bioLinks ?? "1-5",
      needsGallery: raw.needsGallery === true,
      needsNewsletter: raw.needsNewsletter === true,
      needsBioProducts: raw.needsBioProducts === true,
      needsCustomDomain: raw.needsCustomDomain === true,
      needsLinkAnalytics: raw.needsLinkAnalytics === true,
      wordpressTask: raw.wordpressTask ?? "small-fix",
      workHours: raw.workHours ?? "1",
      isUrgentFix: raw.isUrgentFix === true,
      hasAdminAccess: raw.hasAdminAccess !== false,
      isLiveSite: raw.isLiveSite !== false,
      hasPluginIssues: raw.hasPluginIssues === true,
      description: text(raw.description, 2000),
      name: text(raw.name, 120),
      email: text(raw.email, 200),
      phone: text(raw.phone, 40),
    };

    const estimate = calculateEstimate(formData);
    const leadId = `lead_${Date.now()}_${crypto.randomUUID().slice(0, 6)}`;
    const submission: LeadSubmission = {
      id: leadId,
      submittedAt: new Date().toISOString(),
      formData,
      estimate,
    };

    after(() => processLead(submission));
    return NextResponse.json({ success: true, estimate, leadId });
  } catch (error) {
    console.error("[API /lead]", error);
    return NextResponse.json({ success: false, error: "Nie udało się obliczyć wyceny. Spróbuj ponownie." }, { status: 500 });
  }
}
