import type { CompletedQuery, Provider } from "../calculation/types";

export interface ProviderProfile {
  provider: Provider;
  assistantSelectors: readonly string[];
  userSelectors: readonly string[];
  modelSelectors: readonly string[];
}

export function firstMatch(root: ParentNode, selectors: readonly string[]): Element | null {
  for (const selector of selectors) {
    const match = root.querySelector(selector);
    if (match) {
      return match;
    }
  }

  return null;
}

export function textOf(element: Element | null): string {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

export function approximateTokens(text: string): number {
  if (!text) {
    return 0;
  }

  return Math.max(1, Math.ceil(text.length / 4));
}

export function stableElementId(provider: Provider, element: Element): string {
  const explicitId = element.getAttribute("data-message-id") ?? element.id;
  if (explicitId) {
    return `${provider}-${explicitId}`;
  }

  const text = textOf(element);
  let hash = 2166136261;
  for (const character of `${provider}:${text.length}:${text.slice(0, 48)}:${text.slice(-48)}`) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return `${provider}-${(hash >>> 0).toString(16)}`;
}

export function findPreviousUser(
  assistant: Element,
  userSelectors: readonly string[],
): Element | null {
  const isUser = (candidate: Element): boolean => {
    return userSelectors.some((selector) => candidate.matches(selector) || candidate.querySelector(selector));
  };

  let current: Element | null = assistant;
  for (let depth = 0; current && depth < 6; depth += 1) {
    const parent: Element | null = current.parentElement;
    if (!parent) {
      break;
    }

    const siblings = Array.from(parent.children) as Element[];
    const index = siblings.indexOf(current);
    for (let siblingIndex = index - 1; siblingIndex >= 0; siblingIndex -= 1) {
      const sibling = siblings[siblingIndex];
      if (isUser(sibling)) {
        return sibling;
      }

      const nested = (Array.from(sibling.querySelectorAll("*")) as Element[])
        .reverse()
        .find((candidate) => isUser(candidate));
      if (nested) {
        return nested;
      }
    }

    current = parent;
  }

  return null;
}

export function toCompletedQuery(
  profile: ProviderProfile,
  assistant: Element,
  user: Element | null,
): CompletedQuery {
  const assistantText = textOf(assistant);
  const userText = textOf(user);

  return {
    id: stableElementId(profile.provider, assistant),
    provider: profile.provider,
    modelLabel: textOf(firstMatch(assistant, profile.modelSelectors)) || null,
    visibleInputTokens: approximateTokens(userText),
    estimatedRequestInputTokens: approximateTokens(userText),
    outputTokens: approximateTokens(assistantText),
    tokenMethod: "visible text approximation",
    hiddenContext: "unknown",
  };
}
