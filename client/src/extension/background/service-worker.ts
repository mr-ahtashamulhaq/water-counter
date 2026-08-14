import { estimateQuery } from "../../domain/calculation/estimate";
import { countedMessages, totalMilliliters } from "../../domain/calculation/totals";
import type { RuntimeMessage } from "../../domain/messaging/contracts";
import { clearAll, clearConversation, readStore, saveQuery, setPaused } from "../../domain/storage/store";

chrome.runtime.onMessage.addListener(
  (message: RuntimeMessage, sender, sendResponse) => {
    if (message.type === "water-counter.ping") {
      sendResponse({
        type: "water-counter.pong",
        tabId: sender.tab?.id ?? null,
      });
      return false;
    }

    if (message.type === "water-counter.query-completed") {
      void saveQuery({
        id: message.query.id,
        conversationId: message.conversationId,
        provider: message.query.provider,
        createdAt: Date.now(),
        modelLabel: message.query.modelLabel,
        tokenMethod: message.query.tokenMethod,
        estimate: message.estimate,
      }).then(() => sendResponse({ type: "water-counter.query-saved" }));
      return true;
    }

    if (message.type === "water-counter.get-chat-total") {
      void readStore().then((store) => {
        const conversation = store.conversations[message.conversationId];
        const queries = conversation?.queries ?? [];
        sendResponse({
          type: "water-counter.chat-total",
          conversationId: message.conversationId,
          totalMl: totalMilliliters(queries),
          messageCount: countedMessages(queries),
        });
      });
      return true;
    }

    if (message.type === "water-counter.clear-conversation") {
      void clearConversation(message.conversationId).then(() => sendResponse({ type: "water-counter.conversation-cleared" }));
      return true;
    }

    if (message.type === "water-counter.pause") {
      void setPaused(message.paused).then(() => sendResponse({ type: "water-counter.pause-saved" }));
      return true;
    }

    if (message.type === "water-counter.clear-all") {
      void clearAll().then(() => sendResponse({ type: "water-counter.cleared" }));
      return true;
    }

    return false;
  },
);
