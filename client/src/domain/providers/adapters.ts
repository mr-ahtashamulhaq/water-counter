import type { CompletedQuery, Provider } from "../calculation/types";
import { detectProvider } from "./detection";
import {
  findPreviousUser,
  textOf,
  toCompletedQuery,
  type ProviderProfile,
} from "./dom";
import { PROVIDER_PROFILES } from "./profiles";

function profileFor(provider: Provider): ProviderProfile | null {
  if (provider === "unknown") {
    return null;
  }

  return PROVIDER_PROFILES[provider];
}

export function detectConversationId(location: Location, provider: Provider): string {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  return `${provider}:${path}`;
}

export function findCompletedQueries(provider: Provider, root: ParentNode = document): CompletedQuery[] {
  return findCompletedQueryNodes(provider, root).map(({ query }) => query);
}

export function findCompletedQueryNodes(
  provider: Provider,
  root: ParentNode = document,
): Array<{ query: CompletedQuery; element: Element }> {
  const profile = profileFor(provider);
  if (!profile) {
    return [];
  }

  const assistantNodes = profile.assistantSelectors.flatMap((selector) => {
    return Array.from(root.querySelectorAll(selector));
  });
  const uniqueNodes = Array.from(new Set(assistantNodes));

  return uniqueNodes.flatMap((assistant) => {
    if (!textOf(assistant)) {
      return [];
    }

    const user = findPreviousUser(assistant, profile.userSelectors);
    return [{ query: toCompletedQuery(profile, assistant, user), element: assistant }];
  });
}

export function activeProvider(location: Location): Provider {
  return detectProvider(location);
}
