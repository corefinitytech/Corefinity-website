# Brand masters

Full resolution source art. Deliberately outside `public/` so it is version
controlled but never deployed.

| File | What it is |
| --- | --- |
| `wordmark-dark-master.png` | 2954px lockup, light art on a solid navy ground (not transparent) |
| `wordmark-light-master.png` | 2226px lockup, light art for dark backgrounds |
| `wordmark-ink-master.png` | 2226px lockup, ink art on transparent for light backgrounds. Derived from the light master: neutrals remapped to an ink to slate ramp, blue square kept |
| `mark-master.png` | 4320px mark on the deep navy ground |

Regenerate the shipped assets from these:

* `public/logo/wordmark-ink.png`, `wordmark-dark.png` and `wordmark-light.png`
  are 600px wide downscales, which covers the largest on screen use at 3x pixel density.
* `src/app/icon.png`, `apple-icon.png` and `favicon.ico` are cropped from
  `mark-master.png` so the mark fills roughly 76 percent of the canvas. The
  raw art has about 65 percent empty margin, which is what made the old
  favicon look tiny.
