# Install Water Counter in Chrome

## Download the release

Open the [Water Counter releases page](https://github.com/mr-ahtashamulhaq/water-counter/releases). Download the latest file named `water-counter-v0.1.0.zip`.

## Install the extension

1. Extract the ZIP file.
2. Keep the extracted folder in a fixed location.
3. Open `chrome://extensions` in Google Chrome.
4. Turn on **Developer mode**.
5. Select **Load unpacked**.
6. Select the extracted folder.

Select the folder that contains `manifest.json`. Do not select the ZIP file. Do not select a parent folder that contains the extracted folder.

## Use the extension

Open one of these sites in a new tab:

| Site | URL |
| --- | --- |
| ChatGPT | `https://chatgpt.com/` |
| Gemini | `https://gemini.google.com/` |
| Claude | `https://claude.ai/` |

Water Counter shows an estimate beside each completed response. It also shows the total for the current chat. Claude can show **Unavailable** when no current provider factor exists.

## Update the extension

1. Download the newer release ZIP.
2. Extract the new ZIP to a new folder.
3. Open `chrome://extensions`.
4. Select **Remove** for the old Water Counter entry.
5. Select **Load unpacked**.
6. Select the new extracted folder.

## Remove the extension

Open `chrome://extensions`. Find Water Counter. Select **Remove**.

## Privacy

Water Counter performs its estimate calculation in the browser. It stores estimate records in Chrome local storage. It does not save chat text by default. The extension does not need a server for its main calculation.

## Known limits

The extension uses page selectors for each provider. A provider can change its page structure. When this happens, Water Counter can stop showing new estimates until a later release updates the selector.
