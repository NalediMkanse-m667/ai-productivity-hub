# AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate daily work tasks using AI. Built with a clean dashboard layout, sidebar navigation, and interactive components.

## Features

- **Dashboard** — Overview of tasks, daily progress, and quick AI actions
- **Task Management** — Track, prioritize, and update work tasks
- **AI Assistant** — Draft emails, summarize documents, and plan your day
- **Schedule** — Calendar view for meetings and deadlines
- **Settings** — Customize preferences and app behavior

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) v1 (full-stack React 19 with SSR)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 with custom design tokens
- **UI Components:** shadcn/ui + Radix UI primitives
- **State Management:** Zustand
- **Routing:** TanStack Router (file-based)
- **Charts:** Recharts
- **Date Utilities:** date-fns

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended)
- Node.js 20+ (alternative)

### Install Dependencies

```bash
bun install
```

### Run Development Server

```bash
bun dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
bun build
```

### Preview Production Build

```bash
bun preview
```

## Project Structure

```
src/
  components/          # Reusable UI components
    ui/                # shadcn/ui components
    app-layout.tsx     # Dashboard shell with sidebar
    app-sidebar.tsx    # Navigation sidebar
    badges.tsx         # Status and priority badges
  routes/              # File-based routes (TanStack Router)
    __root.tsx         # Root layout (HTML shell)
    index.tsx          # Dashboard (home)
    tasks.tsx          # Task management
    schedule.tsx       # Calendar / schedule
    assistant.tsx      # AI assistant
    settings.tsx       # App settings
  lib/
    store.ts           # Zustand app state
    utils.ts           # Utility functions
  styles.css           # Global styles & Tailwind theme tokens
public/
  robots.txt           # SEO robots rules
```

## Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `bun dev`        | Start development server           |
| `bun build`      | Production build                   |
| `bun build:dev`  | Development build                  |
| `bun preview`    | Preview production build           |
| `bun lint`       | Run ESLint                         |
| `bun format`     | Format with Prettier               |

## License

Private — built with Lovable.
