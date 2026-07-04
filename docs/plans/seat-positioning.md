# Plan: per-seat dragging along a table's side

## Problem

`seatPositions()` (`src/lib/seating.ts`) auto-spaces every seat evenly across
the full length of its side (top/bottom/left/right), purely as a function of
`width`/`height` and the seat count for that side. There's no way to nudge an
individual seat — e.g. to leave a gap for a cake table butted against one end,
or to bunch a couple's seats together instead of evenly filling the row.

Goal: let each seat be dragged along the axis parallel to its side (top/bottom
seats move left-right, left/right seats move up-down), while the perpendicular
offset from the table edge (`CHAIR_GAP`) stays fixed.

## Decisions (confirmed)

- **Bounds:** clamp each seat's position to stay between the table's two
  corners on that side — no sliding past the edge.
- **Reset:** add a "Reset seat spacing" button in the element inspector that
  clears all manual offsets for that table back to auto layout.
- **Snapping:** seat drags snap to the same 8px grid (`SNAP`) already used for
  dragging whole elements.

## Data model

Add one nullable column to `seating_element`: `seat_offsets: float8[]`
(Postgres array), same length/order as `seatPositions()` already produces
(seat 0..N-1, matching the existing `seat_index` used by `seat_assignment` —
top L→R, right T→B, bottom R→L, left B→T).

- Missing/short array ⇒ treat missing entries as offset `0` (today's even
  spacing). This keeps every existing table rendering identically with no
  backfill required.
- Offset is stored as a **delta in local px** from the auto-computed position
  along the side's parallel axis, not an absolute coordinate. Delta of 0 always
  reproduces current behavior exactly.
- No new table — reuses the existing autosave path (`saveElements` /
  `ElementUpdateInput`) by adding `seat_offsets` alongside `x`, `y`, `rotation`,
  etc.

This needs a manual schema change in Supabase (no migrations are checked into
this repo — `schema.graphql` is generated from the live DB via
`pnpm run generate:graphql`):

```sql
alter table seating_element
  add column seat_offsets double precision[];
```

Followed by regenerating GraphQL types.

### Known edge case (pre-existing, not introduced by this change)

`seat_index` is a single running index across all four sides. Changing a
side's seat count today already reflows every subsequent side's indices,
silently reassigning existing guest assignments to different physical seats.
Storing offsets in that same combined array means changing seat counts can
similarly "misassign" an offset to the wrong seat after a resize. This plan
does not fix that pre-existing fragility — flagging it as a known limitation,
worth its own follow-up (e.g. switching to per-side keyed indices) if it
becomes a real problem.

## Geometry changes (`src/lib/seating.ts`)

Extend `SeatCounts` with optional `seat_offsets?: number[] | null` and update
`seatPositions()`:

1. Compute the existing auto (evenly-spaced) coordinate for each seat as today.
2. Look up that seat's stored offset (default 0).
3. Clamp the offset so the final coordinate stays within
   `[CHAIR_RADIUS, sideLength - CHAIR_RADIUS]` along the parallel axis (top/bottom
   clamp `x` against `width`; left/right clamp `y` against `height`). Clamping
   at read-time (not just at drag-time) means a table resize that shrinks below
   a previously-valid offset self-corrects on next render instead of rendering
   a seat outside the table.
4. Apply the (clamped) offset to `x` (top/bottom) or `y` (left/right).

`totalSeats()` and the index/side assignment loop are unchanged.

## Editor interaction (`src/routes/admin/seating.tsx`)

- Extend the `Gesture` union with a `{ type: "seat"; elementId: string; seatIndex: number; axis: "x" | "y"; startOffset: number; startPointerWorld: number }` variant.
- In `ElementNode`, the seat `<g>`'s `onPointerDown` currently calls
  `onChairClick` immediately (assign/arm). Change it to just record the
  pointer-down position; decide click vs. drag on pointer-up using a small
  movement threshold (a few px), consistent with how the element/pan gestures
  already disambiguate via `gestureRef`. Below the threshold → today's
  click-to-arm/assign behavior. Above it → seat-drag.
- On seat-drag move: project the pointer's world-space movement onto the
  side's parallel axis only (ignore the perpendicular component), snap with
  the existing `snap()` (8px), and patch that element's `seat_offsets[seatIndex]`
  via the existing `updateElement` → autosave pipeline (no new save path).
- Visual affordance while dragging a seat: same "grab" cursor treatment as
  element dragging; consider a subtle guide line along the side while active
  (nice-to-have, not required for v1).
- Inspector (`ElementInspector`): add a "Reset seat spacing" button, shown
  alongside the seat-count inputs, that patches `seat_offsets: null` (or an
  all-zero array) for the selected element.

## Print view (`src/routes/print/seating.tsx`) and API

- Add `seat_offsets` to the `GET_SEATING_PLAN` GraphQL query and to
  `Seating_ElementInsertInput`/`UpdateInput` usage — since both editor and
  print share `seatPositions()`, no other print-specific change is needed;
  the printed layout automatically reflects manual offsets.
- `saveElements` payload in the editor already spreads whichever fields changed
  per dirty element; add `seat_offsets` to that payload shape.

## Out of scope for this change

- Reworking `seat_index` to be stable across seat-count edits (see edge case
  above).
- Free 2D seat placement (explicitly axis-constrained per the request).
- Undo/redo for seat drags (mirrors current lack of undo for element drags).

## Rollout steps

1. Add the `seat_offsets` column in Supabase, run `pnpm run generate:graphql`.
2. Update `src/lib/seating.ts` geometry + types.
3. Update `-seating.ts` query/mutations to read/write `seat_offsets`.
4. Update the admin editor: gesture handling, per-seat drag, reset button.
5. Verify print view renders offsets correctly (shared code path, but confirm
   via `/print/seating`).
6. Manually test: drag seats on each of the 4 sides, resize a table down and
   confirm clamping self-corrects, reset button clears offsets, existing
   tables with no `seat_offsets` render unchanged.
