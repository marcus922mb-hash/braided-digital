import { ArrowUpRight } from "lucide-react";
import type { TemplateDefinition } from "@/features/templates/types";

export function TemplateVisual({
  template,
  compact = false,
}: {
  template: TemplateDefinition;
  compact?: boolean;
}) {
  return (
    <div
      className={`tpl-visual${compact ? " is-compact" : ""}`}
      style={{
        "--tpl-primary": template.colors.primary,
        "--tpl-secondary": template.colors.secondary,
        "--tpl-accent": template.colors.accent,
        "--tpl-neutral": template.colors.neutral,
        "--tpl-dark": template.colors.dark,
        "--tpl-light": template.colors.light,
      } as React.CSSProperties}
    >
      <div className="tpl-browser-bar">
        <span /><span /><span />
        <div>{template.id}.studio</div>
      </div>
      <div className="tpl-site-nav">
        <strong>{template.name}</strong>
        <div><span>Studio</span><span>Oferta</span><span>Kontakt</span></div>
      </div>
      <div className="tpl-site-hero">
        <div className="tpl-site-copy">
          <small>{template.copy.eyebrow}</small>
          <h3>{template.copy.heroTitle}</h3>
          <p>{template.copy.heroSubtitle}</p>
          <span className="tpl-site-cta">Poznaj ofertę <ArrowUpRight size={10} /></span>
        </div>
        <div className="tpl-site-image">
          <span>IMAGE</span>
          <i />
        </div>
      </div>
      <div className="tpl-site-ticker">
        {template.copy.services.map((service) => <span key={service}>{service}</span>)}
      </div>
    </div>
  );
}
