"use client";

import { useState, useTransition } from "react";
import {
  runToolAction,
  saveLeadContactAction,
} from "@/features/ai-hub/actions/run-tool-action";
import type { ToolField, ToolResult } from "@/features/ai-hub/types";

type SerializableTool = {
  id: string;
  fields: ToolField[];
  ctaLabel: string;
};

type Step = "form" | "loading" | "result" | "lead" | "done";

export function ToolWorkspace({ tool }: { tool: SerializableTool }) {
  const [step, setStep] = useState<Step>("form");
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ToolResult | null>(null);
  const [leadId, setLeadId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [leadSent, setLeadSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  function handleChange(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStep("loading");
    startTransition(async () => {
      const state = await runToolAction(tool.id, values);
      if (!state.success) {
        setError(state.error);
        setStep("form");
        return;
      }
      setResult(state.result);
      setLeadId(state.leadId);
      setStep("result");
    });
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.email.includes("@")) {
      setError("Podaj prawidłowy adres e-mail.");
      return;
    }
    const res = await saveLeadContactAction(leadId, contact);
    if (res.success) {
      setLeadSent(true);
      setStep("done");
    } else {
      setError(res.error || "Błąd zapisu.");
    }
  }

  return (
    <div className="aihub-workspace">
      {/* Form */}
      {(step === "form" || step === "loading") && (
        <form onSubmit={handleGenerate} className="aihub-form">
          {tool.fields.map((field) => (
            <div key={field.key} className="aihub-field">
              <label htmlFor={field.key}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.key}
                  placeholder={field.placeholder}
                  rows={field.rows ?? 3}
                  maxLength={field.maxLength ?? 800}
                  value={values[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.key}
                  value={values[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                >
                  <option value="">— Wybierz —</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.key}
                  type="text"
                  placeholder={field.placeholder}
                  maxLength={field.maxLength ?? 200}
                  value={values[field.key] ?? ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  required={field.required}
                />
              )}
            </div>
          ))}

          {error && <p className="aihub-error">{error}</p>}

          <button
            type="submit"
            className="btn-primary aihub-submit"
            disabled={isPending || step === "loading"}
          >
            {step === "loading" ? (
              <span className="aihub-spinner">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span>Generuję…</span>
              </span>
            ) : (
              "Generuj bezpłatnie →"
            )}
          </button>

          <p className="aihub-disclaimer">
            Bezpłatne demo. Bez rejestracji. Bez karty.
          </p>
        </form>
      )}

      {/* Result */}
      {step === "result" && result && (
        <div className="aihub-result">
          <div className="aihub-result-header">
            <span className="aihub-result-badge">
              ✓ Wygenerowano · {result.provider}
            </span>
            <button onClick={handleCopy} className="btn-ghost btn-sm">
              {copied ? "Skopiowano!" : "Kopiuj"}
            </button>
          </div>

          <div className="aihub-result-body">
            <ResultRenderer text={result.text} />
          </div>

          <div className="aihub-result-actions">
            <button
              onClick={() => setStep("form")}
              className="btn-ghost btn-sm"
            >
              ← Generuj ponownie
            </button>
            <button
              onClick={() => setStep("lead")}
              className="btn-primary"
            >
              {tool.ctaLabel} →
            </button>
          </div>
        </div>
      )}

      {/* Lead capture */}
      {step === "lead" && (
        <div className="aihub-lead">
          <h3>Chcesz pełną wersję?</h3>
          <p>
            Zostaw kontakt — odezwiemy się w ciągu 24h z dokładną wyceną
            i planem działania dla Twojej firmy.
          </p>
          <form onSubmit={handleLeadSubmit} className="aihub-form">
            <div className="aihub-field">
              <label htmlFor="lead-name">Imię i nazwisko</label>
              <input
                id="lead-name"
                type="text"
                placeholder="np. Anna Kowalska"
                value={contact.name}
                onChange={(e) =>
                  setContact((c) => ({ ...c, name: e.target.value }))
                }
              />
            </div>
            <div className="aihub-field">
              <label htmlFor="lead-email">
                Adres e-mail <span className="required">*</span>
              </label>
              <input
                id="lead-email"
                type="email"
                placeholder="np. anna@firma.pl"
                value={contact.email}
                required
                onChange={(e) =>
                  setContact((c) => ({ ...c, email: e.target.value }))
                }
              />
            </div>
            <div className="aihub-field">
              <label htmlFor="lead-phone">Telefon (opcjonalnie)</label>
              <input
                id="lead-phone"
                type="tel"
                placeholder="np. 600 123 456"
                value={contact.phone}
                onChange={(e) =>
                  setContact((c) => ({ ...c, phone: e.target.value }))
                }
              />
            </div>
            {error && <p className="aihub-error">{error}</p>}
            <button type="submit" className="btn-primary aihub-submit">
              Wyślij i otrzymaj ofertę →
            </button>
            <button
              type="button"
              onClick={() => setStep("result")}
              className="btn-ghost btn-sm mt-2"
            >
              Wróć do wyniku
            </button>
          </form>
        </div>
      )}

      {/* Thank you */}
      {step === "done" && (
        <div className="aihub-done">
          <div className="aihub-done-icon">✓</div>
          <h3>Dziękujemy!</h3>
          <p>
            Otrzymamy Twoją wiadomość i odezwiemy się w ciągu 24 godzin
            roboczych z konkretnymi propozycjami.
          </p>
          <button
            onClick={() => {
              setStep("form");
              setValues({});
              setResult(null);
              setError("");
              setLeadSent(false);
              setContact({ name: "", email: "", phone: "" });
            }}
            className="btn-primary mt-6"
          >
            Wróć i generuj kolejne
          </button>
        </div>
      )}
    </div>
  );
}

function ResultRenderer({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="aihub-prose">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return <h2 key={i}>{line.slice(3)}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={i}>{line.slice(4)}</h3>;
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="bold-line"><strong>{line.slice(2, -2)}</strong></p>;
        }
        if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("✓ ")) {
          return <p key={i} className="list-item">{line}</p>;
        }
        if (line.trim() === "---" || line.trim() === "***") {
          return <hr key={i} />;
        }
        if (line.trim() === "") {
          return <br key={i} />;
        }
        // Handle inline **bold**
        if (line.includes("**")) {
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={i}>
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**")
                  ? <strong key={j}>{part.slice(2, -2)}</strong>
                  : part
              )}
            </p>
          );
        }
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}
