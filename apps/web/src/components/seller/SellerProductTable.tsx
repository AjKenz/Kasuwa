import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/storefront/PriceTag";
import { ProductMedia } from "@/components/storefront/ProductMedia";
import { formatRelativeTime } from "@/lib/utils";

export function SellerProductTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200 text-start text-xs text-stone-500">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Languages</th>
            <th className="px-4 py-3 font-medium">Listed</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const title = product.translations.find((t) => t.locale === "en")?.title ?? "—";
            return (
              <tr key={product.id} className="border-b border-stone-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProductMedia category={product.category} className="h-10 w-10 rounded-md" />
                    <span className="font-medium text-stone-900">{title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={product.status === "published" ? "success" : "warning"}>
                    {product.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-stone-700">
                  <PriceTag priceMinor={product.priceMinor} currency={product.currency} />
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {product.translations.map((t) => t.locale.toUpperCase()).join(" · ")}
                </td>
                <td className="px-4 py-3 text-stone-500">{formatRelativeTime(product.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
