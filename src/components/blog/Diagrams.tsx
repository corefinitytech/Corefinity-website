import type { ReactNode } from "react";

/**
 * Article diagrams, drawn as inline SVG.
 *
 * Inline rather than images: they stay sharp at any size, cost no extra
 * request, carry real text that search engines and screen readers can read,
 * and are edited in the same place as the article. Each one scales with its
 * container through viewBox, so they work at phone width.
 *
 * Palette is the site's own: ink for structure, accent blue for the healthy
 * path, coral for the part under strain.
 */

const INK = "#14161a";
const MUTED = "#6b7484";
const ACCENT = "#1570bc";
const CORAL = "#f0503c";
const LINE = "#d9dce3";

function Frame({
  title,
  viewBox,
  children,
}: {
  title: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={title}
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      fontFamily="var(--font-inter), system-ui, sans-serif"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/** Rounded box with a label, used as a step in the flow diagrams. */
function Node({
  x,
  y,
  w = 148,
  h = 64,
  label,
  sub,
  tone = "plain",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: "plain" | "accent" | "strain" | "dark";
}) {
  const fill =
    tone === "dark" ? INK : tone === "strain" ? "#fdeeeb" : tone === "accent" ? "#e8f3fc" : "#ffffff";
  const stroke =
    tone === "dark" ? INK : tone === "strain" ? CORAL : tone === "accent" ? ACCENT : LINE;
  const text = tone === "dark" ? "#ffffff" : INK;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={500}
        fill={text}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 16}
          textAnchor="middle"
          fontSize={12}
          fill={tone === "dark" ? "#ffffffaa" : MUTED}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  from,
  to,
  y,
  tone = "plain",
  dashed = false,
}: {
  from: number;
  to: number;
  y: number;
  tone?: "plain" | "strain";
  dashed?: boolean;
}) {
  const color = tone === "strain" ? CORAL : ACCENT;
  return (
    <g>
      <line
        x1={from}
        y1={y}
        x2={to - 8}
        y2={y}
        stroke={color}
        strokeWidth={1.8}
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      <path d={`M${to} ${y} l-9 -5 v10 z`} fill={color} />
    </g>
  );
}

/** Planned demand against demand that actually turned up. */
export function GrowthSpikeDiagram() {
  // Plot area. Value axis runs 0 to 12,000 so 11,670 lands just under the top.
  const left = 112;
  const right = 908;
  const top = 88;
  const base = 336;
  const y = (value: number) => base - (value / 12000) * (base - top);
  const gridValues = [0, 3000, 6000, 9000, 12000];

  // The curve: flat for most of the week, then away.
  const actual =
    "M112 333 C 300 331, 470 327, 580 313 C 660 303, 702 281, 742 241 C 792 191, 838 124, 880 91";
  const turnX = 600;
  const turnY = 309;

  return (
    <Frame
      title="A launch planned for about 50 users that received 11,670 in the same week"
      viewBox="0 0 960 424"
    >
      <defs>
        <linearGradient id="cf-growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity={0.18} />
          <stop offset="100%" stopColor={ACCENT} stopOpacity={0.01} />
        </linearGradient>
      </defs>

      <text x={8} y={26} fontSize={15} fontWeight={500} fill={INK}>
        Planned demand, against what actually arrived
      </text>
      <text x={8} y={48} fontSize={13} fill={MUTED}>
        The same week, on the same system, sized for the number on the left.
      </text>

      {/* Value axis */}
      {gridValues.map((v) => (
        <g key={v}>
          <line x1={left} y1={y(v)} x2={right + 16} y2={y(v)} stroke={v === 0 ? LINE : "#eef0f4"} strokeWidth={1.5} />
          <text x={left - 16} y={y(v) + 4} textAnchor="end" fontSize={12} fill={MUTED}>
            {v.toLocaleString("en-GB")}
          </text>
        </g>
      ))}

      {/* What the plan assumed: a line that barely leaves the floor */}
      <path
        d="M112 333 C 340 330, 620 326, 908 318"
        fill="none"
        stroke={MUTED}
        strokeWidth={2}
        strokeDasharray="7 7"
        opacity={0.75}
      />
      <g>
        <line x1={286} y1={276} x2={330} y2={325} stroke={MUTED} strokeWidth={1.2} />
        <circle cx={330} cy={327} r={3.5} fill={MUTED} />
        <text x={188} y={250} fontSize={14} fontWeight={500} fill={INK}>
          What the plan assumed
        </text>
        <text x={188} y={268} fontSize={13} fill={MUTED}>
          Roughly 50 people, arriving steadily
        </text>
      </g>

      {/* What arrived */}
      <path d={`${actual} L 880 ${base} L 112 ${base} Z`} fill="url(#cf-growth-fill)" />
      <path d={actual} fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />

      {/* The point where the two stories separate */}
      <line x1={turnX} y1={turnY + 8} x2={turnX} y2={356} stroke={CORAL} strokeWidth={1.5} strokeDasharray="4 4" />
      <circle cx={turnX} cy={turnY} r={6.5} fill={CORAL} stroke="#ffffff" strokeWidth={2} />
      <g>
        <rect x={turnX - 148} y={358} width={296} height={26} rx={13} fill={CORAL} />
        <text x={turnX} y={375} textAnchor="middle" fontSize={12.5} fontWeight={500} fill="#ffffff">
          the moment the plan stopped being true
        </text>
      </g>

      {/* Where it ended up */}
      <line x1={806} y1={92} x2={868} y2={88} stroke={ACCENT} strokeWidth={1.2} />
      <circle cx={880} cy={91} r={7} fill={ACCENT} stroke="#ffffff" strokeWidth={2.5} />
      <text x={796} y={78} textAnchor="end" fontSize={26} fontWeight={600} fill={INK}>
        11,670
      </text>
      <text x={796} y={98} textAnchor="end" fontSize={13} fill={MUTED}>
        people wanted in
      </text>

      {/* Time axis */}
      <text x={left} y={406} fontSize={13} fontWeight={500} fill={MUTED}>
        Launch day
      </text>
      <text x={right + 16} y={406} textAnchor="end" fontSize={13} fontWeight={500} fill={MUTED}>
        Same week
      </text>
    </Frame>
  );
}

/** The chain of work hiding behind one tap. */
export function SignupFlowDiagram() {
  const y = 96;
  return (
    <Frame
      title="One signup travels through the website, the application, the database and outside services before the customer sees a result"
      viewBox="0 0 980 230"
    >
      <Node x={10} y={y} label="A person" sub="taps Sign up" tone="dark" />
      <Arrow from={158} to={196} y={y + 32} />
      <Node x={196} y={y} label="Your website" sub="takes the request" />
      <Arrow from={344} to={382} y={y + 32} />
      <Node x={382} y={y} label="Application" sub="checks the rules" tone="accent" />
      <Arrow from={530} to={568} y={y + 32} />
      <Node x={568} y={y} label="Database" sub="stores the account" tone="accent" />
      <Arrow from={716} to={754} y={y + 32} />
      <Node x={754} y={y} label="Other services" sub="email, payment, SMS" />

      <text x={10} y={44} fontSize={14} fontWeight={500} fill={INK}>
        One tap, five handovers
      </text>
      <text x={10} y={64} fontSize={13} fill={MUTED}>
        Each step waits for the one before it to answer.
      </text>

      <g>
        <line x1={84} y1={y + 78} x2={828} y2={y + 78} stroke={LINE} strokeWidth={1.5} />
        <line x1={84} y1={y + 72} x2={84} y2={y + 84} stroke={LINE} strokeWidth={1.5} />
        <line x1={828} y1={y + 72} x2={828} y2={y + 84} stroke={LINE} strokeWidth={1.5} />
        <rect x={352} y={y + 66} width={208} height={24} rx={12} fill="#ffffff" />
        <text x={456} y={y + 83} textAnchor="middle" fontSize={12} fill={MUTED}>
          under a second while it is quiet
        </text>
      </g>
    </Frame>
  );
}

/** The same chain when everyone arrives together. */
export function BottleneckDiagram() {
  const y = 118;
  return (
    <Frame
      title="Thousands of simultaneous requests queue at the slowest step, and every step behind it waits"
      viewBox="0 0 980 258"
    >
      <text x={10} y={30} fontSize={15} fontWeight={500} fill={INK}>
        Now the same path, with everyone arriving at once
      </text>

      {/* Crowd arriving */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line
            x1={12}
            y1={72 + i * 26}
            x2={150}
            y2={y + 28}
            stroke={ACCENT}
            strokeWidth={1.2}
            opacity={0.45}
          />
        </g>
      ))}
      <text x={12} y={62} fontSize={13} fontWeight={500} fill={INK}>
        11,670 people
      </text>
      <text x={12} y={244} fontSize={12} fill={MUTED}>
        all in the same hour
      </text>

      <Node x={150} y={y} w={140} label="Website" sub="keeps up" />
      <Arrow from={290} to={330} y={y + 32} />
      <Node x={330} y={y} w={150} label="Application" sub="keeps up" />
      <Arrow from={480} to={520} y={y + 32} tone="strain" />

      {/* The queue */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={492 + i * 7}
            y={y + 6}
            width={4}
            height={52}
            rx={2}
            fill={CORAL}
            opacity={0.25 + i * 0.15}
          />
        ))}
      </g>

      <Node x={540} y={y} w={168} label="Database" sub="queue building" tone="strain" />
      <Arrow from={708} to={748} y={y + 32} tone="strain" dashed />
      <Node x={748} y={y} w={150} label="Email, payment" sub="still waiting" tone="strain" />

      <text x={540} y={y + 90} fontSize={13} fontWeight={500} fill={CORAL}>
        One slow step
      </text>
      <text x={540} y={y + 108} fontSize={12} fill={MUTED}>
        Everything behind it waits, however fast the rest is.
      </text>

      <text x={150} y={y - 18} fontSize={12} fill={MUTED}>
        The parts that are fine are not the ones that decide the outcome.
      </text>
    </Frame>
  );
}

/** What the delay looks like from the customer's side. */
export function CustomerJourneyDiagram() {
  const steps: [string, string, number][] = [
    ["Page is slow", "waits a few seconds", 100],
    ["Tries again", "reloads, retypes", 62],
    ["Gives up", "closes the tab", 28],
    ["Goes elsewhere", "may never return", 9],
  ];
  const barTop = 150;
  const barMax = 64;
  return (
    <Frame
      title="A customer moves from a slow page to a reload, to giving up, to leaving for an alternative"
      viewBox="0 0 900 250"
    >
      <text x={10} y={28} fontSize={15} fontWeight={500} fill={INK}>
        What the customer experiences instead
      </text>
      <text x={10} y={48} fontSize={13} fill={MUTED}>
        Nobody in this sequence knows why it failed. They only know that it did.
      </text>

      {steps.map(([label, sub, share], i) => {
        const x = 10 + i * 224;
        const h = Math.round((share / 100) * barMax);
        const tone = i < 2 ? ACCENT : CORAL;
        return (
          <g key={label}>
            <rect x={x} y={72} width={196} height={62} rx={14} fill="#ffffff" stroke={LINE} strokeWidth={1.5} />
            <text x={x + 18} y={99} fontSize={15} fontWeight={500} fill={INK}>
              {label}
            </text>
            <text x={x + 18} y={118} fontSize={13} fill={MUTED}>
              {sub}
            </text>
            {i < steps.length - 1 && <Arrow from={x + 200} to={x + 222} y={103} tone={i < 1 ? "plain" : "strain"} />}

            {/* How many are still with you by this point */}
            <rect
              x={x}
              y={barTop + (barMax - h)}
              width={196}
              height={h}
              rx={8}
              fill={tone}
              opacity={i < 2 ? 0.2 : 0.28}
            />
            <text x={x + 18} y={barTop + barMax + 24} fontSize={12} fill={MUTED}>
              {i === 0 ? "everyone who arrived" : i === 3 ? "what you keep" : ""}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/** Readiness as a repeating habit rather than a one off project. */
export function ReadinessLoopDiagram() {
  const steps: [string, string][] = [
    ["Measure", "what the system does today"],
    ["Rehearse", "simulate the busy day"],
    ["Fix the first limit", "the step that gave way"],
    ["Watch", "so the next drift is visible"],
  ];
  return (
    <Frame
      title="Measure, rehearse, fix the first limit, watch, and repeat before the next growth event"
      viewBox="0 0 900 260"
    >
      <text x={10} y={28} fontSize={15} fontWeight={500} fill={INK}>
        Capacity is a habit, not a project
      </text>
      <text x={10} y={48} fontSize={13} fill={MUTED}>
        Each pass moves the ceiling. The limit moves with it, so the loop runs again.
      </text>

      {steps.map(([label, sub], i) => {
        const x = 10 + i * 224;
        return (
          <g key={label}>
            <rect x={x} y={84} width={196} height={66} rx={14} fill="#ffffff" stroke={i === 2 ? ACCENT : LINE} strokeWidth={1.5} />
            <text x={x + 18} y={106} fontSize={12} fontWeight={500} fill={ACCENT}>
              {`0${i + 1}`}
            </text>
            <text x={x + 18} y={126} fontSize={15} fontWeight={500} fill={INK}>
              {label}
            </text>
            <text x={x + 18} y={144} fontSize={12} fill={MUTED}>
              {sub}
            </text>
            {i < steps.length - 1 && <Arrow from={x + 200} to={x + 222} y={117} />}
          </g>
        );
      })}

      {/* Back round to the start */}
      <path
        d="M888 172 L888 200 Q888 212 876 212 L120 212 Q108 212 108 200 L108 179"
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.6}
        strokeDasharray="6 6"
      />
      <path d="M108 170 l-5 9 h10 z" fill={ACCENT} />
      <text x={400} y={236} fontSize={12} fill={MUTED}>
        before the next campaign, launch or busy season
      </text>
    </Frame>
  );
}

/**
 * Small stroked glyphs, drawn on a 24 by 24 grid and scaled into place.
 * Same construction as the site icons, so a diagram badge and a button icon
 * look like they came from the same set.
 */
const glyphs: Record<string, ReactNode> = {
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16.5 5.6a3 3 0 0 1 0 5.4" />
      <path d="M19 20c0-2.1-.8-4-2.2-5.2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  growth: (
    <>
      <path d="M4 17l5-5 3.5 3.5L20 8" />
      <path d="M15 8h5v5" />
    </>
  ),
  bolt: <path d="M13 3 6 13.5h5l-1 7.5 7-11h-5l1-7Z" />,
  shield: <path d="M12 3.2 19 6v5.2c0 4.4-2.9 8.3-7 9.6-4.1-1.3-7-5.2-7-9.6V6l7-2.8Z" />,
  link: (
    <>
      <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2-2a4 4 0 1 0-5.7-5.7l-1 1" />
      <path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2 2a4 4 0 1 0 5.7 5.7l1-1" />
    </>
  ),
  cloud: <path d="M7.5 18.5h9.2a3.8 3.8 0 0 0 .5-7.6 6 6 0 0 0-11.3 1.7 3.4 3.4 0 0 0 1.6 5.9Z" />,
  list: (
    <>
      <path d="M9 7h11M9 12h11M9 17h11" />
      <path d="M4.6 7h.02M4.6 12h.02M4.6 17h.02" />
    </>
  ),
  pulse: <path d="M3 12h3.8l2.4-7 4 14 2.4-7H21" />,
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8.5 7.5h7" />
      <path d="M8.6 12h.02M12 12h.02M15.4 12h.02M8.6 16h.02M12 16h.02M15.4 16h.02" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2.5" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
    </>
  ),
  question: (
    <>
      <path d="M9.4 9.2a2.7 2.7 0 1 1 3.8 2.5c-.9.4-1.2 1-1.2 1.9" />
      <path d="M12 17.2h.02" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.6V12l2.9 1.8" />
    </>
  ),
};

function Glyph({
  name,
  x,
  y,
  size = 17,
  color = ACCENT,
}: {
  name: keyof typeof glyphs | string;
  x: number;
  y: number;
  size?: number;
  color?: string;
}) {
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyphs[name]}
    </g>
  );
}

/** Badge behind a glyph. */
function Badge({
  x,
  y,
  r = 17,
  glyph,
  tone = "tint",
}: {
  x: number;
  y: number;
  r?: number;
  glyph: string;
  tone?: "tint" | "solid" | "onDark";
}) {
  const fill = tone === "solid" ? ACCENT : tone === "onDark" ? "#ffffff1f" : "#e8f3fc";
  const stroke = tone === "solid" || tone === "onDark" ? "#ffffff" : ACCENT;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <Glyph name={glyph} x={x} y={y} color={stroke} />
    </g>
  );
}

/** Heading pill, for the column titles. */
function ColumnHeading({ x, y, label, glyph }: { x: number; y: number; label: string; glyph: string }) {
  return (
    <g>
      <rect x={x} y={y} width={286} height={44} rx={22} fill="#eef5fc" />
      <Badge x={x + 24} y={y + 22} r={14} glyph={glyph} tone="solid" />
      <line x1={x + 46} y1={y + 12} x2={x + 46} y2={y + 32} stroke={ACCENT} strokeOpacity={0.3} strokeWidth={1.5} />
      <text x={x + 60} y={y + 28} fontSize={14} fontWeight={700} letterSpacing="0.1em" fill={INK}>
        {label}
      </text>
    </g>
  );
}

/** Caption under a diagram, with a rule either side. */
function FootNote({ y, text, width = 980 }: { y: number; text: string; width?: number }) {
  const half = text.length * 3.3;
  return (
    <g>
      <line x1={8} y1={y - 4} x2={width / 2 - half - 16} y2={y - 4} stroke={LINE} strokeWidth={1.5} />
      <text x={width / 2} y={y} textAnchor="middle" fontSize={12.5} fill={MUTED}>
        {text}
      </text>
      <line x1={width / 2 + half + 16} y1={y - 4} x2={width - 8} y2={y - 4} stroke={LINE} strokeWidth={1.5} />
    </g>
  );
}

/** The questions that go in, and the decisions that come out. */
export function SizingInputsDiagram() {
  const inputs: [string, string][] = [
    ["People in the busiest hour", "people"],
    ["What each person does", "person"],
    ["How fast the data grows", "growth"],
    ["How fast it has to feel", "bolt"],
    ["What must never fail", "shield"],
    ["What it leans on outside", "link"],
  ];
  const outputs: [string, string][] = [
    ["Shape of the hosting", "cloud"],
    ["Where the data lives", "database"],
    ["What gets kept ready or queued", "list"],
    ["What we watch, and when it alerts", "pulse"],
  ];
  const cx = 490;
  const cy = 250;

  return (
    <Frame
      title="Six business questions feed a sizing calculation, which decides four technical choices"
      viewBox="0 0 980 474"
    >
      <ColumnHeading x={8} y={8} label="WHAT WE ASK" glyph="question" />
      <ColumnHeading x={686} y={8} label="WHAT IT DECIDES" glyph="gear" />

      {inputs.map(([label, glyph], i) => {
        const y = 78 + i * 56;
        const mid = y + 23;
        return (
          <g key={label}>
            <path
              d={`M310 ${mid} C 350 ${mid}, 352 ${cy}, 392 ${cy}`}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1.4}
              strokeOpacity={0.35}
            />
            <rect x={8} y={y} width={302} height={46} rx={23} fill="#fbfcfe" stroke="#e7ebf2" strokeWidth={1.5} />
            <Badge x={39} y={mid} glyph={glyph} />
            <text x={68} y={mid + 5} fontSize={14.5} fill={INK}>
              {label}
            </text>
          </g>
        );
      })}

      {outputs.map(([label, glyph], i) => {
        const y = 106 + i * 72;
        const mid = y + 23;
        return (
          <g key={label}>
            <path
              d={`M588 ${cy} C 628 ${cy}, 630 ${mid}, 670 ${mid}`}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1.4}
              strokeOpacity={0.35}
            />
            <rect x={670} y={y} width={302} height={46} rx={23} fill="#fbfcfe" stroke="#e7ebf2" strokeWidth={1.5} />
            <Badge x={701} y={mid} glyph={glyph} />
            <text x={730} y={mid + 5} fontSize={14.5} fill={INK}>
              {label}
            </text>
          </g>
        );
      })}

      {/* The calculation in the middle */}
      <ellipse cx={cx} cy={cy} rx={150} ry={96} fill={ACCENT} opacity={0.05} />
      <rect x={392} y={188} width={196} height={124} rx={24} fill="#ffffff" stroke={ACCENT} strokeWidth={2} />
      <Badge x={cx} y={222} r={19} glyph="calculator" tone="solid" />
      <text x={cx} y={266} textAnchor="middle" fontSize={17} fontWeight={600} fill={INK}>
        The arithmetic
      </text>
      <text x={cx} y={286} textAnchor="middle" fontSize={12.5} fill={MUTED}>
        peak, per second,
      </text>
      <text x={cx} y={302} textAnchor="middle" fontSize={12.5} fill={MUTED}>
        then headroom
      </text>

      <FootNote y={452} text="Change one answer on the left and the right changes with it." />
    </Frame>
  );
}

/** Turning a headline number into the number a system actually feels. */
export function PeakMathDiagram() {
  const steps: [string, string][] = [
    ["10,000 visits", "expected on launch day"],
    ["55% in 2 hours", "the window that matters"],
    ["46 a minute", "at that pace"],
    ["3 actions each", "browse, sign up, pay"],
  ];
  return (
    <Frame
      title="A launch day visitor number reduced to requests per second, then multiplied for bursts"
      viewBox="0 0 980 328"
    >
      <text x={8} y={26} fontSize={15} fontWeight={500} fill={INK}>
        One number, translated into something you can build against
      </text>
      <text x={8} y={47} fontSize={13} fill={MUTED}>
        Back of an envelope arithmetic. Ten minutes, and it settles most arguments.
      </text>

      {steps.map(([value, note], i) => {
        const x = 8 + i * 178;
        return (
          <g key={value}>
            <rect x={x} y={84} width={158} height={96} rx={18} fill="#fbfcfe" stroke="#e7ebf2" strokeWidth={1.5} />
            <circle cx={x + 26} cy={110} r={13} fill="#e8f3fc" />
            <text x={x + 26} y={115} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={ACCENT}>
              {i + 1}
            </text>
            <text x={x + 18} y={148} fontSize={18} fontWeight={600} fill={INK}>
              {value}
            </text>
            <text x={x + 18} y={166} fontSize={11.5} fill={MUTED}>
              {note}
            </text>
          </g>
        );
      })}

      {/* Connectors last, so no box can clip an arrow head */}
      {[0, 1, 2, 3].map((i) => {
        const from = 8 + i * 178 + 162;
        const to = i === 3 ? 722 : 8 + (i + 1) * 178;
        return <Arrow key={i} from={from} to={to} y={132} />;
      })}

      {/* Where the arithmetic lands */}
      <rect x={726} y={84} width={246} height={96} rx={18} fill={INK} />
      <Badge x={760} y={112} r={15} glyph="clock" tone="onDark" />
      <text x={744} y={152} fontSize={20} fontWeight={600} fill="#ffffff">
        2 a second
      </text>
      <text x={744} y={170} fontSize={11.5} fill="#ffffffa8">
        average across the peak
      </text>

      {/* And where it has to be built */}
      <line x1={849} y1={184} x2={849} y2={212} stroke={ACCENT} strokeWidth={1.6} strokeDasharray="5 5" />
      <path d="M849 220 l-5.5 -9 h11 z" fill={ACCENT} />
      <rect x={612} y={224} width={360} height={66} rx={18} fill="#eef5fc" stroke={ACCENT} strokeWidth={1.5} />
      <Badge x={646} y={257} r={16} glyph="bolt" tone="solid" />
      <text x={676} y={252} fontSize={16} fontWeight={600} fill={INK}>
        Build for 8 to 20 a second
      </text>
      <text x={676} y={271} fontSize={12} fill={MUTED}>
        traffic arrives in bursts, never evenly
      </text>

      <text x={8} y={252} fontSize={13.5} fill={INK} fontWeight={500}>
        Two a second sounds like nothing.
      </text>
      <text x={8} y={272} fontSize={13} fill={MUTED}>
        On a quiet day it is. The burst is the number
      </text>
      <text x={8} y={290} fontSize={13} fill={MUTED}>
        worth designing against.
      </text>
    </Frame>
  );
}

/** How the three layers talk to each other on one request. */
export function LayersDiagram() {
  const top = 150;
  const h = 116;
  const cards: [number, string, string, string][] = [
    [8, "Frontend", "what the customer sees", "monitor"],
    [350, "Backend", "rules, checks, permissions", "gear"],
    [692, "Database", "the record of truth", "database"],
  ];
  return (
    <Frame
      title="The browser asks the backend, the backend asks the database, and the answer travels back the same way"
      viewBox="0 0 980 438"
    >
      <text x={8} y={26} fontSize={15} fontWeight={500} fill={INK}>
        Frontend, backend, database: who asks whom
      </text>
      <text x={8} y={47} fontSize={13} fill={MUTED}>
        The customer only ever talks to the first box. The rest happens out of sight.
      </text>

      <defs>
        <marker
          id="cf-layers-ask"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={ACCENT} />
        </marker>
        <marker
          id="cf-layers-answer"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={MUTED} />
        </marker>
      </defs>

      {/* Requests, travelling right over the top */}
      {[
        [288, 350, "asks for something"],
        [630, 692, "looks it up, or writes it"],
      ].map(([a, b, label]) => (
        <g key={label as string}>
          <path
            d={`M${a} ${top - 6} C ${(a as number) + 24} ${top - 48}, ${(b as number) - 24} ${top - 48}, ${b} ${top - 4}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.8}
            markerEnd="url(#cf-layers-ask)"
          />
          <text
            x={((a as number) + (b as number)) / 2}
            y={top - 54}
            textAnchor="middle"
            fontSize={12.5}
            fill={ACCENT}
          >
            {label}
          </text>
        </g>
      ))}

      {cards.map(([x, title, sub, glyph], i) => {
        const dark = i === 0;
        return (
          <g key={title}>
            <rect
              x={x}
              y={top}
              width={280}
              height={h}
              rx={22}
              fill={dark ? INK : "#ffffff"}
              stroke={dark ? INK : ACCENT}
              strokeWidth={dark ? 1.5 : 2}
            />
            <Badge x={x + 40} y={top + 40} r={18} glyph={glyph} tone={dark ? "onDark" : "tint"} />
            <text x={x + 70} y={top + 46} fontSize={18} fontWeight={600} fill={dark ? "#ffffff" : INK}>
              {title}
            </text>
            <text x={x + 24} y={top + 88} fontSize={12.5} fill={dark ? "#ffffffa8" : MUTED}>
              {sub}
            </text>
          </g>
        );
      })}

      {/* Answers, travelling back underneath */}
      {[
        [350, 288, "an answer, shaped for the screen"],
        [692, 630, "rows come back"],
      ].map(([a, b, label]) => (
        <g key={label as string}>
          <path
            d={`M${a} ${top + h + 6} C ${(a as number) - 24} ${top + h + 48}, ${(b as number) + 24} ${top + h + 48}, ${b} ${top + h + 4}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.6}
            strokeDasharray="5 5"
            markerEnd="url(#cf-layers-answer)"
          />
          <text
            x={((a as number) + (b as number)) / 2}
            y={top + h + 66}
            textAnchor="middle"
            fontSize={12.5}
            fill={MUTED}
          >
            {label}
          </text>
        </g>
      ))}

      <text x={8} y={372} fontSize={12.5} fill={MUTED}>
        The frontend never speaks to the database directly. That rule is what keeps your
      </text>
      <text x={8} y={390} fontSize={12.5} fill={MUTED}>
        data safe when somebody starts poking at the page from the outside.
      </text>

      <rect x={586} y={348} width={386} height={62} rx={18} fill="#fdeeeb" stroke={CORAL} strokeWidth={1.5} />
      <circle cx={620} cy={379} r={15} fill="#ffffff" />
      <Glyph name="bolt" x={620} y={379} size={16} color={CORAL} />
      <text x={646} y={374} fontSize={13} fontWeight={600} fill={INK}>
        Under load, queues form at this middle hop
      </text>
      <text x={646} y={393} fontSize={12} fill={MUTED}>
        so the backend and the database get sized together
      </text>
    </Frame>
  );
}

/** Capacity added in stages, each with the signal that triggers it. */
export function CapacityLadderDiagram() {
  const stages: [string, string, string][] = [
    ["One box does it all", "At launch, and for longer", "than most people expect"],
    ["Separate the database", "When the app and database", "fight over one machine"],
    ["Keep busy pages ready", "When thousands ask for", "exactly the same thing"],
    ["Move slow work aside", "When emails and reports", "hold up the checkout"],
    ["Run several copies", "When one machine", "has become the ceiling"],
  ];
  const w = 172;
  const h = 122;

  return (
    <Frame
      title="Five stages of capacity, each added when a specific signal appears rather than all at once"
      viewBox="0 0 980 424"
    >
      <text x={8} y={26} fontSize={15} fontWeight={500} fill={INK}>
        Capacity gets added in stages, not all at once
      </text>
      <text x={8} y={47} fontSize={13} fill={MUTED}>
        Each step is modest on its own, and each one waits for the signal underneath it.
      </text>
      <text x={8} y={67} fontSize={13} fill={MUTED}>
        Doing all five before launch is how budgets disappear.
      </text>

      {stages.map(([title, l1, l2], i) => {
        const x = 8 + i * 196;
        const y = 240 - i * 38;
        const first = i === 0;
        return (
          <g key={title}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={18}
              fill={first ? "#eef5fc" : "#fbfcfe"}
              stroke={first ? ACCENT : "#e7ebf2"}
              strokeWidth={first ? 2 : 1.5}
            />
            <circle cx={x + 30} cy={y + 30} r={15} fill={first ? ACCENT : "#e8f3fc"} />
            <text
              x={x + 30}
              y={y + 35}
              textAnchor="middle"
              fontSize={11.5}
              fontWeight={700}
              fill={first ? "#ffffff" : ACCENT}
            >
              {`0${i + 1}`}
            </text>
            <text x={x + 16} y={y + 68} fontSize={13} fontWeight={500} fill={INK}>
              {title}
            </text>
            <line
              x1={x + 16}
              y1={y + 80}
              x2={x + w - 16}
              y2={y + 80}
              stroke={first ? "#cfe4f7" : "#eef0f4"}
              strokeWidth={1.5}
            />
            <text x={x + 16} y={y + 98} fontSize={11.5} fill={MUTED}>
              {l1}
            </text>
            <text x={x + 16} y={y + 113} fontSize={11.5} fill={MUTED}>
              {l2}
            </text>
          </g>
        );
      })}

      {/* Connectors last, so no card can clip an arrow head */}
      {stages.slice(0, -1).map((stage, i) => {
        const x = 8 + i * 196;
        const y = 240 - i * 38;
        // Both cards exist between y and y + 84, so an arrow at y + 42 points
        // from one to the next without drifting above or below either.
        return <Arrow key={`step-${stage[0]}`} from={x + 175} to={x + 193} y={y + 42} />;
      })}

      <FootNote
        y={410}
        text="The signal matters more than the step. Capacity added before the signal is guesswork with an invoice."
      />
    </Frame>
  );
}

export const diagrams = {
  "growth-spike": GrowthSpikeDiagram,
  "signup-flow": SignupFlowDiagram,
  bottleneck: BottleneckDiagram,
  "customer-journey": CustomerJourneyDiagram,
  "readiness-loop": ReadinessLoopDiagram,
  "sizing-inputs": SizingInputsDiagram,
  "peak-math": PeakMathDiagram,
  layers: LayersDiagram,
  "capacity-ladder": CapacityLadderDiagram,
} as const;

export type DiagramKey = keyof typeof diagrams;
