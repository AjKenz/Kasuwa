import { OPERATOR_STATS } from "@/lib/mock-data";
import { StatTile } from "@/components/ui/StatTile";
import { MetricCard } from "@/components/admin/MetricCard";

export default function OperatorDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-stone-900">Operator dashboard</h1>
        <p className="mt-1 text-sm text-stone-500">
          Cost, errors and queue depth — this is what the game day in level A10 breaks on purpose.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile label="Requests today" value={OPERATOR_STATS.requestsToday.toLocaleString()} />
        <StatTile
          label="Errors today"
          value={OPERATOR_STATS.errorsToday}
          tone={OPERATOR_STATS.errorsToday > 5 ? "negative" : "positive"}
        />
        <StatTile
          label="Avg. cost per listing"
          value={`$${OPERATOR_STATS.avgCostPerListingUsd.toFixed(3)}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Cost per request (7d)"
          data={OPERATOR_STATS.costPerRequestUsd}
          accent="#0284c7"
          formatValue={(v) => `$${v.toFixed(3)}`}
        />
        <MetricCard
          label="Error rate (7d)"
          data={OPERATOR_STATS.errorRatePercent}
          accent="#dc2626"
          formatValue={(v) => `${v.toFixed(1)}%`}
        />
        <MetricCard
          label="Queue depth (24h)"
          data={OPERATOR_STATS.queueDepth}
          accent="#7c3aed"
          formatValue={(v) => `${Math.round(v)} jobs`}
        />
      </div>
    </div>
  );
}
