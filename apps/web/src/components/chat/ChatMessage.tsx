import { cn } from "@/lib/utils";
import type { ChatMessageData } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-start gap-2", isUser && "flex-row-reverse")}>
      <Avatar name={isUser ? "You" : "Kasuwa"} />
      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        {message.toolCall ? (
          <div className="rounded-md border border-dashed border-stone-300 bg-stone-50 px-2.5 py-1.5 font-mono text-[11px] text-stone-500">
            🔧 {message.toolCall.name}(
            {Object.entries(message.toolCall.arguments)
              .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
              .join(", ")}
            )
          </div>
        ) : null}
        <div
          className={cn(
            "rounded-xl px-3 py-2 text-sm",
            isUser ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-800",
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
