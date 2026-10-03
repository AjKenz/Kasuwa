"use client";

import { useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { ChatPanel } from "./ChatPanel";

export function AssistantWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-amber-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-amber-700"
      >
        <span aria-hidden>💬</span>
        Ask Kasuwa
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Shopping assistant">
        <ChatPanel />
      </Sheet>
    </>
  );
}
