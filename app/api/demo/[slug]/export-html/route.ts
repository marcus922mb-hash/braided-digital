import { NextResponse } from "next/server";
import { getPublicDemoBySlug } from "@/features/demos/queries/demo-queries";
import { parseDemoContent } from "@/features/demos/types";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { data: demo } = await getPublicDemoBySlug(slug);

  if (!demo || !demo.is_active) {
    return new NextResponse("Demo nie znalezione lub nieaktywne.", { status: 404 });
  }

  const content = parseDemoContent(demo.content);
  const primary = demo.primary_color || content.site.colors.primary || "#1a1a1a";
  const secondary = demo.secondary_color || content.site.colors.secondary || "#f4f0e8";
  const bg = content.site.colors.background || "#ffffff";
  const text = content.site.colors.text || "#1a1a1a";

  const hero = content.hero;
  const about = content.about;
  const services = content.services || [];
  const faq = content.faq || [];
  const seo = content.seo;

  const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${seo.title || demo.title}</title>
  ${seo.description ? `<meta name="description" content="${seo.description.replace(/"/g, "&quot;")}" />` : ""}
  <meta name="robots" content="noindex" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${primary};
      --secondary: ${secondary};
      --bg: ${bg};
      --text: ${text};
    }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); line-height: 1.65; }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

    /* Demo banner */
    .demo-banner { background: var(--primary); color: #fff; text-align: center; padding: .5rem 1rem; font-size: .75rem; letter-spacing: .05em; }

    /* Nav */
    nav { border-bottom: 1px solid rgba(0,0,0,.08); padding: 1rem 0; }
    .nav-inner { display: flex; justify-content: space-between; align-items: center; }
    .nav-logo { font-weight: 700; font-size: 1.1rem; color: var(--primary); }
    .nav-cta { background: var(--primary); color: #fff; padding: .5rem 1.25rem; border-radius: 4px; text-decoration: none; font-size: .85rem; font-weight: 600; }

    /* Hero */
    .hero { padding: 5rem 0 4rem; }
    .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.15; max-width: 700px; }
    .hero p { font-size: 1.1rem; color: rgba(0,0,0,.55); margin: 1.25rem 0 2rem; max-width: 560px; }
    .hero-btn { display: inline-block; background: var(--primary); color: #fff; padding: .85rem 2rem; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 1rem; }

    /* About */
    .about { padding: 4rem 0; background: ${secondary}22; }
    .about h2 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
    .about p { color: rgba(0,0,0,.65); max-width: 680px; }

    /* Services */
    .services { padding: 4rem 0; }
    .services h2 { font-size: 2rem; font-weight: 700; margin-bottom: 2rem; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.5rem; }
    .service-card { border: 1px solid rgba(0,0,0,.08); border-radius: 8px; padding: 1.5rem; }
    .service-card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: .5rem; color: var(--primary); }
    .service-card p { font-size: .9rem; color: rgba(0,0,0,.6); }
    .service-price { margin-top: .75rem; font-weight: 700; font-size: .95rem; }

    /* FAQ */
    .faq { padding: 4rem 0; background: ${secondary}22; }
    .faq h2 { font-size: 2rem; font-weight: 700; margin-bottom: 2rem; }
    .faq-item { border-bottom: 1px solid rgba(0,0,0,.08); padding: 1.25rem 0; }
    .faq-q { font-weight: 700; margin-bottom: .5rem; }
    .faq-a { color: rgba(0,0,0,.65); font-size: .95rem; }

    /* Footer */
    footer { background: var(--text); color: rgba(255,255,255,.7); padding: 2.5rem 0; text-align: center; }
    footer strong { color: #fff; }

    @media (max-width: 640px) {
      .hero { padding: 3rem 0; }
      .nav-cta { display: none; }
    }

    @media print {
      .demo-banner { display: none; }
      .nav-cta { display: none; }
    }
  </style>
</head>
<body>
  <div class="demo-banner">Wersja demonstracyjna — ${demo.title}</div>

  <nav>
    <div class="container nav-inner">
      <span class="nav-logo">${hero.title?.split(" ").slice(0, 2).join(" ") || demo.title}</span>
      <a href="#kontakt" class="nav-cta">Kontakt</a>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <h1>${hero.title || demo.title}</h1>
      <p>${hero.subtitle || ""}</p>
      ${hero.cta ? `<a href="#kontakt" class="hero-btn">${hero.cta}</a>` : ""}
    </div>
  </section>

  ${about?.title ? `
  <section class="about">
    <div class="container">
      <h2>${about.title}</h2>
      <p>${about.content || ""}</p>
    </div>
  </section>` : ""}

  ${services.length > 0 ? `
  <section class="services">
    <div class="container">
      <h2>Nasze usługi</h2>
      <div class="services-grid">
        ${services.slice(0, 6).map((s: { name?: string; description?: string; price?: string }) => `
        <div class="service-card">
          <h3>${s.name || ""}</h3>
          <p>${s.description || ""}</p>
          ${s.price ? `<p class="service-price">${s.price}</p>` : ""}
        </div>`).join("")}
      </div>
    </div>
  </section>` : ""}

  ${faq.length > 0 ? `
  <section class="faq">
    <div class="container">
      <h2>Często zadawane pytania</h2>
      ${faq.slice(0, 6).map((f: { question?: string; answer?: string }) => `
      <div class="faq-item">
        <p class="faq-q">${f.question || ""}</p>
        <p class="faq-a">${f.answer || ""}</p>
      </div>`).join("")}
    </div>
  </section>` : ""}

  <footer id="kontakt">
    <div class="container">
      <strong>${demo.title}</strong>
      <p style="margin-top:.5rem">Wygenerowane przez Braided Digital · braided.digital</p>
    </div>
  </footer>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="demo-${slug}.html"`,
    },
  });
}
