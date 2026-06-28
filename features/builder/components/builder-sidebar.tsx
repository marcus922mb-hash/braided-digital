"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Search, Layers, ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import {
  COMPONENT_DEFINITIONS,
  COMPONENT_CATEGORIES,
  getComponentDefinition,
} from "@/lib/builder/component-definitions";
import { useBuilderStore } from "@/features/builder/store/builder-store";
import type { ComponentDefinition } from "@/features/builder/types";

// ── Draggable library item ───────────────────────────────────
function LibraryItem({ def }: { def: ComponentDefinition }) {
  const { addComponent, selectedId } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library:${def.type}`,
    data: { type: "library", componentType: def.type, def },
  });

  return (
    <div
      ref={setNodeRef}
      className={`bldr-lib-item${isDragging ? " bldr-lib-item--dragging" : ""}`}
      title={def.description}
    >
      <div className="bldr-lib-item-drag" {...listeners} {...attributes}>
        <GripVertical size={12} />
      </div>
      <div
        className="bldr-lib-item-content"
        onClick={() => addComponent(def, selectedId ?? undefined)}
      >
        <span className="bldr-lib-item-label">{def.label}</span>
        <span className="bldr-lib-item-desc">{def.description}</span>
      </div>
    </div>
  );
}

// ── Category group ───────────────────────────────────────────
function CategoryGroup({
  categoryKey,
  categoryLabel,
  defs,
}: {
  categoryKey: string;
  categoryLabel: string;
  defs: ComponentDefinition[];
}) {
  const [open, setOpen] = useState(true);
  if (defs.length === 0) return null;

  return (
    <div className="bldr-lib-category">
      <button
        className="bldr-lib-category-header"
        onClick={() => setOpen((p) => !p)}
      >
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        <span>{categoryLabel}</span>
        <span className="bldr-lib-category-count">{defs.length}</span>
      </button>
      {open && (
        <div className="bldr-lib-category-items">
          {defs.map((d) => <LibraryItem key={d.type} def={d} />)}
        </div>
      )}
    </div>
  );
}

// ── Layers panel ─────────────────────────────────────────────
function LayersPanel() {
  const { components, selectedId, selectComponent, removeComponent } = useBuilderStore();

  if (components.length === 0) {
    return (
      <div className="bldr-layers-empty">
        <Layers size={24} style={{ opacity: .2, display: "block", margin: "0 auto .5rem" }} />
        <p>Brak komponentów</p>
      </div>
    );
  }

  return (
    <div className="bldr-layers-list">
      {components.map((comp, i) => (
        <div
          key={comp.id}
          className={`bldr-layer-item${selectedId === comp.id ? " bldr-layer-item--selected" : ""}`}
          onClick={() => selectComponent(comp.id)}
        >
          <span className="bldr-layer-index">{i + 1}</span>
          <span className="bldr-layer-label">{comp.label}</span>
          <button
            className="bldr-layer-delete"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Usunąć "${comp.label}"?`)) removeComponent(comp.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Main sidebar ─────────────────────────────────────────────
export function BuilderSidebar() {
  const { sidebarTab, setSidebarTab } = useBuilderStore();
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? COMPONENT_DEFINITIONS.filter(
        (d) =>
          d.label.toLowerCase().includes(query.toLowerCase()) ||
          d.description.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  return (
    <aside className="bldr-sidebar">
      {/* Tabs */}
      <div className="bldr-sidebar-tabs">
        <button
          className={`bldr-sidebar-tab${sidebarTab === "components" ? " bldr-sidebar-tab--active" : ""}`}
          onClick={() => setSidebarTab("components")}
        >
          Komponenty
        </button>
        <button
          className={`bldr-sidebar-tab${sidebarTab === "layers" ? " bldr-sidebar-tab--active" : ""}`}
          onClick={() => setSidebarTab("layers")}
        >
          Warstwy
        </button>
      </div>

      {sidebarTab === "components" ? (
        <>
          {/* Search */}
          <div className="bldr-lib-search">
            <Search size={13} />
            <input
              className="bldr-lib-search-input"
              placeholder="Szukaj komponentu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Component list */}
          <div className="bldr-lib-list">
            {filtered ? (
              filtered.length === 0 ? (
                <div className="bldr-lib-empty">Brak wyników</div>
              ) : (
                filtered.map((d) => <LibraryItem key={d.type} def={d} />)
              )
            ) : (
              COMPONENT_CATEGORIES.map(({ key, label }) => {
                const defs = COMPONENT_DEFINITIONS.filter((d) => d.category === key);
                return (
                  <CategoryGroup
                    key={key}
                    categoryKey={key}
                    categoryLabel={label}
                    defs={defs}
                  />
                );
              })
            )}
          </div>
        </>
      ) : (
        <LayersPanel />
      )}
    </aside>
  );
}
