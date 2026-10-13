/**
 * Pipeline: an L-shaped bench with four things on it, each on its own pad: a
 * sensor puck (vent slots, antenna stub, LED) at the front left, a phone in a
 * dock, a rack of four blades with handles at the back corner, and the largest,
 * a monitor showing a fleet of dots, at the front right. A rimmed channel bends
 * round the inside of the L, and one capsule, the reading, rides in it with a
 * short trail of dots behind. The pointer's place across the bench sets how far
 * the capsule has travelled; the pad it is at rises and its object takes the
 * bright edge, the others settle back, staggered by distance. At the monitor
 * one dark unit in the fleet turns on. The slider is the lift, in world units.
 *
 * The pattern: scrub and pick. A spring for where the capsule is, tweens for
 * which stop is up, and a hit test on the pointer's screen x against the four
 * resting centres, which never move.
 */
const {
  Cam, circ, clamp, facing, fillet, fit, hull, lerp, open, poly, prism, proj, r2, rad, ringAt, rings, rrect, run, seg,
  spring, stepS, tdone, tset, tval, tween, disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const BL = 106, BW = 46, BT = 4, CH = 38, CE = 91, CW = 5.5;
const PADS = [[4, 74, 30, 98], [4, 40, 30, 64], [4, 4, 30, 30], [56, 4, 104, 30]]; // device, phone, cloud, admin
const STOP = [0, 34, 48, 90], REST = [3, 10, 5, 7], ORDER = [2, 1, 3, 0], TOP = [20, 39, 36, 42];
const FALL = [1, 0.22, 0.06, 0], STAG = 45, HMAX = 18, HOME = 41, TRAIL = [7.5, 13, 18.5];
const NAMES = ["device", "phone", "cloud", "admin"], DARK = [3, 8, 11], LAND = 8;

/** An L with equal legs: corner at (a, a), legs out to b, c wide; convex corners rounded by r and the inside one by q. */
const ell = (a, b, c, r, q) => fillet([[a, a], [b, a], [b, c], [c, c], [c, b], [a, b]], [r, r, r, q, r, r], 6);
/** The channel's centre line: s world units from the device's stop, up one leg, round the corner and out along the other. */
const where = (s) => (s <= 48 ? [CH, 86 - s] : [CH + s - 48, CH]);
const disc = (x, y, R) => circ(R, 28).map((q) => ({ u: q.u + x, v: q.v + y, nu: q.nu, nv: q.nv }));

/** What stands on pad i: solids back to front, then the lines ([class, path]) and dots ([x, y, z, r, class]) on its faces. */
function parts(i, { col, box, band, pane, bars, shell, loops }) {
  if (i === 0) return {
    // the sensor: a low round puck with a lid seam, three vent slots, an antenna stub at the back and an LED on its wall
    solids: [col(disc(17, 86, 11), disc(17, 86, 9.4), 0, 9), col(disc(11, 80, 1.5), disc(11, 80, 0.8), 9, 20)],
    lines: [["nf lo", band(disc(17, 86, 11), [6])], ["nf", bars([83.5, 86.5, 89.5].map((y) => [[15, y, 9], [22.5, y, 9]]))]],
    dots: [[24.8, 93.8, 3, 1.4, "dot m"]],
  };
  if (i === 1) {
    // the phone: a thin slab of 1:2 leaning back 15 degrees on a wire stand behind and a low toe in front, facing the channel;
    // its screen is one crease inside the body, with a camera pill at the top and three cards stacked under it
    const sn = Math.sin(rad(15)), cs = Math.cos(rad(15)), W = (a, v, t) => [20 - v * sn - t * cs, a, 1 + v * cs - t * sn];
    const card = (a0, a1, v0, v1, r, t) => fillet([[a0, v0], [a1, v0], [a1, v1], [a0, v1]], [r, r, r, r]).map((q) => W(q[0], q[1], t));
    return {
      solids: [shell(card(43, 61, 0, 36, 3.2, 2).concat(card(43, 61, 0, 36, 3.2, 0)), card(44.5, 59.5, 1.5, 34.5, 2.2, 0)), box(20.6, 46, 23, 58, 1.2, 0.4, 0, 2.2)],
      lines: [["nf", loops([card(46.5, 57.5, 21, 29.5, 1.6, 0), card(46.5, 57.5, 13.5, 19, 1.6, 0), card(46.5, 57.5, 6, 11.5, 1.6, 0)])],
        ["nf", bars([[W(50.3, 32.2, 0), W(53.7, 32.2, 0)], [[8.5, 61.5, 0], [13.4, 61.5, 17]]])]],
      dots: [],
    };
  }
  if (i === 2) return {
    // the cloud: a rack of four blades, each front with a handle and a light
    solids: [box(6, 6, 28, 28, 3, 1.2, 0, 36)],
    lines: [["nf lo", band(rrect(6, 6, 28, 28, 3), [9, 18, 27])], ["nf", bars([4.5, 13.5, 22.5, 31.5].map((z) => [[14, 28, z], [23, 28, z]]))]],
    dots: [4.5, 13.5, 22.5, 31.5].map((z, k) => [10, 28, z, 1.1, k === 2 ? "dot off" : "dot m"]),
  };
  // the admin panel: the largest thing on the bench, a monitor on a short stand whose screen is a fleet of fifteen units
  const fleet = [];
  for (let k = 0; k < 15; k++) fleet.push([80 + ((k % 5) - 2) * 7.2, 18.5, 26 + (1 - Math.floor(k / 5)) * 7.6, 1.6, DARK.includes(k) ? "dot off" : "dot m"]);
  return {
    solids: [box(70, 10, 90, 24, 4, 1.1, 0, 2), box(78, 15.5, 82, 18.5, 1.2, 0.4, 2, 10), box(58, 15.5, 102, 18.5, 1.5, 0.6, 10, 42)],
    lines: [["nf lo", pane(1, 18.5, 61, 99, 13, 39)]],
    dots: fleet,
  };
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value, act = -1;

  // The camera is fitted to the bench with every object at full lift, so nothing leaves the frame.
  const C = Cam(45, 0.5, 2.3);
  fit(C, [[0, 0, -BT], [BL, 0, -BT], [0, BL, -BT], [BL, BW, -BT], [BW, BL, -BT], ...PADS.map((p, i) => [p[0], p[1], TOP[i] + REST[i] + HMAX])], 200, 166);
  const P = proj(C), front = facing(C);

  // The ways a part is drawn, each returning a function of its pad's height h.
  const col = (a, n, z0, z1) => (h) => prism(P, front, a, n, z0 + h, z1 + h);
  const make = {
    col,
    box: (x0, y0, x1, y1, r, b, z0, z1) => col(...rings(x0, y0, x1, y1, r, b), z0, z1),
    band: (ring, zs) => { const a = run(ring, front); return (h) => zs.map((z) => open(ringAt(P, a, z + h))).join(""); },
    pane: (alongX, w, a0, a1, z0, z1) => { const f = fillet([[a0, z0], [a1, z0], [a1, z1], [a0, z1]], [1.6, 1.6, 1.6, 1.6]); return (h) => poly(f.map((p) => (alongX ? P(p[0], w, p[1] + h) : P(w, p[0], p[1] + h)))); },
    shell: (body, crease) => (h) => ({ sil: poly(hull(body.map((q) => P(q[0], q[1], q[2] + h)))), crease: poly(crease.map((q) => P(q[0], q[1], q[2] + h))) }),
    loops: (list) => (h) => list.map((pts) => poly(pts.map((q) => P(q[0], q[1], q[2] + h)))).join(""),
    bars: (list) => (h) => list.map(([a, b]) => seg(P(a[0], a[1], a[2] + h), P(b[0], b[1], b[2] + h))).join(""),
  };

  // Back to front: the board (its foot, its top and the two edges that join them), the channel, the pads, then the capsule.
  const g = mk("g", {}, svg), flat = (pts, z) => pts.map((p) => P(p[0], p[1], z));
  const edge = ell(0, BL, BW, 9, 6), top = flat(edge, 0), foot = flat(edge, -BT);
  const ends = [top.reduce((a, p, k) => (p[0] < top[a][0] ? k : a), 0), top.reduce((a, p, k) => (p[0] > top[a][0] ? k : a), 0)];
  mk("path", { d: poly(foot), class: "sil" }, g);
  mk("path", { d: poly(top) + ends.map((k) => seg(top[k], foot[k])).join(""), class: "sil" }, g);
  mk("path", { d: poly(flat(ell(2.2, BL - 2.2, BW - 2.2, 6.8, 8.2), 0)), class: "nf lo" }, g);
  mk("path", { d: poly(flat(ell(CH - CW, CE, CH + CW, CW, 2), 0)), class: "nf" }, g);
  mk("path", { d: poly(flat(ell(CH - CW + 1.6, CE - 1.6, CH + CW - 1.6, CW - 1.6, 3.6), 0)), class: "nf lo" }, g);
  // A station on the channel floor at each stop, tied to the pad it serves, so the route reads in order without the read-out.
  mk("path", { d: STOP.map((s, i) => {
    const [x, y] = where(s), [x0, y0, x1, y1] = PADS[i], tx = clamp(x, x0, x1), ty = clamp(y, y0, y1), k = 3.2 / Math.hypot(tx - x, ty - y);
    return poly(ringAt(P, disc(x, y, 3.2), 0)) + seg(P(lerp(x, tx, k), lerp(y, ty, k), 0), P(tx, ty, 0));
  }).join(""), class: "nf" }, g);

  const objs = [];
  for (const i of ORDER) {
    const [x0, y0, x1, y1] = PADS[i], grp = mk("g", {}, g), d = parts(i, make), [pa, pn] = rings(x0, y0, x1, y1, 5, 1.6);
    objs[i] = {
      pad: solid(grp), rise: (h) => prism(P, front, pa, pn, 0, h),
      sol: d.solids.map((f) => [solid(grp), f]),
      lin: d.lines.map(([cls, f]) => [mk("path", { class: cls }, grp), f]),
      dot: d.dots.map(([x, y, z, r, cls]) => [mk("circle", { r: r2(r * C.S), class: cls }, grp), x, y, z]),
      sx: P((x0 + x1) / 2, (y0 + y1) / 2, 0)[0], z: tween(REST[i]), drawn: NaN,
    };
  }
  const land = objs[3].dot[LAND][0];

  // The reading: a capsule standing proud of the channel, on a spring along it, and the trail it leaves, brightest nearest.
  const trail = ["dot", "dot m", "dot off"].map((cls) => flatDot(g, C, 1.5, cls));
  const cap = solid(g), bead = spring(HOME);
  let beadDrawn = NaN;
  function drawBead(s) {
    const [x, y] = where(s), k = clamp((s - 42) / 12, 0, 1), hx = lerp(3, 4.8, k), hy = lerp(4.8, 3, k);
    put(cap, prism(P, front, ...rings(x - hx, y - hy, x + hx, y + hy, 3, 1), 0.6, 4.8));
    trail.forEach((el, n) => { const q = where(Math.max(0, s - TRAIL[n])); place(el, P(q[0], q[1], 0)); });
  }

  function draw(o, h) {
    put(o.pad, o.rise(h));
    o.sol.forEach(([el, f]) => put(el, f(h)));
    o.lin.forEach(([el, f]) => el.setAttribute("d", f(h)));
    o.dot.forEach(([el, x, y, z]) => place(el, P(x, y, z + h)));
  }

  const B = register(stage, (dt, now) => {
    let moving = stepS(bead, dt);
    for (const o of objs) {
      const h = tval(o.z, now);
      if (h !== o.drawn) { o.drawn = h; draw(o, h); }
      if (!tdone(o.z, now)) moving = true;
    }
    if (bead.x !== beadDrawn) { beadDrawn = bead.x; drawBead(bead.x); }
    return moving;
  });
  bag.add(B.unregister);

  /** Sends every pad to its height for stop a (-1 for rest), staggered outwards from `from`. The lift falls off with distance and is clamped. */
  function aim(a, from) {
    const now = performance.now(), up = clamp(lift, 0, HMAX);
    objs.forEach((o, i) => tset(o.z, REST[i] + (a < 0 ? 0 : up * FALL[Math.abs(i - a)]), now, Math.abs(i - from) * STAG));
    B.wake();
  }

  /** At rest the capsule and its trail are the bright mark; stop a takes it from them. At the monitor one dark unit comes on. */
  function setActive(a) {
    if (a !== act) {
      const from = a >= 0 ? a : act;
      act = a;
      objs.forEach((o, i) => o.sol.forEach(([el]) => el.sil.classList.toggle("hi", i === a)));
      land.classList.toggle("off", a !== 3);
      land.classList.toggle("m", a === 3);
      aim(a, from);
    }
    cap.sil.classList.toggle("hi", act < 0);
    trail[0].classList.toggle("m", act >= 0);
    read.textContent = act < 0 ? "rest" : NAMES[act];
  }
  setActive(-1);

  // The hit test: the pointer's screen x between the four resting centres gives the distance travelled. Nothing it reads ever moves.
  function along(px) {
    for (let i = 0; i < 3; i++) if (px <= objs[i + 1].sx) return lerp(STOP[i], STOP[i + 1], clamp((px - objs[i].sx) / (objs[i + 1].sx - objs[i].sx), 0, 1));
    return STOP[3];
  }
  bag.add(pointer(stage, {
    move: (p) => {
      const s = along(p[0]);
      bead.t = s;
      setActive(STOP.reduce((a, v, k) => (Math.abs(v - s) < Math.abs(STOP[a] - s) ? k : a), 0));
      B.wake();
    },
    leave: () => { bead.t = HOME; setActive(-1); B.wake(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { lift = v; if (act >= 0) aim(act, act); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "pipeline",
  means: "A reading leaves a device, passes a phone and the cloud, and lands on the admin panel's fleet view.",
  rules: [1, 2, 4, 5, 8],
  range: [4, 10, 18],
  tour: [[88, 211], [143, 165], [200, 136], [302, 171], [88, 211], null],
  mount,
});
