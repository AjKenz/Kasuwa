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
      className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <ProductMedia category={product.category} className="h-40 w-full" />
      <div className="space-y-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display line-clamp-2 text-base font-medium text-stone-900 group-hover:text-amber-800">
            {title}
          </h3>
          {product.status === "draft" ? <Badge tone="warning">Draft</Badge> : null}
        </div>
        <PriceTag
          priceMinor={product.priceMinor}
          currency={product.currency}
          className="text-sm font-semibold text-amber-900"
        />
        <p className="text-xs text-stone-500">{product.sellerName}</p>
      </div>
    </Link>
  );
}
