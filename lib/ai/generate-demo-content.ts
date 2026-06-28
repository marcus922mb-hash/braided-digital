import { demoContentSchema } from "@/features/demos/schemas/demo-schema";
import {
  buildDemoContentPrompt,
  DEMO_CONTENT_SYSTEM_PROMPT,
} from "@/lib/ai/prompts";
import { aiRouter } from "@/lib/ai/router";
import { imageService } from "@/lib/images";
import type {
  AIProvider,
  GenerateDemoContentInput,
  GenerateDemoContentOutput,
} from "@/lib/ai/types";

export class AIJsonParseError extends Error {
  constructor(message = "AI zwróciło niepoprawny JSON.") {
    super(message);
    this.name = "AIJsonParseError";
  }
}

export function extractJsonObject(rawText: string) {
  const trimmed = rawText.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  if (withoutFence.startsWith("{")) return withoutFence;

  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new AIJsonParseError();
  }

  return withoutFence.slice(start, end + 1);
}

const VALID_PROVIDERS = ["pexels", "pixabay", "unsplash", "placeholder"] as const;
const VALID_STRUCTURE_TYPES = [
  "navigation","hero","about","services","features","gallery",
  "process","testimonials","faq","cta","contact","footer",
] as const;
const DEFAULT_HEADING = { eyebrow: "", title: "", subtitle: "" };
const DEFAULT_IMAGE = { url: "", alt: "", description: "", provider: "placeholder" as const };

function fixImage(img: unknown) {
  if (typeof img !== "object" || img === null) return DEFAULT_IMAGE;
  const i = img as Record<string, unknown>;
  return {
    url: typeof i.url === "string" ? i.url : "",
    alt: typeof i.alt === "string" ? i.alt : "",
    description: typeof i.description === "string" ? i.description : "",
    provider: VALID_PROVIDERS.includes(i.provider as (typeof VALID_PROVIDERS)[number])
      ? (i.provider as (typeof VALID_PROVIDERS)[number])
      : "placeholder",
    ...(typeof i.photographer === "string" && { photographer: i.photographer }),
    ...(typeof i.sourceUrl === "string" && { sourceUrl: i.sourceUrl }),
  };
}

function fixHeading(h: unknown) {
  if (typeof h !== "object" || h === null) return DEFAULT_HEADING;
  const hh = h as Record<string, unknown>;
  return {
    eyebrow: typeof hh.eyebrow === "string" ? hh.eyebrow : "",
    title: typeof hh.title === "string" ? hh.title : "",
    subtitle: typeof hh.subtitle === "string" ? hh.subtitle : "",
  };
}

// Fixes common AI output mistakes before Zod validation
function normalizeAiOutput(raw: Record<string, unknown>): Record<string, unknown> {
  // schemaVersion — AI sometimes returns "2" (string) or omits it
  raw.schemaVersion = 2;

  // headings — fill missing keys with defaults
  const HEADING_KEYS = ["services", "features", "process", "testimonials", "faq"] as const;
  const headings = (typeof raw.headings === "object" && raw.headings !== null)
    ? raw.headings as Record<string, unknown>
    : {};
  const fixedHeadings: Record<string, unknown> = {};
  for (const key of HEADING_KEYS) {
    fixedHeadings[key] = fixHeading(headings[key]);
  }
  raw.headings = fixedHeadings;

  // images in hero, about
  for (const section of ["hero", "about"] as const) {
    const s = raw[section] as Record<string, unknown> | undefined;
    if (s && typeof s === "object") {
      s.eyebrow = s.eyebrow ?? "";
      s.image = fixImage(s.image);
    }
  }

  // gallery items
  const gallery = raw.gallery as Record<string, unknown> | undefined;
  if (gallery && typeof gallery === "object") {
    gallery.eyebrow = gallery.eyebrow ?? "";
    if (Array.isArray(gallery.items)) {
      gallery.items = gallery.items.map(fixImage);
    }
  }

  // seo ogImage
  const seo = raw.seo as Record<string, unknown> | undefined;
  if (seo && typeof seo === "object") {
    seo.ogImage = fixImage(seo.ogImage);
    if (!Array.isArray(seo.keywords)) seo.keywords = [];
  }

  // testimonials — add missing role
  if (Array.isArray(raw.testimonials)) {
    raw.testimonials = raw.testimonials.map((t: unknown) => {
      if (typeof t !== "object" || t === null) return t;
      const tt = t as Record<string, unknown>;
      return { role: "", ...tt };
    });
  }

  // structure — remove items with unrecognized types
  if (Array.isArray(raw.structure)) {
    raw.structure = raw.structure.filter(
      (s: unknown) =>
        typeof s === "object" && s !== null &&
        VALID_STRUCTURE_TYPES.includes((s as Record<string, unknown>).type as (typeof VALID_STRUCTURE_TYPES)[number])
    );
  }

  return raw;
}

export function parseGeneratedDemoContent(rawText: string) {
  try {
    const parsed = JSON.parse(extractJsonObject(rawText));
    const normalized = normalizeAiOutput(parsed as Record<string, unknown>);
    return demoContentSchema.parse(normalized);
  } catch (error) {
    if (error instanceof AIJsonParseError) throw error;
    if (error instanceof Error && "issues" in error) {
      // Zod error — extract first issue path for debugging
      const zodError = error as { issues: { path: (string | number)[]; message: string }[] };
      const first = zodError.issues?.[0];
      const path = first?.path?.join(".") ?? "?";
      throw new AIJsonParseError(`AI zwróciło niepoprawną strukturę JSON. Błąd: ${path} — ${first?.message ?? "nieznany błąd"}`);
    }
    throw new AIJsonParseError("AI zwróciło JSON, ale struktura treści jest niepoprawna.");
  }
}

export async function generateDemoContent(
  input: GenerateDemoContentInput,
  options?: {
    preferredProvider?: AIProvider;
    preferredModel?: string;
    onAttemptStart?: (provider: AIProvider, model: string, prompt: string) => Promise<string | null>;
    onAttemptEnd?: (logId: string | null, result: { response?: string; error?: string }) => Promise<void>;
  }
): Promise<GenerateDemoContentOutput> {
  const result = await aiRouter.generate(
    {
      task: "demo_generation",
      preferredProvider: options?.preferredProvider,
      preferredModel: options?.preferredModel,
      messages: [
        { role: "system", content: DEMO_CONTENT_SYSTEM_PROMPT },
        { role: "user", content: buildDemoContentPrompt(input) },
      ],
      temperature: 0.55,
      validateResponse: (text) => {
        parseGeneratedDemoContent(text);
      },
    },
    {
      onAttemptStart: options?.onAttemptStart
        ? ({ provider, model, prompt }) =>
            options.onAttemptStart!(provider, model, prompt)
        : undefined,
      onAttemptEnd: options?.onAttemptEnd
        ? (logId, _context, attempt) =>
            options.onAttemptEnd!(logId, {
              response: attempt.response,
              error: attempt.error,
            })
        : undefined,
    }
  );
  const generatedContent = parseGeneratedDemoContent(result.text);
  const content = await imageService.enrichDemoContent({
    content: generatedContent,
    industry: input.industry,
    city: input.city,
  });

  return {
    content,
    provider: result.provider,
    model: result.model,
    generatedAt: new Date().toISOString(),
  };
}
