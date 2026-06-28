import { demoContentSchema } from "@/features/demos/schemas/demo-schema";
import {
  buildDemoContentPrompt,
  DEMO_CONTENT_SYSTEM_PROMPT,
} from "@/lib/ai/prompts";
import type { AIProgressReporter } from "@/lib/ai/progress";
import { aiRouter } from "@/lib/ai/router";
import { imageService } from "@/lib/images";
import type { ImageSearchProgressEvent } from "@/lib/images";
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
    onProgress?: AIProgressReporter;
    onAttemptStart?: (
      provider: AIProvider,
      model: string,
      prompt: string,
      attempt: number
    ) => Promise<string | null>;
    onAttemptEnd?: (
      logId: string | null,
      result: {
        response?: string;
        error?: string;
        durationMs: number;
        attempt: number;
        provider: AIProvider;
        model: string;
      }
    ) => Promise<void>;
  }
): Promise<GenerateDemoContentOutput> {
  const prompt = buildDemoContentPrompt(input);
  await options?.onProgress?.({
    stage: "prompt_prepared",
    status: "completed",
    progress: 20,
    message: "Zbudowano prompt na podstawie danych klienta.",
    details: {
      promptCharacters: prompt.length,
      hasCurrentContent: Boolean(input.currentContent),
      requestedProvider: options.preferredProvider ?? "automatyczny fallback",
      requestedModel: options.preferredModel ?? "automatyczny wybór",
    },
  });

  const result = await aiRouter.generate(
    {
      task: "demo_generation",
      preferredProvider: options?.preferredProvider,
      preferredModel: options?.preferredModel,
      messages: [
        { role: "system", content: DEMO_CONTENT_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.55,
      validateResponse: (text) => {
        parseGeneratedDemoContent(text);
      },
    },
    {
      onAttemptStart: async ({ provider, model, prompt: attemptPrompt, attempt }) => {
        await options?.onProgress?.({
          stage: "model_attempt_started",
          status: "running",
          progress: 30,
          message: `Wysłano zapytanie do ${provider}.`,
          details: { provider, model, attempt },
        });
        return options?.onAttemptStart
          ? options.onAttemptStart(provider, model, attemptPrompt, attempt)
          : null;
      },
      onAttemptEnd: async (logId, context, attemptResult) => {
        await options?.onAttemptEnd?.(logId, {
          response: attemptResult.response,
          error: attemptResult.error,
          durationMs: attemptResult.durationMs,
          attempt: context.attempt,
          provider: context.provider,
          model: context.model,
        });
        await options?.onProgress?.(
          attemptResult.error
            ? {
                stage: "model_attempt_failed",
                status: "warning",
                progress: 35,
                message: `${context.provider} nie zakończył próby poprawnie. Router wybierze kolejny model.`,
                details: {
                  provider: context.provider,
                  model: context.model,
                  attempt: context.attempt,
                  durationMs: attemptResult.durationMs,
                  error: attemptResult.error,
                },
              }
            : {
                stage: "content_received",
                status: "completed",
                progress: 62,
                message: `Odebrano odpowiedź z ${context.provider}.`,
                details: {
                  provider: context.provider,
                  model: context.model,
                  attempt: context.attempt,
                  durationMs: attemptResult.durationMs,
                  responseCharacters: attemptResult.response?.length ?? 0,
                },
              }
        );
      },
    }
  );
  const generatedContent = parseGeneratedDemoContent(result.text);
  await options?.onProgress?.({
    stage: "content_validated",
    status: "completed",
    progress: 70,
    message: "JSON przeszedł walidację pełnej struktury strony.",
    details: {
      services: generatedContent.services.length,
      features: generatedContent.features.length,
      galleryBriefs: generatedContent.gallery.items.length,
      testimonials: generatedContent.testimonials.length,
      faqItems: generatedContent.faq.length,
      sections: generatedContent.structure.filter((section) => section.visible).length,
    },
  });
  const content = await imageService.enrichDemoContent({
    content: generatedContent,
    industry: input.industry,
    city: input.city,
    onProgress: async (event) => {
      await reportImageProgress(options?.onProgress, event);
    },
  });

  return {
    content,
    provider: result.provider,
    model: result.model,
    generatedAt: new Date().toISOString(),
  };
}

async function reportImageProgress(
  report: AIProgressReporter | undefined,
  event: ImageSearchProgressEvent
) {
  if (!report) return;
  switch (event.type) {
    case "search_started":
      await report({
        stage: "image_search_started",
        status: "running",
        progress: 76,
        message: "Rozpoczęto wyszukiwanie zdjęć dopasowanych do branży.",
        details: {
          query: event.query,
          providers: event.providers.join(", ") || "brak skonfigurowanych",
          requestedCount: event.requestedCount,
        },
      });
      return;
    case "provider_started":
      await report({
        stage: "image_provider_started",
        status: "running",
        progress: 80,
        message: `Przeszukiwanie biblioteki ${event.provider}.`,
        details: { provider: event.provider },
      });
      return;
    case "provider_completed":
      await report({
        stage: "image_provider_completed",
        status: "completed",
        progress: 84,
        message: `${event.provider} zwrócił ${event.resultCount} wyników.`,
        details: { provider: event.provider, resultCount: event.resultCount },
      });
      return;
    case "provider_failed":
      await report({
        stage: "image_provider_failed",
        status: "warning",
        progress: 84,
        message: `${event.provider} zgłosił błąd. Pozostałe biblioteki nadal pracują.`,
        details: { provider: event.provider, error: event.error },
      });
      return;
    case "search_completed":
      await report({
        stage: "images_selected",
        status: "completed",
        progress: 94,
        message: `Wybrano zdjęcia do ${event.selectedCount} miejsc na stronie.`,
        details: {
          resultCount: event.resultCount,
          selectedCount: event.selectedCount,
          providers: event.providerSummary,
        },
      });
      return;
    case "placeholders_used":
      await report({
        stage: "placeholders_selected",
        status: "warning",
        progress: 94,
        message: "Nie znaleziono zdjęć — zachowano opisowe placeholdery.",
        details: {
          placeholderCount: event.placeholderCount,
          reason: event.reason,
        },
      });
  }
}
