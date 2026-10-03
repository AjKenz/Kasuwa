import type { OperatorMetricPoint } from "@/lib/types";

const WIDTH = 160;
const HEIGHT = 40;
const PAD = 4;

export function Sparkline({
  data,
  accent,
}: {
  data: OperatorMetricPoint[];
  /** Tailwind color, e.g. "#0284c7" */
  accent: string;
}) {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((v, i) => {
    const x = PAD + (i / (values.length - 1)) * (WIDTH - PAD * 2);
    const y = HEIGHT - PAD - ((v - min) / range) * (HEIGHT - PAD * 2);
    return [x, y] as const;
  });

  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1][0]},${HEIGHT} L${points[0][0]},${HEIGHT} Z`;
  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width={WIDTH}
      height={HEIGHT}
      role="img"
      aria-label={`Trend across ${data.map((d) => d.label).join(", ")}`}
    >
      <path d={areaPath} fill={accent} opacity={0.1} stroke="none" />
      <path d={linePath} fill="none" stroke="#a8a29e" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lastX} cy={lastY} r={4} fill={accent} stroke="#fff" strokeWidth={2} />
    </svg>
  );
}
