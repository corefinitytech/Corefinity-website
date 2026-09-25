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
        x2={to - 7}
        y2={y}
        stroke={color}
        strokeWidth={1.8}
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      <path d={`M${to} ${y} l-8 -4.5 v9 z`} fill={color} />
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
        d="M888 172 L888 200 Q888 212 876 212 L120 212 Q108 212 108 200 L108 182"
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.6}
        strokeDasharray="6 6"
      />
      <path d="M108 172 l-4.5 8 h9 z" fill={ACCENT} />
      <text x={400} y={236} fontSize={12} fill={MUTED}>
        before the next campaign, launch or busy season
      </text>
    </Frame>
  );
}

export const diagrams = {
  "growth-spike": GrowthSpikeDiagram,
  "signup-flow": SignupFlowDiagram,
  bottleneck: BottleneckDiagram,
  "customer-journey": CustomerJourneyDiagram,
  "readiness-loop": ReadinessLoopDiagram,
} as const;

export type DiagramKey = keyof typeof diagrams;
