import { cn } from "@/lib/utils";
import type { TaskPriority, TaskStatus } from "@/lib/store";

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const map: Record<TaskPriority, string> = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-warning/15 text-warning-foreground",
    low: "bg-muted text-muted-foreground",
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium capitalize", map[priority])}>
      {priority}
    </span>
  );
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  const map: Record<TaskStatus, { label: string; cls: string }> = {
    todo: { label: "To do", cls: "bg-muted text-muted-foreground" },
    "in-progress": { label: "In progress", cls: "bg-accent text-accent-foreground" },
    done: { label: "Done", cls: "bg-success/15 text-success" },
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", map[status].cls)}>
      {map[status].label}
    </span>
  );
}
