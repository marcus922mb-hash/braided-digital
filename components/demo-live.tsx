"use client";

import { useState } from "react";
import Link from "next/link";
import { type DemoConfig, defaultConfigs } from "@/lib/demo-configs";
import { PackageDemo, DemoContinuation } from "@/components/package-demos";
import { Arrow } from "@/components/icons";

type Tab = "preview" | "customize";
type Device = "desktop" | "mobile";

function TextField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "w-full rounded border border-black/15 bg-white px-3 py-2 text-xs focus:border-gold focus:outline-none transition-colors";
  return (
    <label className="block">
      <span className="mb-1 block text-[.62rem] text-muted">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className={cls}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}

function ColorSwatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-2.5">
      <span className="text-xs">{label}</span>
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[.6rem] text-muted">{value.toUpperCase()}</span>
        <div
          className="relative size-7 overflow-hidden rounded border border-black/20"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </div>
    </label>
  );
}

export function DemoLiveWrapper({ slug, title }: { slug: string; title: string }) {
  const fallback = defaultConfigs["cyfrowa-wizytowka"];
  const [config, setConfig] = useState<DemoConfig>(defaultConfigs[slug] ?? fallback);
  const [device, setDevice] = useState<Device>("desktop");
  const [tab, setTab] = useState<Tab>("preview");

  const update =
    <K extends keyof DemoConfig>(key: K) =>
    (val: DemoConfig[K]) =>
      setConfig((prev) => ({ ...prev, [key]: val }));

  const updateListItem = (key: "links" | "services") => (i: number, v: string) => {
    const arr = [...config[key]];
    arr[i] = v;
    setConfig((prev) => ({ ...prev, [key]: arr }));
  };

  const updateProduct = (i: number, field: "name" | "price", v: string) => {
    const arr = config.products.map((p, idx) => (idx === i ? { ...p, [field]: v } : p));
    setConfig((prev) => ({ ...prev, products: arr }));
  };

  const reset = () => setConfig(defaultConfigs[slug] ?? fallback);

  const isBio = slug === "link-w-bio";
  const isShop = slug === "mini-sklep-handmade" || slug === "sklep-online";
  const hasServices =
    slug === "one-page" || slug === "strona-firmowa" || slug === "cyfrowa-wizytowka";

  const PreviewContent = () => (
    <>
      <PackageDemo slug={slug} config={config} />
      <DemoContinuation slug={slug} config={config} />
      <section className="bg-gold px-5 py-12 text-center text-white">
        <p className="text-[.6rem] font-bold uppercase tracking-[.2em] text-white/65">
          Koniec prezentacji
        </p>
        <h2 className="mt-3 font-serif text-4xl">
          Twoja strona będzie zaprojektowana dla Twojej marki.
        </h2>
      </section>
    </>
  );

  const CustomizerPanel = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-black/10 px-5 py-4">
        <p className="text-[.55rem] font-bold uppercase tracking-[.2em] text-gold">
          Dostosuj demo
        </p>
        <p className="mt-0.5 text-[.65rem] text-muted">Zmiany widoczne natychmiast</p>
      </div>

      {/* Fields */}
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {/* Marka */}
        <section>
          <h3 className="mb-3 text-[.62rem] font-bold uppercase tracking-[.15em] text-gold">
            Marka
          </h3>
          <div className="space-y-3">
            <TextField label="Nazwa marki" value={config.brandName} onChange={update("brandName")} />
            <TextField label="Podtytuł / tag" value={config.tagline} onChange={update("tagline")} />
          </div>
        </section>

        {/* Treść */}
        <section>
          <h3 className="mb-3 text-[.62rem] font-bold uppercase tracking-[.15em] text-gold">
            Treść
          </h3>
          <div className="space-y-3">
            <TextField label="Nagłówek" value={config.headline} onChange={update("headline")} />
            {config.headlineItalic !== "" && (
              <TextField
                label="Wyróżnienie kursywą"
                value={config.headlineItalic}
                onChange={update("headlineItalic")}
              />
            )}
            {!isBio && (
              <TextField
                label="Opis"
                value={config.body}
                onChange={update("body")}
                multiline
              />
            )}
            <TextField
              label="Tekst przycisku / CTA"
              value={config.cta}
              onChange={update("cta")}
            />
          </div>
        </section>

        {/* Linki bio */}
        {isBio && config.links.length > 0 && (
          <section>
            <h3 className="mb-3 text-[.62rem] font-bold uppercase tracking-[.15em] text-gold">
              Linki
            </h3>
            <div className="space-y-2">
              {config.links.map((link, i) => (
                <TextField
                  key={i}
                  label={`Link ${i + 1}`}
                  value={link}
                  onChange={(v) => updateListItem("links")(i, v)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Usługi */}
        {hasServices && config.services.length > 0 && (
          <section>
            <h3 className="mb-3 text-[.62rem] font-bold uppercase tracking-[.15em] text-gold">
              Usługi
            </h3>
            <div className="space-y-2">
              {config.services.map((svc, i) => (
                <TextField
                  key={i}
                  label={`Usługa ${i + 1}`}
                  value={svc}
                  onChange={(v) => updateListItem("services")(i, v)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Produkty */}
        {isShop && config.products.length > 0 && (
          <section>
            <h3 className="mb-3 text-[.62rem] font-bold uppercase tracking-[.15em] text-gold">
              Produkty
            </h3>
            <div className="space-y-3">
              {config.products.map((product, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <TextField
                    label={`Nazwa ${i + 1}`}
                    value={product.name}
                    onChange={(v) => updateProduct(i, "name", v)}
                  />
                  <TextField
                    label="Cena"
                    value={product.price}
                    onChange={(v) => updateProduct(i, "price", v)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Kolory */}
        <section>
          <h3 className="mb-3 text-[.62rem] font-bold uppercase tracking-[.15em] text-gold">
            Kolory
          </h3>
          <div className="divide-y divide-black/8 rounded border border-black/10 bg-white px-3">
            <ColorSwatch
              label="Tło"
              value={config.bgColor}
              onChange={update("bgColor")}
            />
            <ColorSwatch
              label="Akcent"
              value={config.accentColor}
              onChange={update("accentColor")}
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="space-y-2 border-t border-black/10 p-5">
        <Link
          href={`/kontakt?pakiet=${encodeURIComponent(title)}`}
          className="btn-primary block text-center"
        >
          Chcę taką stronę <Arrow />
        </Link>
        <button
          onClick={reset}
          className="w-full py-2 text-[.65rem] text-muted transition hover:text-ink"
        >
          Przywróć domyślne
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* ── Mobile tab bar ── */}
      <div className="sticky top-[76px] z-30 flex border-b border-black/10 bg-paper md:hidden">
        {(["preview", "customize"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[.65rem] font-bold uppercase tracking-widest transition ${
              tab === t
                ? "border-b-2 border-gold text-gold"
                : "text-muted hover:text-ink"
            }`}
          >
            {t === "preview" ? "Podgląd" : "✏ Dostosuj"}
          </button>
        ))}
      </div>

      {/* ── Mobile: single column ── */}
      <div className="md:hidden">
        {tab === "preview" && <PreviewContent />}
        {tab === "customize" && (
          <div className="min-h-screen bg-paper">
            <CustomizerPanel />
          </div>
        )}
      </div>

      {/* ── Desktop: split pane ── */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "1fr 336px",
          height: "calc(100dvh - 128px)",
        }}
      >
        {/* Preview column */}
        <div className="flex flex-col overflow-hidden border-r border-black/10">
          {/* Device toggle */}
          <div className="flex shrink-0 items-center gap-2 border-b border-black/10 bg-cream/50 px-5 py-2">
            <span className="mr-auto text-[.6rem] text-muted">Tryb podglądu</span>
            {(["desktop", "mobile"] as Device[]).map((d) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`rounded px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-widest transition ${
                  device === d ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {d === "desktop" ? "💻 Desktop" : "📱 Mobile"}
              </button>
            ))}
          </div>

          {/* Demo content */}
          {device === "desktop" ? (
            <div className="flex-1 overflow-y-auto">
              <PreviewContent />
            </div>
          ) : (
            <div className="flex flex-1 items-start justify-center overflow-y-auto bg-[#e5e2de] p-8 pt-10">
              <div className="w-[375px] shrink-0 overflow-hidden rounded-[2.5rem] border-[5px] border-[#2a2823] shadow-2xl">
                <div className="flex h-8 items-center justify-center bg-[#2a2823]">
                  <div className="h-1.5 w-20 rounded-full bg-white/20" />
                </div>
                <div className="max-h-[680px] overflow-y-auto">
                  <PreviewContent />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Customizer column */}
        <aside className="overflow-hidden bg-paper">
          <CustomizerPanel />
        </aside>
      </div>
    </div>
  );
}
