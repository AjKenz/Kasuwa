"use client";

import { useRef, useState, type DragEvent } from "react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

type Status = "idle" | "uploading" | "done";

export function PhotoUploadZone({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function startUpload(file: File) {
    setFileName(file.name);
    setStatus("uploading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + 15 + Math.random() * 15);
        if (next >= 100) {
          clearInterval(interval);
          setStatus("done");
          setTimeout(onComplete, 300);
        }
        return next;
      });
    }, 180);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) startUpload(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "rounded-xl border-2 border-dashed p-8 text-center transition-colors",
        isDragOver ? "border-amber-500 bg-amber-50" : "border-stone-300 bg-stone-50",
      )}
    >
      {status === "idle" ? (
        <>
          <p className="text-3xl" aria-hidden>
            📷
          </p>
          <p className="mt-2 text-sm font-medium text-stone-700">
            Drag a product photo here, or
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 text-sm font-semibold text-amber-700 underline underline-offset-2"
          >
            choose a file
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) startUpload(file);
            }}
          />
        </>
      ) : (
        <div className="mx-auto max-w-xs text-start">
          <p className="truncate text-sm font-medium text-stone-700">{fileName}</p>
          <ProgressBar value={progress} className="mt-2" />
          <p className="mt-1 text-xs text-stone-500">
            {status === "done" ? "Uploaded" : `Uploading… ${Math.round(progress)}%`}
          </p>
        </div>
      )}
    </div>
  );
}
