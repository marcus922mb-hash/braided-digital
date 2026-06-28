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

export function parseGeneratedDemoContent(rawText: string) {
  try {
    const parsed = JSON.parse(extractJsonObject(rawText));
    return demoContentSchema.parse(parsed);
  } catch (error) {
    if (error instanceof AIJsonParseError) throw error;
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
