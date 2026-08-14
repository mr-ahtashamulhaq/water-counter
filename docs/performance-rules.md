# Water Counter Performance Rules

## Product budget

Water Counter must not slow the host chat. The extension must not block typing, scrolling, selection, or streaming. It must commit one estimate after a response completes. It must not recalculate the full chat for every streamed token.

| Area | Rule |
| --- | --- |
| Animation | Animate only `transform` and `opacity` by default. Use no layout animation. |
| Motion | Use short, purposeful transitions. Use no heavy scroll motion, parallax, or continuous decorative animation. |
| Observation | Use one debounced `MutationObserver` scheduler per content script. Batch work with `requestAnimationFrame` when a visual update is needed. |
| React updates | Keep state local. Memoize stable view parts. Do not use React state for continuous pointer or scroll values. |
| Calculation | Calculate once after response completion. Do not parse or serialize large chat content during motion. |
| DOM work | Read layout in one step. Write DOM changes in a separate step. Avoid repeated layout reads after writes. |
| Storage | Batch small local writes after accounting. Do not write on every streamed mutation. |
| Effects | Do not use `will-change` permanently. Add it only shortly before a known transition, then remove it. |
| Reduced motion | Render the final state without non-essential movement when `prefers-reduced-motion: reduce` is active. |
| Measurement | Use Chrome Performance and Rendering tools, React Profiler in development, and repeatable long-chat fixtures. |

## Acceptance budget

The first build uses these targets. A failed target creates a fix task before visual polish continues.

| Measure | Target |
| --- | --- |
| Completed-response estimate | Visible within 1 second in at least 95% of normal fixture cases. |
| Streaming updates | Zero numeric water updates before completion. |
| Duplicate records | Zero duplicates in a 500-response fixture. |
| React commit time | The injected summary and badge updates stay below 8 ms in normal fixture tests. |
| Frame behavior | No visible typing or scrolling jitter during a 500-response fixture. |
| Motion | No animation longer than 240 ms for routine UI feedback. |
| Production profiling | React Profiler code stays out of the default production build. |

## Implementation rules

Use CSS transitions for simple state changes. Use `requestAnimationFrame` for scheduled visual work. Use `IntersectionObserver` only for surfaces that are outside the first view. Do not add Lenis, GSAP, Three.js, Rive, or another motion library to the extension shell. The product has no need for scroll hijacking, 3D, or continuous timelines.

Use a single content-script observation scheduler. It collects mutation records, removes duplicate targets, and schedules one read and one write pass. The scheduler pauses when the tab is hidden. Provider adapters must expose only normalized completed-query events to the calculation layer.

Use a development-only React Profiler around the injected UI during performance work. React documents that the Profiler measures render duration, but it adds overhead and is disabled in production by default.[3] Keep it out of the release build.

## Measurement sources

web.dev recommends `transform` for movement, `scale` for size changes, and `opacity` for visibility changes. It warns that other properties can trigger layout or paint work.[1] It also recommends Chrome DevTools Performance and the Rendering FPS meter for measurement.[1]

The browser can schedule visual work with `requestAnimationFrame`, which matches the display refresh cycle.[2] This does not make heavy work fast. The callback must stay small and must not parse large content or run full-chat calculations.

## References

1. [web.dev, How to create high-performance CSS animations](https://web.dev/articles/animations-guide)
2. [MDN, Window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
3. [React, Profiler](https://react.dev/reference/react/Profiler)
