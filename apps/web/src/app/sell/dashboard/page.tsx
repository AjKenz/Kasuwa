import Link from "next/link";
import { PRODUCTS } from "@/lib/mock-data";
import { SellerProductTable } from "@/components/seller/SellerProductTable";
import { StatTile } from "@/components/ui/StatTile";
import { LinkButton } from "@/components/ui/Button";

export default function SellerDashboardPage() {
  const published = PRODUCTS.filter((p) => p.status === "published").length;
  const drafts = PRODUCTS.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-stone-900">My listings</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage what buyers see in English, French and Arabic.
          </p>
        </div>
        <LinkButton href="/sell/new">+ New listing</LinkButton>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile label="Published" value={published} />
        <StatTile label="Drafts" value={drafts} tone="neutral" />
        <StatTile label="Languages per listing" value="3" />
      </div>

      <SellerProductTable products={PRODUCTS} />

      <p className="text-xs text-stone-400">
        Row data is static for now. Real listings arrive once feature 2 (photo upload) and
        feature 3 (AI listing draft) are wired up in{" "}
        <Link href="/admin" className="underline underline-offset-2">
          Track A / B
        </Link>
        .
      </p>
    </div>
  );
}
