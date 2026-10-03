import type { OperatorMetricPoint } from "@/lib/types";
import { Card, CardBody } from "@/components/ui/Card";
import { Sparkline } from "./Sparkline";

export function MetricCard({
  label,
  data,
  accent,
  formatValue,
  upIsGood = false,
}: {
  label: string;
  data: OperatorMetricPoint[];
  accent: string;
  formatValue: (v: number) => string;
  upIsGood?: boolean;
}) {
  const first = data[0]?.value ?? 0;
  const last = data[data.length - 1]?.value ?? 0;
  const change = first === 0 ? 0 : ((last - first) / first) * 100;
  const isIncrease = change > 0;
  const isGoodDirection = isIncrease === upIsGood;
  const deltaTone = change === 0 ? "text-stone-400" : isGoodDirection ? "text-emerald-600" : "text-red-600";

  return (
    <Card>
      <CardBody className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-stone-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-stone-900">{formatValue(last)}</p>
          {change !== 0 ? (
            <p className={`mt-1 text-xs font-medium ${deltaTone}`}>
              {isIncrease ? "▲" : "▼"} {Math.abs(change).toFixed(0)}% vs {data[0].label}
            </p>
          ) : null}
        </div>
        <Sparkline data={data} accent={accent} />
      </CardBody>
    </Card>
  );
}
