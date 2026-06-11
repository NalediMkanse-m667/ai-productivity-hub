import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Workplace Productivity Assistant" },
      { name: "description", content: "Manage your profile, automations, and AI preferences." },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  { label: "Email automations", desc: "Let AI draft and queue replies for review.", on: true },
  { label: "Smart scheduling", desc: "Auto-arrange focus blocks around meetings.", on: true },
  { label: "Daily digest", desc: "Receive a morning summary of your tasks.", on: false },
  { label: "Task suggestions", desc: "Get AI-suggested tasks based on your inbox.", on: true },
];

function SettingsPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Personalize your assistant and automations.
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Alex Kim" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Product Marketing Manager" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Automations</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {toggles.map((t) => (
              <div key={t.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch defaultChecked={t.on} />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save changes</Button>
        </div>
      </div>
    </AppLayout>
  );
}
