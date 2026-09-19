/**
 * Node 22+ defines a native, disabled-by-default `localStorage` global gated
 * behind `--localstorage-file`. Vitest's jsdom bridge treats any key already
 * present on the outer global as one it must not touch, so that disabled
 * native global shadows jsdom's own working `window.localStorage` instead of
 * being replaced by it. Force jsdom's real storage back onto `globalThis` so
 * `localStorage`/`sessionStorage` resolve to something usable in tests.
 */
const realWindow = (globalThis as unknown as { jsdom?: { window: Window } })
  .jsdom?.window;

if (realWindow) {
  Object.defineProperty(globalThis, "localStorage", {
    value: realWindow.localStorage,
    configurable: true,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    value: realWindow.sessionStorage,
    configurable: true,
  });
}
