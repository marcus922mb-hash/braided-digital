/**
 * Lead workflow — orchestrates post-submission steps.
 *
 * Current state: synchronous mock (logs to console).
 * Future: replace with Vercel Workflows trigger once configured.
 *
 * To enable Vercel Workflows:
 *   1. npm install @vercel/workflows
 *   2. Uncomment the Workflows trigger below
 *   3. Define the workflow in vercel.json → "workflows" field
 */

import type { LeadSubmission } from "./types";
import { sendLeadNotification } from "./email";

export async function processLead(submission: LeadSubmission): Promise<void> {
  await Promise.allSettled([
    notifyOwner(submission),
    confirmClient(submission),
    saveLead(submission),
  ]);
}

async function notifyOwner(submission: LeadSubmission): Promise<void> {
  try {
    await sendLeadNotification(submission);
  } catch (err) {
    console.error("[Workflow] notifyOwner failed:", err);
  }
}

async function confirmClient(submission: LeadSubmission): Promise<void> {
  // sendLeadNotification already handles the client confirmation email.
  // This stub exists for future use (e.g. SMS, WhatsApp Business API).
  console.log(
    "[Workflow] Client confirmation queued for:",
    submission.formData.email || "no email provided"
  );
}

async function saveLead(submission: LeadSubmission): Promise<void> {
  /**
   * TODO: Replace with a real database write.
   *
   * Examples:
   *   Neon (Postgres):  await db.insert(leads).values(submission)
   *   Supabase:         await supabase.from("leads").insert(submission)
   *   Vercel KV:        await kv.set(`lead:${submission.id}`, submission)
   *
   * Schema hint:
   *   id TEXT PK, submitted_at TIMESTAMPTZ, project_type TEXT,
   *   email TEXT, name TEXT, phone TEXT, min_price INT, max_price INT,
   *   timeline TEXT, features TEXT[], description TEXT, raw_json JSONB
   */
  console.log("[Workflow] Lead saved (mock):", {
    id: submission.id,
    project: submission.estimate.projectTypeLabel,
    price: `${submission.estimate.minPrice}–${submission.estimate.maxPrice} zł`,
    contact: submission.formData.email || "—",
  });
}

/**
 * scheduleFollowUp — call from Vercel Cron (/api/cron/followup) 3 days
 * after submission, or wire into a Vercel Workflows delayed step.
 *
 * Future implementation:
 *   1. Query DB for lead by ID
 *   2. Check if already contacted
 *   3. Send follow-up email via sendViaResend()
 */
export async function scheduleFollowUp(leadId: string): Promise<void> {
  // TODO: Implement with Vercel Cron + DB lookup
  // Cron route: app/api/cron/followup/route.ts
  // Vercel cron definition: vercel.json → "crons": [{ "path": "/api/cron/followup", "schedule": "0 10 * * *" }]
  console.log("[Workflow] Follow-up scheduled for lead:", leadId);
}
