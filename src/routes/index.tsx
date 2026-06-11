import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Mail,
  FileText,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PriorityBadge } from "@/components/badges";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate daily work tasks with AI. Track tasks, draft emails, summarize documents, and plan your day from one dashboard.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Automate daily work tasks with AI from one clean dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { label: "Draft an email", icon: Mail },
  { label: "Summarize a document", icon: FileText },
  { label: "Plan my day", icon: CalendarClock },
];

function Dashboard() {
  const tasks = useAppStore((s) => s.tasks);
  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const completion = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const upcoming = tasks.filter((t) => t.status !== "done").slice(0, 4);

  const stats = [
    { label: "Tasks completed", value: done, icon: CheckCircle2, tint: "text-success" },
    { label: "In progress", value: inProgress, icon: Clock, tint: "text-accent-foreground" },
    { label: "Automations run", value: 28, icon: Sparkles, tint: "text-primary" },
    { label: "Hours saved", value: "12.5", icon: TrendingUp, tint: "text-warning-foreground" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Good morning, Alex 👋</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here's what your assistant has lined up for you today.
            </p>
          </div>
          <Button asChild>
            <Link to="/assistant">
              <Sparkles className="h-4 w-4" /> Ask AI
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="shadow-card">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted">
                  <s.icon className={`h-5 w-5 ${s.tint}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-card lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming tasks</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tasks">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg border bg-background p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.category} · Due {t.due}
                    </p>
                  </div>
                  <PriorityBadge priority={t.priority} />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Daily progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold">{completion}%</span>
                  <span className="text-xs text-muted-foreground">
                    {done}/{tasks.length} done
                  </span>
                </div>
                <Progress value={completion} />
                <p className="text-xs text-muted-foreground">
                  You're on track. Keep the momentum going!
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((a) => (
                  <Button
                    key={a.label}
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/assistant">
                      <a.icon className="h-4 w-4" /> {a.label}
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
