# Browser Test Notes

## Baseline

On 2026-08-14, Playwright opened `https://chatgpt.com/` in Firefox. The page loaded with zero console errors and four provider or browser warnings.

The warnings were an unsupported `longtask` performance entry type, a Google One Tap FedCM migration warning, a WebGL context warning, and Firefox fingerprinting protection output. None of these messages came from Water Counter.

The Playwright Firefox session does not load `about:debugging#/runtime/this-firefox` through normal navigation. The browser returned a 60-second navigation timeout and remained on `about:blank`. The configured Playwright server therefore needs a different extension-loading path before it can test a packaged extension directly.

## Confirmed extension failure

An isolated Chromium profile loaded the released extension on `https://chatgpt.com/`. The content script created the summary host and created one badge when a completed assistant fixture was added.

The popup did not render. Its console showed `TypeError: e.jsxDEV is not a function` in the popup bundle. The focused extension build used the development JSX runtime in a production React bundle.

The fix sets the React plugin to the automatic JSX runtime and sets `esbuild.jsxDev` to `false`. A fresh Chromium profile then rendered the popup with no exception. The remaining console entries are preload warnings from the CRXJS-generated extension HTML.

## Regression results

The corrected bundle passed these Chromium checks:

| Flow | Result |
| --- | --- |
| ChatGPT page | Summary host and one response badge appeared. |
| Gemini page | Summary host and one response badge appeared. |
| Claude page | Summary host and one response badge appeared. |
| Popup | Rendered with no runtime exception. |
| Options | Rendered with no runtime exception. |
| Service worker storage | A counted Gemini fixture appeared in the popup as `0.26 mL` and one counted response. |
| Pause control | Popup changed to `Paused` and kept the stored total. |
| Clear control | Popup changed to `0 µL` and zero counted responses. |

The provider pages were not authenticated. The response checks used DOM fixtures that match each provider profile. The ChatGPT page also showed a provider sign-in console message. That message was not from Water Counter.

## Revision results

The previous zero or partial total was caused by concurrent `chrome.storage.local` read-modify-write operations. Four detected responses could overwrite one another, leaving one stored record. Storage mutations now run through a queue.

The revised Chromium checks counted four ChatGPT fixtures as `0.0013 L`, three Gemini fixtures as `0.00078 L`, and three Claude fixtures as `0.00096 L`. Claude now uses the ChatGPT `0.32 mL` factor as a clearly labeled proxy because no Claude-specific public factor is available.

The total control is now a compact top-right button. Its details are hidden until opened. A screenshot also exposed that fixed positioning must be applied to the host element outside the Shadow DOM; the host now receives inline fixed positioning and sits below provider header actions.

The final Chromium screenshot shows the button at the top-right below ChatGPT’s header actions. It does not create a bottom strip or open a details panel by default. The visible example is `0.0013 L` for four ChatGPT responses.

The web preview also renders the revised liters values and the Claude comparison copy. The generated icon was cleaned to a transparent Water Counter mark and rasterized into the 16, 32, 48, and 128 pixel extension assets plus the preview favicon.
