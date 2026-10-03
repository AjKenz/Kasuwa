import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductMedia } from "./ProductMedia";
import { PriceTag } from "./PriceTag";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  const title = product.translations.find((t) => t.locale === "en")?.title ?? "Untitled listing";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-md"
    >
      <ProductMedia category={product.category} className="h-40 w-full" />
      <div className="space-y-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-medium text-stone-900 group-hover:text-amber-700">
            {title}
          </h3>
          {product.status === "draft" ? <Badge tone="warning">Draft</Badge> : null}
        </div>
        <PriceTag
          priceMinor={product.priceMinor}
          currency={product.currency}
          className="text-sm font-semibold text-stone-900"
        />
        <p className="text-xs text-stone-500">{product.sellerName}</p>
      </div>
    </Link>
  );
}
