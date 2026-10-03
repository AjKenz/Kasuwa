import { PRODUCTS } from "@/lib/mock-data";
import { StorefrontBrowser } from "@/components/storefront/StorefrontBrowser";
import { MarketHero } from "@/components/storefront/MarketHero";

export default function HomePage() {
  const published = PRODUCTS.filter((p) => p.status === "published");

  return (
    <div>
      <MarketHero />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-stone-900">Fresh listings</h2>
          <p className="text-sm text-stone-500">{published.length} products today</p>
        </div>
        <StorefrontBrowser products={published} />
      </div>
    </div>
  );
}
