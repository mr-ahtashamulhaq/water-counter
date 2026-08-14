// Measured Waterline: Swiss field-instrument utility, embedded host-chat rhythm,
// calibrated metadata, and quiet transform/opacity motion only.

import { useMemo, useState } from "react";
import { Droplets, Gauge, ShieldCheck } from "lucide-react";
import { formatWaterMl } from "../domain/calculation/totals";
import "./home.css";

type Provider = "ChatGPT" | "Gemini" | "Claude";

const providerDetails: Record<Provider, { model: string; totalMl: number; factor: string }> = {
  ChatGPT: {
    model: "Current conversation",
    totalMl: 1.28,
    factor: "Provider average estimate",
  },
  Gemini: {
    model: "Gemini Apps text chat",
    totalMl: 1.04,
    factor: "Median text prompt estimate",
  },
  Claude: {
    model: "Current conversation",
    totalMl: 0,
    factor: "Estimate unavailable",
  },
};

const messages: Record<Provider, Array<{ user: string; answer: string; estimate: string; note: string }>> = {
  ChatGPT: [
    {
      user: "Explain why long prompts can use more compute.",
      answer: "Long prompts give the model more text to process. Longer responses also add more inference work. The exact water value depends on the provider and the infrastructure behind the model.",
      estimate: "0.32 mL",
      note: "Provider average · not token-scaled",
    },
    {
      user: "How can I keep an AI chat focused?",
      answer: "State the task, add the needed context, and ask for the output format. A focused request can reduce extra turns and make the result easier to review.",
      estimate: "0.32 mL",
      note: "Provider average · source details available",
    },
    {
      user: "Summarize the main idea in one sentence.",
      answer: "A small estimate can make a large system easier to understand without interrupting the work.",
      estimate: "0.32 mL",
      note: "Provider average · inference only",
    },
  ],
  Gemini: [
    {
      user: "What does a data center use water for?",
      answer: "Some data centers use water in cooling systems. The amount depends on the equipment, climate, cooling design, and workload.",
      estimate: "0.26 mL",
      note: "Median text prompt · not token-scaled",
    },
    {
      user: "What is a good way to compare estimates?",
      answer: "Compare the source, measurement boundary, date, and uncertainty before comparing the number.",
      estimate: "0.26 mL",
      note: "Provider average · source details available",
    },
  ],
  Claude: [
    {
      user: "Can you explain this in plain English?",
      answer: "Water Counter keeps the message visible but does not create a number when a current provider factor is not available.",
      estimate: "Unavailable",
      note: "No current provider factor found",
    },
  ],
};

export default function Home() {
  const [provider, setProvider] = useState<Provider>("ChatGPT");
  const [showDetails, setShowDetails] = useState(false);
  const detail = providerDetails[provider];
  const providerMessages = useMemo(() => messages[provider], [provider]);
  const waterlineWidth = detail.totalMl ? Math.min(92, Math.max(18, detail.totalMl * 46)) : 0;

  return (
    <main className="water-preview">
      <div className="preview-shell">
        <nav className="preview-nav" aria-label="Water Counter preview">
          <div className="preview-brand">
            <span className="preview-mark" aria-hidden="true">
              <span className="mark-drop" />
              <span className="mark-line" />
            </span>
            Water Counter
          </div>
          <span className="preview-nav-note">A light layer for the chat you already use</span>
        </nav>

        <section className="preview-intro" aria-labelledby="preview-title">
          <div>
            <h1 id="preview-title">See the small ripple behind every AI chat.</h1>
            <p>
              Water Counter adds a sourced estimate beside each completed response. It keeps the signal small, clear, and out of the way.
            </p>
          </div>
          <div className="intro-aside">
            <strong>Made for normal chat</strong>
            <p>
              No new dashboard. No live number that jumps while the model writes. No claim of exact physical measurement.
            </p>
          </div>
        </section>

        <section className="chat-frame" aria-label="Water Counter chat preview">
          <aside className="chat-sidebar" aria-label="Provider selector">
            <p className="sidebar-label">Try a view</p>
            {(Object.keys(providerDetails) as Provider[]).map((item) => (
              <button
                key={item}
                className={`provider-button${provider === item ? " active" : ""}`}
                type="button"
                aria-pressed={provider === item}
                onClick={() => {
                  setProvider(item);
                  setShowDetails(false);
                }}
              >
                <span className="provider-dot" aria-hidden="true" />
                {item}
              </button>
            ))}
          </aside>

          <div className="chat-main">
            <header className="chat-header">
              <div>
                <p className="chat-kicker">Host chat · estimate layer</p>
                <h2 className="chat-title">A conversation about AI impact</h2>
                <p className="chat-model">{detail.model}</p>
              </div>
              <div className="chat-total" aria-live="polite">
                <span className="chat-total-label">Chat total</span>
                <strong className="chat-total-value">{detail.totalMl ? formatWaterMl(detail.totalMl) : "Unavailable"}</strong>
                <span className="chat-total-meta">{detail.totalMl ? "operational · local" : "no current factor"}</span>
              </div>
            </header>

            <div className="waterline" aria-label="Measured waterline for this conversation">
              <span className="waterline-track" />
              <span className="waterline-fill" style={{ width: `${waterlineWidth}%` }} />
              <span className="waterline-tick" style={{ left: `${waterlineWidth}%` }} />
              <span className="waterline-label">0 mL <span>waterline</span> {detail.totalMl ? formatWaterMl(detail.totalMl) : "—"}</span>
            </div>

            <div className="message-list">
              {providerMessages.map((message, index) => (
                <article className="message" key={`${provider}-${index}`}>
                  <div className="message-user">{message.user}</div>
                  <div className="message-assistant">
                    <p>{message.answer}</p>
                    <div className="estimate-row">
                      <button
                        className="estimate-badge"
                        type="button"
                        aria-expanded={showDetails && index === 0}
                        onClick={() => setShowDetails((current) => !current)}
                      >
                        <span className="estimate-mark" aria-hidden="true">
                          <span>•</span>
                        </span>
                        {message.estimate}
                      </button>
                      <span className="estimate-note">{message.note}</span>
                    </div>
                    {showDetails && index === 0 ? (
                      <div className="source-seam" role="status">
                        <span className="source-seam-label">Source seam</span>
                        <span>{detail.factor}. Water Counter shows operational water estimates only.</span>
                        <code>{detail.totalMl ? "factor v1" : "factor v0"}</code>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="preview-actions">
              <button type="button" onClick={() => setShowDetails((current) => !current)}>
                <Droplets size={14} strokeWidth={2} aria-hidden="true" />
                {showDetails ? "Hide estimate detail" : "See how the estimate works"}
              </button>
            </div>
          </div>
        </section>

        <section className="preview-intro" aria-label="Water Counter principles">
          <div className="intro-aside">
            <strong><Gauge size={15} aria-hidden="true" /> Fast by design</strong>
            The extension batches page changes, waits for completed responses, and keeps motion to small state changes.
          </div>
          <div className="intro-aside">
            <strong><ShieldCheck size={15} aria-hidden="true" /> Local by default</strong>
            The default record stores estimate details, not chat text. Each value keeps its factor version and source limit.
          </div>
        </section>
      </div>
    </main>
  );
}
