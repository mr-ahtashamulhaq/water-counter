// Water Counter UI direction: a quiet measurement layer that joins the host chat,
// uses a mineral blue signal, keeps detail one click away, and avoids layout-heavy motion.

import { WATER_FACTORS } from "../../domain/calculation/factors";
import { formatWaterMl } from "../../domain/calculation/totals";
import type { WaterEstimate } from "../../domain/calculation/types";
import { WATER_COUNTER_STYLES } from "./styles";

export interface WaterCounterSurface {
  upsertMessage: (messageElement: Element, estimate: WaterEstimate, queryId: string) => void;
  updateTotal: (totalMl: number, messageCount: number) => void;
}

function addStyle(root: ShadowRoot): void {
  const style = document.createElement("style");
  style.textContent = WATER_COUNTER_STYLES;
  root.append(style);
}

function sourceForEstimate(estimate: WaterEstimate): string {
  const factor = Object.values(WATER_FACTORS).find((candidate) => candidate.id === estimate.factorId);
  return factor?.product ?? "Source details unavailable";
}

function createMessageBadge(estimate: WaterEstimate): HTMLElement {
  const wrapper = document.createElement("span");
  const root = wrapper.attachShadow({ mode: "closed" });
  addStyle(root);

  const button = document.createElement("button");
  button.className = "badge";
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Show water estimate details");

  const drop = document.createElement("span");
  drop.className = "drop";
  drop.setAttribute("aria-hidden", "true");
  const dropMark = document.createElement("span");
  dropMark.textContent = "•";
  drop.append(dropMark);

  const value = document.createElement("span");
  value.className = "value";
  value.textContent = estimate.waterMl === null ? "Unavailable" : formatWaterMl(estimate.waterMl);

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = estimate.waterMl === null ? "water" : "estimated water";

  button.append(drop, value, label);

  const detail = document.createElement("div");
  detail.className = "detail";
  detail.hidden = true;
  detail.setAttribute("role", "status");

  const title = document.createElement("p");
  title.className = "detail-title";
  title.textContent = estimate.waterMl === null ? "Estimate unavailable" : "Estimated operational water";

  const copy = document.createElement("p");
  copy.className = "detail-copy";
  copy.textContent = `${estimate.limitation} Source: ${sourceForEstimate(estimate)}.`;

  detail.append(title, copy);
  root.append(button, detail);

  button.addEventListener("click", () => {
    detail.hidden = !detail.hidden;
    button.setAttribute("aria-expanded", String(!detail.hidden));
  });

  return wrapper;
}

function createSummary(): { host: HTMLElement; value: HTMLElement; meta: HTMLElement } {
  const host = document.createElement("div");
  host.className = "summary-host";
  host.id = "water-counter-summary-host";

  const root = host.attachShadow({ mode: "closed" });
  addStyle(root);

  const summary = document.createElement("section");
  summary.className = "summary";
  summary.setAttribute("aria-label", "Water Counter chat total");

  const line = document.createElement("div");
  line.className = "summary-line";

  const label = document.createElement("span");
  label.className = "summary-label";
  label.textContent = "Chat total";

  const value = document.createElement("strong");
  value.className = "summary-value";
  value.textContent = "0 mL";

  line.append(label, value);

  const meta = document.createElement("span");
  meta.className = "summary-meta";
  meta.textContent = "No counted responses yet";

  summary.append(line, meta);
  root.append(summary);
  return { host, value, meta };
}

export function mountWaterCounterSurface(): WaterCounterSurface {
  const summary = createSummary();
  document.documentElement.append(summary.host);

  return {
    upsertMessage: (messageElement, estimate, queryId) => {
      const existing = messageElement.querySelector<HTMLElement>(`[data-water-counter-id="${queryId}"]`);
      if (existing) {
        return;
      }

      const badge = createMessageBadge(estimate);
      badge.dataset.waterCounterId = queryId;
      messageElement.append(badge);
    },
    updateTotal: (totalMl, messageCount) => {
      summary.value.textContent = formatWaterMl(totalMl);
      summary.meta.textContent = messageCount === 0 ? "No counted responses yet" : `${messageCount} counted response${messageCount === 1 ? "" : "s"}`;
    },
  };
}
