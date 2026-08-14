# Water Counter

Water Counter is a browser extension that shows the estimated water use of AI chats.

The first version supports ChatGPT, Gemini, and Claude text chats. It shows an estimate for each completed AI response. It also shows the total for the current chat.

The extension calculates values in the browser. It does not save chat text by default. It labels each value as an estimate and shows the source and limits of the calculation.

## Project status

This repository contains the project base and the first planning files. Product implementation starts after the product plan is approved.

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

Use the project package manager to install dependencies. Use the type check and build commands before each milestone commit.
