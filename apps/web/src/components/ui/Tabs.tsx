"use client";

import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

export interface TabItem {
  key: string;
  label: string;
  badge?: ReactNode;
}

export function Tabs({
  items,
  defaultKey,
  onChange,
  children,
}: {
  items: TabItem[];
  defaultKey?: string;
  onChange?: (key: string) => void;
  children: (activeKey: string) => ReactNode;
}) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);

  function select(key: string) {
    setActive(key);
    onChange?.(key);
  }

  return (
    <div>
      <div className="flex gap-1 border-b border-stone-200">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => select(item.key)}
            className={cn(
              "flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              active === item.key
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-stone-500 hover:text-stone-800",
            )}
          >
            {item.label}
            {item.badge}
          </button>
        ))}
      </div>
      <div className="pt-4">{children(active)}</div>
    </div>
  );
}
