import http from "node:http";

const port = process.env.CDP_PORT ?? "9222";

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

const targets = await getJson(`http://127.0.0.1:${port}/json/list`);
const target = targets.find((item) => item.type === "service_worker");
if (!target) throw new Error("No extension service worker target found");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

const result = await send(socket, "Runtime.evaluate", {
  expression: "chrome.storage.local.get('water-counter.store')",
  awaitPromise: true,
  returnByValue: true,
});

console.log(JSON.stringify(result.result?.result?.value ?? result, null, 2));
socket.close();
