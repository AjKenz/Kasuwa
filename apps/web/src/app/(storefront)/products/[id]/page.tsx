import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";
import { ProductGallery } from "@/components/storefront/ProductGallery";
import { ProductTranslationPreview } from "@/components/storefront/ProductTranslationPreview";
import { PriceTag } from "@/components/storefront/PriceTag";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery category={product.category} hasGeneratedImage={Boolean(product.generatedImageUrl)} />

        <div className="space-y-6">
          <div>
            <ProductTranslationPreview translations={product.translations} />
          </div>

          <div className="flex items-center gap-3">
            <PriceTag
              priceMinor={product.priceMinor}
              currency={product.currency}
              className="font-display text-3xl font-semibold text-stone-900"
            />
            <Badge tone="neutral">Sold by {product.sellerName}</Badge>
          </div>

          <dl className="grid grid-cols-2 gap-3 rounded-2xl border border-stone-200 bg-white p-4 text-sm shadow-sm">
            {Object.entries(product.attributes).map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs uppercase tracking-wide text-stone-400">{key}</dt>
                <dd className="font-medium text-stone-800">{value}</dd>
              </div>
            ))}
          </dl>

          <Button size="lg" className="w-full sm:w-auto">
            Contact seller
          </Button>
        </div>
      </div>
    </div>
  );
}
