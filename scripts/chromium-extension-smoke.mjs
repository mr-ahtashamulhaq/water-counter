import http from "node:http";
import { writeFileSync } from "node:fs";

const endpoint = `http://127.0.0.1:${process.env.CDP_PORT ?? "9222"}/json/list`;

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      let body = "";
      response.on("data", (chunk) => (body += chunk));
      response.on("end", () => resolve(JSON.parse(body)));
    }).on("error", reject);
  });
}

function send(socket, method, params = {}) {
  const id = ++send.nextId;
  return new Promise((resolve) => {
    const listener = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      socket.removeEventListener("message", listener);
      resolve(message);
    };
    socket.addEventListener("message", listener);
    socket.send(JSON.stringify({ id, method, params }));
  });
}
send.nextId = 0;

const targets = await getJson(endpoint);
const target = targets.find((item) => item.id === process.env.TARGET_ID) ?? targets.find((item) => item.type === "page" && item.url !== "about:blank") ?? targets.find((item) => item.type === "page");
if (!target) throw new Error("No Chromium page target found");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

const consoleEvents = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Log.entryAdded") {
    consoleEvents.push({ type: message.params.entry.level, text: message.params.entry.text, url: message.params.entry.url });
  }
  if (message.method === "Runtime.exceptionThrown") {
    const details = message.params.exceptionDetails;
    consoleEvents.push({
      type: "exception",
      text: details.text,
      description: details.exception?.description,
      stack: details.exception?.details,
      url: details.url,
      line: details.lineNumber,
      column: details.columnNumber,
    });
  }
});

await send(socket, "Runtime.enable");
await send(socket, "Log.enable");
await send(socket, "Page.enable");
if (!target.url.startsWith("chrome-extension://")) {
  await send(socket, "Page.navigate", { url: process.argv[2] ?? "https://chatgpt.com/" });
  await new Promise((resolve) => setTimeout(resolve, 10000));
} else {
  await new Promise((resolve) => setTimeout(resolve, 1500));
}
await send(socket, "Page.bringToFront");

if (process.argv.includes("--pause") || process.argv.includes("--clear")) {
  const selector = process.argv.includes("--clear") ? "button.danger" : "[role=\"switch\"]";
  await send(socket, "Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(selector)})?.click()`,
    returnByValue: true,
  });
  await new Promise((resolve) => setTimeout(resolve, 500));
}

if (process.argv.includes("--fixture")) {
  const fixtureProvider = process.argv.find((argument) => argument.startsWith("--provider="))?.split("=")[1] ?? "chatgpt";
  const fixtureCount = Number(process.argv.find((argument) => argument.startsWith("--count="))?.split("=")[1] ?? "1");
  const fixtureSelectors = {
    chatgpt: ["data-message-author-role", "data-message-author-role", "user", "assistant"],
    gemini: ["data-message-author-role", "data-message-author-role", "user", "assistant"],
    claude: ["data-testid", "data-testid", "conversation-turn-user", "conversation-turn-assistant"],
  }[fixtureProvider] ?? ["data-message-author-role", "data-message-author-role", "user", "assistant"];
  await send(socket, "Runtime.evaluate", {
    expression: `(() => {
      const turns = [];
      for (let index = 0; index < ${Math.max(1, Math.min(fixtureCount, 10))}; index += 1) {
        const user = document.createElement('div');
        user.setAttribute('${fixtureSelectors[0]}', '${fixtureSelectors[2]}');
        user.textContent = 'Explain water use in AI data centers, example ' + (index + 1) + '.';
        const assistant = document.createElement('div');
        assistant.setAttribute('${fixtureSelectors[1]}', '${fixtureSelectors[3]}');
        assistant.textContent = 'Cooling systems can use water. The exact amount depends on the provider and site. Example ' + (index + 1) + '.';
        turns.push(user, assistant);
      }
      document.body.append(...turns);
      return true;
    })()`,
    returnByValue: true,
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

if (process.env.SCREENSHOT_PATH) {
  const screenshot = await send(socket, "Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(process.env.SCREENSHOT_PATH, Buffer.from(screenshot.result.data, "base64"));
}

const evaluation = await send(socket, "Runtime.evaluate", {
  expression: `({
    url: location.href,
    title: document.title,
    visibilityState: document.visibilityState,
    hidden: document.hidden,
    summaryHost: Boolean(document.querySelector('#water-counter-summary-host')),
    summaryTotal: document.querySelector('#water-counter-summary-host')?.dataset.waterCounterTotal ?? null,
    summaryCount: document.querySelector('#water-counter-summary-host')?.dataset.waterCounterCount ?? null,
    summaryShadowText: document.querySelector('#water-counter-summary-host')?.shadowRoot?.textContent ?? null,
    assistantCount: document.querySelectorAll('[data-message-author-role="assistant"], [data-testid="conversation-turn-assistant"]').length,
    badgeHostCount: document.querySelectorAll('[data-water-counter-id]').length,
    bodyText: document.body?.innerText?.slice(0, 500) ?? ''
  })`,
  returnByValue: true,
});

console.log(JSON.stringify(evaluation.result?.result?.value ?? evaluation, null, 2));
console.log(JSON.stringify({ consoleEvents }, null, 2));
socket.close();
