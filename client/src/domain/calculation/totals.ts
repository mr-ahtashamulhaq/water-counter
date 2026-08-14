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

export function formatWaterLiters(valueMl: number): string {
  const liters = valueMl / 1000;

  if (liters === 0) {
    return "0 L";
  }

  if (liters < 0.001) {
    return `${liters.toFixed(5)} L`;
  }

  if (liters < 0.01) {
    return `${liters.toFixed(4)} L`;
  }

  return `${Number(liters.toFixed(3))} L`;
}
