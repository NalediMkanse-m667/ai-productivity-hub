import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Layers,
  Boxes,
  Rocket,
  FolderTree,
  Route as RouteIcon,
  Database,
  Palette,
  Server,
  Search,
  Wrench,
} from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Developer documentation for the AI Workplace Productivity Assistant: architecture, tech stack, routing, state, and conventions.",
      },
    ],
  }),
  component: DocsPage,
});

type Section = {
  id: string;
  title: string;
  icon: typeof BookOpen;
  body: React.ReactNode;
};

const stack: [string, string][] = [
  ["Framework", "TanStack Start v1 (React 19, SSR)"],
  ["Build tool", "Vite"],
  ["Styling", "Tailwind CSS v4 (tokens in styles.css)"],
  ["UI", "shadcn/ui + Radix primitives"],
  ["Icons", "lucide-react"],
  ["State", "Zustand"],
  ["Routing", "TanStack Router (file-based)"],
  ["Charts", "Recharts"],
  ["Dates", "date-fns"],
];

const routes: [string, string][] = [
  ["/", "Dashboard — overview, progress, quick actions"],
  ["/tasks", "Task management with status & priority"],
  ["/assistant", "AI assistant chat interface"],
  ["/schedule", "Calendar of meetings and deadlines"],
  ["/settings", "Preferences and app behavior"],
  ["/docs", "This documentation page"],
];

const conventions = [
  "Routing lives in src/routes/ — never edit routeTree.gen.ts by hand.",
  "Import from @tanstack/react-router, not react-router-dom.",
  "Use semantic design tokens, never raw color classes like text-white.",
  "Keep components small and focused; reusable UI in src/components/.",
  "Prefer the Zustand store (src/lib/store.ts) for shared client state.",
];

const troubleshooting: [string, string][] = [
  ["Blank page after navigation", "A parent layout route is missing <Outlet />."],
  ["Failed to resolve import", "Create the file or install the package first."],
  ["Conflicting / routes", "Keep index.tsx as the home page."],
  ["window is not defined (SSR)", "Move browser-only code into a client function."],
  ["Styles not applying", "Token missing in styles.css, or a raw color class used."],
];

const sections: Section[] = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    body: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        A modern, responsive web app that helps professionals automate daily work
        tasks with AI. It provides a dashboard-style workspace to track tasks, draft
        emails, summarize documents, plan the day, and manage a schedule — all behind
        a clean sidebar layout.
      </p>
    ),
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Layers,
    body: (
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          A full-stack React 19 application built on TanStack Start v1 with
          server-side rendering. Vite is the build tool. The frontend renders the
          dashboard UI; server logic (when needed) runs through TanStack Start server
          functions and server routes.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs text-foreground">
{`Browser → TanStack Router (file-based routes)
  ├─ __root.tsx   (HTML shell, head/meta, providers)
  ├─ index.tsx    (Dashboard)
  ├─ tasks.tsx    (Task management)
  ├─ assistant.tsx(AI assistant chat)
  ├─ schedule.tsx (Calendar / schedule)
  ├─ settings.tsx (App settings)
  └─ docs.tsx     (Documentation)
  └─ Zustand store (src/lib/store.ts) — client state`}
        </pre>
      </div>
    ),
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    icon: Boxes,
    body: (
      <div className="grid gap-2 sm:grid-cols-2">
        {stack.map(([k, v]) => (
          <div key={k} className="rounded-lg border bg-background p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{k}</p>
            <p className="mt-0.5 text-sm">{v}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    body: (
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs text-foreground">
{`bun install     # install dependencies
bun dev         # dev server at http://localhost:3000
bun build       # production build
bun preview     # preview the production build
bun lint        # run ESLint
bun format      # format with Prettier`}
      </pre>
    ),
  },
  {
    id: "structure",
    title: "Project Structure",
    icon: FolderTree,
    body: (
      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs text-foreground">
{`src/
  components/
    ui/              # shadcn/ui components
    app-layout.tsx   # Dashboard shell (sidebar + header)
    app-sidebar.tsx  # Navigation sidebar
    badges.tsx       # Status & priority badges
  routes/            # File-based routes
    __root.tsx       # Root layout / HTML shell
    index.tsx        # Dashboard
    tasks.tsx        # Task management
    assistant.tsx    # AI assistant
    schedule.tsx     # Schedule / calendar
    settings.tsx     # Settings
    docs.tsx         # Documentation
  lib/
    store.ts         # Zustand store
    utils.ts         # Helpers (cn, etc.)
  styles.css         # Tailwind theme tokens
public/
  robots.txt`}
      </pre>
    ),
  },
  {
    id: "routing",
    title: "Routing",
    icon: RouteIcon,
    body: (
      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Every <code className="rounded bg-muted px-1">.tsx</code> file in{" "}
          <code className="rounded bg-muted px-1">src/routes/</code> is a route.
          <code className="rounded bg-muted px-1">routeTree.gen.ts</code> is
          auto-generated — never edit it by hand.
        </p>
        <div className="divide-y rounded-lg border">
          {routes.map(([path, desc]) => (
            <div key={path} className="flex flex-col gap-0.5 p-3 sm:flex-row sm:gap-4">
              <code className="shrink-0 text-sm font-semibold text-primary sm:w-32">{path}</code>
              <span className="text-sm text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "state",
    title: "State Management",
    icon: Database,
    body: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Global client state lives in a single Zustand store at{" "}
        <code className="rounded bg-muted px-1">src/lib/store.ts</code>. It holds{" "}
        <code className="rounded bg-muted px-1">tasks</code> (with status/priority) and
        chat <code className="rounded bg-muted px-1">messages</code>. Read it with the{" "}
        <code className="rounded bg-muted px-1">useAppStore</code> hook.
      </p>
    ),
  },
  {
    id: "design",
    title: "UI & Design System",
    icon: Palette,
    body: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        All colors use semantic design tokens defined in{" "}
        <code className="rounded bg-muted px-1">src/styles.css</code> (oklch, light/dark).
        Components are built on shadcn/ui customized with Tailwind variants. Never
        hardcode raw color classes — add a token and reference it (e.g.{" "}
        <code className="rounded bg-muted px-1">bg-primary</code>).
      </p>
    ),
  },
  {
    id: "server",
    title: "Server Functions & APIs",
    icon: Server,
    body: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Use <code className="rounded bg-muted px-1">createServerFn</code> for typed
        client-to-server calls (e.g. calling an AI model). Use{" "}
        <code className="rounded bg-muted px-1">createFileRoute</code> with a server
        block under <code className="rounded bg-muted px-1">src/routes/api/</code> for
        raw HTTP endpoints and webhooks. Enable Lovable Cloud for database, auth, and AI.
      </p>
    ),
  },
  {
    id: "seo",
    title: "SEO",
    icon: Search,
    body: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Meta tags and Open Graph / Twitter cards are configured per route via{" "}
        <code className="rounded bg-muted px-1">head()</code>. Titles stay under 60
        characters, descriptions under 160. A sitemap is served at{" "}
        <code className="rounded bg-muted px-1">/sitemap.xml</code> and crawler rules
        live in <code className="rounded bg-muted px-1">public/robots.txt</code>.
      </p>
    ),
  },
  {
    id: "conventions",
    title: "Conventions",
    icon: BookOpen,
    body: (
      <ul className="space-y-2">
        {conventions.map((c) => (
          <li key={c} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: Wrench,
    body: (
      <div className="divide-y rounded-lg border">
        {troubleshooting.map(([sym, fix]) => (
          <div key={sym} className="flex flex-col gap-0.5 p-3 sm:flex-row sm:gap-4">
            <span className="shrink-0 text-sm font-medium sm:w-56">{sym}</span>
            <span className="text-sm text-muted-foreground">{fix}</span>
          </div>
        ))}
      </div>
    ),
  },
];

function DocsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Documentation</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you need to understand, run, and extend this project.
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">On this page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {sections.map((s) => (
            <Card key={s.id} id={s.id} className="scroll-mt-24 shadow-card">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>{s.body}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
