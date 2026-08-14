chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "water-counter.ping") {
    return false;
  }

  sendResponse({
    type: "water-counter.pong",
    tabId: sender.tab?.id ?? null,
  });

  return false;
});
