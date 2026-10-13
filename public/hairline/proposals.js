/**
 * Proposals: a balance on a base. One pan holds a stack of proposal papers,
 * the other a small phone with a working app on its screen. In front of the
 * balance lies a contract with an empty signature line and a pen beside it,
 * not yet picked up. The pointer's place across the base tips the beam: to
 * one side the papers win, to the other the working app does. At rest the app
 * outweighs the papers. The slider is how far the beam can tip, in degrees.
 *
 * The pattern: scrub. One spring for the beam's angle, read from the
 * pointer's screen x against the base's two resting ends.
 */
const {
  Cam, circ, clamp, facing, fillet, fit, hull, lerp, open, poly, prism, proj, rad, ringAt, rings, run, seg, spring, stepS,
  disposer, mk, pointer, put, register, solid,
} = HL;

const CX = 60, CY = 28, TOP = 72, ARM = 42, DROP = 36, PR = 15, HOME = 0.82;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let swing = value, live = false, drawn = NaN;

  // Fitted with the beam tipped as far as it goes, either way.
  const C = Cam(45, 0.5, 1.95);
  fit(C, [[0, 0, -3], [120, 70, -3], [120, 0, -3], [0, 70, -3], [CX - ARM, CY, TOP + 16], [CX + ARM, CY, TOP + 16], [CX - ARM - PR, CY, 12]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const box = (x0, y0, x1, y1, r, b, z0, z1) => { const el = solid(g); put(el, prism(P, front, ...rings(x0, y0, x1, y1, r, b), z0, z1)); return el; };
  const disc = (x, R) => circ(R, 24).map((q) => ({ u: q.u + x, v: q.v + CY, nu: q.nu, nv: q.nv }));
  const side = () => ({ dish: solid(g), chains: mk("path", { class: "nf" }, g), load: solid(g), marks: mk("path", { class: "nf" }, g) });

  // Back to front: the base, the far pan and its papers, the post, the beam, the near pan and its phone, then the
  // contract and the pen lying in front.
  box(0, 0, 120, 70, 10, 2.2, -3, 0);
  const left = side();
  box(47, 19, 73, 37, 6, 1.4, 0, 2.6);
  box(57.6, 25.6, 62.4, 30.4, 2, 0.6, 2.6, TOP + 3);
  const beam = solid(g), right = side();
  mk("path", { d: poly(fillet([[30, 42], [60, 42], [60, 66], [30, 66]], [1.6, 1.6, 1.6, 1.6]).map((q) => P(q[0], q[1], 0))), class: "sil" }, g);
  mk("path", { d: [46.5, 50, 53.5, 57].map((y) => seg(P(34, y, 0), P(56, y, 0))).join(""), class: "nf lo" }, g);   // its clauses
  mk("path", { d: seg(P(34, 62.5, 0), P(50, 62.5, 0)), class: "nf" }, g);                                         // the line to sign on, empty
  box(68, 56, 98, 59.6, 1.8, 0.5, 0, 3.6);                                                                         // the pen
  mk("path", { d: seg(P(75, 56, 3.6), P(75, 59.6, 3.6)) + seg(P(78, 57.8, 3.6), P(90, 57.8, 3.6)), class: "nf lo" }, g);

  /** One pan, hung from the beam's end at (px, ez): the dish, its two chains, and what is on it. */
  function hang(s, px, ez, papers) {
    const z = ez - DROP;
    put(s.dish, prism(P, front, disc(px, PR), disc(px, PR - 2), z, z + 1.6));
    s.chains.setAttribute("d", seg(P(px, CY, ez), P(px - PR + 1.5, CY, z + 1.6)) + seg(P(px, CY, ez), P(px + PR - 1.5, CY, z + 1.6)));
    if (papers) {
      // a stack of proposals: one block, with the edges of its sheets
      const [o, n] = rings(px - 9.5, CY - 9, px + 9.5, CY + 9, 2.2, 1), edge = run(o, front);
      put(s.load, prism(P, front, o, n, z + 1.6, z + 12.6));
      s.marks.setAttribute("d", [4.4, 7.2, 10].map((h) => open(ringAt(P, edge, z + 1.6 + h))).join(""));
    } else {
      // a small phone standing on the pan, its app on the screen: the work itself
      const y = CY + 1.5, f = (x0, x1, z0, z1, r) => poly(fillet([[x0, z0], [x1, z0], [x1, z1], [x0, z1]], [r, r, r, r]).map((q) => P(q[0], y, q[1])));
      put(s.load, prism(P, front, ...rings(px - 7.5, CY - 1.5, px + 7.5, y, 1.5, 0.5), z + 1.6, z + 29.6));
      s.marks.setAttribute("d", f(px - 6, px + 6, z + 3.4, z + 27.8, 1.6) + [[20, 25.4], [13.4, 18], [6.4, 11.4]].map(([a, b]) => f(px - 4.2, px + 4.2, z + a, z + b, 1.2)).join(""));
    }
  }

  /** The balance with its beam at phi degrees: positive, and the phone's pan is the one that sinks. */
  function draw(phi) {
    const s = Math.sin(rad(phi)), c = Math.cos(rad(phi)), pts = [];
    for (const y of [CY - 2, CY + 2]) for (const [dx, dz] of [[-ARM - 3, -1.6], [ARM + 3, -1.6], [ARM + 3, 1.6], [-ARM - 3, 1.6]]) pts.push(P(CX + dx * c + dz * s, y, TOP - dx * s + dz * c));
    put(beam, { sil: poly(hull(pts)), crease: "" });
    hang(left, CX - ARM * c, TOP + ARM * s, true);
    hang(right, CX + ARM * c, TOP - ARM * s, false);
  }

  // k runs from 0, the papers all the way down, to 1, the phone all the way down.
  const k = spring(HOME, { eps: 0.0005 });
  const B = register(stage, (dt) => {
    const moving = stepS(k, dt);
    if (k.x !== drawn) { drawn = k.x; draw(lerp(-swing, swing, clamp(k.x, 0, 1))); }
    return moving;
  });
  bag.add(B.unregister);

  /** The bright edge is on whatever is winning. At rest that is the working app. */
  function apply() {
    const proof = k.t >= 0.5;
    right.load.sil.classList.toggle("hi", proof);
    left.load.sil.classList.toggle("hi", !proof);
    read.textContent = !live ? "rest" : proof ? "proof" : "pitch";
    drawn = NaN;
    B.wake();
  }
  apply();

  // The hit test: the pointer's screen x between the base's two ends at rest.
  const sa = P(CX - ARM, CY, 0)[0], sb = P(CX + ARM, CY, 0)[0];
  bag.add(pointer(stage, {
    move: (p) => { live = true; k.t = clamp((p[0] - sa) / (sb - sa), 0, 1); apply(); },
    leave: () => { live = false; k.t = HOME; apply(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { swing = v; drawn = NaN; B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "proposals",
  means: "Before the contract is signed, weigh each proposal's paper against work that already runs. The work should win.",
  rules: [1, 3, 4, 5, 8],
  range: [6, 11, 16],
  tour: [[152, 138], [209, 150], [267, 196], [209, 150], null],
  mount,
});
