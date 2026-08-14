# Water Counter Performance Report

## Test date

2026-08-14

## Checks

| Check | Result |
| --- | --- |
| TypeScript | Passed with `pnpm check` |
| Unit tests | 5 tests passed in 2 files |
| Web production build | Passed with `pnpm build` |
| Focused extension build | Passed with `vite.extension.config.ts` |
| Animated layout properties | None found by the static rule check |
| Mutation observers | One observer in the extension |
| Visual review | Desktop and mobile preview captures completed |

## Bundle results

The content script is 11.36 kB before gzip and 4.15 kB after gzip. This is the code that runs on supported chat pages, so keeping it small is the main performance priority.

The popup and options surfaces share a production React runtime of 194.15 kB before gzip and about 60.55 kB after gzip. Their own JavaScript is 5.61 kB and 6.57 kB before gzip. The shared React runtime is used only by the extension control surfaces. It is not loaded by the content script.

## Runtime rules

The extension batches DOM changes with one `MutationObserver`, waits 80 milliseconds, and schedules one scan with `requestAnimationFrame`. It does not update the water number for every streamed token. It commits a message only after a visible completed response is found.

The injected styles animate only `transform`, `opacity`, `background-color`, and the switch thumb transform. Layout properties such as width, height, margin, padding, top, left, border, and box shadow are not animated.

## Detector note

The Impeccable detector ran in degraded regex mode because its optional HTML and CSS parser modules were not available. It found the template's commented Inter font example. That block was removed. No other detector finding was returned for the changed visual files.

## Remaining measurement boundary

This phase measured source, bundle, and layout-motion risks. It did not run a real logged-in ChatGPT, Gemini, or Claude conversation. Provider DOM fixtures and browser automation are the next test layer before release.
