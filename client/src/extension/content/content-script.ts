import { estimateQuery } from "../../domain/calculation/estimate";
import {
  activeProvider,
  detectConversationId,
  findCompletedQueries,
} from "../../domain/providers/adapters";
import { createObservationScheduler } from "./observer";

const provider = activeProvider(window.location);

if (provider !== "unknown") {
  const conversationId = detectConversationId(window.location, provider);
  const sentQueryIds = new Set<string>();

  const scan = () => {
    for (const query of findCompletedQueries(provider)) {
      if (sentQueryIds.has(query.id)) {
        continue;
      }

      sentQueryIds.add(query.id);
      void chrome.runtime.sendMessage({
        type: "water-counter.query-completed",
        conversationId,
        query,
        estimate: estimateQuery(query),
      });
    }
  };

  scan();
  createObservationScheduler(scan).start();
}
