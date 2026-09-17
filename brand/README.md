# Brand masters

Full resolution source art. Deliberately outside `public/` so it is version
controlled but never deployed.

| File | What it is |
| --- | --- |
| `wordmark-dark-master.png` | 2954px lockup, dark art for light backgrounds |
| `wordmark-light-master.png` | 2226px lockup, light art for dark backgrounds |
| `mark-master.png` | 4320px mark on the deep navy ground |

Regenerate the shipped assets from these:

* `public/logo/wordmark-dark.png` and `wordmark-light.png` are 600px wide
  downscales, which covers the largest on screen use at 3x pixel density.
* `src/app/icon.png`, `apple-icon.png` and `favicon.ico` are cropped from
  `mark-master.png` so the mark fills roughly 76 percent of the canvas. The
  raw art has about 65 percent empty margin, which is what made the old
  favicon look tiny.
