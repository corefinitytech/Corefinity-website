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
  const baseY = 250;
  return (
    <Frame
      title="A launch planned for about 50 users that received 11,670 instead"
      viewBox="0 0 760 300"
    >
      <line x1={60} y1={baseY} x2={720} y2={baseY} stroke={LINE} strokeWidth={1.5} />
      <line x1={60} y1={40} x2={60} y2={baseY} stroke={LINE} strokeWidth={1.5} />

      {/* The plan: a gentle climb */}
      <path
        d={`M70 ${baseY - 6} C 200 ${baseY - 12}, 320 ${baseY - 20}, 430 ${baseY - 28}`}
        fill="none"
        stroke={MUTED}
        strokeWidth={2}
        strokeDasharray="6 6"
      />
      <text x={130} y={baseY - 20} fontSize={13} fill={MUTED}>
        What the plan assumed
      </text>
      <text x={130} y={baseY - 4} fontSize={12} fill={MUTED}>
        roughly 50 people, arriving steadily
      </text>

      {/* What happened */}
      <path
        d={`M430 ${baseY - 28} C 500 ${baseY - 34}, 520 ${baseY - 60}, 545 ${baseY - 150} C 560 ${baseY - 200}, 580 ${baseY - 214}, 640 ${baseY - 216} L 640 ${baseY} L 430 ${baseY} Z`}
        fill="#1570bc18"
      />
      <path
        d={`M430 ${baseY - 28} C 500 ${baseY - 34}, 520 ${baseY - 60}, 545 ${baseY - 150} C 560 ${baseY - 200}, 580 ${baseY - 214}, 640 ${baseY - 216}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={3}
      />
      <circle cx={640} cy={baseY - 216} r={6} fill={ACCENT} />

      <text x={470} y={52} fontSize={26} fontWeight={600} fill={INK}>
        11,670
      </text>
      <text x={470} y={72} fontSize={13} fill={MUTED}>
        people wanted in
      </text>

      <text x={64} y={baseY + 24} fontSize={12} fill={MUTED}>
        Launch day
      </text>
      <text x={596} y={baseY + 24} fontSize={12} fill={MUTED}>
        Same week
      </text>

      <g>
        <rect x={392} y={baseY - 22} width={4} height={22} rx={2} fill={CORAL} />
        <text x={286} y={baseY + 24} fontSize={12} fill={CORAL}>
          the moment the plan stopped being true
        </text>
      </g>
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

export const diagrams = {
  "growth-spike": GrowthSpikeDiagram,
  "signup-flow": SignupFlowDiagram,
  bottleneck: BottleneckDiagram,
  "customer-journey": CustomerJourneyDiagram,
} as const;

export type DiagramKey = keyof typeof diagrams;
