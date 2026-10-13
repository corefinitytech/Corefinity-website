/**
 * Abacus: an abacus lying on a base, four rods of three beads in a low frame,
 * and beside it a low rack with twelve slots. The pointer's place across the
 * base sets the count: beads slide across, rod by rod, and for every bead
 * moved one blade stands up in the rack, no more and no fewer. The last bead
 * moved is the bright one. The read-out is the count. The slider is the
 * stagger between one bead and the next, in ms.
 *
 * The pattern: scrub and pick. The count is a choice among thirteen, so beads
 * and blades move on tweens, staggered outwards from the bead just counted,
 * and the hit test reads the pointer's screen x against the base's two
 * resting ends.
 */
const {
  Cam, circ, clamp, facing, fit, hull, open, poly, prism, proj, ringAt, rings, rrect, run, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const RODS = [19, 33, 47, 61], PER = 3, TOTAL = RODS.length * PER, HOME = 4;
const FZ = 5, BR = 4.3, BWID = 2.9, SLIDE = 36, SX = (i) => 102 + i * 5.2, SH = 13;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, n = HOME, live = false;

  const C = Cam(45, 0.5, 1.85);
  fit(C, [[0, 0, -3], [172, 80, -3], [172, 0, -3], [0, 80, -3], [166, 8, 22]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const box = (x0, y0, x1, y1, r, b, z0, z1) => { const el = solid(g); put(el, prism(P, front, ...rings(x0, y0, x1, y1, r, b), z0, z1)); return el; };

  // Back to front: the base, the abacus (frame, the floor seen through it, rods, beads), then the rack and its blades.
  box(0, 0, 172, 80, 10, 2.2, -3, 0);
  const frame = rrect(8, 8, 84, 72, 6), well = rrect(13, 13, 79, 67, 3);
  put(solid(g), { sil: prism(P, front, frame, null, 0, FZ).sil, crease: "" });
  mk("path", { d: poly(ringAt(P, well, FZ)) }, g);
  mk("path", { d: open(ringAt(P, run(well, (q) => q.nu + q.nv < -0.9), 0.4)), class: "nf lo" }, g);
  mk("path", { d: RODS.map((y) => seg(P(11, y, FZ), P(81, y, FZ))).join(""), class: "nf" }, g);

  // A bead is a short cylinder on its rod. On each rod the bead nearest the far side is counted first.
  const cap = circ(BR, 14), beads = [];
  RODS.forEach((y, r) => {
    for (let k = 0; k < PER; k++) beads.push({ y, x0: 20 + k * 6.6, turn: r * PER + (PER - 1 - k), el: solid(g), x: tween(0, 520), drawn: NaN });
  });
  function drawBead(b, dx) {
    const at = (x) => cap.map((q) => P(x, b.y + q.u, FZ + q.v));
    put(b.el, { sil: poly(hull(at(b.x0 + dx - BWID).concat(at(b.x0 + dx + BWID)))), crease: poly(at(b.x0 + dx + BWID)) });
  }

  // the near half of the frame's top, painted after the beads it stands in front of
  mk("path", { d: poly(ringAt(P, run(frame, front), FZ).concat(ringAt(P, run(well, front), FZ).reverse())) }, g);

  box(98, 8, 166, 72, 5, 1.6, 0, 4);
  mk("path", { d: Array.from({ length: TOTAL }, (_, i) => poly(ringAt(P, rrect(SX(i), 14, SX(i) + 3.2, 66, 1.4), 4))).join(""), class: "nf lo" }, g);
  const blades = Array.from({ length: TOTAL }, (_, i) => ({ el: solid(g), rg: rings(SX(i), 14, SX(i) + 3.2, 66, 1.4, 0.6), h: tween(0, 520), drawn: NaN }));
  function drawBlade(b, h) {
    put(b.el, h < 0.25 ? { sil: "", crease: "" } : prism(P, front, b.rg[0], b.rg[1], 4, 4 + h));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const b of beads) {
      const dx = tval(b.x, now);
      if (dx !== b.drawn) { b.drawn = dx; drawBead(b, dx); }
      if (!tdone(b.x, now)) moving = true;
    }
    for (const b of blades) {
      const h = tval(b.h, now);
      if (h !== b.drawn) { b.drawn = h; drawBlade(b, h); }
      if (!tdone(b.h, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  /** Counts to c: every bead whose turn has come slides across, and the rack seats one blade for each. */
  function count(c) {
    const now = performance.now(), last = Math.max(c, n) - 1;
    n = c;
    for (const b of beads) {
      tset(b.x, b.turn < n ? SLIDE : 0, now, Math.abs(b.turn - last) * stag);
      b.el.sil.classList.toggle("hi", b.turn === n - 1);
    }
    blades.forEach((b, i) => tset(b.h, i < n ? SH : 0, now, Math.abs(i - last) * stag));
    read.textContent = live ? String(n * 100) : "rest";
    B.wake();
  }
  count(HOME);

  // The hit test: the pointer's screen x between the base's two ends at rest.
  const sa = P(8, 40, 0)[0], sb = P(166, 40, 0)[0];
  bag.add(pointer(stage, {
    move: (p) => { live = true; count(Math.round(clamp((p[0] - sa) / (sb - sa), 0, 1) * TOTAL)); },
    leave: () => { live = false; count(HOME); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "abacus",
  means: "Count first, then build: every bead moved on the abacus seats exactly one blade in the rack beside it.",
  rules: [1, 2, 5, 8, 10],
  range: [0, 40, 90],
  tour: [[98, 110], [201, 162], [304, 213], [150, 136], null],
  mount,
});
