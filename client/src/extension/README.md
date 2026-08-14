# Extension Layer

This folder contains the browser extension entry points.

The content script reads the supported chat page and adds the Water Counter view. The background service worker stores local records and passes messages between extension parts. The popup and options pages hold user controls.

The extension does not send chat text to a remote service by default.
