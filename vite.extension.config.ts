import { crx } from "@crxjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import manifest from "./client/src/extension/manifest";

// Water Counter extension build: only popup, options, content, and background entries.

export default defineConfig({
  plugins: [crx({ manifest }), react({ jsxRuntime: "automatic" }), tailwindcss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  esbuild: {
    jsxDev: false,
  },
  root: path.resolve(import.meta.dirname, "client/src/extension"),
  build: {
    minify: "esbuild",
    outDir: path.resolve(import.meta.dirname, "dist/extension"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(import.meta.dirname, "client/src/extension/popup/popup.html"),
        options: path.resolve(import.meta.dirname, "client/src/extension/options/options.html"),
      },
    },
  },
});
