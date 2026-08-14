import type { CompletedQuery, WaterEstimate } from "../calculation/types";

export type RuntimeMessage =
  | {
      type: "water-counter.ping";
    }
  | {
      type: "water-counter.query-completed";
      query: CompletedQuery;
      estimate: WaterEstimate;
    }
  | {
      type: "water-counter.get-chat-total";
      conversationId: string;
    }
  | {
      type: "water-counter.pause";
      paused: boolean;
    };

export interface ChatTotalResponse {
  conversationId: string;
  totalMl: number;
  messageCount: number;
}
