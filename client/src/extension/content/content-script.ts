const supportedHosts = new Set([
  "chatgpt.com",
  "gemini.google.com",
  "claude.ai",
]);

const isSupportedHost = supportedHosts.has(window.location.hostname);

if (isSupportedHost) {
  void chrome.runtime.sendMessage({ type: "water-counter.ping" });
}
