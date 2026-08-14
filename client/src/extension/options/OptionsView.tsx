import { useEffect, useState } from "react";
import { clearAll, readStore, setPaused } from "../../domain/storage/store";
import "./options.css";

interface OptionsState {
  paused: boolean;
  reducedMotion: boolean;
}

export default function OptionsView() {
  const [state, setState] = useState<OptionsState>({ paused: false, reducedMotion: false });
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    void readStore().then((store) => {
      if (active) {
        setState((current) => ({ ...current, paused: store.paused }));
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const togglePaused = () => {
    const paused = !state.paused;
    setState((current) => ({ ...current, paused }));
    void setPaused(paused);
    setMessage(paused ? "Counting is paused." : "Counting is active.");
  };

  const toggleReducedMotion = () => {
    const reducedMotion = !state.reducedMotion;
    setState((current) => ({ ...current, reducedMotion }));
    document.documentElement.dataset.reducedMotion = String(reducedMotion);
    setMessage(reducedMotion ? "Reduced motion is on." : "Reduced motion follows your system setting.");
  };

  const eraseData = () => {
    void clearAll();
    setMessage("Local Water Counter data was erased.");
  };

  return (
    <main className="options" aria-labelledby="water-counter-options-title">
      <header className="options-head">
        <span className="options-mark" aria-hidden="true">
          <span>•</span>
        </span>
        <h1 id="water-counter-options-title">Water Counter options</h1>
        <p className="lede">
          Keep the estimate visible, quiet, and local while you use supported AI chats.
        </p>
      </header>

      <section className="settings-list" aria-label="Tracking and display settings">
        <div className="setting">
          <div>
            <h2 className="setting-title">Count new responses</h2>
            <p className="setting-copy">Pause the estimate without removing your local history.</p>
          </div>
          <button
            className={`switch${state.paused ? "" : " on"}`}
            type="button"
            role="switch"
            aria-checked={!state.paused}
            aria-label={state.paused ? "Resume counting" : "Pause counting"}
            onClick={togglePaused}
          />
        </div>

        <div className="setting">
          <div>
            <h2 className="setting-title">Use reduced motion</h2>
            <p className="setting-copy">Remove the small state transitions in the Water Counter surfaces.</p>
          </div>
          <button
            className={`switch${state.reducedMotion ? " on" : ""}`}
            type="button"
            role="switch"
            aria-checked={state.reducedMotion}
            aria-label={state.reducedMotion ? "Turn off reduced motion" : "Use reduced motion"}
            onClick={toggleReducedMotion}
          />
        </div>
      </section>

      <section className="source-block" aria-labelledby="source-title">
        <h2 id="source-title">About the estimate</h2>
        <p>
          Water Counter uses versioned sources. It does not claim a direct data-center measurement. An unavailable value is better than a made-up number.
        </p>
        <a
          className="source-link"
          href="https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference"
          target="_blank"
          rel="noreferrer"
        >
          Read the source method
        </a>
      </section>

      <button className="danger-button" type="button" onClick={eraseData}>
        Erase all local data
      </button>
      {message ? <p role="status">{message}</p> : null}
    </main>
  );
}
