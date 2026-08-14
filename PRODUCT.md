# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19, Vite, TypeScript, Tailwind CSS, and Manifest V3 with CRXJS.

## Users

Everyday AI users, developers, climate-conscious people, researchers, and students use the extension while they chat with AI.

## Product Purpose

Water Counter shows an estimate of operational water consumption for supported AI chat messages. It makes a hidden resource cost visible without interrupting the chat.

## Positioning

Water Counter is a local browser companion that places a sourced estimate beside the AI response that caused it.

## Operating Context

Users read AI responses on ChatGPT, Gemini, and Claude. They need a quick signal during normal chat work. They do not need a new dashboard before they understand the current message.

## Capabilities and Constraints

The extension supports ChatGPT, Gemini, and Claude text chats. It shows message estimates and a current-chat total. It labels provider-reported, research-estimated, fallback, and unavailable states. It calculates locally by default and does not save chat text by default. It must not block typing, scrolling, selection, or streaming.

The first release uses a Chrome-first Manifest V3 build. Provider pages can change their DOM. Unsupported pages must fail silently. The product does not claim direct measurement of data-center water use.

## Brand Commitments

The product name is Water Counter. The voice is friendly, direct, and clear. The product uses simple language and does not use guilt, fear, or fake precision.

## Evidence on Hand

The project contains versioned research notes for Google Gemini Apps, ChatGPT, Claude, and broader inference methods. The product must show source details and limits. The project has no customer testimonials or invented proof.

## Product Principles

1. Show the small signal at the moment it matters.
2. Make uncertainty visible instead of hiding it.
3. Keep the host chat fast and stable.
4. Keep chat content local by default.
5. Use plain language for technical limits.

## Accessibility & Inclusion

The extension must support keyboard focus, readable contrast, reduced motion, accessible labels, and clear status text. The injected surface must work on light and dark host pages.
