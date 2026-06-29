"use client";

import { useState, useTransition, useEffect, useRef } from "react";
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

function HtmlPreview({ html }: { html: string }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const a = downloadRef.current;
    if (!a) return;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    a.href = url;
    return () => URL.revokeObjectURL(url);
  }, [html]);

  return (
    <div className={`aihub-html-wrap${fullscreen ? " is-fullscreen" : ""}`}>
      <div className="aihub-html-toolbar">
        <span className="aihub-html-label">Podgląd strony</span>
        <div className="aihub-html-toolbar-actions">
          <button
            type="button"
            onClick={() => setMobile((m) => !m)}
            className={`btn-ghost btn-sm${mobile ? " is-active" : ""}`}
          >
            {mobile ? "Desktop" : "Mobile"}
          </button>
          <button
            type="button"
            onClick={() => setFullscreen((f) => !f)}
            className="btn-ghost btn-sm"
          >
            {fullscreen ? "Zmniejsz" : "Pełny ekran"}
          </button>
          <a
            ref={downloadRef}
            download="prototype.html"
            className="btn-ghost btn-sm"
          >
            ↓ Pobierz HTML
          </a>
        </div>
      </div>
      <div className={`aihub-html-frame${mobile ? " is-mobile" : ""}`}>
        <iframe
          srcDoc={html}
          sandbox="allow-scripts"
          title="Podgląd wygenerowanej strony"
          className="aihub-html-iframe"
        />
      </div>
    </div>
  );
}

function SvgPreview({ svgCode, label, fileName }: { svgCode: string; label?: string; fileName?: string }) {
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCode)}`;
  return (
    <div className="aihub-svg-preview">
      {label && <p className="aihub-svg-label">{label}</p>}
      <div className="aihub-svg-frame">
        <img src={url} alt={label ?? "Wygenerowana grafika SVG"} />
      </div>
      <a href={url} download={fileName ?? "export.svg"} className="btn-ghost btn-sm aihub-svg-download">
        ↓ Pobierz {fileName ?? "SVG"}
      </a>
    </div>
  );
}

function extractSvgBlocks(text: string): { tag: string; code: string }[] {
  const blocks: { tag: string; code: string }[] = [];
  const re = /<svg[\s\S]*?<\/svg>/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    blocks.push({ tag: `__SVG_${blocks.length}__`, code: m[0] });
  }
  return blocks;
}

function renderLineWithColors(line: string, key: number) {
  const hexRe = /(#[0-9A-Fa-f]{6})/g;
  if (!hexRe.test(line)) return <p key={key}>{line}</p>;
  const parts = line.split(/(#[0-9A-Fa-f]{6})/g);
  return (
    <p key={key}>
      {parts.map((part, j) =>
        /^#[0-9A-Fa-f]{6}$/i.test(part) ? (
          <span key={j} className="aihub-color-chip">
            <span className="aihub-color-dot" style={{ background: part }} />
            <strong>{part}</strong>
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
}

function renderLine(line: string, i: number): React.ReactNode {
  if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
  if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
  if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="bold-line"><strong>{line.slice(2, -2)}</strong></p>;
  if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("✓ ")) return <p key={i} className="list-item">{line}</p>;
  if (line.trim() === "---" || line.trim() === "***") return <hr key={i} />;
  if (line.trim() === "") return <br key={i} />;
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
  return renderLineWithColors(line, i);
}

function ResultRenderer({ text }: { text: string }) {
  // Detect full HTML document
  const htmlMatch = text.match(/<!DOCTYPE html[\s\S]*<\/html>/i) ?? text.match(/<html[\s\S]*<\/html>/i);
  if (htmlMatch) {
    return <HtmlPreview html={htmlMatch[0]} />;
  }

  const svgBlocks = extractSvgBlocks(text);

  // For svg-icons format: FAVICON: <svg...> APP ICON: <svg...>
  if (svgBlocks.length >= 2 && text.includes("FAVICON:")) {
    return (
      <div className="aihub-prose">
        <div className="aihub-svg-icons-grid">
          <SvgPreview svgCode={svgBlocks[0].code} label="Favicon (100×100)" fileName="favicon.svg" />
          <SvgPreview svgCode={svgBlocks[1].code} label="App Icon (512×512)" fileName="app-icon.svg" />
        </div>
      </div>
    );
  }

  // Single SVG (logo)
  if (svgBlocks.length === 1) {
    const textBefore = text.slice(0, text.indexOf(svgBlocks[0].code)).trim();
    const textAfter = text.slice(text.indexOf(svgBlocks[0].code) + svgBlocks[0].code.length).trim();
    return (
      <div className="aihub-prose">
        {textBefore && textBefore.split("\n").map((l, i) => renderLine(l, i))}
        <SvgPreview svgCode={svgBlocks[0].code} label="Wygenerowane logo" fileName="logo.svg" />
        {textAfter && textAfter.split("\n").map((l, i) => renderLine(l, i + 9000))}
      </div>
    );
  }

  // Default: text with color swatches
  const lines = text.split("\n");
  return (
    <div className="aihub-prose">
      {lines.map((line, i) => renderLine(line, i))}
    </div>
  );
}
