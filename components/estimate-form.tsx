"use client";

import { useState } from "react";
import Link from "next/link";
import { Arrow, CheckIcon } from "./icons";
import type {
  Budget,
  EstimateResult,
  LeadFormData,
  PagesCount,
  ProductsCount,
  ProjectType,
  Timeline,
} from "@/lib/types";

// ─── Tiny sub-components ──────────────────────────────────────────────────────

function Dots({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-10 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i === current
              ? "w-8 bg-gold"
              : i < current
                ? "w-4 bg-gold/40"
                : "w-4 bg-black/12"
          }`}
        />
      ))}
      <span className="ml-auto font-mono text-[.62rem] text-muted">
        {current + 1}/{total}
      </span>
    </div>
  );
}

function Card({
  title,
  sub,
  icon,
  selected,
  onClick,
}: {
  title: string;
  sub?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-start gap-1 border p-5 text-left transition-all ${
        selected
          ? "border-gold bg-ink text-white"
          : "border-black/10 bg-paper hover:border-gold/50 hover:shadow-md"
      }`}
    >
      {icon && <span className="mb-2 text-2xl">{icon}</span>}
      <span className="font-serif text-xl leading-tight">{title}</span>
      {sub && (
        <span className={`text-xs ${selected ? "text-white/55" : "text-muted"}`}>{sub}</span>
      )}
      {selected && <CheckIcon className="absolute right-3 top-3 size-4 text-gold-light" />}
    </button>
  );
}

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex w-full items-center justify-between border p-5 text-left transition-all ${
        value
          ? "border-gold bg-ink text-white"
          : "border-black/10 bg-paper hover:border-gold/50"
      }`}
    >
      <div>
        <span className="text-sm font-medium">{label}</span>
        {hint && (
          <span className={`mt-0.5 block text-xs ${value ? "text-white/50" : "text-muted"}`}>
            {hint}
          </span>
        )}
      </div>
      <div
        className={`ml-4 flex size-6 shrink-0 items-center justify-center rounded-full border transition-all ${
          value ? "border-gold bg-gold text-white" : "border-black/20 bg-white"
        }`}
      >
        {value && <CheckIcon className="size-3" />}
      </div>
    </button>
  );
}

// ─── Form data & helpers ──────────────────────────────────────────────────────

const STEPS = 6;

const PROJECT_OPTIONS: { id: ProjectType; label: string; sub: string; icon: string }[] = [
  { id: "wizytowka", label: "Strona wizytówka", sub: "900–1800 zł", icon: "💼" },
  { id: "sklep", label: "Sklep internetowy", sub: "1800–4500 zł", icon: "🛍️" },
  { id: "landing", label: "Landing page", sub: "500–900 zł", icon: "🚀" },
  { id: "bio", label: "Link w bio", sub: "300–700 zł", icon: "🔗" },
  { id: "wordpress", label: "Poprawki WordPress", sub: "200–1000 zł", icon: "🔧" },
  { id: "ai", label: "Automatyzacja AI", sub: "800–3000 zł", icon: "🤖" },
];

const PAGES_OPTIONS: { id: PagesCount; label: string; sub: string }[] = [
  { id: "1", label: "1 strona", sub: "one-page / landing" },
  { id: "2-5", label: "2–5 podstron", sub: "typowa witryna firmowa" },
  { id: "6-10", label: "6–10 podstron", sub: "rozbudowany serwis" },
  { id: "10+", label: "Powyżej 10", sub: "duży projekt" },
];

const BUDGET_OPTIONS: { id: Budget; label: string }[] = [
  { id: "do-1000", label: "do 1 000 zł" },
  { id: "1000-3000", label: "1 000–3 000 zł" },
  { id: "3000-6000", label: "3 000–6 000 zł" },
  { id: "6000+", label: "powyżej 6 000 zł" },
];

const TIMELINE_OPTIONS: { id: Timeline; label: string; sub: string }[] = [
  { id: "asap", label: "Jak najszybciej", sub: "+20% za ekspres" },
  { id: "1-miesiac", label: "W ciągu miesiąca", sub: "standardowy termin" },
  { id: "2-3-miesiace", label: "Za 2–3 miesiące", sub: "możliwe planowanie" },
  { id: "bez-presji", label: "Bez presji", sub: "elastyczny harmonogram" },
];

type FormState = Partial<LeadFormData>;

function canGoNext(step: number, data: FormState): boolean {
  if (step === 0) return !!data.projectType;
  return true;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function EstimateForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<{ estimate: EstimateResult; leadId: string } | null>(null);

  const [data, setData] = useState<FormState>({
    hasDomain: false,
    hasHosting: false,
    pagesCount: "1",
    needsShop: false,
    productsCount: "1-10",
    needsContactForm: true,
    needsWhatsApp: false,
    needsSEO: false,
    hasContent: false,
    description: "",
    name: "",
    email: "",
    phone: "",
  });

  function set<K extends keyof LeadFormData>(k: K, v: LeadFormData[K]) {
    setData((prev) => ({ ...prev, [k]: v }));
  }

  const isShop = data.projectType === "sklep" || data.needsShop;

  async function submit() {
    setSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { success: boolean; estimate?: EstimateResult; leadId?: string; error?: string };
      if (json.success && json.estimate && json.leadId) {
        setResult({ estimate: json.estimate, leadId: json.leadId });
      } else {
        setApiError(json.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
      }
    } catch {
      setApiError("Błąd połączenia. Sprawdź internet i spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <ResultCard
        estimate={result.estimate}
        formData={data as LeadFormData}
        onReset={() => {
          setResult(null);
          setStep(0);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Dots current={step} total={STEPS} />

      {/* Step 0 — Project type */}
      {step === 0 && (
        <div>
          <p className="eyebrow mb-6">Krok 1 z {STEPS}</p>
          <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl">
            Jakiego projektu
            <br />
            potrzebujesz?
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {PROJECT_OPTIONS.map((opt) => (
              <Card
                key={opt.id}
                icon={opt.icon}
                title={opt.label}
                sub={opt.sub}
                selected={data.projectType === opt.id}
                onClick={() => set("projectType", opt.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Domain + hosting */}
      {step === 1 && (
        <div>
          <p className="eyebrow mb-6">Krok 2 z {STEPS}</p>
          <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl">
            Infrastruktura techniczna
          </h2>
          <div className="space-y-3">
            <Toggle
              label="Mam już domenę"
              hint="np. moja-marka.pl jest już kupiona"
              value={data.hasDomain ?? false}
              onChange={(v) => set("hasDomain", v)}
            />
            <Toggle
              label="Mam już hosting"
              hint="serwer lub usługa hostingowa jest aktywna"
              value={data.hasHosting ?? false}
              onChange={(v) => set("hasHosting", v)}
            />
          </div>
        </div>
      )}

      {/* Step 2 — Scope */}
      {step === 2 && (
        <div>
          <p className="eyebrow mb-6">Krok 3 z {STEPS}</p>
          <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl">Zakres projektu</h2>
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-medium">Ile podstron potrzebujesz?</p>
              <div className="grid grid-cols-2 gap-3">
                {PAGES_OPTIONS.map((opt) => (
                  <Card
                    key={opt.id}
                    title={opt.label}
                    sub={opt.sub}
                    selected={data.pagesCount === opt.id}
                    onClick={() => set("pagesCount", opt.id)}
                  />
                ))}
              </div>
            </div>

            {data.projectType !== "sklep" && (
              <Toggle
                label="Potrzebuję sklepu online"
                hint="sprzedaż produktów lub usług przez stronę"
                value={data.needsShop ?? false}
                onChange={(v) => set("needsShop", v)}
              />
            )}

            {isShop && (
              <div>
                <p className="mb-3 text-sm font-medium">Ile produktów na start?</p>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { id: "1-10", label: "1–10", sub: "mała kolekcja" },
                      { id: "11-30", label: "11–30", sub: "średni sklep" },
                      { id: "30+", label: "30+", sub: "duży asortyment" },
                    ] as { id: ProductsCount; label: string; sub: string }[]
                  ).map((opt) => (
                    <Card
                      key={opt.id}
                      title={opt.label}
                      sub={opt.sub}
                      selected={data.productsCount === opt.id}
                      onClick={() => set("productsCount", opt.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3 — Features */}
      {step === 3 && (
        <div>
          <p className="eyebrow mb-6">Krok 4 z {STEPS}</p>
          <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl">
            Jakie funkcje potrzebujesz?
          </h2>
          <div className="space-y-3">
            <Toggle
              label="Formularz kontaktowy"
              hint="klienci mogą wysłać wiadomość ze strony"
              value={data.needsContactForm ?? true}
              onChange={(v) => set("needsContactForm", v)}
            />
            <Toggle
              label="Integracja z WhatsApp"
              hint="przycisk otwierający czat bezpośrednio"
              value={data.needsWhatsApp ?? false}
              onChange={(v) => set("needsWhatsApp", v)}
            />
            <Toggle
              label="Optymalizacja SEO"
              hint="lepsza widoczność w wynikach Google"
              value={data.needsSEO ?? false}
              onChange={(v) => set("needsSEO", v)}
            />
          </div>
        </div>
      )}

      {/* Step 4 — Content + budget + timeline */}
      {step === 4 && (
        <div>
          <p className="eyebrow mb-6">Krok 5 z {STEPS}</p>
          <h2 className="mb-8 font-serif text-3xl leading-tight md:text-4xl">Materiały i budżet</h2>
          <div className="space-y-6">
            <Toggle
              label="Mam gotowe teksty i zdjęcia"
              hint="treści są przygotowane i gotowe do wdrożenia"
              value={data.hasContent ?? false}
              onChange={(v) => set("hasContent", v)}
            />

            <div>
              <p className="mb-3 text-sm font-medium">Jaki masz budżet?</p>
              <div className="grid grid-cols-2 gap-3">
                {BUDGET_OPTIONS.map((opt) => (
                  <Card
                    key={opt.id}
                    title={opt.label}
                    selected={data.budget === opt.id}
                    onClick={() => set("budget", opt.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">Kiedy chcesz wystartować?</p>
              <div className="grid grid-cols-2 gap-3">
                {TIMELINE_OPTIONS.map((opt) => (
                  <Card
                    key={opt.id}
                    title={opt.label}
                    sub={opt.sub}
                    selected={data.timeline === opt.id}
                    onClick={() => set("timeline", opt.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5 — Contact info */}
      {step === 5 && (
        <div>
          <p className="eyebrow mb-6">Krok 6 z {STEPS}</p>
          <h2 className="mb-2 font-serif text-3xl leading-tight md:text-4xl">
            Ostatni krok — Twoje dane
          </h2>
          <p className="mb-8 text-sm text-muted">
            Wszystkie pola są opcjonalne. Podaj e-mail lub telefon, jeśli chcesz, żebym się
            odezwała po wycenie.
          </p>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest">Imię</span>
              <input
                type="text"
                placeholder="Jak mam się do Ciebie zwracać?"
                value={data.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest">
                E-mail
              </span>
              <input
                type="email"
                placeholder="na.ten@adres.pl"
                value={data.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest">
                Telefon / WhatsApp
              </span>
              <input
                type="tel"
                placeholder="+48 000 000 000"
                value={data.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest">
                Opisz swój pomysł
              </span>
              <textarea
                rows={4}
                placeholder="Kilka zdań o marce, celu projektu i tym, czego potrzebujesz..."
                value={data.description ?? ""}
                onChange={(e) => set("description", e.target.value)}
                className="w-full resize-none border border-black/15 bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
          </div>
        </div>
      )}

      {/* Error */}
      {apiError && (
        <p className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {apiError}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="btn-secondary"
          >
            ← Wstecz
          </button>
        )}
        <button
          type="button"
          disabled={!canGoNext(step, data) || submitting}
          onClick={() => {
            if (step < STEPS - 1) {
              setStep((s) => s + 1);
            } else {
              void submit();
            }
          }}
          className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Obliczam…"
            : step === STEPS - 1
              ? "Oblicz moją wycenę →"
              : "Dalej →"}
        </button>
      </div>
      {step === 0 && !data.projectType && (
        <p className="mt-3 text-center text-xs text-muted">
          Wybierz rodzaj projektu, żeby przejść dalej
        </p>
      )}
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  estimate,
  formData,
  onReset,
}: {
  estimate: EstimateResult;
  formData: LeadFormData;
  onReset: () => void;
}) {
  const waMsg = [
    "Cześć! Właśnie uzupełniłam/em kalkulator wyceny na braideddigital.pl.",
    "",
    `Projekt: ${estimate.projectTypeLabel}`,
    `Orientacyjna cena: ${estimate.minPrice.toLocaleString("pl-PL")}–${estimate.maxPrice.toLocaleString("pl-PL")} zł`,
    `Czas realizacji: ${estimate.timelineLabel}`,
    formData.description ? `\nMój pomysł: ${formData.description}` : "",
  ]
    .filter((x) => x !== "")
    .join("\n");

  const waUrl = `https://wa.me/48730195530?text=${encodeURIComponent(waMsg)}`;

  const scopeFeatures = estimate.features.filter((f) => !f.includes("ekspresowa"));

  return (
    <div className="mx-auto max-w-2xl">
      {/* Price hero */}
      <div className="border border-gold/20 bg-ink px-8 py-14 text-center text-white">
        <p className="eyebrow mx-auto w-fit">Orientacyjna wycena</p>
        <div
          className="mt-6 font-serif leading-none"
          style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}
        >
          <span className="text-gold-light">
            {estimate.minPrice.toLocaleString("pl-PL")}
          </span>
          <span className="mx-2 text-white/30">–</span>
          <span className="text-gold-light">
            {estimate.maxPrice.toLocaleString("pl-PL")} zł
          </span>
        </div>
        <p className="mt-2 text-[.65rem] uppercase tracking-widest text-white/40">
          wartości orientacyjne · cena netto
        </p>
        <div className="mt-6 inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 text-sm">
          <span className="text-white/50">Szacowany czas realizacji:</span>
          <span className="font-medium">{estimate.timelineLabel}</span>
        </div>
      </div>

      {/* Details */}
      <div className="border-x border-b border-black/10 bg-paper p-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow">Typ projektu</p>
            <p className="mt-3 font-serif text-2xl">{estimate.projectTypeLabel}</p>
          </div>
          {scopeFeatures.length > 0 && (
            <div>
              <p className="eyebrow">Wybrany zakres</p>
              <ul className="mt-3 space-y-2">
                {scopeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {estimate.briefSummary && (
          <div className="mt-8 border-t border-black/8 pt-6">
            <p className="text-[.58rem] font-bold uppercase tracking-[.22em] text-gold">
              Brief projektu
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">{estimate.briefSummary}</p>
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a href={waUrl} target="_blank" rel="noreferrer" className="btn-primary text-center">
          Napisz na WhatsApp <Arrow />
        </a>
        <Link href="/kontakt" className="btn-secondary text-center">
          Umów bezpłatną rozmowę <Arrow />
        </Link>
      </div>

      <p className="mt-5 text-center text-[.65rem] leading-5 text-muted">
        Wycena ma charakter orientacyjny i nie stanowi oferty handlowej.
        <br />
        Ostateczną cenę ustalamy po rozmowie i omówieniu szczegółów projektu.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 w-full py-3 text-xs text-muted transition hover:text-ink"
      >
        ← Wypełnij formularz od nowa
      </button>
    </div>
  );
}
