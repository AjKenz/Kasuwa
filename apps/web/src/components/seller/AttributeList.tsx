"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AttributeList({
  initial,
}: {
  initial: Record<string, string>;
}) {
  const [rows, setRows] = useState(
    Object.entries(initial).map(([key, value], i) => ({ id: `${i}-${key}`, key, value })),
  );

  function updateRow(id: string, field: "key" | "value", next: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: next } : r)));
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function addRow() {
    setRows((prev) => [...prev, { id: crypto.randomUUID(), key: "", value: "" }]);
  }

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.id} className="flex items-center gap-2">
          <Input
            value={row.key}
            onChange={(e) => updateRow(row.id, "key", e.target.value)}
            placeholder="Attribute"
            className="w-1/3"
          />
          <Input
            value={row.value}
            onChange={(e) => updateRow(row.id, "value", e.target.value)}
            placeholder="Value"
          />
          <button
            type="button"
            onClick={() => removeRow(row.id)}
            aria-label="Remove attribute"
            className="shrink-0 rounded-md p-2 text-stone-400 hover:bg-stone-100 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={addRow}>
        + Add attribute
      </Button>
    </div>
  );
}
