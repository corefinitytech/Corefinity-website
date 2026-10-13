/**
 * Stragglers: a conveyor belt running through four low gates, one for each
 * hop between a message's five timestamps. Three crates ride it. Two travel
 * as a pair; the third falls further behind the longer the belt runs. Every gate a crate
 * has passed leaves a stamp on its lid, so each crate carries the record of
 * its own journey. The pointer's place along the belt is the time: the crates
 * ride forward and back with it, and the gate the straggler is at lifts to
 * stamp it. The straggler is the bright one. The slider is how slow it is.
 *
 * The pattern: scrub. One spring for the time, read from the pointer's screen
 * x against the belt's two resting ends, which never move.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, rrect, seg, spring, stepS,
  disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const X0 = -10, X1 = 204, BY = 34, BZ = 6, RUN = 140, HOME = 0.8;
const G = [30, 76, 122, 168], GT = 4, GH = 20, LIFT = 5;
const CW = 8, CY0 = 8, CY1 = 26, CH = 13;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lag = value, live = false, drawn = NaN;

  const C = Cam(45, 0.5, 1.9);
  fit(C, [[X0, 0, 0], [X1, BY, 0], [X1, 0, 0], [X0, BY, 0], [G[0], -7, GH + 3.5 + LIFT], [G[3], BY + 7, 0]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const col = (x0, y0, x1, y1, r, b) => { const rg = rings(x0, y0, x1, y1, r, b); return (el, z0, z1) => put(el, prism(P, front, rg[0], rg[1], z0, z1)); };

  // Back to front: the gates' far posts, the belt and its slats, the crates from the back of the belt, then every gate's
  // near post and bar. A bar stands higher than any crate, so nothing on the belt can ever cover it.
  const gates = G.map((x) => ({ x, far: solid(g), drawFar: col(x, -7, x + GT, -2, 1.6, 0.5) }));
  put(solid(g), prism(P, front, rrect(X0, 0, X1, BY, 17, 12), rrect(X0 + 2.2, 2.2, X1 - 2.2, BY - 2.2, 14.8, 12), 0, BZ));
  const slats = mk("path", { class: "nf lo" }, g);
  // Ordered from the back of the belt: the straggler, then the pair.
  const crates = [0, 1, 2].map((i) => {
    const el = solid(g), dots = G.map(() => flatDot(el.g, C, 1.35, "dot off"));
    el.sil.classList.toggle("hi", i === 0);
    return { el, dots, k: 0 };
  });
  for (const gt of gates) {
    gt.post = solid(g); gt.drawPost = col(gt.x, BY + 2, gt.x + GT, BY + 7, 1.6, 0.5);
    gt.bar = solid(g); gt.drawBar = col(gt.x, -7, gt.x + GT, BY + 7, 1.6, 0.6);
  }

  /** The whole scene at time tv, from 0 to 1. The pair runs the belt; the straggler covers only `lag` of the distance. */
  function draw(tv) {
    const lead = 44 + tv * RUN, at = [6 + tv * RUN * lag, lead - 19, lead];
    crates.forEach((c, i) => {
      const x = at[i], k = G.filter((gx) => gx + GT / 2 < x).length;
      col(x - CW, CY0, x + CW, CY1, 2.6, 1.2)(c.el, BZ, BZ + CH);
      c.k = k;
      // one stamp for each gate passed, in a row on the lid
      c.dots.forEach((el, n) => { place(el, P(x + (n - 1.5) * 3.3, CY1 - 5, BZ + CH)); el.setAttribute("class", n < k ? "dot m" : "dot off"); });
    });
    // the gate the straggler is at lifts, the next ones less, the far ones not at all
    for (const gt of gates) {
      const h = LIFT * clamp(1 - Math.abs(at[0] - (gt.x + GT / 2)) / 26, 0, 1);
      gt.drawFar(gt.far, 0, GH + h); gt.drawPost(gt.post, 0, GH + h); gt.drawBar(gt.bar, GH + h, GH + 3.5 + h);
    }
    let d = "";
    for (let n = 0; n < 14; n++) { const x = X0 + 9 + ((n * 14 + tv * RUN) % 196); d += seg(P(x, 3, BZ), P(x, BY - 3, BZ)); }
    slats.setAttribute("d", d);
    read.textContent = live ? `hop ${Math.min(G.length, crates[0].k + 1)}` : "rest";
  }

  const time = spring(HOME, { eps: 0.0005 });
  const B = register(stage, (dt) => {
    const moving = stepS(time, dt);
    if (time.x !== drawn) { drawn = time.x; draw(time.x); }
    return moving;
  });
  bag.add(B.unregister);

  // The hit test: the pointer's screen x between the belt's two ends at rest.
  const sa = P(X0, BY / 2, 0)[0], sb = P(X1, BY / 2, 0)[0];
  const again = () => { drawn = NaN; B.wake(); };
  bag.add(pointer(stage, {
    move: (p) => { live = true; time.t = clamp((p[0] - sa) / (sb - sa), 0, 1); again(); },
    leave: () => { live = false; time.t = HOME; again(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { lag = v; again(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "stragglers",
  means: "Three messages are stamped at every hop. Two arrive together and one falls far behind, and it is the one to watch.",
  rules: [1, 4, 5, 6, 10],
  range: [0.7, 0.45, 0.25],
  tour: [[56, 106], [200, 178], [344, 250], [200, 178], null],
  mount,
});
