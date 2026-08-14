import { WATER_FACTORS, type WaterFactor } from "./factors";
import type { CompletedQuery, Confidence, WaterEstimate } from "./types";

function confidenceForFactor(factor: WaterFactor): Confidence {
  if (factor.kind === "provider-average") {
    return "provider-reported";
  }

  if (factor.kind === "research-estimate") {
    return "research-estimated";
  }

  return "unavailable";
}

export function estimateQuery(query: CompletedQuery): WaterEstimate {
  const factor = WATER_FACTORS[query.provider] ?? WATER_FACTORS.unknown;

  if (factor.valueMl === null) {
    return {
      status: "unavailable",
      waterMl: null,
      rangeMl: null,
      confidence: "unavailable",
      factorId: factor.id,
      factorVersion: factor.version,
      limitation: factor.limitation,
    };
  }

  return {
    status: "counted",
    waterMl: factor.valueMl,
    rangeMl: null,
    confidence: confidenceForFactor(factor),
    factorId: factor.id,
    factorVersion: factor.version,
    limitation: factor.limitation,
  };
}
