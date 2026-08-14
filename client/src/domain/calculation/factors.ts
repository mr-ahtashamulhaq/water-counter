import type { Provider } from "./types";

export type FactorKind = "provider-average" | "research-estimate" | "unavailable";

export interface WaterFactor {
  id: string;
  version: string;
  provider: Provider;
  product: string;
  kind: FactorKind;
  valueMl: number | null;
  sourceDate: string;
  scope: string;
  method: string;
  sourceUrl: string | null;
  limitation: string;
}

export const WATER_FACTORS: Record<Provider, WaterFactor> = {
  chatgpt: {
    id: "openai-chatgpt-average-query",
    version: "2025-06",
    provider: "chatgpt",
    product: "ChatGPT average query",
    kind: "provider-average",
    valueMl: 0.32,
    sourceDate: "2025-06",
    scope: "Provider-reported operational water estimate",
    method: "Public average query estimate",
    sourceUrl: "https://blog.samaltman.com/the-gentle-singularity",
    limitation: "Provider average. Not token-scaled. Method and model details are not published.",
  },
  gemini: {
    id: "google-gemini-apps-median-text-prompt",
    version: "2025",
    provider: "gemini",
    product: "Gemini Apps median text prompt",
    kind: "provider-average",
    valueMl: 0.26,
    sourceDate: "2025",
    scope: "Google production-fleet operational water estimate",
    method: "Median text prompt estimate from provider instrumentation",
    sourceUrl: "https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference",
    limitation: "Median prompt value. Not token-scaled. It does not cover every Gemini model or response length.",
  },
  claude: {
    id: "anthropic-claude-chatgpt-proxy",
    version: "2026-08",
    provider: "claude",
    product: "Claude web chat",
    kind: "research-estimate",
    valueMl: 0.32,
    sourceDate: "2026-08",
    scope: "ChatGPT proxy used for cross-provider comparison",
    method: "Uses the ChatGPT public average query estimate because no Claude-specific factor is published",
    sourceUrl: "https://blog.samaltman.com/the-gentle-singularity",
    limitation: "Claude-specific water data is not published. This uses the ChatGPT 0.32 mL proxy for comparison and is not a Claude measurement.",
  },
  unknown: {
    id: "unknown-provider-water-unavailable",
    version: "2026-08",
    provider: "unknown",
    product: "Unknown provider",
    kind: "unavailable",
    valueMl: null,
    sourceDate: "2026-08",
    scope: "No supported provider match",
    method: "No applicable factor",
    sourceUrl: null,
    limitation: "The provider or message class is not supported.",
  },
};
