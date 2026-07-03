import { createFileRoute } from "@tanstack/react-router";
import { CHAIR_RADIUS, seatPositions, totalSeats } from "#/lib/seating";
import {
	getSeatingPlan,
	type SeatingElement,
	type SeatingGuest,
} from "../api/-seating";

export const Route = createFileRoute("/print/seating")({
	loader: async () => {
		return await getSeatingPlan();
	},
	head: () => ({
		meta: [
			{ title: "Ben & Brit — Seating Plan" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: PrintSeating,
});

const KIND_FILL: Record<
	string,
	{ fill: string; stroke: string; dash?: string }
> = {
	table: { fill: "#f2dbe7", stroke: "#c48aa5" },
	floral: { fill: "rgba(168,181,90,0.22)", stroke: "#a8b55a" },
	dancefloor: { fill: "none", stroke: "#d04878", dash: "8 6" },
	bar: { fill: "#6b1535", stroke: "#4a0e24" },
	label: { fill: "none", stroke: "none" },
};

function PrintSeating() {
	const { elements, guests, assignments } = Route.useLoaderData();
	const guestById = new Map(guests.map((g) => [g.id, g]));
	const assignmentBySeat = new Map(
		assignments.map((a) => [`${a.element_id}:${a.seat_index}`, a]),
	);

	// Chart bounds with room for chairs and name labels.
	const pad = 110;
	const minX = Math.min(...elements.map((e) => e.x)) - pad;
	const minY = Math.min(...elements.map((e) => e.y)) - pad;
	const maxX = Math.max(...elements.map((e) => e.x + e.width)) + pad;
	const maxY = Math.max(...elements.map((e) => e.y + e.height)) + pad;

	const tables = elements
		.filter((el) => totalSeats(el) > 0)
		.map((el) => ({
			el,
			seated: seatPositions(el)
				.map((s) => {
					const a = assignmentBySeat.get(`${el.id}:${s.index}`);
					const guest = a ? guestById.get(a.guest_id) : undefined;
					return guest ? { seat: s.index, guest } : null;
				})
				.filter((s): s is { seat: number; guest: SeatingGuest } => s !== null),
		}))
		.filter(({ seated }) => seated.length > 0);

	return (
		<>
			<style>{PRINT_CSS}</style>
			<main className="seating-page">
				<header className="seating-header">
					<h1>
						Ben <span className="amp">&amp;</span> Brit
					</h1>
					<p>Seating Plan · Friday, 6th November 2026 · Bridgewater Estate</p>
				</header>

				{elements.length > 0 && (
					<svg
						className="seating-chart"
						viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
						role="img"
						aria-label="Seating plan chart"
					>
						{elements.map((el) => (
							<PrintElement
								key={el.id}
								element={el}
								assignmentBySeat={assignmentBySeat}
								guestById={guestById}
							/>
						))}
					</svg>
				)}

				<section className="table-lists">
					{tables.map(({ el, seated }) => (
						<div key={el.id} className="table-list">
							<h2>{el.label || "Table"}</h2>
							<ol>
								{seated.map(({ seat, guest }) => (
									<li key={guest.id}>
										<span className="seat-no">{seat + 1}.</span>{" "}
										{guest.full_name}
									</li>
								))}
							</ol>
						</div>
					))}
				</section>
			</main>
		</>
	);
}

function PrintElement({
	element: el,
	assignmentBySeat,
	guestById,
}: {
	element: SeatingElement;
	assignmentBySeat: Map<string, { guest_id: string }>;
	guestById: Map<string, SeatingGuest>;
}) {
	const style = KIND_FILL[el.kind] ?? KIND_FILL.table;
	const seats = seatPositions(el);
	const labelOffset = CHAIR_RADIUS + 7;

	return (
		<g
			transform={`translate(${el.x} ${el.y}) rotate(${el.rotation} ${el.width / 2} ${el.height / 2})`}
		>
			<rect
				width={el.width}
				height={el.height}
				rx={el.kind === "floral" ? el.height / 3 : 10}
				fill={style.fill}
				stroke={style.stroke}
				strokeWidth={1.5}
				strokeDasharray={style.dash}
			/>
			{el.label && (
				<text
					x={el.width / 2}
					y={el.height / 2}
					textAnchor="middle"
					dominantBaseline="central"
					transform={
						el.height > el.width * 1.4
							? `rotate(-90 ${el.width / 2} ${el.height / 2})`
							: undefined
					}
					style={{
						fontFamily: '"Playfair Display", Georgia, serif',
						fontSize: el.kind === "label" ? 18 : 14,
						fontStyle: el.kind === "floral" ? "italic" : "normal",
						fill: el.kind === "bar" ? "#f5f0eb" : "#6b1535",
					}}
				>
					{el.label}
				</text>
			)}
			{seats.map((s) => {
				const assignment = assignmentBySeat.get(`${el.id}:${s.index}`);
				const guest = assignment
					? guestById.get(assignment.guest_id)
					: undefined;
				return (
					<g key={s.index}>
						<circle
							cx={s.x}
							cy={s.y}
							r={CHAIR_RADIUS}
							fill={guest ? "#e8cfc0" : "#ffffff"}
							stroke="#c48aa5"
							strokeWidth={1.25}
						/>
						{guest && (
							<text
								x={
									s.side === "left"
										? s.x - labelOffset
										: s.side === "right"
											? s.x + labelOffset
											: s.x
								}
								y={
									s.side === "top"
										? s.y - labelOffset
										: s.side === "bottom"
											? s.y + labelOffset + 8
											: s.y
								}
								textAnchor={
									s.side === "left"
										? "end"
										: s.side === "right"
											? "start"
											: "middle"
								}
								dominantBaseline="central"
								style={{
									fontFamily: "Lato, sans-serif",
									fontSize: 12,
									fill: "#4a0e24",
								}}
							>
								{guest.full_name}
							</text>
						)}
					</g>
				);
			})}
		</g>
	);
}

const PRINT_CSS = `
@page {
	size: A3 landscape;
	margin: 10mm;
}

.seating-page {
	max-width: 1200px;
	margin: 0 auto;
	padding: 32px 24px;
	background: #f7f3ee;
	color: #4a0e24;
	font-family: Lato, ui-sans-serif, sans-serif;
}

.seating-header {
	text-align: center;
	margin-bottom: 24px;
}

.seating-header h1 {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 40px;
	font-weight: 600;
	color: #6b1535;
	margin: 0 0 4px;
}

.seating-header .amp {
	font-style: italic;
	font-weight: 400;
}

.seating-header p {
	margin: 0;
	font-size: 14px;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: rgba(74, 14, 36, 0.55);
}

.seating-chart {
	display: block;
	width: 100%;
	height: auto;
	max-height: 75vh;
	margin: 0 auto 32px;
}

.table-lists {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 24px;
	break-inside: avoid;
}

.table-list h2 {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 20px;
	color: #6b1535;
	margin: 0 0 8px;
	border-bottom: 1px solid rgba(107, 21, 53, 0.25);
	padding-bottom: 4px;
}

.table-list ol {
	list-style: none;
	margin: 0;
	padding: 0;
	columns: 2;
	column-gap: 16px;
	font-size: 14px;
	line-height: 1.7;
}

.table-list .seat-no {
	display: inline-block;
	width: 22px;
	font-weight: 700;
	color: rgba(107, 21, 53, 0.5);
}

@media print {
	html,
	body {
		margin: 0;
		padding: 0;
		background: #fff;
	}
	.seating-page {
		max-width: none;
		background: #fff;
		padding: 0;
	}
	.seating-chart {
		max-height: none;
		page-break-inside: avoid;
	}
	.table-lists {
		page-break-before: auto;
	}
	* {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}
}
`;
