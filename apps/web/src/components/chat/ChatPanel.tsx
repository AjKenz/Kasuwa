"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessageData } from "@/lib/types";
import { CHAT_SAMPLE } from "@/lib/mock-data";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Avatar } from "@/components/ui/Avatar";

const CANNED_REPLIES = [
  "I checked the catalogue — here's the closest match I could find.",
  "That item is in stock. Want me to convert the price to your currency?",
  "I can only answer from what's listed on Kasuwa, so I can't help with that one.",
];

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessageData[]>(CHAT_SAMPLE);
  const [isThinking, setIsThinking] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  function handleSend(text: string) {
    const userMessage: ChatMessageData = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    setTimeout(() => {
      const reply = CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)];
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
      setIsThinking(false);
    }, 900);
  }

  return (
    <>
      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isThinking ? (
          <div className="flex items-center gap-2">
            <Avatar name="Kasuwa" />
            <div className="flex gap-1 rounded-xl bg-stone-100 px-3 py-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <ChatInput onSend={handleSend} disabled={isThinking} />
    </>
  );
}
