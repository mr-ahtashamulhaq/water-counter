import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OptionsView from "./OptionsView";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Options root is missing");
}

createRoot(root).render(
  <StrictMode>
    <OptionsView />
  </StrictMode>,
);
