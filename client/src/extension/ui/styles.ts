// Water Counter UI direction: quiet utility surface, cool slate ink, mineral blue accent,
// compact measurement numerals, no decorative motion, and host-page style isolation.

export const WATER_COUNTER_STYLES = `
:host {
  all: initial;
  color: #17202b;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.4;
}

*, *::before, *::after {
  box-sizing: border-box;
}

button {
  font: inherit;
}

.badge,
.summary {
  border: 1px solid rgba(48, 92, 116, 0.2);
  background: rgba(248, 251, 250, 0.96);
  color: #17202b;
  box-shadow: 0 6px 18px rgba(28, 57, 70, 0.12);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 30px;
  margin: 8px 0 0;
  padding: 5px 9px;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.badge:hover {
  transform: translateY(-1px);
}

.badge:active {
  transform: scale(0.98);
}

.badge:focus-visible,
.summary button:focus-visible {
  outline: 3px solid rgba(36, 125, 150, 0.36);
  outline-offset: 2px;
}

.drop {
  display: inline-grid;
  width: 16px;
  height: 16px;
  place-items: center;
  border-radius: 50% 50% 50% 10%;
  background: #c6e5e1;
  color: #175263;
  font-size: 10px;
  font-weight: 800;
  transform: rotate(-45deg);
}

.drop > span {
  transform: rotate(45deg);
}

.value {
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.label {
  color: #50616b;
  font-size: 11px;
  white-space: nowrap;
}

.detail {
  width: min(280px, calc(100vw - 32px));
  margin-top: 7px;
  padding: 10px 11px;
  border: 1px solid rgba(48, 92, 116, 0.16);
  border-radius: 12px;
  background: #ffffff;
  color: #33434b;
  box-shadow: 0 10px 24px rgba(28, 57, 70, 0.14);
}

.detail[hidden] {
  display: none;
}

.detail-title {
  margin: 0 0 5px;
  color: #17202b;
  font-size: 12px;
  font-weight: 800;
}

.detail-copy {
  margin: 0;
  font-size: 11px;
}

.detail-link {
  display: inline-block;
  margin-top: 7px;
  color: #17627a;
  font-size: 11px;
  font-weight: 700;
}

.summary-host {
  position: fixed;
  top: 14px;
  right: 16px;
  z-index: 2147483646;
}

.summary {
  display: grid;
  gap: 2px;
  min-width: 172px;
  padding: 10px 12px;
  border-radius: 14px;
}

.summary-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.summary-label {
  color: #50616b;
  font-size: 11px;
  font-weight: 700;
}

.summary-value {
  color: #175263;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.summary-meta {
  color: #657680;
  font-size: 10px;
}

.summary button {
  width: fit-content;
  margin-top: 5px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #17627a;
  font-size: 10px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

@media (prefers-color-scheme: dark) {
  .badge,
  .summary {
    border-color: rgba(191, 233, 230, 0.18);
    background: rgba(24, 35, 40, 0.96);
    color: #eff8f6;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  }

  .label,
  .summary-label,
  .summary-meta {
    color: #b5c6c7;
  }

  .detail {
    border-color: rgba(191, 233, 230, 0.18);
    background: #1d2b30;
    color: #d6e4e3;
  }

  .detail-title {
    color: #eff8f6;
  }

  .drop {
    background: #295966;
    color: #ddf4f0;
  }

  .summary-value {
    color: #bfe9e6;
  }
}

@media (prefers-reduced-motion: reduce) {
  .badge {
    transition: none;
  }
}
`;
