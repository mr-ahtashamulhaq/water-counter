import type { Provider } from "../calculation/types";

const PROVIDER_HOSTS: ReadonlyArray<readonly [string, Provider]> = [
  ["chatgpt.com", "chatgpt"],
  ["chat.openai.com", "chatgpt"],
  ["gemini.google.com", "gemini"],
  ["claude.ai", "claude"],
];

export function detectProvider(location: Location): Provider {
  const hostname = location.hostname.toLowerCase();
  const match = PROVIDER_HOSTS.find(([host]) => hostname === host || hostname.endsWith(`.${host}`));
  return match?.[1] ?? "unknown";
}
