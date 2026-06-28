"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Grid2X2,
  Heart,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TemplateDefinition } from "@/features/templates/types";
import { TemplateVisual } from "./template-visual";

const ALL = "Wszystkie";

const GROUP_LABELS: Record<string, string> = {
  "handmade": "Rękodzieło",
  "beauty": "Uroda",
  "restaurant": "Restauracja",
  "services": "Usługi",
  "medical": "Medycyna",
  "creative": "Creative",
  "ecommerce": "E-commerce",
  "one-page": "One Page",
  "link-in-bio": "Link in Bio",
};

export function TemplateLibrary({ templates }: { templates: TemplateDefinition[] }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState(ALL);
  const [group, setGroup] = useState(ALL);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem("ma-template-favorites") ?? "[]"));
    } catch {
      setFavorites([]);
    }
  }, []);

  const industries = useMemo(
    () => [ALL, ...Array.from(new Set(templates.map((template) => template.industry)))],
    [templates]
  );

  const groups = useMemo(
    () => [ALL, ...Array.from(new Set(templates.map((template) => template.group)))],
    [templates]
  );

  const visibleTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pl");
    return templates.filter((template) => {
      const searchable = [
        template.name,
        template.industry,
        template.summary,
        template.style,
        ...template.tags,
      ].join(" ").toLocaleLowerCase("pl");
      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (industry === ALL || template.industry === industry) &&
        (group === ALL || template.group === group) &&
        (!favoritesOnly || favorites.includes(template.id))
      );
    });
  }, [favorites, favoritesOnly, group, industry, query, templates]);

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id];
      localStorage.setItem("ma-template-favorites", JSON.stringify(next));
      return next;
    });
  }

  function resetFilters() {
    setQuery("");
    setIndustry(ALL);
    setGroup(ALL);
    setFavoritesOnly(false);
  }

  const hasFilters = query || industry !== ALL || group !== ALL || favoritesOnly;

  return (
    <div className="tpl-library">
      <div className="tpl-library-heading">
        <div>
          <span className="tpl-kicker">Template library / 01</span>
          <h1>Wybierz kierunek.<br />Resztę dopracujesz w Builderze.</h1>
          <p>Profesjonalne systemy stron, nie gotowe motywy. Każdy zawiera pełną strukturę, własną paletę, typografię i animacje.</p>
        </div>
        <div className="tpl-library-count">
          <strong>{String(templates.length).padStart(2, "0")}</strong>
          <span>szablonów<br />premium</span>
        </div>
      </div>

      <div className="tpl-toolbar">
        <label className="tpl-search">
          <Search size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Szukaj branży, stylu lub funkcji..."
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Wyczyść wyszukiwanie">
              <X size={14} />
            </button>
          )}
        </label>

        <button
          type="button"
          className={`tpl-filter-toggle${filtersOpen ? " is-active" : ""}`}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <SlidersHorizontal size={14} />
          Filtry
          <ChevronDown size={13} />
        </button>

        <button
          type="button"
          className={`tpl-favorite-filter${favoritesOnly ? " is-active" : ""}`}
          onClick={() => setFavoritesOnly((active) => !active)}
        >
          <Heart size={14} fill={favoritesOnly ? "currentColor" : "none"} />
          Ulubione
        </button>
      </div>

      <AnimatePresence initial={false}>
        {filtersOpen && (
          <motion.div
            className="tpl-filter-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="tpl-filter-panel-inner">
              <span>Typ strony</span>
              <div className="tpl-industry-list">
                {groups.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={group === item ? "is-active" : ""}
                    onClick={() => setGroup(item)}
                  >
                    {group === item && <Check size={10} />}
                    {item === ALL ? "Wszystkie typy" : (GROUP_LABELS[item] ?? item)}
                  </button>
                ))}
              </div>
              <span>Branża</span>
              <div className="tpl-industry-list">
                {industries.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={industry === item ? "is-active" : ""}
                    onClick={() => setIndustry(item)}
                  >
                    {industry === item && <Check size={10} />}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="tpl-results-meta">
        <span><Grid2X2 size={12} /> {visibleTemplates.length} wyników</span>
        {hasFilters && <button type="button" onClick={resetFilters}>Wyczyść filtry</button>}
      </div>

      {visibleTemplates.length ? (
        <motion.div className="tpl-grid" layout>
          <AnimatePresence mode="popLayout">
            {visibleTemplates.map((template, index) => {
              const isFavorite = favorites.includes(template.id);
              return (
                <motion.article
                  className="tpl-card"
                  key={template.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: .96 }}
                  transition={{ duration: .4, delay: Math.min(index * .025, .25) }}
                >
                  <Link href={`/panel/templates/${template.id}`} className="tpl-card-visual" aria-label={`Podgląd szablonu ${template.name}`}>
                    {template.featured && <span className="tpl-featured">Featured</span>}
                    <TemplateVisual template={template} compact />
                    <span className="tpl-card-open">Preview <ArrowUpRight size={12} /></span>
                  </Link>
                  <div className="tpl-card-body">
                    <div className="tpl-card-topline">
                      <span>{template.industry}</span>
                      <span><Star size={11} fill="currentColor" /> {template.rating.toFixed(1)}</span>
                    </div>
                    <div className="tpl-card-title-row">
                      <div>
                        <h2><Link href={`/panel/templates/${template.id}`}>{template.name}</Link></h2>
                        <p>{template.style}</p>
                      </div>
                      <button
                        type="button"
                        className={`tpl-heart${isFavorite ? " is-active" : ""}`}
                        onClick={() => toggleFavorite(template.id)}
                        aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                      >
                        <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="tpl-card-bottom">
                      <div className="tpl-swatches" aria-label="Paleta kolorów">
                        {Object.entries(template.colors).map(([name, color]) => (
                          <span key={name} title={`${name}: ${color}`} style={{ background: color }} />
                        ))}
                      </div>
                      <div className="tpl-tags">{template.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="tpl-empty">
          <Search size={28} />
          <h2>Brak pasujących szablonów</h2>
          <p>Zmień frazę lub usuń część filtrów.</p>
          <button type="button" onClick={resetFilters}>Pokaż wszystkie</button>
        </div>
      )}
    </div>
  );
}
