import type { ProviderProfile } from "./dom";

export const PROVIDER_PROFILES: Record<Exclude<ProviderProfile["provider"], "unknown">, ProviderProfile> = {
  chatgpt: {
    provider: "chatgpt",
    assistantSelectors: [
      '[data-message-author-role="assistant"]',
      '[data-testid="conversation-turn-assistant"]',
    ],
    userSelectors: [
      '[data-message-author-role="user"]',
      '[data-testid="conversation-turn-user"]',
    ],
    modelSelectors: ["[data-message-model-slug]", "[data-model-selector]"],
  },
  gemini: {
    provider: "gemini",
    assistantSelectors: [
      "message-content",
      ".model-response-text",
      '[data-message-author-role="assistant"]',
    ],
    userSelectors: [
      "user-query",
      ".query-text",
      '[data-message-author-role="user"]',
    ],
    modelSelectors: ["[data-model-name]", "[aria-label*='model' i]"],
  },
  claude: {
    provider: "claude",
    assistantSelectors: [
      '[data-testid="conversation-turn-assistant"]',
      ".font-claude-message",
      '[data-is-streaming="false"]',
    ],
    userSelectors: [
      '[data-testid="conversation-turn-user"]',
      '[data-testid="user-message"]',
    ],
    modelSelectors: ["[data-model-name]", "[aria-label*='model' i]"],
  },
};
