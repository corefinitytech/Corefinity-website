/**
 * One requestAnimationFrame loop shared by every card background, rather than
 * one per canvas. Nine simultaneous rAF loops fighting the browser's frame
 * budget is how a scroll-jank site gets made; a single tick handing every
 * subscriber the same timestamp is not.
 *
 * Paused for the whole page the moment the tab is hidden, and restarted only
 * once a subscriber is actually waiting for it.
 */
type FrameCallback = (timeMs: number) => void;

const callbacks = new Set<FrameCallback>();
let rafId = 0;
let running = false;

function tick(timeMs: number) {
  for (const cb of callbacks) cb(timeMs);
  if (running) rafId = requestAnimationFrame(tick);
}

function start() {
  if (running) return;
  running = true;
  rafId = requestAnimationFrame(tick);
}

function stop() {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (callbacks.size > 0) start();
  });
}

/** Subscribe a per-frame callback. Returns the unsubscribe function. */
export function subscribeFrame(cb: FrameCallback) {
  callbacks.add(cb);
  if (typeof document !== "undefined" && !document.hidden) start();
  return () => {
    callbacks.delete(cb);
    if (callbacks.size === 0) stop();
  };
}
