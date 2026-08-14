const manifest = {
  manifest_version: 3,
  name: "Water Counter",
  version: "0.1.1",
  description: "See estimated water use in AI chats.",
  permissions: ["storage"],
  host_permissions: [
    "https://chatgpt.com/*",
    "https://gemini.google.com/*",
    "https://claude.ai/*",
  ],
  background: {
    service_worker: "background/service-worker.ts",
    type: "module",
  },
  action: {
    default_title: "Water Counter",
    default_popup: "popup/popup.html",
  },
  options_page: "options/options.html",
  content_scripts: [
    {
      matches: [
        "https://chatgpt.com/*",
        "https://gemini.google.com/*",
        "https://claude.ai/*",
      ],
      js: ["content/content-script.ts"],
      run_at: "document_idle",
    },
  ],
};

export default manifest;
