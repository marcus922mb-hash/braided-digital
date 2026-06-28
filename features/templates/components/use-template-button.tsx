"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { createFromTemplate } from "@/features/templates/actions/create-from-template-action";

export function UseTemplateButton({ templateId }: { templateId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function openInBuilder() {
    setError("");
    startTransition(async () => {
      const result = await createFromTemplate(templateId);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push(`/panel/builder/${result.demoId}`);
    });
  }

  return (
    <div className="tpl-detail-actions">
      <button type="button" className="tpl-use-button" onClick={openInBuilder} disabled={isPending}>
        {isPending ? <Loader2 size={15} className="bldr-spin" /> : <ArrowRight size={15} />}
        {isPending ? "Tworzę szkic..." : "Otwórz w Builderze"}
      </button>
      <button type="button" className="tpl-ai-button" disabled title="Funkcja zostanie dodana w Prompt 13">
        <Sparkles size={15} />
        Generate from Template
        <span>Wkrótce</span>
      </button>
      {error && <p className="tpl-action-error">{error}</p>}
    </div>
  );
}
