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
  const conversationId = detectConversationId(window.location, provider);
  const sentQueryIds = new Set<string>();
  const surface = mountWaterCounterSurface();

  const scan = () => {
    for (const { query, element } of findCompletedQueryNodes(provider)) {
      if (sentQueryIds.has(query.id)) {
        continue;
      }

      sentQueryIds.add(query.id);
      const estimate = estimateQuery(query);
      surface.upsertMessage(element, estimate, query.id);
      void chrome.runtime.sendMessage({
        type: "water-counter.query-completed",
        conversationId,
        query,
        estimate,
      });
    }

    void chrome.runtime.sendMessage(
      {
        type: "water-counter.get-chat-total",
        conversationId,
      },
      (response: { totalMl?: number; messageCount?: number } | undefined) => {
        if (response?.totalMl === undefined || response.messageCount === undefined) {
          return;
        }

        surface.updateTotal(response.totalMl, response.messageCount);
      },
    );
  };

  scan();
  createObservationScheduler(scan).start();
}
