import {
  type GitHubRepositoryInput,
  type SectionImportResult,
  type SectionRecord,
  type SectionSource,
} from "@/features/section-library/types";
import { analyzeSectionCode } from "@/features/section-library/analysis";
import { dataUriSvg, nowIso, slugify } from "@/features/section-library/utils";
import { scanSectionCode } from "@/features/section-library/security";

type GitHubRepoMetadata = {
  full_name: string;
  default_branch: string;
  license?: { spdx_id?: string | null; name?: string | null } | null;
  owner?: { login?: string | null } | null;
};

type GitHubTreeEntry = {
  path: string;
  type: string;
};

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

function parseRepositoryUrl(repositoryUrl: string) {
  const url = new URL(repositoryUrl);
  if (!/github\.com$/i.test(url.hostname)) {
    throw new Error("Link musi wskazywać na GitHub.");
  }
  const parts = url.pathname.replace(/\.git$/i, "").split("/").filter(Boolean);
  if (parts.length < 2) {
    throw new Error("Nie udało się odczytać owner/repo.");
  }
  return {
    owner: parts[0],
    repo: parts[1],
  };
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "User-Agent": "Braided-Digital-Section-Scanner",
      Accept: "application/vnd.github+json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API zwróciło HTTP ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { "User-Agent": "Braided-Digital-Section-Scanner" },
  });
  if (!response.ok) throw new Error(`Nie udało się pobrać pliku ${url}.`);
  return response.text();
}

function buildThumbnail(title: string, accent = "#b68d5e", text = "#111") {
  return dataUriSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <rect width="1200" height="800" rx="48" fill="#101010"/>
      <circle cx="970" cy="110" r="190" fill="${accent}" opacity=".35"/>
      <circle cx="980" cy="630" r="240" fill="${accent}" opacity=".16"/>
      <rect x="70" y="70" width="1060" height="660" rx="36" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)"/>
      <text x="110" y="170" fill="${text}" font-size="54" font-family="Arial, sans-serif" font-weight="700">${title}</text>
      <rect x="110" y="220" width="300" height="14" rx="7" fill="rgba(255,255,255,.5)"/>
      <rect x="110" y="290" width="520" height="18" rx="9" fill="rgba(255,255,255,.22)"/>
      <rect x="110" y="342" width="420" height="18" rx="9" fill="rgba(255,255,255,.14)"/>
      <rect x="110" y="500" width="280" height="74" rx="18" fill="${accent}"/>
    </svg>
  `);
}

function detectSectionKind(path: string, content: string) {
  const haystack = `${path} ${content}`.toLowerCase();
  if (/navbar|nav-bar|navigation|header/.test(haystack)) return "navbar";
  if (/hero|masthead|banner/.test(haystack)) return "hero";
  if (/pricing|price|plans?/.test(haystack)) return "pricing";
  if (/faq|accordion|questions?/.test(haystack)) return "faq";
  if (/footer/.test(haystack)) return "footer";
  if (/contact|form|lead/.test(haystack)) return "contact";
  if (/testimonial|review|quote/.test(haystack)) return "testimonials";
  if (/gallery|portfolio|project|work/.test(haystack)) return "gallery";
  if (/product|products|shop|cart|checkout|collection/.test(haystack)) return "ecommerce";
  if (/process|steps|timeline/.test(haystack)) return "process";
  return "section";
}

function detectTechnology(path: string, content: string) {
  const lower = `${path} ${content}`.toLowerCase();
  if (lower.includes("next/link") || lower.includes("next/image") || lower.includes("use client")) {
    return "Next.js + Tailwind";
  }
  if (lower.includes("class=") && /tailwind|tw-|bg-|text-|grid|flex/.test(lower)) {
    return "HTML + Tailwind";
  }
  if (path.endsWith(".tsx") || path.endsWith(".jsx")) {
    return "React + Tailwind";
  }
  if (path.endsWith(".css")) return "CSS";
  return path.endsWith(".html") ? "HTML" : "React";
}

function detectTags(kind: string, path: string, content: string) {
  const tags = new Set<string>([kind]);
  const lower = `${path} ${content}`.toLowerCase();
  if (lower.includes("framer-motion")) tags.add("framer-motion");
  if (lower.includes("lucide-react")) tags.add("lucide");
  if (lower.includes("tailwind")) tags.add("tailwind");
  if (lower.includes("dark")) tags.add("dark");
  if (lower.includes("glass")) tags.add("glass");
  if (lower.includes("gradient")) tags.add("gradient");
  if (lower.includes("responsive")) tags.add("responsive");
  return [...tags];
}

function splitDependencies(packageJson: PackageJson | null) {
  const dependencies = {
    ...(packageJson?.dependencies ?? {}),
    ...(packageJson?.peerDependencies ?? {}),
    ...(packageJson?.devDependencies ?? {}),
  };
  return Object.keys(dependencies);
}

function buildSectionRecord(args: {
  name: string;
  description: string;
  kind: string;
  technology: string;
  path: string;
  content: string;
  dependencies: string[];
  license: string;
  author: string | null;
  repoUrl: string;
}): SectionRecord {
  const slug = slugify(`${args.kind}-${args.name}`);
  const analysis = scanSectionCode(args.content, args.dependencies);
  const normalizedLicense = args.license.trim().toLowerCase();
  const isKnownLicense = /^(mit|apache-2\.0|bsd|isc|mpl|lgpl|gpl)/i.test(normalizedLicense);
  const categoryId =
    args.kind === "navbar" ? "menu-i-nawigacje" :
    args.kind === "hero" ? "sekcje-hero" :
    args.kind === "ecommerce" ? "sekcje-ecommerce" :
    args.kind === "section" ? "sekcje-ofertowe" :
    "sekcje-ofertowe";
  const categoryName =
    categoryId === "menu-i-nawigacje" ? "Menu i nawigacje" :
    categoryId === "sekcje-hero" ? "Sekcje Hero" :
    categoryId === "sekcje-ecommerce" ? "Sekcje e-commerce" :
    "Sekcje ofertowe";
  return {
    id: `github-${slug}`,
    slug,
    name: args.name,
    categoryId,
    categoryName,
    tags: detectTags(args.kind, args.path, args.content),
    thumbnailUrl: buildThumbnail(args.name.slice(0, 18)),
    description: args.description,
    technology: args.technology as SectionRecord["technology"],
    componentCode: args.content,
    styleCode: "",
    dependencies: args.dependencies,
    difficulty: analysis.riskScore > 20 ? "hard" : "medium",
    requiresJavaScript: /use client|useEffect|window|document/.test(args.content),
    responsive: /@media|sm:|md:|lg:|grid|flex/.test(args.content) || analysis.safe,
    animated: /framer-motion|animate|motion\./i.test(args.content),
    sourceType: "github",
    sourceUrl: args.repoUrl,
    author: args.author,
    licenseId: normalizedLicense.includes("mit") ? "mit" : normalizedLicense.includes("apache") ? "apache-2.0" : "unknown",
    licenseName: args.license || "Wymaga sprawdzenia",
    licenseStatus: isKnownLicense ? "known" : "requires_check",
    isFree: isKnownLicense,
    commercialUse: isKnownLicense,
    attributionRequired: isKnownLicense && !normalizedLicense.includes("mit"),
    dateAdded: nowIso(),
    status: analysis.safe ? "active" : "draft",
    industryTags: [kindToIndustry(args.kind)],
    styleTags: detectTags(args.kind, args.path, args.content).filter((tag) => tag !== args.kind),
    isFavorite: false,
    isPremium: false,
    previewHtml: `<div style="padding:24px"><h3>${args.name}</h3><p>${args.description}</p></div>`,
    previewDarkHtml: `<div style="padding:24px;background:#111;color:#fff"><h3>${args.name}</h3><p>${args.description}</p></div>`,
    aiAnalysis: null,
    variants: [],
  };
}

function kindToIndustry(kind: string) {
  if (kind === "ecommerce") return "ecommerce";
  if (kind === "hero") return "startup";
  if (kind === "pricing") return "saas";
  if (kind === "gallery") return "portfolio";
  return "business";
}

function detectCandidateSections(tree: GitHubTreeEntry[]) {
  return tree.filter((entry) => /\.(tsx|jsx|ts|js|html|mdx|css)$/i.test(entry.path));
}

export async function scanGitHubRepository(input: GitHubRepositoryInput): Promise<SectionImportResult> {
  const { owner, repo } = parseRepositoryUrl(input.repositoryUrl);
  const repoMeta = await fetchJson<GitHubRepoMetadata>(`https://api.github.com/repos/${owner}/${repo}`);
  const branch = repoMeta.default_branch || "main";
  const treeResponse = await fetchJson<{ tree: GitHubTreeEntry[] }>(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`
  );
  const files = detectCandidateSections(treeResponse.tree);
  const packageJsonEntry = treeResponse.tree.find((entry) => entry.path === "package.json");
  let packageDependencies: string[] = [];
  if (packageJsonEntry) {
    try {
      const pkg = await fetchText(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/package.json`);
      const parsed = JSON.parse(pkg) as PackageJson;
      packageDependencies = splitDependencies(parsed);
    } catch {
      packageDependencies = [];
    }
  }

  const warnings: string[] = [];
  const sections = await Promise.all(
    files.slice(0, 100).map(async (entry) => {
      const raw = await fetchText(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${entry.path}`);
      const kind = detectSectionKind(entry.path, raw);
      const technology = detectTechnology(entry.path, raw);
      const name = input.sourceName
        ? `${input.sourceName} - ${kind}`
        : `${kind.replace(/(^|-)([a-z])/g, (_, p1, p2) => p2.toUpperCase())}`;
      const description = input.sourceDescription || `Sekcja wykryta w pliku ${entry.path}`;
      const dependencies = [
        ...packageDependencies,
        ...((raw.match(/from\s+["']([^"']+)["']/g) ?? []).map((line) => line.replace(/^from\s+["']|["']$/g, ""))),
      ].slice(0, 12);
      const section = buildSectionRecord({
        name,
        description,
        kind,
        technology,
        path: entry.path,
        content: raw.slice(0, 24000),
        dependencies,
        license: input.license ?? repoMeta.license?.spdx_id ?? repoMeta.license?.name ?? "Wymaga sprawdzenia",
        author: input.author ?? repoMeta.owner?.login ?? null,
        repoUrl: input.repositoryUrl,
      });

      const ai = await analyzeSectionCode({
        name: section.name,
        categoryName: section.categoryName,
        code: section.componentCode,
        styleCode: section.styleCode,
        dependencies: section.dependencies,
        technology: section.technology,
        useAi: true,
      });
      section.aiAnalysis = ai.analysis;
      if (!ai.analysis.security.safe) {
        section.status = "draft";
        warnings.push(`${entry.path}: wymaga sandboxa lub ręcznej weryfikacji.`);
      }
      return section;
    })
  );

  const variants = sections.flatMap((section) => section.variants ?? []);
  const source: SectionSource = {
    id: `${owner}-${repo}`,
    name: input.sourceName || `${owner}/${repo}`,
    description: input.sourceDescription || `Repozytorium GitHub ${owner}/${repo}`,
    githubUrl: input.repositoryUrl,
    technology: repoMeta.default_branch ? "React + Tailwind" : "HTML",
    license: input.license || repoMeta.license?.spdx_id || repoMeta.license?.name || "Wymaga sprawdzenia",
    author: input.author || repoMeta.owner?.login || null,
    lastSyncedAt: nowIso(),
    componentCount: files.length,
    sectionCount: sections.length,
    syncStatus: warnings.length ? "needs_review" : "synced",
    autoSync: input.autoSync ?? true,
    tags: [...new Set(sections.flatMap((section) => section.tags))].slice(0, 12),
    categories: ["menu-i-nawigacje", "sekcje-hero", "sekcje-ofertowe", "sekcje-ecommerce", "sekcje-specjalne"],
    thumbnailUrl: sections[0]?.thumbnailUrl ?? null,
  };

  return {
    source,
    sections,
    variants,
    filesScanned: files.length,
    packageDependencies,
    warnings,
  };
}
