import { PRODUCTS } from "@/lib/mock-data";
import { StorefrontBrowser } from "@/components/storefront/StorefrontBrowser";

export default function HomePage() {
  const published = PRODUCTS.filter((p) => p.status === "published");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Kasuwa Market</h1>
        <p className="mt-1 text-sm text-stone-500">
          Fresh listings from sellers across Nigeria, translated for every buyer.
        </p>
      </div>
      <StorefrontBrowser products={published} />
    </div>
  );
}
