import type { QueryRecord } from "../storage/records";

export function totalMilliliters(queries: QueryRecord[]): number {
  return queries.reduce((total, query) => {
    return total + (query.estimate.waterMl ?? 0);
  }, 0);
}

export function countedMessages(queries: QueryRecord[]): number {
  return queries.reduce((count, query) => {
    return count + (query.estimate.status === "counted" ? 1 : 0);
  }, 0);
}

export function formatWaterMl(valueMl: number): string {
  if (valueMl < 0.01) {
    return `${Math.round(valueMl * 1000)} µL`;
  }

  if (valueMl < 1000) {
    return `${Number(valueMl.toFixed(2))} mL`;
  }

  return `${Number((valueMl / 1000).toFixed(2))} L`;
}
