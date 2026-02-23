# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Next.js 16 prototype app using **IBM Carbon Design System** exclusively for all UI components. Static export deploys to GitHub Pages at `/Carbon-Cursor-Demo-Pub`.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build static export to ./out
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

### Directory Structure
- `app/` — Next.js App Router pages (each page in its own folder as `page.tsx`)
- `components/` — Shared React components
- `app/globals.scss` — Global styles using Carbon's SCSS

### Key Patterns

**Page components** require `'use client';` directive at the top since Carbon components are client-side.

**Imports**:
- Components: `import { Button, Grid, Column } from '@carbon/react'`
- Icons: `import { Sun, Moon } from '@carbon/icons-react'`
- Path alias `@/*` maps to project root

**Theme system**: `ThemeProvider` wraps the app and exposes `useTheme()` hook. Four modes: `white`, `g10`, `g90`, `g100`. Theme persists to localStorage.

**Layout structure**: Every page renders inside `<Grid fullWidth className="main-content-grid">` with `<Column>` children for responsive layout.

**Adding a new page**:
1. Create `app/my-page/page.tsx` with `'use client';`
2. Use Carbon components for all UI
3. Add navigation link in `components/AppHeader.tsx` (both `HeaderNavigation` and `SideNav` sections)

### Static Export

`next.config.ts` sets `output: 'export'`. The `basePath` is empty in development and `/Carbon-Cursor-Demo-Pub` in production. Client-side code uses `NEXT_PUBLIC_BASE_PATH` from `.env.development` / `.env.production` (see `.env.example`). All asset paths must account for this prefix in production.
