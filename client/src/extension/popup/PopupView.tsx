import { useEffect, useState } from "react";
import { countedMessages, formatWaterLiters, totalMilliliters } from "../../domain/calculation/totals";
import { clearAll, readStore, setPaused } from "../../domain/storage/store";
import "./popup.css";

interface PopupState {
  paused: boolean;
  totalMl: number;
  messageCount: number;
}

const EMPTY_STATE: PopupState = {
  paused: false,
  totalMl: 0,
  messageCount: 0,
};

export default function PopupView() {
  const [state, setState] = useState<PopupState>(EMPTY_STATE);

  useEffect(() => {
    let active = true;

    void readStore().then((store) => {
      if (!active) {
        return;
      }

      const latest = Object.values(store.conversations).sort((a, b) => b.updatedAt - a.updatedAt)[0];
      const queries = latest?.queries ?? [];
      setState({
        paused: store.paused,
        totalMl: totalMilliliters(queries),
        messageCount: countedMessages(queries),
      });
    });

    return () => {
      active = false;
    };
  }, []);

  const togglePaused = () => {
    const paused = !state.paused;
    setState((current) => ({ ...current, paused }));
    void setPaused(paused);
  };

  const handleClear = () => {
    setState((current) => ({ ...current, totalMl: 0, messageCount: 0 }));
    void clearAll();
  };

  return (
    <main className="popup" aria-labelledby="water-counter-title">
      <header className="topbar">
        <div className="brand">
          <span className="mark" aria-hidden="true">
            <span>•</span>
          </span>
          <span id="water-counter-title" className="brand-name">
            Water Counter
          </span>
        </div>
        <span className="status">
          <span className={`status-dot${state.paused ? " paused" : ""}`} aria-hidden="true" />
          {state.paused ? "Paused" : "Watching"}
        </span>
      </header>

      <section className="hero" aria-labelledby="total-title">
        <p id="total-title" className="eyebrow">
          Latest chat total
        </p>
        <p className="total">{formatWaterLiters(state.totalMl)}</p>
        <p className="total-note">
          An estimate for operational water consumption. It is not a direct data-center measurement.
        </p>
      </section>

      <section className="panel" aria-labelledby="tracking-title">
        <div className="panel-heading">
          <h2 id="tracking-title" className="panel-title">
            Count new responses
          </h2>
          <button
            className={`switch${state.paused ? "" : " on"}`}
            type="button"
            role="switch"
            aria-checked={!state.paused}
            aria-label={state.paused ? "Resume counting" : "Pause counting"}
            onClick={togglePaused}
          />
        </div>
        <p className="panel-copy">
          {state.messageCount === 0
            ? "Open a supported AI chat to see the first estimate."
            : `${state.messageCount} completed response${state.messageCount === 1 ? "" : "s"} counted in the latest chat.`}
        </p>
      </section>

      <footer className="footer">
        <button className="text-button" type="button" onClick={() => void chrome.runtime.openOptionsPage()}>
          View sources
        </button>
        <button className="text-button danger" type="button" onClick={handleClear}>
          Clear local data
        </button>
      </footer>
    </main>
  );
}
