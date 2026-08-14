# Water Counter

Water Counter is a browser extension that shows the estimated water use of AI chats.

The first version supports ChatGPT, Gemini, and Claude text chats. It shows an estimate for each completed AI response. It also shows the total for the current chat.

The extension calculates values in the browser. It does not save chat text by default. It labels each value as an estimate and shows the source and limits of the calculation.

## Project status

The corrected public release is `v0.1.2`. It supports Chrome unpacked installation from the ZIP file in the GitHub release.

The extension supports ChatGPT, Gemini, and Claude text chats. Provider page selectors can need updates when those sites change their HTML.

## Install in Chrome

1. Download `water-counter-v0.1.2.zip` from the [Releases page](https://github.com/mr-ahtashamulhaq/water-counter/releases).
2. Extract the ZIP file to a folder on your computer.
3. Open `chrome://extensions` in Chrome.
4. Turn on **Developer mode**.
5. Select **Load unpacked**.
6. Select the extracted folder that contains `manifest.json`.
7. Open ChatGPT, Gemini, or Claude in a new tab.

Chrome keeps the extension active until you remove it. Select **Reload** on the extension card after you download a newer release.

> Privacy note: Water Counter calculates values in the browser. It does not save chat text by default. Chrome shows a warning for unpacked extensions because this install method is for local development and direct distribution.

## Planned structure

| Path | Purpose |
| --- | --- |
| `client/` | React and Vite frontend workspace. |
| `client/src/extension/` | Browser extension entry points. |
| `client/src/domain/` | Calculation and provider rules. |
| `docs/` | Product, design, and technical documents. |
| `tests/` | Unit, fixture, and browser tests. |

## Main rules

The product uses sourced factors. It does not claim exact physical water use. It does not send chat data to a remote service by default. It does not add a value when no defensible factor exists.

## Development

Use the project package manager to install dependencies. Run `pnpm check`, `pnpm test`, and `pnpm build:extension` before each milestone commit.
