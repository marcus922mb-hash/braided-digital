"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { aiRouter } from "@/lib/ai/router";
import { getToolById } from "@/features/ai-hub/tools";
import type { ToolResult } from "@/features/ai-hub/types";

export type RunToolState = {
  success: true;
  result: ToolResult;
  leadId: string;
} | {
  success: false;
  error: string;
};

export async function runToolAction(
  toolId: string,
  values: Record<string, string>
): Promise<RunToolState> {
  const tool = getToolById(toolId);
  if (!tool) return { success: false, error: "Nieznane narzędzie." };
  if (!tool.available) return { success: false, error: "To narzędzie jest dostępne tylko w trybie pełnym." };

  const prompt = tool.buildPrompt(values);

  const task =
    toolId.includes("seo") || toolId.includes("wizytowki")
      ? "seo_generation"
      : "content_generation";

  let result;
  try {
    result = await aiRouter.generate({
      task,
      messages: [
        { role: "system", content: tool.systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.72,
      maxTokens: 3500,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Błąd generowania AI.";
    return { success: false, error: `Nie udało się wygenerować. ${msg}` };
  }

  // Save anonymous lead via admin client (bypasses RLS)
  const leadId = `aitool_${Date.now()}_${crypto.randomUUID().slice(0, 6)}`;
  try {
    const supabase = createAdminClient();
    await supabase.from("leads").insert({
      id: leadId,
      submitted_at: new Date().toISOString(),
      project_type: `ai_tool_${toolId}`,
      project_type_label: tool.name,
      description: JSON.stringify(values).slice(0, 2000),
      form_data: { toolId, values, provider: result.provider, model: result.model },
      estimate: { output: result.text.slice(0, 5000) },
      status: "new",
    });
  } catch {
    // Non-blocking — lead save failure shouldn't break generation
  }

  return {
    success: true,
    result: { text: result.text, provider: result.provider, model: result.model },
    leadId,
  };
}

export type SaveLeadContactState = { success: boolean; error?: string };

export async function saveLeadContactAction(
  leadId: string,
  contact: { name: string; email: string; phone?: string }
): Promise<SaveLeadContactState> {
  if (!contact.email?.includes("@")) {
    return { success: false, error: "Podaj prawidłowy adres e-mail." };
  }
  const name = contact.name?.trim().slice(0, 120) || "";
  const email = contact.email.trim().slice(0, 200);
  const phone = contact.phone?.trim().slice(0, 40) || undefined;

  try {
    const supabase = createAdminClient();
    await supabase
      .from("leads")
      .update({ name, email, phone: phone ?? null, status: "new" })
      .eq("id", leadId);
    return { success: true };
  } catch {
    return { success: false, error: "Nie udało się zapisać kontaktu." };
  }
}
