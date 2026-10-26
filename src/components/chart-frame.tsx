import type { Tone } from "../tokens/tokens";
import { EmptyState } from "./empty-state";

export type ChartFrameProps = {
  title: string;
  tone: Tone;
  points: number[];
};

const viewWidth = 320;
const viewHeight = 120;
const padX = 8;
const padY = 12;

const strokeForTone: Record<Tone, string> = {
  positive: "var(--color-positive)",
  negative: "var(--color-negative)",
  neutral: "var(--color-fg)",
  attention: "var(--color-attention)",
};

export function ChartFrame({ title, tone, points }: ChartFrameProps) {
  return (
    <section className="pr-chart" aria-label={title}>
      <h2 className="pr-chart-title">{title}</h2>
      {points.length === 0 ? (
        <EmptyState title="No points" reason="This series has no values." />
      ) : (
        <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} aria-hidden="true">
          <polyline
            points={toPolyline(points)}
            fill="none"
            stroke={strokeForTone[tone]}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </section>
  );
}

function toPolyline(points: number[]): string {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const innerWidth = viewWidth - padX * 2;
  const innerHeight = viewHeight - padY * 2;
  const yFor = (point: number) => padY + (1 - (point - min) / span) * innerHeight;

  if (points.length === 1) {
    const y = yFor(points[0] ?? min);
    return `${padX},${round(y)} ${viewWidth - padX},${round(y)}`;
  }

  return points
    .map((point, index) => {
      const x = padX + (index / (points.length - 1)) * innerWidth;
      return `${round(x)},${round(yFor(point))}`;
    })
    .join(" ");
}

function round(value: number): string {
  return (Math.round(value * 100) / 100).toString();
}
