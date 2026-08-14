import { describe, expect, it } from "vitest";
import { estimateQuery } from "./estimate";
import type { CompletedQuery } from "./types";

const query = (provider: CompletedQuery["provider"]): CompletedQuery => ({
  id: "query-1",
  provider,
  modelLabel: null,
  visibleInputTokens: 10,
  estimatedRequestInputTokens: 10,
  outputTokens: 20,
  tokenMethod: "fixture",
  hiddenContext: "unknown",
});

describe("estimateQuery", () => {
  it("uses the Gemini provider average without token scaling", () => {
    const estimate = estimateQuery(query("gemini"));

    expect(estimate.status).toBe("counted");
    expect(estimate.waterMl).toBe(0.26);
    expect(estimate.confidence).toBe("provider-reported");
    expect(estimate.limitation).toContain("Not token-scaled");
  });

  it("uses the ChatGPT provider average without token scaling", () => {
    const estimate = estimateQuery(query("chatgpt"));

    expect(estimate.waterMl).toBe(0.32);
    expect(estimate.confidence).toBe("provider-reported");
  });

  it("does not reuse another provider factor for Claude", () => {
    const estimate = estimateQuery(query("claude"));

    expect(estimate.status).toBe("unavailable");
    expect(estimate.waterMl).toBeNull();
    expect(estimate.confidence).toBe("unavailable");
  });
});
