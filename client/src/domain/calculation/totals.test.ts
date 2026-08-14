import { describe, expect, it } from "vitest";
import { countedMessages, formatWaterMl, totalMilliliters } from "./totals";
import type { QueryRecord } from "../storage/records";

const records: QueryRecord[] = [
  {
    id: "one",
    conversationId: "chat",
    provider: "gemini",
    createdAt: 1,
    modelLabel: null,
    tokenMethod: "fixture",
    estimate: {
      status: "counted",
      waterMl: 0.26,
      rangeMl: null,
      confidence: "provider-reported",
      factorId: "gemini",
      factorVersion: "2025",
      limitation: "Provider average.",
    },
  },
  {
    id: "two",
    conversationId: "chat",
    provider: "claude",
    createdAt: 2,
    modelLabel: null,
    tokenMethod: "fixture",
    estimate: {
      status: "unavailable",
      waterMl: null,
      rangeMl: null,
      confidence: "unavailable",
      factorId: "claude",
      factorVersion: "2026-08",
      limitation: "Unavailable.",
    },
  },
];

describe("chat totals", () => {
  it("sums only counted estimates", () => {
    expect(totalMilliliters(records)).toBe(0.26);
    expect(countedMessages(records)).toBe(1);
  });

  it("formats small values for a compact badge", () => {
    expect(formatWaterMl(0.26)).toBe("0.26 mL");
    expect(formatWaterMl(0.004)).toBe("4 µL");
    expect(formatWaterMl(1200)).toBe("1.2 L");
  });
});
