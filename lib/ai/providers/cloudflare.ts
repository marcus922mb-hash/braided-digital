import { AIProviderError } from "@/lib/ai/router/errors";
import { readJsonResponse } from "@/lib/ai/router/http";
import type {
  AIProviderAdapter,
  AIProviderRequest,
} from "@/lib/ai/router/types";
import {
  assertServerOnly,
  cloudflareMessages,
  requestHeaders,
} from "@/lib/ai/providers/provider-utils";

type CloudflareResponse = {
  success?: boolean;
  result?: {
    response?: string;
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };
  errors?: Array<{ message?: string }>;
};

export const cloudflareProvider: AIProviderAdapter = {
  id: "cloudflare",

  isConfigured() {
    const workerConfigured = Boolean(
      process.env.CLOUDFLARE_WORKERS_AI_URL &&
        process.env.CLOUDFLARE_WORKERS_AI_SECRET
    );
    const restConfigured = Boolean(
      process.env.CLOUDFLARE_ACCOUNT_ID &&
        process.env.CLOUDFLARE_API_TOKEN
    );
    return workerConfigured || restConfigured;
  },

  async generate(request: AIProviderRequest) {
    assertServerOnly();
    const workerUrl = process.env.CLOUDFLARE_WORKERS_AI_URL?.replace(/\/+$/, "");
    const workerSecret = process.env.CLOUDFLARE_WORKERS_AI_SECRET;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    if ((!workerUrl || !workerSecret) && (!accountId || !apiToken)) {
      throw new Error("Brakuje konfiguracji Cloudflare Workers AI.");
    }

    const model = request.model.replace(/^\/+/, "");
    const payload = {
      model: request.model,
      messages: cloudflareMessages(request),
      temperature: request.temperature,
      maxTokens: request.maxTokens,
      responseFormat: request.responseFormat,
    };
    const endpoint = workerUrl && workerSecret
      ? `${workerUrl}/v1/generate`
      : `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId!)}/ai/run/${model}`;
    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: requestHeaders(workerUrl && workerSecret ? workerSecret : apiToken!),
        body: JSON.stringify(
          workerUrl && workerSecret
            ? payload
            : {
                messages: payload.messages,
                temperature: payload.temperature,
                max_tokens: payload.maxTokens,
                ...(payload.responseFormat === "json"
                  ? { response_format: { type: "json_object" } }
                  : {}),
              }
        ),
        signal: request.signal,
      }
    );
    const result = await readJsonResponse<CloudflareResponse>(response);
    const text = result.result?.response?.trim();
    if (!text) {
      throw new AIProviderError(
        result.errors?.[0]?.message || "Cloudflare Workers AI nie zwrócił treści."
      );
    }

    return {
      text,
      usage: {
        inputTokens: result.result?.usage?.prompt_tokens,
        outputTokens: result.result?.usage?.completion_tokens,
      },
    };
  },
};
