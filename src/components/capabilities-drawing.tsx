"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * GA elevation of one Orion portal frame, driven by `s` (0..3):
 * 0-1 Design: the frame draws itself with grid and dimensions.
 * 1-2 Supply: it separates into its member groups, tagged M.01-M.04.
 * 2-3 Erection: members return in erection order under a crane hook,
 *     columns get a plumb check, the roof sheet line goes on last.
 * Coordinates are in the 800x520 viewBox.
 */

const INK = "#c4d0e0";
const FILL = "#182f4c";
const DIM = "#e0916a";
const GRID = "#5f6e85";
const CRANE = "#8fa1ba";

const GROUND = 440;

const path = (pts: [number, number][], close = true) =>
  "M" + pts.map(([x, y]) => `${x} ${y}`).join(" L ") + (close ? " Z" : "");
const mirror = (pts: [number, number][]) =>
  pts.map(([x, y]) => [800 - x, y] as [number, number]);

const COL_L: [number, number][] = [[163, GROUND], [177, GROUND], [183, 214], [157, 214]];
const RAF_L: [number, number][] = [[157, 208], [400, 166], [400, 180], [183, 234]];
const PLATE_L: [number, number][] = [[152, GROUND], [188, GROUND], [188, GROUND + 5], [152, GROUND + 5]];

function lerp(a: [number, number], b: [number, number], f: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}
const square = ([x, y]: [number, number], r = 4) =>
  `M${x - r} ${y - r} h${r * 2} v${r * 2} h${-r * 2} Z`;

const PURLIN_FRACTIONS = [0.06, 0.2, 0.34, 0.48, 0.62, 0.76, 0.9];
const PURLINS = [
  ...PURLIN_FRACTIONS.map((f) => lerp([157, 208], [400, 166], f)),
  ...PURLIN_FRACTIONS.map((f) => lerp([643, 208], [400, 166], f)),
]
  .map(([x, y]) => square([x, y - 6]))
  .join(" ");
const GIRT_Y = [262, 312, 362, 412];
const GIRTS_L = GIRT_Y.map((y) => square([150, y])).join(" ");
const GIRTS_R = GIRT_Y.map((y) => square([650, y])).join(" ");
const BOLTS =
  "M162 445 V466 M178 445 V466 M622 445 V466 M638 445 V466";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const c = clamp01(v);
  return c * c * (3 - 2 * c);
};

type Group = {
  key: string;
  dx: number;
  dy: number;
  rot: number;
  stagger: number; // order in the explode
  back: number; // stage time it returns to place during erection
};

const GROUPS: Record<string, Group> = {
  plates: { key: "plates", dx: 0, dy: 34, rot: 0, stagger: 0, back: 2.05 },
  colL: { key: "colL", dx: -62, dy: 14, rot: 0, stagger: 1, back: 2.12 },
  colR: { key: "colR", dx: 62, dy: 14, rot: 0, stagger: 1, back: 2.2 },
  rafL: { key: "rafL", dx: -38, dy: -60, rot: -5, stagger: 2, back: 2.32 },
  rafR: { key: "rafR", dx: 38, dy: -60, rot: 5, stagger: 2, back: 2.44 },
  purlins: { key: "purlins", dx: 0, dy: -96, rot: 0, stagger: 3, back: 2.56 },
  girtsL: { key: "girtsL", dx: -96, dy: 0, rot: 0, stagger: 3, back: 2.62 },
  girtsR: { key: "girtsR", dx: 96, dy: 0, rot: 0, stagger: 3, back: 2.66 },
};

/** 0 = assembled, 1 = fully separated. */
function explodeAt(v: number, g: Group) {
  if (v < 2) return smooth((v - 1.05 - g.stagger * 0.04) / 0.38);
  return 1 - smooth((v - g.back) / 0.16);
}

function useGroup(s: MotionValue<number>, g: Group) {
  const e = useTransform(s, (v) => explodeAt(v, g));
  const x = useTransform(e, (v) => v * g.dx);
  const y = useTransform(e, (v) => v * g.dy);
  const rotate = useTransform(e, (v) => v * g.rot);
  return { e, style: { x, y, rotate, transformBox: "fill-box" as const, originX: 0.5, originY: 0.5 } };
}

/** 0..1 progress of `s` between stage times a and b. */
function useRange(s: MotionValue<number>, a: number, b: number) {
  return useTransform(s, [a, b], [0, 1], { clamp: true });
}

export function CapabilitiesDrawing({ s }: { s: MotionValue<number> }) {
  // Design: draw order.
  const drawGround = useRange(s, 0, 0.15);
  const drawGrid = useRange(s, 0.02, 0.22);
  const drawPed = useRange(s, 0.1, 0.26);
  const drawCols = useRange(s, 0.2, 0.44);
  const drawRafs = useRange(s, 0.36, 0.6);
  const drawSecondary = useRange(s, 0.52, 0.72);
  const fillMembers = useRange(s, 0.55, 0.75);
  const drawDims = useRange(s, 0.62, 0.86);
  const dimsOpacity = useTransform(s, [0.62, 0.7, 1.0, 1.14], [0, 1, 1, 0]);

  // Supply: tags and the cladding pack.
  const tagOpacity = useTransform(s, [1.32, 1.48, 2.0, 2.1], [0, 1, 1, 0]);
  const packOpacity = useTransform(s, [1.28, 1.42, 2.66, 2.76], [0, 1, 1, 0]);

  // Erection: crane, plumb checks, roof sheet line.
  const craneOpacity = useTransform(s, [1.96, 2.1, 2.86, 2.98], [0, 1, 1, 0]);
  const plumbOpacity = useTransform(s, [2.26, 2.32, 2.48, 2.56], [0, 1, 1, 0]);
  const drawRoof = useRange(s, 2.72, 2.94);

  const plates = useGroup(s, GROUPS.plates);
  const colL = useGroup(s, GROUPS.colL);
  const colR = useGroup(s, GROUPS.colR);
  const rafL = useGroup(s, GROUPS.rafL);
  const rafR = useGroup(s, GROUPS.rafR);
  const purlins = useGroup(s, GROUPS.purlins);
  const girtsL = useGroup(s, GROUPS.girtsL);
  const girtsR = useGroup(s, GROUPS.girtsR);

  // Hook rides on the right rafter's midpoint while it is lifted.
  const hookX = useTransform(rafR.e, (v) => 521 + v * 38);
  const hookY = useTransform(rafR.e, (v) => 180 - v * 60);

  const memberFill = useTransform(fillMembers, (v) => v * 0.9);

  return (
    <svg
      viewBox="0 0 800 520"
      className="h-auto w-full"
      fill="none"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Grid lines A and B with bubbles. */}
      <g stroke={GRID} strokeWidth={1}>
        <motion.path d="M170 128 V472" strokeDasharray="6 6" style={{ pathLength: drawGrid }} />
        <motion.path d="M630 128 V472" strokeDasharray="6 6" style={{ pathLength: drawGrid }} />
        <motion.circle cx={170} cy={112} r={13} style={{ pathLength: drawGrid }} />
        <motion.circle cx={630} cy={112} r={13} style={{ pathLength: drawGrid }} />
      </g>
      <motion.g style={{ opacity: drawGrid }} className="max-md:hidden">
        <text x={170} y={117} textAnchor="middle" fill={GRID} fontSize={14} fontFamily="var(--font-jetbrains)">A</text>
        <text x={630} y={117} textAnchor="middle" fill={GRID} fontSize={14} fontFamily="var(--font-jetbrains)">B</text>
      </motion.g>

      {/* Ground line and concrete pedestals (fixed: foundations stay put). */}
      <motion.path d="M40 440 H760" stroke={INK} strokeWidth={1.5} style={{ pathLength: drawGround }} />
      <g stroke={GRID} strokeWidth={1} strokeDasharray="3 4">
        <motion.path d="M148 440 V472 H192 V440" style={{ pathLength: drawPed }} />
        <motion.path d="M608 440 V472 H652 V440" style={{ pathLength: drawPed }} />
      </g>

      {/* M.04 base plates and anchor bolts. */}
      <motion.g style={plates.style}>
        <motion.path d={path(PLATE_L) + " " + path(mirror(PLATE_L))} stroke={INK} strokeWidth={1.2} style={{ pathLength: drawPed, fillOpacity: memberFill }} fill={FILL} />
        <motion.path d={BOLTS} stroke={INK} strokeWidth={1.2} style={{ pathLength: drawPed }} />
        <motion.text x={196} y={466} fill={DIM} fontSize={13} fontFamily="var(--font-jetbrains)" letterSpacing="0.12em" style={{ opacity: tagOpacity }} className="max-md:hidden">M.04</motion.text>
      </motion.g>

      {/* M.01 primary frame: tapered columns and rafters. */}
      <motion.g style={colL.style}>
        <motion.path d={path(COL_L)} stroke={INK} strokeWidth={1.5} fill={FILL} style={{ pathLength: drawCols, fillOpacity: memberFill }} />
        <motion.text x={194} y={330} fill={DIM} fontSize={13} fontFamily="var(--font-jetbrains)" letterSpacing="0.12em" style={{ opacity: tagOpacity }} className="max-md:hidden">M.01</motion.text>
      </motion.g>
      <motion.g style={colR.style}>
        <motion.path d={path(mirror(COL_L))} stroke={INK} strokeWidth={1.5} fill={FILL} style={{ pathLength: drawCols, fillOpacity: memberFill }} />
      </motion.g>
      <motion.g style={rafL.style}>
        <motion.path d={path(RAF_L)} stroke={INK} strokeWidth={1.5} fill={FILL} style={{ pathLength: drawRafs, fillOpacity: memberFill }} />
        <motion.text x={246} y={228} fill={DIM} fontSize={13} fontFamily="var(--font-jetbrains)" letterSpacing="0.12em" style={{ opacity: tagOpacity }} className="max-md:hidden">M.01</motion.text>
      </motion.g>
      <motion.g style={rafR.style}>
        <motion.path d={path(mirror(RAF_L))} stroke={INK} strokeWidth={1.5} fill={FILL} style={{ pathLength: drawRafs, fillOpacity: memberFill }} />
      </motion.g>

      {/* M.02 secondary: purlins on the rafters, girts on the columns. */}
      <motion.g style={purlins.style}>
        <motion.path d={PURLINS} stroke={INK} strokeWidth={1.2} fill={FILL} style={{ pathLength: drawSecondary, fillOpacity: memberFill }} />
        <motion.text x={400} y={140} textAnchor="middle" fill={DIM} fontSize={13} fontFamily="var(--font-jetbrains)" letterSpacing="0.12em" style={{ opacity: tagOpacity }} className="max-md:hidden">M.02</motion.text>
      </motion.g>
      <motion.g style={girtsL.style}>
        <motion.path d={GIRTS_L} stroke={INK} strokeWidth={1.2} fill={FILL} style={{ pathLength: drawSecondary, fillOpacity: memberFill }} />
      </motion.g>
      <motion.g style={girtsR.style}>
        <motion.path d={GIRTS_R} stroke={INK} strokeWidth={1.2} fill={FILL} style={{ pathLength: drawSecondary, fillOpacity: memberFill }} />
      </motion.g>

      {/* M.03 roof cladding pack, delivered to the ground during supply. */}
      <motion.g style={{ opacity: packOpacity }}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M332 ${416 + i * 6} h128 v5 h-128 Z`} stroke={INK} strokeWidth={1} fill={FILL} />
        ))}
        <text x={470} y={434} fill={DIM} fontSize={13} fontFamily="var(--font-jetbrains)" letterSpacing="0.12em" className="max-md:hidden">M.03</text>
      </motion.g>

      {/* Roof sheet line, fixed last. */}
      <motion.path d="M146 200 L400 156 L654 200" stroke={DIM} strokeWidth={2} style={{ pathLength: drawRoof }} />

      {/* Dimensions. */}
      <motion.g stroke={DIM} strokeWidth={1} style={{ opacity: dimsOpacity }}>
        <motion.path d="M170 492 H630 M164 498 L176 486 M624 498 L636 486 M170 480 V500 M630 480 V500" style={{ pathLength: drawDims }} />
        <motion.path d="M104 440 V214 M98 446 L110 434 M98 220 L110 208 M92 440 H116 M92 214 H116" style={{ pathLength: drawDims }} />
        <motion.path d="M560 150 H600 V157" style={{ pathLength: drawDims }} />
      </motion.g>
      <motion.g style={{ opacity: dimsOpacity }} fill={DIM} fontFamily="var(--font-jetbrains)" fontSize={13} letterSpacing="0.14em" className="max-md:hidden">
        <text x={400} y={514} textAnchor="middle">SPAN 24 000</text>
        <text x={86} y={327} textAnchor="middle" transform="rotate(-90 86 327)">EAVE 8 000</text>
        <text x={604} y={146}>1:10</text>
      </motion.g>

      {/* Erection: crane and plumb checks. */}
      <motion.g style={{ opacity: craneOpacity }} stroke={CRANE} strokeWidth={1.4}>
        <path d="M724 440 V58 M736 440 V58 M724 80 L736 100 M736 120 L724 140 M724 160 L736 180 M736 200 L724 220 M724 240 L736 260 M736 280 L724 300 M724 320 L736 340 M736 360 L724 380 M724 400 L736 420" />
        <path d="M410 64 H782 M410 74 H782 M730 58 L700 40 L730 40 Z" />
        <motion.line x1={hookX} y1={74} x2={hookX} y2={hookY} strokeDasharray="2 3" />
        <motion.circle cx={hookX} cy={hookY} r={4} />
      </motion.g>
      <motion.g style={{ opacity: plumbOpacity }} stroke={DIM} strokeWidth={1} strokeDasharray="4 4">
        <path d="M170 150 V440 M630 150 V440" />
      </motion.g>
      <motion.g style={{ opacity: plumbOpacity }} fill={DIM} fontFamily="var(--font-jetbrains)" fontSize={12} letterSpacing="0.14em" className="max-md:hidden">
        <text x={178} y={160}>PLUMB</text>
        <text x={578} y={160}>PLUMB</text>
      </motion.g>
    </svg>
  );
}
