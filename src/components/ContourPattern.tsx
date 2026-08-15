

const WIDTH = 1600;
const HEIGHT = 900;
const LINES = 26;
const STEP = 40; // sample spacing along x

type Point = { x: number; y: number };

function samples(i: number): Point[] {
  const baseY = (HEIGHT / (LINES - 1)) * i;
  const pts: Point[] = [];

  for (let x = -120; x <= WIDTH + 120; x += STEP) {
    const t = x / WIDTH;
    const y =
      baseY +
      Math.sin(t * Math.PI * 1.9 + i * 0.52) * (46 + (i % 5) * 13) +
      Math.sin(t * Math.PI * 4.3 + i * 0.87) * (15 + (i % 3) * 8) +
      t * (36 + (i % 7) * 11) * (i % 2 === 0 ? -1 : 1);
    pts.push({ x, y });
  }

  return pts;
}

/** Midpoint-quadratic smoothing — turns the samples into one continuous curve. */
function toPath(pts: Point[]): string {
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;

  for (let i = 1; i < pts.length - 1; i += 1) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`;
  }

  const last = pts[pts.length - 1];
  return `${d} L ${last.x.toFixed(1)},${last.y.toFixed(1)}`;
}

const PATHS = Array.from({ length: LINES }, (_, i) => toPath(samples(i)));

export default function ContourPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none h-full w-full ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round">
        {PATHS.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
