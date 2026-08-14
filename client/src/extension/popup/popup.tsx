import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PopupView from "./PopupView";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Popup root is missing");
}

createRoot(root).render(
  <StrictMode>
    <PopupView />
  </StrictMode>,
);
