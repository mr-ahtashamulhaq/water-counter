# Browser Extension Platform Notes

## Sources checked

- Chrome for Developers, Content scripts: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
- Chrome for Developers, Extension service worker basics: https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics

## Findings

Content scripts run in the context of matching web pages. They can read and change the page DOM and communicate with the rest of the extension. They run in an isolated world, which reduces conflicts with the page's JavaScript environment.

Manifest V3 uses an extension service worker registered in the manifest. The service worker can use ES module imports when the manifest declares the module type. The service worker is packaged with the extension because remote code is not supported.

## Architecture consequence

Use a content script for provider detection, DOM observation, response completion detection, and host-page UI injection. Use a background service worker only for extension-wide coordination, settings, source-registry updates, and export orchestration. Keep calculations local and persist records through the extension storage layer.

Chrome message passing supports one-time JSON-serializable messages and long-lived connections between content scripts, service workers, and extension pages. The plan uses small one-time messages for completed-response records and settings requests. The content script owns page observation. The service worker owns extension-wide coordination and must handle its own lifecycle.

The Chrome storage API is available to content scripts and service workers. `storage.local` is the correct default for private history because it stays local to the browser and does not sync to another device. `storage.sync` is limited and can expose settings across browsers, so it is reserved for non-sensitive preferences only if the user explicitly enables sync. The extension must use asynchronous bulk reads and writes and keep stored records compact.
