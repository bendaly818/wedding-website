# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personalized wedding invitation/RSVP website for a November 6th 2026 wedding at Bridgewater Estate, Helensville, Auckland, NZ. Built as a single-page scrollable site with sections: Home, RSVP, Schedule, Travel, Contact.

## Commands

```bash
pnpm dev          # Vite dev server on port 3000
pnpm build        # Production build
pnpm lint         # Biome linter
pnpm format       # Biome formatter
pnpm check        # Biome full check
pnpm test         # Vitest test suite
pnpm run generate:graphql  # Regenerate GraphQL types from Supabase schema
pnpm run cf-typegen        # Regenerate Cloudflare Worker types
```

Deploy: `pnpm run build && wrangler deploy`

## Architecture

**Stack:** TanStack Start (SSR framework over Vite/Vinxi) + React 19 + TypeScript + Tailwind CSS 4 + Supabase (PostgreSQL + GraphQL) + Cloudflare Workers

**Routing:** File-based via TanStack Router. Routes live in `src/routes/`. `routeTree.gen.ts` is auto-generated — never edit it manually.

**Server functions:** Backend logic uses TanStack Start's `createServerFn` (in `src/routes/api/`). These run on Cloudflare Workers and access Supabase via the server-side client in `src/lib/supabase.ts`.

**Data fetching:** TanStack React Query v5 for client-side state; server functions return data directly for SSR. The GraphQL client in `src/lib/supabase-graphql.ts` connects to the Supabase GraphQL endpoint.

**Supabase schema:** Two key tables — `inviteCollection` (id, name) and `rsvpCollection` (invite_id, attending, dietary). Invite IDs are UUIDs used as query params (`?id=<uuid>`) in personalized RSVP links.

**Environment/secrets:** Cloudflare secrets store (configured in `wrangler.jsonc`). The Supabase URL is an env var; the service role key is a secret. Browser-side uses `VITE_SUPABASE_PUBLISHABLE_KEY`.

**Theming:** Dark/light mode via CSS custom properties in `src/styles.css`, toggled by `ThemeToggle.tsx` with localStorage persistence. The theme script in `__root.tsx` prevents flash on load.

## Design

- **Fonts:** Playfair Display (headings), Lato (body)
- **Colours:** Autumn/floral palette — plums, burnt orange, eggshell/off-white
- **Vibe:** Whimsical, elegant, romantic, fun, modern
