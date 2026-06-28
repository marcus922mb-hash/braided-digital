"use client";

import { useEffect, useState, useTransition } from "react";
import { CheckCircle2, Circle, Loader2, Sparkles } from "lucide-react";
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

const STEPS = [
  { id: "analyze", label: "Analizuję opis działalności i branżę...", delay: 0 },
  { id: "brief", label: "Tworzę brief copywriterski...", delay: 3000 },
  { id: "hero", label: "Piszę treści hero i CTA...", delay: 7000 },
  { id: "sections", label: "Generuję sekcje: oferta, opinie, FAQ...", delay: 13000 },
  { id: "seo", label: "Optymalizuję pod SEO i finalizuję...", delay: 19000 },
];

function GenerationProgress({ isGenerating }: { isGenerating: boolean }) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isGenerating) {
      setActiveStep(-1);
      return;
    }
    setActiveStep(0);
    const timers = STEPS.slice(1).map((step, i) =>
      setTimeout(() => setActiveStep(i + 1), step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="ai-progress">
      <div className="ai-progress-header">
        <Loader2 size={14} className="bldr-spin" />
        <span>AI pracuje nad treściami</span>
      </div>
      <div className="ai-progress-steps">
        {STEPS.map((step, i) => {
          const isDone = i < activeStep;
          const isActive = i === activeStep;
          return (
            <div key={step.id} className={`ai-progress-step${isDone ? " is-done" : isActive ? " is-active" : ""}`}>
              {isDone ? <CheckCircle2 size={13} /> : isActive ? <Loader2 size={13} className="bldr-spin" /> : <Circle size={13} />}
              <span>{step.label}</span>
            </div>
          );
        })}
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
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isGenerating, startGenerating] = useTransition();
  const [isSaving, startSaving] = useTransition();

  function generate() {
    setError(null);
    setSaveError(null);
    setSaveSuccess(null);

    startGenerating(async () => {
      const response = await generateDemoContentAction({
        demoId,
        provider,
        businessDescription,
        services,
        targetAudience,
        tone,
      });

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

        <GenerationProgress isGenerating={isGenerating} />

        <button type="button" className="crm-btn crm-btn--primary" onClick={generate} disabled={isGenerating || isSaving}>
          <Sparkles size={14} />
          {isGenerating ? "Generowanie…" : "Wygeneruj treści AI"}
        </button>
      </div>

      {result && (
        <AIGenerationPreview
          result={result}
          isSaving={isSaving}
          saveError={saveError}
          saveSuccess={saveSuccess}
          onSave={save}
          onReject={() => {
            setResult(null);
            setSaveError(null);
            setSaveSuccess(null);
          }}
          onRegenerate={generate}
          isRegenerating={isGenerating}
        />
      )}
    </div>
  );
}
