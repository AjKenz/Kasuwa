import { NewListingWizard } from "@/components/seller/NewListingWizard";

export default function NewListingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-stone-900">New listing</h1>
        <p className="mt-1 text-sm text-stone-500">
          Upload one photo — Kasuwa drafts the title, description and translations for you.
        </p>
      </div>
      <NewListingWizard />
    </div>
  );
}
