import { createFileRoute } from "@tanstack/react-router";
import { Clock, Video, Coffee, FileText } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — AI Workplace Productivity Assistant" },
      { name: "description", content: "Your AI-optimized daily schedule and focus blocks." },
    ],
  }),
  component: SchedulePage,
});

const events = [
  { time: "09:00", title: "Daily standup", type: "Meeting", icon: Video, tint: "bg-accent text-accent-foreground" },
  { time: "10:00", title: "Deep work: Q3 report", type: "Focus", icon: FileText, tint: "bg-primary/10 text-primary" },
  { time: "12:30", title: "Lunch break", type: "Break", icon: Coffee, tint: "bg-warning/15 text-warning-foreground" },
  { time: "14:00", title: "Client onboarding call", type: "Meeting", icon: Video, tint: "bg-accent text-accent-foreground" },
  { time: "16:00", title: "Inbox zero + automations", type: "Focus", icon: Clock, tint: "bg-primary/10 text-primary" },
];

function SchedulePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Schedule</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Today, optimized by your assistant for maximum focus.
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Today's timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-1 border-l pl-6">
              {events.map((e) => (
                <li key={e.time} className="relative pb-5">
                  <span className="absolute -left-[1.85rem] top-1 grid h-7 w-7 place-items-center rounded-full bg-card ring-4 ring-background">
                    <span className={`grid h-7 w-7 place-items-center rounded-full ${e.tint}`}>
                      <e.icon className="h-3.5 w-3.5" />
                    </span>
                  </span>
                  <div className="flex items-center justify-between gap-3 rounded-lg border bg-background p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{e.title}</p>
                      <p className="text-xs text-muted-foreground">{e.type}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                      {e.time}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
