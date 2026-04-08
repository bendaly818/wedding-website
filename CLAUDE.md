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
- **Colours:** Autumn/floral palette — wine (`#6b1535`), plum-pink (`#d04878`), pistachio (`#a8b55a`), blush (`#e8cfc0`), off-white (`#f5f0eb`)
- **Vibe:** Whimsical, elegant, romantic, fun, modern

## Design Context

### Users
Invited wedding guests — a mix of ages and backgrounds, spanning close friends to extended family. Many will access the site on mobile (phone in hand after receiving a link). Some older guests may have difficulty with small text or low contrast. The primary jobs to be done are: understand the event details, RSVP, and find practical travel info. The experience should feel personal and warm — like receiving a beautiful paper invitation, not filling out a form.

### Brand Personality
**Elegant, Whimsical, Modern.** The tone is warm and personal — Ben & Brit speaking directly to people they love. Copy can have personality and gentle humour (e.g. "No judgement, okay maybe a little" on the song field). Headings are romantic and serif; body text is clean and readable. Nothing stiff or formal.

### Aesthetic Direction
- **Visual tone:** Warm autumn palette, soft lighting, editorial elegance. Think: candlelight, pressed flowers, parchment paper, deep burgundy velvet.
- **References:** The existing envelope animation sets the bar — tactile, considered, delightful craft. Everything else should feel equally intentional.
- **Anti-references:** Generic pastel-pink wedding templates; corporate rigidity; cold minimalism that strips out warmth; over-the-top maximalism (no florals on every pixel).
- **Theme:** Light mode only. Sections alternate between very slightly stepped off-white backgrounds (`--section-s1` / `--section-s2`) — no harsh contrast breaks.

### Design Principles
1. **Warmth over polish.** Every element should feel like it was made for these two people, not assembled from a template. Personality beats perfection.
2. **Readable at arm's length.** Older guests and mobile users are primary. Body text should never be below 16px; interactive targets should be thumb-friendly. When in doubt, go larger.
3. **Delight through restraint.** Animations and detail (the envelope, the crossfade reveal) are used sparingly so they land. Don't animate for the sake of it — let moments breathe.
4. **Copy is part of the design.** Labels, hints, and microcopy carry the voice ("Something to put on the fridge", "Bribe the DJ"). Preserve and extend this tone; never replace it with generic placeholder language.
5. **Mobile-first, always.** Design for a phone screen first, then scale up. Navigation, forms, and CTAs must be effortless with one thumb.
