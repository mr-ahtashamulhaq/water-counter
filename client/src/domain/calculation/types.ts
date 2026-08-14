// Water Counter domain types.
// Keep these types free of browser and UI dependencies.

export type Provider = "chatgpt" | "gemini" | "claude" | "unknown";

export type EstimateStatus = "counted" | "unavailable" | "streaming";

export type Confidence =
  | "provider-reported"
  | "research-estimated"
  | "fallback-estimate"
  | "unavailable";

export interface WaterRange {
  low: number;
  high: number;
}

export interface WaterEstimate {
  status: EstimateStatus;
  waterMl: number | null;
  rangeMl: WaterRange | null;
  confidence: Confidence;
  factorId: string | null;
  factorVersion: string | null;
  limitation: string;
}

export interface CompletedQuery {
  id: string;
  provider: Provider;
  modelLabel: string | null;
  visibleInputTokens: number | null;
  estimatedRequestInputTokens: number | null;
  outputTokens: number | null;
  tokenMethod: string;
  hiddenContext: "known" | "unknown" | "not-applicable";
}
