# AI Workplace Productivity Assistant — Documentation

Complete reference for developers working on the **AI Workplace Productivity Assistant**, a modern, responsive web app that helps professionals automate daily work tasks with AI.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Routing](#routing)
7. [State Management](#state-management)
8. [UI & Design System](#ui--design-system)
9. [Pages & Features](#pages--features)
10. [Server Functions & API Routes](#server-functions--api-routes)
11. [SEO](#seo)
12. [Conventions](#conventions)
13. [Troubleshooting](#troubleshooting)

---

## Overview

The app provides a dashboard-style workspace where professionals can:

- Track and prioritize work tasks
- Use an AI assistant to draft emails, summarize documents, and plan their day
- View meetings and deadlines on a schedule
- Customize preferences in settings

It ships with a clean, professional UI: a persistent sidebar, a top header with global search and notifications, and interactive components throughout.

---

## Architecture

The app is a **full-stack React 19 application** built on TanStack Start v1 with server-side rendering (SSR). Vite is the build tool. The frontend renders the dashboard UI; server-side logic (when needed) runs through TanStack Start server functions and server routes.

```text
Browser ──► TanStack Router (file-based routes)
              │
              ├─ __root.tsx        (HTML shell, head/meta, providers)
              ├─ index.tsx         (Dashboard)
              ├─ tasks.tsx         (Task management)
              ├─ assistant.tsx     (AI assistant chat)
              ├─ schedule.tsx      (Calendar / schedule)
              └─ settings.tsx      (App settings)
              │
              └─ Zustand store (src/lib/store.ts) — client state
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start v1 (React 19, SSR) |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (tokens in `src/styles.css`) |
| UI components | shadcn/ui + Radix UI primitives |
| Icons | lucide-react |
| State | Zustand |
| Routing | TanStack Router (file-based) |
| Charts | Recharts |
| Dates | date-fns |
| Backend (optional) | Lovable Cloud (Supabase under the hood) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Commands

```bash
bun install     # install dependencies
bun dev         # start dev server at http://localhost:3000
bun build       # production build
bun preview     # preview the production build
bun lint        # run ESLint
bun format      # format with Prettier
```

---

## Project Structure

```text
src/
  components/
    ui/                # shadcn/ui components
    app-layout.tsx     # Dashboard shell (sidebar + header + main)
    app-sidebar.tsx    # Navigation sidebar
    badges.tsx         # Status & priority badges
  routes/              # File-based routes (TanStack Router)
    __root.tsx         # Root layout / HTML shell
    index.tsx          # Dashboard (home)
    tasks.tsx          # Task management
    assistant.tsx      # AI assistant
    schedule.tsx       # Schedule / calendar
    settings.tsx       # Settings
    sitemap[.]xml.ts   # Generated sitemap
  lib/
    store.ts           # Zustand store (tasks, chat messages)
    utils.ts           # Helpers (cn, etc.)
  styles.css           # Tailwind theme tokens & global styles
public/
  robots.txt           # SEO robots rules
```

---

## Routing

The app uses **TanStack Router file-based routing**. Every `.tsx` file in `src/routes/` is a route. `routeTree.gen.ts` is auto-generated — never edit it by hand.

| File | URL |
|------|-----|
| `index.tsx` | `/` |
| `tasks.tsx` | `/tasks` |
| `assistant.tsx` | `/assistant` |
| `schedule.tsx` | `/schedule` |
| `settings.tsx` | `/settings` |

Navigation links live in `src/components/app-sidebar.tsx` and use the type-safe `<Link to="...">` from `@tanstack/react-router`.

---

## State Management

Global client state lives in a single Zustand store at `src/lib/store.ts`.

### Shape

```ts
interface AppState {
  tasks: Task[];
  messages: ChatMessage[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  addMessage: (msg: Omit<ChatMessage, "id">) => void;
}
```

### Types

```ts
type TaskStatus = "todo" | "in-progress" | "done";
type TaskPriority = "low" | "medium" | "high";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  due: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
```

### Usage

```tsx
import { useAppStore } from "@/lib/store";

const tasks = useAppStore((s) => s.tasks);
const addTask = useAppStore((s) => s.addTask);
```

> **Note:** The assistant currently returns canned replies from a local list. To make it AI-powered, wire it to Lovable AI Gateway via a server function (see [Server Functions](#server-functions--api-routes)).

---

## UI & Design System

- All colors use **semantic design tokens** defined in `src/styles.css` (`--background`, `--foreground`, `--primary`, `--sidebar`, etc.). Never hardcode `text-white` / `bg-black` in components.
- Components are built on **shadcn/ui** (`src/components/ui/`) customized with Tailwind variants.
- Tokens are defined with `oklch` and support light/dark modes.

To add a new color, define the token in `src/styles.css`, then reference it through Tailwind classes (e.g. `bg-primary`, `text-muted-foreground`).

---

## Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Task overview, daily progress, quick AI actions, charts |
| Tasks | `/tasks` | Create, prioritize, and update tasks (status & priority badges) |
| AI Assistant | `/assistant` | Chat interface to draft emails, summarize, and plan |
| Schedule | `/schedule` | Calendar view of meetings and deadlines |
| Settings | `/settings` | Preferences and app behavior |

Layout components:

- **`AppLayout`** — wraps each page; renders the sidebar (desktop + mobile drawer), header with search & notifications, and the main content area.
- **`AppSidebar`** — primary navigation; highlights the active route.

---

## Server Functions & API Routes

The app is currently frontend-only, but TanStack Start supports two server-side patterns when you need a backend:

### Server Functions (application logic)

Use `createServerFn` from `@tanstack/react-start` for typed client-to-server calls (e.g., calling an AI model, querying a database). Place them in client-safe modules like `src/lib/*.functions.ts`.

```ts
import { createServerFn } from "@tanstack/react-start";

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((d: { prompt: string }) => d)
  .handler(async ({ data }) => {
    // call AI gateway, return a reply
    return { reply: "..." };
  });
```

### Server Routes (external APIs / webhooks)

Use `createFileRoute` with a `server` block under `src/routes/api/` for raw HTTP endpoints. Public webhooks go under `src/routes/api/public/` and must verify signatures.

> To enable a database, auth, or AI features, turn on **Lovable Cloud** — it provisions Postgres, authentication, storage, and serverless functions with no external setup.

---

## SEO

- Meta tags and Open Graph / Twitter cards are configured in `src/routes/__root.tsx` via `head()`.
- Page titles should be under 60 characters; meta descriptions under 160.
- `public/robots.txt` controls crawler access.
- A sitemap is served at `/sitemap.xml` (`src/routes/sitemap[.]xml.ts`).

---

## Conventions

- **Routing:** Only use `src/routes/` (no `src/pages/`). Never edit `routeTree.gen.ts`.
- **Imports:** Use `@tanstack/react-router` (not `react-router-dom`). Create route files before linking to them.
- **Colors:** Always use semantic tokens, never raw color classes.
- **Components:** Keep them small and focused; reusable UI in `src/components/`.
- **State:** Prefer the Zustand store for shared client state.

---

## Troubleshooting

| Symptom | Likely cause / fix |
|---------|-------------------|
| Blank page after navigation | A parent layout route is missing `<Outlet />` |
| `Failed to resolve import` | Import points to a file/package that doesn't exist yet — create it / install it first |
| Conflicting `/` routes | Two route files claim `/` — keep `index.tsx` as the home page |
| `window is not defined` during SSR | Browser-only code runs at module scope — move it into a client-only function |
| Styles not applying | Token not defined in `src/styles.css`, or a raw color class used instead of a token |

---

_Built with Lovable. For a quick start, see [`README.md`](./README.md)._
