/**
 * Standby: a phone on a stand sending its signal, four arcs spreading from
 * its side, to a small circuit board with an antenna. At rest the signal is
 * whole and the phone's app is on its screen. The pointer's distance from the
 * phone is how long the app has been closed: moving away, the arcs break one
 * after another from the far end, each splitting in two and dropping out of
 * line, and the phone's screen goes blank. The board's light stays on
 * throughout: the hardware did not break. The slider is the reach: how far
 * away counts as fully closed.
 *
 * The pattern: scrub. One distance, measured from the phone's resting centre,
 * which never moves, on one spring.
 */
const {
  Cam, circ, clamp, facing, fillet, fit, hull, open, poly, prism, proj, r2, rad, rings, seg, spring, stepS,
  disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const PX = 8, PY = 30, PW = 26, PH = 50, PT = 2.6, LEAN = 12;
const OX = 39, OY = 27, OZ = 30, RADII = [17, 33, 49, 65], SPREAD = 33, BX = 96, ANT = [128, 27];

/** A rounded rectangle in the phone's own plane: a across it, v up it. */
const sheet = (a0, a1, v0, v1, r) => fillet([[a0, v0], [a1, v0], [a1, v1], [a0, v1]], [r, r, r, r]);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value, live = false, drawn = NaN;

  const C = Cam(45, 0.5, 2.15);
  fit(C, [[0, 6, -3], [144, 54, -3], [144, 6, -3], [0, 54, -3], [PX, PY - 12, PH + 2], [OX + 55, OY, OZ + 36]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const box = (x0, y0, x1, y1, r, b, z0, z1) => { const el = solid(g); put(el, prism(P, front, ...rings(x0, y0, x1, y1, r, b), z0, z1)); return el; };

  // Back to front: the mat, the phone on its leg, the signal, then the board with its module, its pins and its antenna.
  box(0, 6, 144, 54, 10, 2.2, -3, 0);
  // The phone: a thin slab leaning back, facing the viewer. W is a point of its front, t out from it.
  const sn = Math.sin(rad(LEAN)), cs = Math.cos(rad(LEAN));
  const W = (a, v, t) => P(PX + a, PY - v * sn + t * cs, 1 + v * cs + t * sn);
  const on = (pts, t) => pts.map((q) => W(q[0], q[1], t));
  mk("path", { d: seg(P(PX + PW + 0.8, PY - 19, 0), W(PW + 0.8, 24, -PT)), class: "nf" }, g);
  const phone = solid(g), body = sheet(0, PW, 0, PH, 3.2);
  put(phone, { sil: poly(hull(on(body, 0).concat(on(body, -PT)))), crease: poly(on(sheet(1.6, PW - 1.6, 1.6, PH - 1.6, 2.2), 0)) });
  const app = mk("path", { class: "nf" }, g);
  const cards = [[33, 44], [20, 30], [7, 17]].map(([a, b]) => poly(on(sheet(4.6, PW - 4.6, a, b, 1.8), 0.4))).join("");
  box(PX + 3, PY + 1, PX + PW - 3, PY + 4.6, 1.4, 0.5, 0, 2.2);   // the toe that holds its foot

  // The signal: each arc is two halves, so that it can break in the middle.
  const arcs = RADII.map(() => [mk("path", { class: "nf sil" }, g), mk("path", { class: "nf sil" }, g)]);

  const board = box(BX, 13, 138, 45, 4, 1.4, 0, 2.4);
  box(BX + 6, 20, BX + 24, 38, 2.4, 1, 2.4, 6.4);                 // the radio module's can
  for (let k = 0; k < 7; k++) for (const y of [15.8, 42.2]) place(flatDot(g, C, 0.85, "dot off"), P(BX + 5 + k * 5.2, y, 2.4));   // its pins
  put(solid(g), prism(P, front, circ(1.5, 14).map((q) => ({ u: q.u + ANT[0], v: q.v + ANT[1], nu: q.nu, nv: q.nv })), null, 2.4, 25));
  const led = mk("circle", { r: r2(1.5 * C.S), class: "dot m" }, g);
  place(led, P(132, 39, 2.4));

  /** The signal broken by b, from 0 whole to 1 gone. The far arc goes first; each splits, its halves parting and falling out of line. */
  function drawSignal(b) {
    arcs.forEach(([lo, up], k) => {
      const p = clamp((b - (RADII.length - 1 - k) * 0.17) / 0.46, 0, 1), R = RADII[k], gap = p * 11;
      const half = (a0, a1, turn, dx, dz) => {
        const pts = [];
        for (let n = 0; n <= 10; n++) { const a = rad(a0 + ((a1 - a0) * n) / 10 + turn); pts.push(P(OX + R * Math.cos(a) + dx, OY, OZ + R * Math.sin(a) + dz)); }
        return open(pts);
      };
      lo.setAttribute("d", half(-SPREAD, -gap, -7 * p, 2.5 * p, -8 * p));
      up.setAttribute("d", half(gap, SPREAD, 6 * p, -1.5 * p, 3 * p));
      for (const el of [lo, up]) el.classList.toggle("lo", p > 0.6);
    });
  }

  const t = spring(0, { eps: 0.001 });
  const B = register(stage, (dt) => {
    const moving = stepS(t, dt);
    if (t.x !== drawn) { drawn = t.x; drawSignal(clamp((t.x - 0.2) / 0.6, 0, 1)); }
    return moving;
  });
  bag.add(B.unregister);

  /** While the signal holds it carries the bright edge and the app is on the screen. Once it breaks the bright goes to the board, which is still on. */
  function apply() {
    const down = t.t > 0.5;
    arcs.forEach((pair) => pair.forEach((el) => el.classList.toggle("hi", !down)));
    app.setAttribute("d", down ? "" : cards);
    board.sil.classList.toggle("hi", down);
    led.setAttribute("class", down ? "dot" : "dot m");
    read.textContent = !live ? "rest" : down ? "dropped" : "linked";
    B.wake();
  }
  apply();

  // The hit test: the pointer's distance from the phone's resting centre, over the distance to the board. Neither moves.
  const pc = W(PW / 2, PH / 2, 0), qc = P(BX + 21, 29, 2.4), span = Math.hypot(pc[0] - qc[0], pc[1] - qc[1]);
  bag.add(pointer(stage, {
    move: (p) => { live = true; t.t = clamp(Math.hypot(p[0] - pc[0], p[1] - pc[1]) / (span * reach), 0, 1); apply(); },
    leave: () => { live = false; t.t = 0; apply(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { reach = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "standby",
  means: "A phone sends its signal to the hardware. When the phone closes the app the signal breaks, and the hardware is still on.",
  rules: [1, 3, 4, 5, 8],
  range: [0.7, 1, 1.4],
  tour: [[132, 112], [290, 245], [132, 112], [290, 245], null],
  mount,
});
