import type { CompletedQuery, Provider } from "../calculation/types";

export interface ProviderAdapter {
  provider: Provider;
  matchesPage: (location: Location) => boolean;
  detectConversation: () => string | null;
  detectModel: () => string | null;
  findCompletedQueries: () => CompletedQuery[];
}
