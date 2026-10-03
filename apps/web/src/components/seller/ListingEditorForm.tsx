"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AttributeList } from "./AttributeList";
import { LocaleTabs } from "./LocaleTabs";
import { ProductMedia } from "@/components/storefront/ProductMedia";

export function ListingEditorForm({ draft }: { draft: Product }) {
  const [category, setCategory] = useState(draft.category);
  const [price, setPrice] = useState((draft.priceMinor / 100).toString());
  const [published, setPublished] = useState(false);

  if (published) {
    return (
      <Card>
        <CardBody className="flex flex-col items-center gap-2 py-12 text-center">
          <span className="text-3xl" aria-hidden>
            ✅
          </span>
          <p className="font-medium text-stone-900">Listing published</p>
          <p className="max-w-sm text-sm text-stone-500">
            In the real build this hits the API Lambda (feature 3) and enqueues an image.generate
            job for the GCP worker (feature 5).
          </p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
      <div className="space-y-3">
        <ProductMedia category={category} className="h-40 w-full rounded-xl" />
        <Badge tone="info">AI-generated image pending</Badge>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Listing draft</CardTitle>
          <Badge tone="warning">Needs your review</Badge>
        </CardHeader>
        <CardBody className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" htmlFor="category">
              <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </Field>
            <Field label="Suggested price (NGN)" htmlFor="price">
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" />
            </Field>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-stone-600">Attributes</p>
            <AttributeList initial={draft.attributes} />
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-stone-600">
              Translations — edit any field, machine translations are marked until reviewed
            </p>
            <LocaleTabs initial={draft.translations} />
          </div>

          <div className="flex justify-end gap-2 border-t border-stone-200 pt-4">
            <Button type="button" variant="secondary">
              Save as draft
            </Button>
            <Button type="button" onClick={() => setPublished(true)}>
              Publish listing
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
