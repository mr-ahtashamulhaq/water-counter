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
    }

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
          conversationId,
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
          conversationId,
        },
        (response: { totalMl?: number; messageCount?: number } | undefined) => {
          if (response?.totalMl !== undefined && response.messageCount !== undefined) {
            surface.updateTotal(response.totalMl, response.messageCount);
          }
          resolve();
        },
      );
      });
  };

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
  createObservationScheduler(scan).start();
}
