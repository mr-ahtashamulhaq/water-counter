# Water Counter

Water Counter is a privacy-first Chrome extension for AI chats.

It shows an estimated water value for each completed response. It also shows the total for the current chat.

Water Counter supports ChatGPT, Gemini, and Claude. The extension works inside the chat page. It does not add a separate dashboard.


## Installation

**Chrome / Edge / Chromium**

1. Download [`claude-counter-0.4.2.zip`](https://github.com/mr-ahtashamulhaq/water-counter/releases/download/v0.1.2/water-counter-v0.1.2.zip)
2. Go to `chrome://extensions` and enable **Developer mode**
3. Drag and drop the zip onto the page


## Features

| Feature | Description |
| --- | --- |
| Response estimates | Shows one estimate beside each completed AI response. |
| Chat total | Shows a small total button in the top-right corner. Details open when you select the button. |
| Liter display | Shows visible water values in liters. |
| Provider support | Supports ChatGPT, Gemini, and Claude text chats. |
| Local calculation | Calculates values in the browser. |
| Local storage | Stores estimate records in Chrome local storage. It does not save chat text by default. |
| Low-motion UI | Uses small state changes. It does not update the estimate while a response is streaming. |
| Extension branding | Includes a Water Counter icon and a preview favicon. |

## Calculation model

Water Counter uses one fixed factor for each supported provider.

The factor applies when the extension finds a completed response. The current model does not scale the value by words, characters, or tokens.

| Provider | Factor | Display value for one response | Factor type |
| --- | ---: | ---: | --- |
| ChatGPT | 0.32 mL | 0.00032 L | Public average query estimate [1] |
| Gemini | 0.26 mL | 0.00026 L | Google production-fleet median text-prompt estimate [2] |
| Claude | 0.32 mL | 0.00032 L | ChatGPT proxy for comparison |

The Claude value is not a Claude measurement. Anthropic does not publish a Claude-specific factor in the sources reviewed for this release.

The calculation is:

```text
response water = provider factor
chat total = sum of counted response factors
```

For example, four ChatGPT responses use this estimate:

```text
4 × 0.32 mL = 1.28 mL = 0.00128 L
```

The extension rounds the displayed value for compact output. These values are estimates. They are not direct measurements from a data center.

There is no reliable word-per-litre value in this release. The public factors are averages or medians. They are not token-scaled measurements.

## Privacy

Water Counter calculates estimates in the browser.

The extension stores estimate records in `chrome.storage.local`. It stores the provider, conversation identifier, estimate, factor version, and time.

The extension does not save chat text by default. It does not need a server for its main calculation.

The extension uses the minimum permission needed for local storage and the three supported chat sites.

## Install in Chrome

Chrome does not install a ZIP file automatically. Use the following steps:

1. Download `water-counter-v0.1.2.zip` from the [v0.1.2 release](https://github.com/mr-ahtashamulhaq/water-counter/releases/tag/v0.1.2).
2. Extract the ZIP file to a permanent folder.
3. Open `chrome://extensions` in Chrome.
4. Turn on **Developer mode**.
5. Select **Load unpacked**.
6. Select the extracted folder that contains `manifest.json`.
7. Open a supported chat site in a new tab.

| Site | URL |
| --- | --- |
| ChatGPT | <https://chatgpt.com/> |
| Gemini | <https://gemini.google.com/> |
| Claude | <https://claude.ai/> |

Pin Water Counter from Chrome's extensions menu if you want quick access to the popup.

## Update the extension

1. Download the newer release ZIP.
2. Extract it to a new folder.
3. Open `chrome://extensions`.
4. Select **Remove** for the old Water Counter entry.
5. Select **Load unpacked**.
6. Select the new folder that contains `manifest.json`.

The unpacked install method does not provide automatic updates. Users must repeat these steps for each new release.

## Development

Install the project dependencies with the project package manager.

Run the main checks:

```bash
pnpm check
pnpm test
pnpm build:extension
pnpm verify:extension
```

The unit test suite covers calculation status, provider factors, totals, and liters formatting.

The Chromium smoke test covers provider-shaped response fixtures, multiple historical responses, badge injection, top-right summary state, and browser console output.

## Project structure

| Path | Purpose |
| --- | --- |
| `client/src/extension/` | Manifest V3 entry points, content script, service worker, popup, options, and injected UI. |
| `client/src/domain/calculation/` | Factors, estimate logic, totals, and unit formatting. |
| `client/src/domain/providers/` | Provider detection, DOM profiles, message pairing, and conversation identity. |
| `client/src/domain/storage/` | Chrome local-storage records and serialized mutations. |
| `docs/` | Product, design, performance, install, and browser test notes. |
| `scripts/` | Build verification, asset preparation, and Chromium test scripts. |

## Known limits

Water Counter depends on page selectors. ChatGPT, Gemini, and Claude can change their HTML. A selector change can stop new estimates until a later release updates the profile.

The current factors are fixed provider averages or medians. They do not measure prompt length, response length, model selection, or token count.

The Claude value uses the ChatGPT factor as a comparison proxy. It is not a Claude-specific measurement.

Browser fixtures were tested in Chromium. Authenticated live conversations still need testing in a user's Chrome profile.

## References

[1]: <https://blog.samaltman.com/the-gentle-singularity> "The Gentle Singularity, Sam Altman"

[2]: <https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference> "Measuring the environmental impact of AI inference, Google Cloud"
