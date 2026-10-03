"use client";

import { useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/mock-data";
import { PhotoUploadZone } from "./PhotoUploadZone";
import { ListingEditorForm } from "./ListingEditorForm";
import { Skeleton } from "@/components/ui/Skeleton";

type Step = "upload" | "generating" | "editing";

const DRAFT = PRODUCTS[0];

export function NewListingWizard() {
  const [step, setStep] = useState<Step>("upload");

  useEffect(() => {
    if (step !== "generating") return;
    const timeout = setTimeout(() => setStep("editing"), 1400);
    return () => clearTimeout(timeout);
  }, [step]);

  if (step === "upload") {
    return <PhotoUploadZone onComplete={() => setStep("generating")} />;
  }

  if (step === "generating") {
    return (
      <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-6">
        <p className="text-sm font-medium text-stone-700">
          Sending your photo to the vision model and drafting a listing…
        </p>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return <ListingEditorForm draft={DRAFT} />;
}
