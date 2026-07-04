/**
 * Seat geometry shared by the admin editor and the print view.
 *
 * Seat indices run clockwise from the top-left corner of an element:
 * top edge L→R, right edge T→B, bottom edge R→L, left edge B→T.
 * Positions are in element-local coordinates (0,0 = element top-left);
 * rotation is applied by the parent SVG group transform.
 */

export type SeatCounts = {
	width: number;
	height: number;
	seats_top: number;
	seats_right: number;
	seats_bottom: number;
	seats_left: number;
	/**
	 * Per-seat delta (local px) from the auto-computed position along the
	 * side's parallel axis, indexed by seat index. Missing/short/null ⇒ 0.
	 */
	seat_offsets?: (number | null)[] | null;
};

export type SeatSide = "top" | "right" | "bottom" | "left";

export type SeatPosition = {
	index: number;
	x: number;
	y: number;
	side: SeatSide;
};

export const CHAIR_RADIUS = 13;
export const CHAIR_GAP = 22;

export function totalSeats(el: SeatCounts): number {
	return el.seats_top + el.seats_right + el.seats_bottom + el.seats_left;
}

export function seatPositions(el: SeatCounts): SeatPosition[] {
	const { width: w, height: h } = el;
	const out: SeatPosition[] = [];
	let index = 0;

	// Clamp at read-time so a table resized below a previously-valid offset
	// self-corrects instead of rendering a seat past the corner.
	const offsetAlong = (i: number, auto: number, sideLength: number) => {
		const stored = el.seat_offsets?.[i] ?? 0;
		const min = Math.min(CHAIR_RADIUS, sideLength / 2);
		const max = Math.max(sideLength - CHAIR_RADIUS, sideLength / 2);
		return Math.min(max, Math.max(min, auto + stored));
	};

	for (let i = 0; i < el.seats_top; i++, index++) {
		out.push({
			index,
			x: offsetAlong(index, (w * (i + 0.5)) / el.seats_top, w),
			y: -CHAIR_GAP,
			side: "top",
		});
	}
	for (let i = 0; i < el.seats_right; i++, index++) {
		out.push({
			index,
			x: w + CHAIR_GAP,
			y: offsetAlong(index, (h * (i + 0.5)) / el.seats_right, h),
			side: "right",
		});
	}
	for (let i = 0; i < el.seats_bottom; i++, index++) {
		out.push({
			index,
			x: offsetAlong(
				index,
				(w * (el.seats_bottom - i - 0.5)) / el.seats_bottom,
				w,
			),
			y: h + CHAIR_GAP,
			side: "bottom",
		});
	}
	for (let i = 0; i < el.seats_left; i++, index++) {
		out.push({
			index,
			x: -CHAIR_GAP,
			y: offsetAlong(index, (h * (el.seats_left - i - 0.5)) / el.seats_left, h),
			side: "left",
		});
	}
	return out;
}

/** Initials shown inside an occupied chair, e.g. "Andrew C" → "AC". */
export function guestInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].slice(0, 2);
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
