import { create } from "zustand";

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  due: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AppState {
  tasks: Task[];
  messages: ChatMessage[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  addMessage: (msg: Omit<ChatMessage, "id">) => void;
}

const initialTasks: Task[] = [
  { id: "1", title: "Draft Q3 marketing report", description: "Summarize campaign metrics and key wins.", status: "in-progress", priority: "high", category: "Reports", due: "Today" },
  { id: "2", title: "Reply to client onboarding emails", description: "3 pending replies in inbox.", status: "todo", priority: "high", category: "Email", due: "Today" },
  { id: "3", title: "Schedule team standup", status: "done", priority: "medium", category: "Meetings", due: "Yesterday" },
  { id: "4", title: "Summarize product feedback", description: "Pull insights from latest survey.", status: "todo", priority: "medium", category: "Research", due: "Tomorrow" },
  { id: "5", title: "Update CRM records", status: "todo", priority: "low", category: "Admin", due: "Fri" },
  { id: "6", title: "Prepare slides for board review", status: "in-progress", priority: "high", category: "Reports", due: "Thu" },
];

const assistantReplies = [
  "Here's a draft you can use right away. I've structured it into a clear intro, key points, and a call to action — feel free to tweak the tone.",
  "I've broken that down into 4 actionable steps and added time estimates so you can fit it into your schedule.",
  "Done! I summarized the main themes and flagged 2 items that need your attention this week.",
  "Great question. Based on your tasks, I'd prioritize the high-impact items first. Want me to reorganize your task list?",
];

let replyIndex = 0;

export const useAppStore = create<AppState>((set) => ({
  tasks: initialTasks,
  messages: [
    { id: "m1", role: "assistant", content: "Hi! I'm your productivity assistant. Ask me to draft emails, summarize documents, plan your day, or automate repetitive tasks." },
  ],
  addTask: (task) =>
    set((s) => ({ tasks: [{ ...task, id: crypto.randomUUID() }, ...s.tasks] })),
  updateTaskStatus: (id, status) =>
    set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)) })),
  deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
  addMessage: (msg) =>
    set((s) => {
      const next = [...s.messages, { ...msg, id: crypto.randomUUID() }];
      if (msg.role === "user") {
        const reply = assistantReplies[replyIndex % assistantReplies.length];
        replyIndex++;
        next.push({ id: crypto.randomUUID(), role: "assistant", content: reply });
      }
      return { messages: next };
    }),
}));
