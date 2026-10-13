/**
 * Surge: a broad tray holding a grid of 81 device studs, and one gateway
 * block on its front apron. One corner of the tray is a raised platform:
 * the patch the launch was planned for. The studs on it are up and lit. The
 * pointer is where the crowd arrives: studs rise and light around it, falling
 * off with distance, far past the platform, while the gateway stays
 * level. At rest a first ripple has already spilled off its edge. The
 * gateway's edge is the bright mark. The slider is the radius, in studs.
 *
 * The pattern: a continuous field. A spring per stud, a falloff by distance,
 * and a hit test on the tray's top, which never moves.
 */
const {
  Cam, clamp, facing, fit, prism, proj, r2, rings, unproj, spring, stepS,
  disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const N = 9, CELL = 12, FOOT = 8.4, EXT = N * CELL, LOW = 1.4, RISE = 9, ON = 0.3;
const PLAN = [6, 8, 6, 8], PZ = 5;   // the planned patch: the front corner, three studs by three, on a platform PZ high

/** The share of full height at u radii from the pointer: 1 at it, .31 at 42% of the radius, .09 at the edge and nothing beyond. */
const falloff = (u) => (u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let R = value * CELL, over = null;

  const C = Cam(45, 0.5, 1.8);
  fit(C, [[-6, -6, -4], [EXT + 6, EXT + 26, -4], [EXT + 6, -6, -4], [-6, EXT + 26, -4], [0, 0, LOW + RISE], [PLAN[0] * CELL, PLAN[2] * CELL, PZ + LOW + RISE]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const box = (x0, y0, x1, y1, r, b, z0, z1) => { const el = solid(g); put(el, prism(P, front, ...rings(x0, y0, x1, y1, r, b), z0, z1)); return el; };

  // Back to front: the tray, every stud off the platform diagonal by diagonal, the platform, the studs on it, then the
  // gateway. The platform is the tray's front corner, so nothing off it ever stands in front of it.
  box(-6, -6, EXT + 6, EXT + 26, 10, 2.2, -4, 0);
  const cells = [], studs = [];
  for (let s = 0; s <= 2 * (N - 1); s++) for (let i = 0; i < N; i++) {
    const j = s - i;
    // how far outside the plan this stud is, in studs: 0 on the platform
    if (j >= 0 && j < N) cells.push({ i, j, out: Math.max(PLAN[0] - i, i - PLAN[1], PLAN[2] - j, j - PLAN[3], 0) });
  }
  const stud = ({ i, j, out }) => {
    const x0 = i * CELL + (CELL - FOOT) / 2, y0 = j * CELL + (CELL - FOOT) / 2, el = solid(g), dot = flatDot(el.g, C, 1, "dot off");
    studs.push({ i, j, out, z: out ? 0 : PZ, rg: rings(x0, y0, x0 + FOOT, y0 + FOOT, 2.2, 0.8), el, dot, a: spring(0, { eps: 0.004 }), drawn: NaN });
  };
  cells.filter((c) => c.out).forEach(stud);
  box(PLAN[0] * CELL - 1, PLAN[2] * CELL - 1, EXT + 1, EXT + 1, 4, 1.4, 0, PZ);
  cells.filter((c) => !c.out).forEach(stud);

  // The gateway: a low block with an antenna stub and three lights, on the apron beside the plan. It never moves.
  const gate = box(8, EXT + 6, 48, EXT + 19, 3, 1.2, 0, 9);
  box(39, EXT + 9, 42.4, EXT + 12.4, 1.6, 0.5, 9, 19);
  for (const x of [14, 19, 24]) place(mk("circle", { r: r2(1.05 * C.S), class: "dot m" }, g), P(x, EXT + 19, 4.5));
  gate.sil.classList.add("hi");

  function draw(c) {
    const a = c.a.x;
    if (a === c.drawn) return;
    c.drawn = a;
    const h = LOW + RISE * clamp(a, 0, 1);
    put(c.el, prism(P, front, c.rg[0], c.rg[1], c.z, c.z + h));
    place(c.dot, P((c.i + 0.5) * CELL, (c.j + 0.5) * CELL, c.z + h));
    c.dot.setAttribute("class", a > ON ? "dot m" : "dot off");
  }

  const B = register(stage, (dt) => {
    let moving = false;
    for (const c of studs) { if (stepS(c.a, dt)) moving = true; draw(c); }
    return moving;
  });
  bag.add(B.unregister);

  /** The plan is always up. At rest the studs just off the platform are half up: the first ripple. Under the pointer the crowd is a field around it. */
  function retarget() {
    let lit = 0;
    for (const c of studs) {
      const base = c.out === 0 ? 1 : !over && c.out === 1 ? 0.46 : 0;
      const far = over ? Math.hypot((c.i + 0.5) * CELL - over[0], (c.j + 0.5) * CELL - over[1]) / R : Infinity;
      c.a.t = Math.max(base, falloff(far));
      if (c.a.t > ON) lit++;
    }
    read.textContent = over ? String(lit) : "rest";
    B.wake();
  }
  retarget();

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * CELL; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "surge",
  means: "A launch planned for one small platform of devices spreads far across the tray, and the gateway in front has to hold steady.",
  rules: [1, 3, 4, 5, 9],
  range: [2.5, 4.5, 7],
  tour: [[213, 199], [289, 181], [225, 137], [149, 162], null],
  mount,
});
