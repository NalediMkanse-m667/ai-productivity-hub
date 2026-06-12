import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ListChecks,
  Sparkles,
  CalendarDays,
  Settings,
  BookOpen,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Tasks", url: "/tasks", icon: ListChecks },
  { title: "AI Assistant", url: "/assistant", icon: Sparkles },
  { title: "Schedule", url: "/schedule", icon: CalendarDays },
  { title: "Docs", url: "/docs", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Workplace AI</p>
          <p className="truncate text-xs text-sidebar-foreground/60">Productivity Assistant</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const active = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
          return (
            <Link
              key={item.url}
              to={item.url}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl bg-sidebar-accent p-4">
        <p className="text-sm font-medium text-sidebar-accent-foreground">Upgrade to Pro</p>
        <p className="mt-1 text-xs text-sidebar-foreground/60">
          Unlock unlimited automations and integrations.
        </p>
      </div>
    </aside>
  );
}
