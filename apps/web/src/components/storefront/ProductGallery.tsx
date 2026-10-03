"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./ProductMedia";
import { Badge } from "@/components/ui/Badge";

export function ProductGallery({
  category,
  hasGeneratedImage,
}: {
  category: string;
  hasGeneratedImage: boolean;
}) {
  const tabs = hasGeneratedImage ? (["lifestyle", "source"] as const) : (["source"] as const);
  const [active, setActive] = useState<(typeof tabs)[number]>(tabs[0]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl">
        <ProductMedia category={category} variant={active} className="h-80 w-full" />
        {active === "lifestyle" ? (
          <span className="absolute start-3 top-3">
            <Badge tone="info">AI-generated</Badge>
          </span>
        ) : null}
      </div>
      {tabs.length > 1 ? (
        <div className="mt-3 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "h-16 w-16 overflow-hidden rounded-lg ring-2 transition",
                active === tab ? "ring-amber-600" : "ring-transparent opacity-70 hover:opacity-100",
              )}
            >
              <ProductMedia category={category} variant={tab} className="h-full w-full" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
