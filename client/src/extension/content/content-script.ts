import { estimateQuery } from "../../domain/calculation/estimate";
import {
  activeProvider,
  detectConversationId,
  findCompletedQueryNodes,
} from "../../domain/providers/adapters";
import { createObservationScheduler } from "./observer";
import { mountWaterCounterSurface } from "../ui/surface";

const provider = activeProvider(window.location);

if (provider !== "unknown") {
  let conversationId = detectConversationId(window.location, provider);
  const sentQueryIds = new Set<string>();
  const surface = mountWaterCounterSurface();
  let scanPromise: Promise<void> | null = null;
  let scanRequested = false;

  const runScan = async (): Promise<void> => {
    const nextConversationId = detectConversationId(window.location, provider);
    if (nextConversationId !== conversationId) {
      conversationId = nextConversationId;
      sentQueryIds.clear();
      surface.updateTotal(0, 0);
    }

    const scanConversationId = conversationId;

    const pendingWrites = [];
    for (const { query, element } of findCompletedQueryNodes(provider)) {
      if (sentQueryIds.has(query.id)) {
        continue;
      }

      sentQueryIds.add(query.id);
      const estimate = estimateQuery(query);
      surface.upsertMessage(element, estimate, query.id);
      pendingWrites.push(
        chrome.runtime.sendMessage({
          type: "water-counter.query-completed",
          conversationId: scanConversationId,
          query,
          estimate,
        }),
      );
    }

    await Promise.all(pendingWrites);

    await new Promise<void>((resolve) => {
      chrome.runtime.sendMessage(
        {
          type: "water-counter.get-chat-total",
          conversationId: scanConversationId,
        },
        (response: { totalMl?: number; messageCount?: number } | undefined) => {
          if (
            conversationId === scanConversationId &&
            response?.totalMl !== undefined &&
            response.messageCount !== undefined
          ) {
            surface.updateTotal(response.totalMl, response.messageCount);
          }
          resolve();
        },
      );
      });
  };

  const handleRouteChange = () => {
    const nextConversationId = detectConversationId(window.location, provider);
    if (nextConversationId === conversationId) {
      return;
    }

    conversationId = nextConversationId;
    sentQueryIds.clear();
    surface.updateTotal(0, 0);
    scan();
  };

  const originalPushState = history.pushState.bind(history);
  history.pushState = ((state: unknown, title: string, url?: string | URL | null) => {
    const result = originalPushState(state, title, url);
    handleRouteChange();
    return result;
  }) as typeof history.pushState;

  const originalReplaceState = history.replaceState.bind(history);
  history.replaceState = ((state: unknown, title: string, url?: string | URL | null) => {
    const result = originalReplaceState(state, title, url);
    handleRouteChange();
    return result;
  }) as typeof history.replaceState;

  const scan = () => {
    if (scanPromise) {
      scanRequested = true;
      return;
    }

    scanPromise = runScan().finally(() => {
      scanPromise = null;
      if (scanRequested) {
        scanRequested = false;
        scan();
      }
    });
  };

  scan();
  window.addEventListener("popstate", handleRouteChange);
  window.addEventListener("hashchange", handleRouteChange);
  window.setInterval(handleRouteChange, 500);
  createObservationScheduler(scan).start();
}
