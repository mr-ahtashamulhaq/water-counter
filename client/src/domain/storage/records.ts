import type { Provider, WaterEstimate } from "../calculation/types";

export interface QueryRecord {
  id: string;
  conversationId: string;
  provider: Provider;
  createdAt: number;
  modelLabel: string | null;
  tokenMethod: string;
  estimate: WaterEstimate;
}

export interface ConversationRecord {
  conversationId: string;
  provider: Provider;
  updatedAt: number;
  queries: QueryRecord[];
}

export interface WaterCounterStore {
  version: 1;
  paused: boolean;
  conversations: Record<string, ConversationRecord>;
}

export const EMPTY_STORE: WaterCounterStore = {
  version: 1,
  paused: false,
  conversations: {},
};
