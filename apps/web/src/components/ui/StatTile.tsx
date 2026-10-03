import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function StatTile({
  label,
  value,
  delta,
  tone = "neutral",
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  tone?: "neutral" | "positive" | "negative";
}) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-stone-900">{value}</p>
      {delta ? (
        <p
          className={cn(
            "mt-1 text-xs font-medium",
            tone === "positive" && "text-emerald-600",
            tone === "negative" && "text-red-600",
            tone === "neutral" && "text-stone-400",
          )}
        >
          {delta}
        </p>
      ) : null}
    </div>
  );
}
