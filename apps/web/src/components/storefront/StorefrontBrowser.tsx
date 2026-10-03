"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";

export function StorefrontBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const title = p.translations.find((t) => t.locale === "en")?.title ?? "";
      return (
        title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sellerName.toLowerCase().includes(q)
      );
    });
  }, [products, query]);

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} />
      <ProductGrid products={filtered} />
    </div>
  );
}
