import { CATEGORY_THEME } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ProductMedia({
  category,
  variant = "source",
  className,
}: {
  category: string;
  variant?: "source" | "lifestyle";
  className?: string;
}) {
  const theme = CATEGORY_THEME[category] ?? { emoji: "🛍️", gradient: "from-stone-200 to-stone-400" };
  return (
    <div
      className={cn(
        "bg-weave relative flex items-center justify-center overflow-hidden bg-linear-to-br",
        theme.gradient,
        className,
      )}
    >
      <span className="text-5xl drop-shadow-sm" aria-hidden>
        {theme.emoji}
      </span>
      {variant === "lifestyle" ? (
        <span className="sr-only">AI-generated lifestyle image placeholder</span>
      ) : null}
    </div>
  );
}
