"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical, Copy, Trash2, ChevronUp, ChevronDown,
  Layout, Type, Image, Grid, MessageSquare, HelpCircle,
  DollarSign, Megaphone, BarChart2, Users, Clock, List,
  Phone, Anchor, Video, MapPin, Mail,
  ShoppingBag, FileText, Newspaper, Play,
} from "lucide-react";
import type { BuilderComponent } from "@/features/builder/types";
import { useBuilderStore } from "@/features/builder/store/builder-store";

const TYPE_ICONS: Record<string, React.ElementType> = {
  hero: Image,
  navbar: Layout,
  about: Type,
  services: Grid,
  features: List,
  gallery: Image,
  testimonials: MessageSquare,
  faq: HelpCircle,
  pricing: DollarSign,
  cta: Megaphone,
  statistics: BarChart2,
  team: Users,
  timeline: Clock,
  steps: List,
  contact: Phone,
  footer: Anchor,
  video: Play,
  map: MapPin,
  newsletter: Mail,
  instagram: Image,
  tiktok: Video,
  "woo-products": ShoppingBag,
  blog: Newspaper,
};

const CATEGORY_COLORS: Record<string, string> = {
  layout: "#7b8fc9",
  content: "#4caf7a",
  media: "#c97bba",
  social: "#c9a47b",
  commerce: "#7bc9c0",
};

const COMPONENT_CATEGORIES: Record<string, string> = {
  hero: "content", navbar: "layout", about: "content",
  services: "content", features: "content", gallery: "media",
  testimonials: "content", faq: "content", pricing: "content",
  cta: "content", statistics: "content", team: "content",
  timeline: "content", steps: "content", contact: "content",
  footer: "layout", video: "media", map: "media",
  newsletter: "social", instagram: "social", tiktok: "social",
  "woo-products": "commerce", blog: "commerce",
};

function BlockPreview({ component }: { component: BuilderComponent }) {
  const p = component.props;
  const title = (p.title || p.logoText || p.copyright || "") as string;
  const subtitle = (p.subtitle || p.content || p.description || "") as string;

  switch (component.type) {
    case "hero":
      return (
        <div className="bldr-preview bldr-preview--hero">
          <div className="bldr-preview-hero-bg" style={{ background: component.styles.background || "#1a1a2e" }} />
          <div className="bldr-preview-hero-content">
            <div className="bldr-preview-tag">Hero</div>
            <div className="bldr-preview-h1">{title || "Tytuł hero"}</div>
            <div className="bldr-preview-sub">{subtitle || "Podtytuł..."}</div>
            <div className="bldr-preview-buttons">
              <div className="bldr-preview-btn bldr-preview-btn--primary">{(p.ctaText as string) || "CTA"}</div>
              {Boolean(p.ctaSecondText) && <div className="bldr-preview-btn bldr-preview-btn--ghost">{p.ctaSecondText as string}</div>}
            </div>
          </div>
        </div>
      );

    case "navbar":
      return (
        <div className="bldr-preview bldr-preview--navbar">
          <div className="bldr-preview-nav-logo">{(p.logoText as string) || "Logo"}</div>
          <div className="bldr-preview-nav-links">
            {((p.links || []) as Array<{ label: string }>).slice(0, 4).map((l, i) => (
              <span key={i} className="bldr-preview-nav-link">{l.label}</span>
            ))}
          </div>
          {Boolean(p.ctaText) && <div className="bldr-preview-btn bldr-preview-btn--sm">{p.ctaText as string}</div>}
        </div>
      );

    case "about":
      return (
        <div className="bldr-preview bldr-preview--two-col">
          <div className="bldr-preview-text-block">
            {Boolean(p.badge) && <div className="bldr-preview-tag">{p.badge as string}</div>}
            <div className="bldr-preview-h2">{title || "O nas"}</div>
            <div className="bldr-preview-body">{(subtitle || "").slice(0, 120)}</div>
          </div>
          <div className="bldr-preview-image-placeholder">
            <Image size={20} style={{ opacity: .3 }} />
          </div>
        </div>
      );

    case "services":
    case "features":
      return (
        <div className="bldr-preview bldr-preview--grid-section">
          <div className="bldr-preview-section-header">
            <div className="bldr-preview-h2">{title || component.label}</div>
            {subtitle && <div className="bldr-preview-sub">{subtitle.slice(0, 60)}</div>}
          </div>
          <div className="bldr-preview-cards">
            {((p.items || []) as Array<{ title: string }>).slice(0, 3).map((item, i) => (
              <div key={i} className="bldr-preview-card">
                <div className="bldr-preview-card-icon" />
                <div className="bldr-preview-card-title">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "gallery":
      return (
        <div className="bldr-preview bldr-preview--gallery">
          <div className="bldr-preview-h2">{title || "Galeria"}</div>
          <div className="bldr-preview-gallery-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bldr-preview-gallery-item" />
            ))}
          </div>
        </div>
      );

    case "testimonials":
      return (
        <div className="bldr-preview bldr-preview--testimonials">
          <div className="bldr-preview-h2">{title || "Opinie"}</div>
          <div className="bldr-preview-testimonial-cards">
            {((p.items || []) as Array<{ name: string; quote: string }>).slice(0, 3).map((item, i) => (
              <div key={i} className="bldr-preview-testimonial-card">
                <div className="bldr-preview-quote">&ldquo;{(item.quote || "").slice(0, 60)}&rdquo;</div>
                <div className="bldr-preview-author">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "faq":
      return (
        <div className="bldr-preview bldr-preview--faq">
          <div className="bldr-preview-h2">{title || "FAQ"}</div>
          {((p.items || []) as Array<{ question: string }>).slice(0, 4).map((item, i) => (
            <div key={i} className="bldr-preview-faq-row">
              <span>{item.question || `Pytanie ${i + 1}`}</span>
              <ChevronDown size={12} />
            </div>
          ))}
        </div>
      );

    case "pricing":
      return (
        <div className="bldr-preview bldr-preview--pricing">
          <div className="bldr-preview-h2">{title || "Cennik"}</div>
          <div className="bldr-preview-pricing-cards">
            {((p.items || []) as Array<{ name: string; price: string; highlighted?: boolean }>).map((item, i) => (
              <div key={i} className={`bldr-preview-pricing-card${item.highlighted ? " bldr-preview-pricing-card--hl" : ""}`}>
                <div className="bldr-preview-pricing-name">{item.name}</div>
                <div className="bldr-preview-pricing-price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "cta":
      return (
        <div className="bldr-preview bldr-preview--cta" style={{ background: component.styles.background || "#d4a83a" }}>
          <div className="bldr-preview-h2" style={{ color: component.styles.color || "#000" }}>{title || "CTA"}</div>
          {subtitle && <div className="bldr-preview-sub" style={{ color: component.styles.color || "#000" }}>{subtitle.slice(0, 80)}</div>}
          <div className="bldr-preview-btn bldr-preview-btn--dark">{(p.primaryText as string) || "Akcja"}</div>
        </div>
      );

    case "statistics":
      return (
        <div className="bldr-preview bldr-preview--statistics">
          {title && <div className="bldr-preview-h2">{title}</div>}
          <div className="bldr-preview-stats-row">
            {((p.items || []) as Array<{ number: string; label: string }>).map((s, i) => (
              <div key={i} className="bldr-preview-stat">
                <div className="bldr-preview-stat-num">{s.number}</div>
                <div className="bldr-preview-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "team":
      return (
        <div className="bldr-preview bldr-preview--team">
          <div className="bldr-preview-h2">{title || "Zespół"}</div>
          <div className="bldr-preview-team-row">
            {((p.items || []) as Array<{ name: string; role: string }>).slice(0, 4).map((m, i) => (
              <div key={i} className="bldr-preview-team-card">
                <div className="bldr-preview-avatar" />
                <div className="bldr-preview-team-name">{m.name}</div>
                <div className="bldr-preview-team-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "timeline":
      return (
        <div className="bldr-preview bldr-preview--timeline">
          <div className="bldr-preview-h2">{title || "Historia"}</div>
          {((p.items || []) as Array<{ year: string; title: string }>).slice(0, 4).map((item, i) => (
            <div key={i} className="bldr-preview-timeline-row">
              <div className="bldr-preview-timeline-year">{item.year}</div>
              <div className="bldr-preview-timeline-dot" />
              <div className="bldr-preview-timeline-title">{item.title}</div>
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <div className="bldr-preview bldr-preview--steps">
          <div className="bldr-preview-h2">{title || "Kroki"}</div>
          <div className="bldr-preview-steps-row">
            {((p.items || []) as Array<{ step: string; title: string }>).slice(0, 4).map((item, i) => (
              <div key={i} className="bldr-preview-step">
                <div className="bldr-preview-step-num">{item.step}</div>
                <div className="bldr-preview-step-title">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "contact":
      return (
        <div className="bldr-preview bldr-preview--contact">
          <div className="bldr-preview-h2">{title || "Kontakt"}</div>
          <div className="bldr-preview-contact-row">
            <div className="bldr-preview-contact-info">
              {Boolean(p.email) && <div className="bldr-preview-contact-line">✉ {p.email as string}</div>}
              {Boolean(p.phone) && <div className="bldr-preview-contact-line">✆ {p.phone as string}</div>}
              {Boolean(p.address) && <div className="bldr-preview-contact-line">⊙ {p.address as string}</div>}
            </div>
            {Boolean(p.showForm) && (
              <div className="bldr-preview-form-skeleton">
                <div className="bldr-preview-input" />
                <div className="bldr-preview-input" />
                <div className="bldr-preview-textarea" />
                <div className="bldr-preview-btn bldr-preview-btn--primary" style={{ width: "100%" }}>Wyślij</div>
              </div>
            )}
          </div>
        </div>
      );

    case "footer":
      return (
        <div className="bldr-preview bldr-preview--footer" style={{ background: component.styles.background || "#111" }}>
          <div className="bldr-preview-footer-logo">{(p.logoText as string) || "Logo"}</div>
          <div className="bldr-preview-footer-cols">
            {((p.columns || []) as Array<{ title: string }>).map((col, i) => (
              <div key={i} className="bldr-preview-footer-col">
                <div className="bldr-preview-footer-col-title">{col.title}</div>
                <div className="bldr-preview-footer-link-ph" />
                <div className="bldr-preview-footer-link-ph" />
              </div>
            ))}
          </div>
          <div className="bldr-preview-footer-copy">{(p.copyright as string) || "© 2025"}</div>
        </div>
      );

    case "video":
      return (
        <div className="bldr-preview bldr-preview--video">
          {title && <div className="bldr-preview-h2">{title}</div>}
          <div className="bldr-preview-video-box">
            <Play size={28} style={{ opacity: .4 }} />
            <div className="bldr-preview-sub">{(p.videoUrl as string) || "URL wideo nie ustawiony"}</div>
          </div>
        </div>
      );

    case "map":
      return (
        <div className="bldr-preview bldr-preview--map">
          {title && <div className="bldr-preview-h2">{title}</div>}
          <div className="bldr-preview-map-box">
            <MapPin size={24} style={{ opacity: .4 }} />
            <div className="bldr-preview-sub">{(p.address as string) || "Adres nie ustawiony"}</div>
          </div>
        </div>
      );

    case "newsletter":
      return (
        <div className="bldr-preview bldr-preview--newsletter" style={{ background: component.styles.background || "#f5f5f5" }}>
          <div className="bldr-preview-h2">{title || "Newsletter"}</div>
          {subtitle && <div className="bldr-preview-sub">{subtitle.slice(0, 80)}</div>}
          <div className="bldr-preview-newsletter-row">
            <div className="bldr-preview-input" style={{ flexGrow: 1 }}>{(p.placeholder as string) || "Email"}</div>
            <div className="bldr-preview-btn bldr-preview-btn--primary">{(p.buttonText as string) || "Zapisz się"}</div>
          </div>
        </div>
      );

    case "instagram":
    case "tiktok":
      return (
        <div className="bldr-preview bldr-preview--social-feed">
          <div className="bldr-preview-h2">{title || (component.type === "instagram" ? "Instagram" : "TikTok")}</div>
          <div className="bldr-preview-social-handle">{(p.handle as string) || "@handle"}</div>
          <div className="bldr-preview-gallery-grid">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="bldr-preview-gallery-item" />)}
          </div>
        </div>
      );

    case "woo-products":
      return (
        <div className="bldr-preview bldr-preview--woo">
          <div className="bldr-preview-h2">{title || "Produkty"}</div>
          <div className="bldr-preview-cards">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bldr-preview-card">
                <div className="bldr-preview-card-image" />
                <div className="bldr-preview-card-title">Produkt {i + 1}</div>
                <div className="bldr-preview-card-price">99,00 zł</div>
              </div>
            ))}
          </div>
          <div className="bldr-preview-placeholder-badge">Placeholder — wymaga WooCommerce</div>
        </div>
      );

    case "blog":
      return (
        <div className="bldr-preview bldr-preview--blog">
          <div className="bldr-preview-h2">{title || "Blog"}</div>
          <div className="bldr-preview-cards">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bldr-preview-card">
                <div className="bldr-preview-card-image" />
                <div className="bldr-preview-card-title">Wpis blogowy {i + 1}</div>
                <div className="bldr-preview-card-desc" />
              </div>
            ))}
          </div>
          <div className="bldr-preview-placeholder-badge">Placeholder — wymaga WordPress</div>
        </div>
      );

    default:
      return <div className="bldr-preview-default">{component.label}</div>;
  }
}

type CanvasBlockProps = {
  component: BuilderComponent;
  isSelected: boolean;
  index: number;
  totalCount: number;
};

export function CanvasBlock({ component, isSelected, index, totalCount }: CanvasBlockProps) {
  const { selectComponent, removeComponent, duplicateComponent, moveComponent } = useBuilderStore();
  const Icon = TYPE_ICONS[component.type] ?? FileText;
  const category = COMPONENT_CATEGORIES[component.type] ?? "content";
  const accent = CATEGORY_COLORS[category] ?? "#4caf7a";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id, data: { type: "canvas", component } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bldr-block${isSelected ? " bldr-block--selected" : ""}${isDragging ? " bldr-block--dragging" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        selectComponent(component.id);
      }}
    >
      {/* Block header */}
      <div className="bldr-block-header">
        <div
          className="bldr-block-drag"
          {...attributes}
          {...listeners}
          title="Przeciągnij aby zmienić kolejność"
        >
          <GripVertical size={14} />
        </div>
        <span className="bldr-block-icon" style={{ color: accent }}>
          <Icon size={13} />
        </span>
        <span className="bldr-block-label">{component.label}</span>
        <span className="bldr-block-type" style={{ color: accent }}>
          {category}
        </span>

        <div className="bldr-block-actions">
          {index > 0 && (
            <button
              className="bldr-block-action"
              title="Przesuń wyżej"
              onClick={(e) => { e.stopPropagation(); moveComponent(index, index - 1); }}
            >
              <ChevronUp size={12} />
            </button>
          )}
          {index < totalCount - 1 && (
            <button
              className="bldr-block-action"
              title="Przesuń niżej"
              onClick={(e) => { e.stopPropagation(); moveComponent(index, index + 1); }}
            >
              <ChevronDown size={12} />
            </button>
          )}
          <button
            className="bldr-block-action"
            title="Duplikuj"
            onClick={(e) => { e.stopPropagation(); duplicateComponent(component.id); }}
          >
            <Copy size={12} />
          </button>
          <button
            className="bldr-block-action bldr-block-action--danger"
            title="Usuń"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Usunąć sekcję "${component.label}"?`)) removeComponent(component.id);
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Block preview */}
      <div className="bldr-block-preview">
        <BlockPreview component={component} />
      </div>

      {/* Selected indicator */}
      {isSelected && <div className="bldr-block-selected-bar" style={{ background: accent }} />}
    </div>
  );
}
