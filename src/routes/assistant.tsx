import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — AI Workplace Productivity Assistant" },
      { name: "description", content: "Chat with your AI assistant to draft, summarize, and automate work." },
    ],
  }),
  component: AssistantPage,
});

const prompts = [
  "Draft a follow-up email to a client",
  "Summarize this week's meeting notes",
  "Create a to-do list for launching a campaign",
  "Write a polite decline to a meeting invite",
];

function AssistantPage() {
  const { messages, addMessage } = useAppStore();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    addMessage({ role: "user", content: text.trim() });
    setInput("");
  };

  return (
    <AppLayout>
      <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col">
        <div className="flex items-center gap-3 pb-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AI Assistant</h1>
            <p className="text-xs text-muted-foreground">Always ready to help you work faster</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto rounded-xl border bg-card p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pt-3">
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your work..."
            className="h-11 flex-1 rounded-lg border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" size="icon" className="h-11 w-11 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
