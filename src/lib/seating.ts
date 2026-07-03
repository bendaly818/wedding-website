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

	for (let i = 0; i < el.seats_top; i++, index++) {
		out.push({
			index,
			x: (w * (i + 0.5)) / el.seats_top,
			y: -CHAIR_GAP,
			side: "top",
		});
	}
	for (let i = 0; i < el.seats_right; i++, index++) {
		out.push({
			index,
			x: w + CHAIR_GAP,
			y: (h * (i + 0.5)) / el.seats_right,
			side: "right",
		});
	}
	for (let i = 0; i < el.seats_bottom; i++, index++) {
		out.push({
			index,
			x: (w * (el.seats_bottom - i - 0.5)) / el.seats_bottom,
			y: h + CHAIR_GAP,
			side: "bottom",
		});
	}
	for (let i = 0; i < el.seats_left; i++, index++) {
		out.push({
			index,
			x: -CHAIR_GAP,
			y: (h * (el.seats_left - i - 0.5)) / el.seats_left,
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
