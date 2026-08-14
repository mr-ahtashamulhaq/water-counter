import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../dist/extension/", import.meta.url);
const rootPath = root.pathname;
const manifestPath = join(rootPath, "manifest.json");

if (!existsSync(manifestPath)) {
  throw new Error("The extension build is missing dist/extension/manifest.json");
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
if (manifest.version !== "0.1.4") {
  throw new Error(`Expected extension version 0.1.4, found ${manifest.version}`);
}

for (const requiredFile of ["service-worker-loader.js", "popup/popup.html", "options/options.html"]) {
  if (!existsSync(join(rootPath, requiredFile))) {
    throw new Error(`The extension build is missing ${requiredFile}`);
  }
}

const assetsPath = join(rootPath, "assets");
const popupBundle = readdirSync(assetsPath).find((file) => /^popup-.*\.js$/.test(file));
const optionsBundle = readdirSync(assetsPath).find((file) => /^options-.*\.js$/.test(file));

for (const bundle of [popupBundle, optionsBundle]) {
  if (!bundle) {
    throw new Error("The extension build is missing a popup or options JavaScript bundle");
  }
  const source = readFileSync(join(assetsPath, bundle), "utf8");
  if (source.includes("jsxDEV")) {
    throw new Error(`${bundle} contains jsxDEV and cannot run with the production React runtime`);
  }
}

console.log(`Extension build ${manifest.version} passed verification`);
