"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  generateDemoContentAction,
  saveGeneratedDemoContentAction,
} from "@/features/ai/actions/generate-demo-content-action";
import { AIGenerationPreview } from "@/features/ai/components/ai-generation-preview";
import { AIProviderSelect } from "@/features/ai/components/ai-provider-select";
import type { AIProvider, GenerateDemoContentOutput } from "@/lib/ai/types";

type Props = {
  demoId: string;
};

function GenerationStatus({
  isGenerating,
  businessDescription,
  services,
  targetAudience,
  tone,
}: {
  isGenerating: boolean;
  businessDescription: string;
  services: string;
  targetAudience: string;
  tone: string;
}) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isGenerating) {
      const t = setTimeout(() => setElapsed(0), 0);
      startRef.current = null;
      return () => clearTimeout(t);
    }
    startRef.current = Date.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - (startRef.current ?? Date.now())) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating) return null;

  const min = Math.floor(elapsed / 60);
  const sec = elapsed % 60;
  const timeStr = `${min}:${String(sec).padStart(2, "0")}`;

  const rows = [
    businessDescription.trim() && { label: "Opis", value: businessDescription.trim() },
    services.trim() && { label: "Usługi", value: services.trim() },
    targetAudience.trim() && { label: "Grupa docelowa", value: targetAudience.trim() },
    tone.trim() && { label: "Ton", value: tone.trim() },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="ai-progress">
      {rows.length > 0 ? (
        <div className="ai-progress-input">
          <div className="ai-progress-input-label">Dane wysłane do AI:</div>
          {rows.map((row) => (
            <div key={row.label} className="ai-progress-input-row">
              <span className="ai-progress-input-key">{row.label}:</span>
              <span className="ai-progress-input-val">
                {row.value.length > 100 ? `${row.value.slice(0, 100)}…` : row.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-progress-input">
          <div className="ai-progress-input-label">Generowanie na podstawie danych klienta z CRM</div>
        </div>
      )}
      <div className="ai-progress-header">
        <Loader2 size={14} className="bldr-spin" />
        <span>AI generuje treści…</span>
        <span className="ai-progress-timer">{timeStr}</span>
      </div>
    </div>
  );
}

export function AIGenerateDemoButton({ demoId }: Props) {
  const router = useRouter();
  const [provider, setProvider] = useState<AIProvider>("openrouter");
  const [businessDescription, setBusinessDescription] = useState("");
  const [services, setServices] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState("profesjonalny, ciepły, konkretny");
  const [result, setResult] = useState<GenerateDemoContentOutput | null>(null);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isGenerating, startGenerating] = useTransition();
  const [isSaving, startSaving] = useTransition();
  const generationStartRef = useRef<number | null>(null);

  function generate() {
    setError(null);
    setSaveError(null);
    setSaveSuccess(null);
    generationStartRef.current = Date.now();

    startGenerating(async () => {
      const response = await generateDemoContentAction({
        demoId,
        provider,
        businessDescription,
        services,
        targetAudience,
        tone,
      });

      if (generationStartRef.current !== null) {
        setDurationSeconds(Math.round((Date.now() - generationStartRef.current) / 1000));
      }

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error);
      }
    });
  }

  function save() {
    if (!result) return;
    setSaveError(null);
    setSaveSuccess(null);

    startSaving(async () => {
      const response = await saveGeneratedDemoContentAction({
        demoId,
        content: result.content,
        provider: result.provider,
        model: result.model,
      });

      if (response.success) {
        setSaveSuccess(
          response.statusChanged
            ? "Treści zapisane. Status demo zmieniono na Wygenerowane."
            : "Treści zapisane do demo."
        );
        router.refresh();
      } else {
        setSaveError(response.error);
      }
    });
  }

  return (
    <div className="ai-generator">
      <div className="ai-generator-head">
        <div>
          <span className="panel-card-title">AI</span>
          <h3>Wygeneruj treści demo</h3>
          <p>AI przygotuje wyłącznie treści. Zapis nastąpi dopiero po Twojej akceptacji.</p>
        </div>
      </div>

      <div className="ai-generator-form">
        <AIProviderSelect value={provider} onChange={setProvider} disabled={isGenerating || isSaving} />

        <div className="crm-field">
          <label className="crm-label" htmlFor="ai_business_description">Opis działalności</label>
          <textarea
            id="ai_business_description"
            className="crm-textarea"
            rows={3}
            value={businessDescription}
            onChange={(event) => setBusinessDescription(event.target.value)}
            placeholder="Co robi klient, czym się wyróżnia, jakie produkty/usługi oferuje?"
            disabled={isGenerating}
          />
        </div>

        <div className="crm-grid crm-grid--2">
          <div className="crm-field">
            <label className="crm-label" htmlFor="ai_services">Lista usług</label>
            <textarea
              id="ai_services"
              className="crm-textarea"
              rows={3}
              value={services}
              onChange={(event) => setServices(event.target.value)}
              placeholder="np. kolekcje autorskie, zamówienia indywidualne, pakowanie prezentowe"
              disabled={isGenerating}
            />
          </div>
          <div className="crm-field">
            <label className="crm-label" htmlFor="ai_target">Grupa docelowa</label>
            <textarea
              id="ai_target"
              className="crm-textarea"
              rows={3}
              value={targetAudience}
              onChange={(event) => setTargetAudience(event.target.value)}
              placeholder="np. kobiety szukające subtelnej biżuterii handmade"
              disabled={isGenerating}
            />
          </div>
        </div>

        <div className="crm-field">
          <label className="crm-label" htmlFor="ai_tone">Ton komunikacji</label>
          <input
            id="ai_tone"
            className="crm-input"
            value={tone}
            onChange={(event) => setTone(event.target.value)}
            disabled={isGenerating}
          />
        </div>

        {error && <div className="crm-form-alert">{error}</div>}

        <GenerationStatus
          isGenerating={isGenerating}
          businessDescription={businessDescription}
          services={services}
          targetAudience={targetAudience}
          tone={tone}
        />

        <button type="button" className="crm-btn crm-btn--primary" onClick={generate} disabled={isGenerating || isSaving}>
          <Sparkles size={14} />
          {isGenerating ? "Generowanie…" : "Wygeneruj treści AI"}
        </button>
      </div>

      {result && (
        <AIGenerationPreview
          result={result}
          durationSeconds={durationSeconds}
          isSaving={isSaving}
          saveError={saveError}
          saveSuccess={saveSuccess}
          onSave={save}
          onReject={() => {
            setResult(null);
            setSaveError(null);
            setSaveSuccess(null);
            setDurationSeconds(null);
          }}
          onRegenerate={generate}
          isRegenerating={isGenerating}
        />
      )}
    </div>
  );
}
