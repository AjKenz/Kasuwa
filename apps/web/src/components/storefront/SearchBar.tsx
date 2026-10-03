"use client";

import { Input } from "@/components/ui/Input";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-stone-400">
        🔍
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products, e.g. “blue bag under 20,000 naira”"
        className="ps-9"
        aria-label="Search products"
      />
    </div>
  );
}
