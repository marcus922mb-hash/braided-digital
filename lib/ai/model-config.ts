import type { AIModelConfig, AIProvider } from "@/lib/ai/types";
import {
  getAIRouterRuntimeConfig,
  getProviderModels,
  isProviderConfigured,
} from "@/lib/ai/router";

export const DEFAULT_OPENROUTER_MODEL = "google/gemini-2.0-flash-exp:free";

export function getAIModelConfig(provider: AIProvider): AIModelConfig {
  const apiKeyEnv: Record<AIProvider, string> = {
    openrouter: "OPENROUTER_API_KEY",
    cloudflare: "CLOUDFLARE_API_TOKEN",
    gemini: "GEMINI_API_KEY",
    groq: "GROQ_API_KEY",
    local: "LOCAL_AI_BASE_URL",
  };

  return {
    provider,
    model: getProviderModels(provider)[0],
    apiKeyEnv: apiKeyEnv[provider],
    enabled: isProviderConfigured(provider),
  };
}

export const AI_PROVIDER_FALLBACK_ORDER: AIProvider[] =
  getAIRouterRuntimeConfig().providerOrder;
