export interface ObservationScheduler {
  start: () => void;
  stop: () => void;
}

export function createObservationScheduler(onFlush: () => void): ObservationScheduler {
  let observer: MutationObserver | null = null;
  let timeoutId: number | null = null;
  let frameId: number | null = null;

  const schedule = () => {
    if (document.hidden || timeoutId !== null) {
      return;
    }

    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        onFlush();
      });
    }, 80);
  };

  return {
    start: () => {
      if (observer) {
        return;
      }

      observer = new MutationObserver(schedule);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    },
    stop: () => {
      observer?.disconnect();
      observer = null;

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    },
  };
}
