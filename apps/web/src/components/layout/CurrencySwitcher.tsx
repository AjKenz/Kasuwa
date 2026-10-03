"use client";

import { useState } from "react";
import type { Currency } from "@/lib/types";

const CURRENCIES: Currency[] = ["NGN", "USD", "EUR"];

/**
 * UI stub only — real conversion lands with the B4 convert_price tool and C4 formatting.
 */
export function CurrencySwitcher() {
  const [currency, setCurrency] = useState<Currency>("NGN");

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      aria-label="Currency"
      className="rounded-md border border-stone-300 bg-white px-2 py-1 text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
