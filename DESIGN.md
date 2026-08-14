# Water Counter Design

## Visual world

Water Counter uses a quiet utility language. The surface feels like a clear instrument placed on top of a busy chat, not a new dashboard that asks the user to stop working.

## Palette

The main ground is paper-light `#F5FAF8`. Slate ink `#17202B` carries primary text. Mineral blue `#175263` carries measured values and links. Mint `#BFE9E6` marks the water signal. White surfaces and pale borders separate content without heavy chrome.

The palette is restrained. Mint appears where the user needs to notice the estimate. It does not decorate every surface.

## Typography

The interface uses the platform sans stack for fast, familiar reading. Display text uses heavy weight and tight tracking. Measurement values use the same family with stronger weight so the number feels like a tool reading, not a marketing headline.

## Composition

The web preview leads with the product mechanism, then shows it inside a familiar chat composition. The injected surface stays compact. Per-response badges sit beside the response. The chat total is fixed at the top-right of the host page. Popup and options pages use the same palette and control language.

## Materials

Surfaces use 1px mineral borders, soft offset shadows, and modest radii. Shadow is used to separate the Water Counter layer from the host chat. It is not used as a decorative glow.

## Motion

Motion is limited to transform, opacity, and background-color transitions. A badge does not animate while the model streams. The number commits after the response completes. The observation scheduler uses one debounced MutationObserver and one requestAnimationFrame flush.

Reduced motion is supported through `prefers-reduced-motion` and an explicit options control.

## Copy

The copy is direct and friendly. It says “estimated” when the number is not a direct measurement. It explains a missing value instead of inventing one. It does not use guilt, fear, or exaggerated environmental claims.

## Quality boundary

The first implementation is a working extension shell and visual preview. Provider page selectors remain fixture-sensitive and need browser testing against real, logged-in pages before store release.
