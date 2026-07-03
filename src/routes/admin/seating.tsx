import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	CHAIR_RADIUS,
	guestInitials,
	seatPositions,
	totalSeats,
} from "#/lib/seating";
import {
	assignSeat,
	createElement,
	createGuest,
	deleteElement,
	deleteGuest,
	getSeatingPlan,
	type SeatingElement,
	type SeatingGuest,
	saveElements,
	seedGuestsFromInvites,
	unassignSeat,
} from "../api/-seating";
import { getAuthUser } from "./index";

export const Route = createFileRoute("/admin/seating")({
	beforeLoad: async () => {
		const user = await getAuthUser();
		if (!user) {
			throw redirect({ to: "/admin/login" });
		}
	},
	head: () => ({
		meta: [
			{ title: "Seating Plan — Ben & Brit" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: SeatingEditor,
});

// ── Constants ──────────────────────────────────────────────────────

const SNAP = 8;
const MIN_VIEW = 240;
const MAX_VIEW = 4000;

const ELEMENT_PRESETS: Record<
	string,
	{
		label: string;
		width: number;
		height: number;
		seats?: Partial<SeatingElement>;
	}
> = {
	table: {
		label: "Table",
		width: 220,
		height: 90,
		seats: { seats_top: 3, seats_bottom: 3 },
	},
	floral: { label: "Floral", width: 120, height: 80 },
	dancefloor: { label: "Dance Floor", width: 240, height: 240 },
	bar: { label: "Bar", width: 200, height: 80 },
	label: { label: "New label", width: 160, height: 40 },
};

type ViewBox = { x: number; y: number; w: number; h: number };

type Gesture =
	| { type: "pan"; startWorld: { x: number; y: number } }
	| { type: "element"; id: string; offsetX: number; offsetY: number }
	| {
			type: "pinch";
			startDist: number;
			startVb: ViewBox;
			startMid: { x: number; y: number };
	  };

const snap = (v: number) => Math.round(v / SNAP) * SNAP;

function rsvpStatus(guest: SeatingGuest): "attending" | "declined" | "pending" {
	const attending = guest.invite?.rsvpCollection?.edges?.[0]?.node?.attending;
	if (attending === true) return "attending";
	if (attending === false) return "declined";
	return "pending";
}

const RSVP_DOT: Record<string, string> = {
	attending: "#059669",
	declined: "#dc2626",
	pending: "#c9b8ab",
};

// ── Editor ─────────────────────────────────────────────────────────

function SeatingEditor() {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["seating-plan"],
		queryFn: () => getSeatingPlan(),
	});

	// Local element state for optimistic drag; synced from server when clean.
	const [elements, setElements] = useState<SeatingElement[]>([]);
	const elementsRef = useRef(elements);
	elementsRef.current = elements;
	const dirtyIds = useRef(new Set<string>());
	const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const gestureRef = useRef<Gesture | null>(null);
	const pointersRef = useRef(new Map<number, { x: number; y: number }>());

	const [saveState, setSaveState] = useState<"saved" | "saving">("saved");
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [armed, setArmed] = useState<SeatingGuest | null>(null);
	const [search, setSearch] = useState("");
	const [newGuestName, setNewGuestName] = useState("");
	const [viewBox, setViewBox] = useState<ViewBox>({
		x: 0,
		y: 0,
		w: 900,
		h: 1100,
	});
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		if (!data) return;
		if (dirtyIds.current.size === 0 && gestureRef.current?.type !== "element") {
			setElements(data.elements);
		}
	}, [data]);

	const guests = data?.guests ?? [];
	const assignments = data?.assignments ?? [];
	const guestById = new Map(guests.map((g) => [g.id, g]));
	const assignmentBySeat = new Map(
		assignments.map((a) => [`${a.element_id}:${a.seat_index}`, a]),
	);
	const assignmentByGuest = new Map(assignments.map((a) => [a.guest_id, a]));

	const invalidate = () =>
		queryClient.invalidateQueries({ queryKey: ["seating-plan"] });

	// ── Autosave ───────────────────────────────────────────────────

	const flushSave = useCallback(async () => {
		const ids = [...dirtyIds.current];
		if (ids.length === 0) return;
		dirtyIds.current.clear();
		setSaveState("saving");
		const payload = elementsRef.current
			.filter((el) => ids.includes(el.id))
			.map((el) => ({
				id: el.id,
				x: el.x,
				y: el.y,
				width: el.width,
				height: el.height,
				rotation: el.rotation,
				label: el.label,
				kind: el.kind,
				seats_top: el.seats_top,
				seats_right: el.seats_right,
				seats_bottom: el.seats_bottom,
				seats_left: el.seats_left,
			}));
		try {
			await saveElements({ data: payload });
		} finally {
			setSaveState(dirtyIds.current.size > 0 ? "saving" : "saved");
		}
	}, []);

	const updateElement = useCallback(
		(id: string, patch: Partial<SeatingElement>) => {
			setElements((els) =>
				els.map((el) => (el.id === id ? { ...el, ...patch } : el)),
			);
			dirtyIds.current.add(id);
			setSaveState("saving");
			if (saveTimer.current) clearTimeout(saveTimer.current);
			saveTimer.current = setTimeout(flushSave, 800);
		},
		[flushSave],
	);

	// ── Mutations ──────────────────────────────────────────────────

	const assign = useMutation({
		mutationFn: (vars: {
			guest_id: string;
			element_id: string;
			seat_index: number;
		}) => assignSeat({ data: vars }),
		onSettled: invalidate,
	});
	const unassign = useMutation({
		mutationFn: (guest_id: string) => unassignSeat({ data: guest_id }),
		onSettled: invalidate,
	});
	const addGuest = useMutation({
		mutationFn: (full_name: string) => createGuest({ data: { full_name } }),
		onSuccess: () => {
			setNewGuestName("");
			invalidate();
		},
	});
	const removeGuest = useMutation({
		mutationFn: (id: string) => deleteGuest({ data: id }),
		onSettled: invalidate,
	});
	const seedGuests = useMutation({
		mutationFn: () => seedGuestsFromInvites(),
		onSettled: invalidate,
	});
	const addElement = useMutation({
		mutationFn: (kind: string) => {
			const preset = ELEMENT_PRESETS[kind];
			return createElement({
				data: {
					kind,
					label: preset.label,
					x: snap(viewBox.x + viewBox.w / 2 - preset.width / 2),
					y: snap(viewBox.y + viewBox.h / 2 - preset.height / 2),
					width: preset.width,
					height: preset.height,
					...preset.seats,
				},
			});
		},
		onSuccess: (created) => {
			if (created) setSelectedId(created.id);
			invalidate();
		},
	});
	const removeElement = useMutation({
		mutationFn: (id: string) => deleteElement({ data: id }),
		onSuccess: () => {
			setSelectedId(null);
			invalidate();
		},
	});

	// Copy/paste: clipboard holds an element snapshot; paste creates an
	// offset duplicate (seat counts copied, guests are not).
	const clipboardRef = useRef<SeatingElement | null>(null);
	const pasteElement = useMutation({
		mutationFn: (src: SeatingElement) =>
			createElement({
				data: {
					kind: src.kind,
					label: src.label,
					x: snap(src.x + SNAP * 3),
					y: snap(src.y + SNAP * 3),
					width: src.width,
					height: src.height,
					rotation: src.rotation,
					seats_top: src.seats_top,
					seats_right: src.seats_right,
					seats_bottom: src.seats_bottom,
					seats_left: src.seats_left,
				},
			}),
		onSuccess: (created) => {
			if (created) {
				setSelectedId(created.id);
				// Next paste offsets from the newest copy so repeats don't stack.
				clipboardRef.current = created;
			}
			invalidate();
		},
	});
	const { mutate: pasteMutate } = pasteElement;

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.isContentEditable
			)
				return;
			const mod = e.metaKey || e.ctrlKey;
			if (mod && e.key === "c" && selectedId) {
				const el = elementsRef.current.find((x) => x.id === selectedId);
				if (el) {
					clipboardRef.current = { ...el };
					e.preventDefault();
				}
			} else if (mod && e.key === "v" && clipboardRef.current) {
				e.preventDefault();
				pasteMutate(clipboardRef.current);
			} else if (e.key === "Escape") {
				setArmed(null);
				setSelectedId(null);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [selectedId, pasteMutate]);

	// ── Canvas coordinate helpers ──────────────────────────────────

	const toWorld = useCallback((clientX: number, clientY: number) => {
		const svg = svgRef.current;
		if (!svg) return { x: 0, y: 0 };
		const ctm = svg.getScreenCTM();
		if (!ctm) return { x: 0, y: 0 };
		const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
		return { x: pt.x, y: pt.y };
	}, []);

	// Non-passive wheel listener so preventDefault works (React root wheel is passive).
	useEffect(() => {
		const svg = svgRef.current;
		if (!svg) return;
		const onWheel = (e: WheelEvent) => {
			e.preventDefault();
			const anchor = toWorld(e.clientX, e.clientY);
			setViewBox((vb) => {
				// Delta-proportional zoom (~15% per mouse-wheel notch,
				// proportionally less for fine trackpad deltas).
				const delta = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
				const factor = Math.exp(
					Math.max(-0.25, Math.min(0.25, delta * 0.0014)),
				);
				const w = Math.min(MAX_VIEW, Math.max(MIN_VIEW, vb.w * factor));
				const scale = w / vb.w;
				return {
					x: anchor.x - (anchor.x - vb.x) * scale,
					y: anchor.y - (anchor.y - vb.y) * scale,
					w,
					h: vb.h * scale,
				};
			});
		};
		svg.addEventListener("wheel", onWheel, { passive: false });
		return () => svg.removeEventListener("wheel", onWheel);
	}, [toWorld]);

	const zoomBy = (factor: number) => {
		setViewBox((vb) => {
			const w = Math.min(MAX_VIEW, Math.max(MIN_VIEW, vb.w * factor));
			const scale = w / vb.w;
			const cx = vb.x + vb.w / 2;
			const cy = vb.y + vb.h / 2;
			return {
				x: cx - (vb.w * scale) / 2,
				y: cy - (vb.h * scale) / 2,
				w,
				h: vb.h * scale,
			};
		});
	};

	const fitView = useCallback(() => {
		const els = elementsRef.current;
		if (els.length === 0) return;
		const pad = 80;
		const minX = Math.min(...els.map((e) => e.x)) - pad;
		const minY = Math.min(...els.map((e) => e.y)) - pad;
		const maxX = Math.max(...els.map((e) => e.x + e.width)) + pad;
		const maxY = Math.max(...els.map((e) => e.y + e.height)) + pad;
		setViewBox({ x: minX, y: minY, w: maxX - minX, h: maxY - minY });
	}, []);

	// Fit once the plan first loads.
	const fittedRef = useRef(false);
	useEffect(() => {
		if (!fittedRef.current && elements.length > 0) {
			fittedRef.current = true;
			fitView();
		}
	}, [elements, fitView]);

	// ── Pointer gestures: drag element / pan / pinch ───────────────

	const onSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
		svgRef.current?.setPointerCapture(e.pointerId);
		pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
		if (pointersRef.current.size === 2) {
			const [a, b] = [...pointersRef.current.values()];
			const midWorld = toWorld((a.x + b.x) / 2, (a.y + b.y) / 2);
			gestureRef.current = {
				type: "pinch",
				startDist: Math.hypot(a.x - b.x, a.y - b.y),
				startVb: viewBox,
				startMid: midWorld,
			};
		} else if (!gestureRef.current) {
			gestureRef.current = {
				type: "pan",
				startWorld: toWorld(e.clientX, e.clientY),
			};
			setSelectedId(null);
		}
	};

	const onElementPointerDown = (e: React.PointerEvent, el: SeatingElement) => {
		e.stopPropagation();
		svgRef.current?.setPointerCapture(e.pointerId);
		pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
		const world = toWorld(e.clientX, e.clientY);
		gestureRef.current = {
			type: "element",
			id: el.id,
			offsetX: world.x - el.x,
			offsetY: world.y - el.y,
		};
		setSelectedId(el.id);
	};

	const onSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
		if (!pointersRef.current.has(e.pointerId)) return;
		pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
		const g = gestureRef.current;
		if (!g) return;

		if (g.type === "pinch" && pointersRef.current.size === 2) {
			const [a, b] = [...pointersRef.current.values()];
			const dist = Math.hypot(a.x - b.x, a.y - b.y);
			if (dist < 1) return;
			const ratio = g.startDist / dist;
			const w = Math.min(MAX_VIEW, Math.max(MIN_VIEW, g.startVb.w * ratio));
			const scale = w / g.startVb.w;
			setViewBox({
				x: g.startMid.x - (g.startMid.x - g.startVb.x) * scale,
				y: g.startMid.y - (g.startMid.y - g.startVb.y) * scale,
				w,
				h: g.startVb.h * scale,
			});
			return;
		}

		const world = toWorld(e.clientX, e.clientY);
		if (g.type === "element") {
			updateElement(g.id, {
				x: snap(world.x - g.offsetX),
				y: snap(world.y - g.offsetY),
			});
		} else if (g.type === "pan") {
			setViewBox((vb) => ({
				...vb,
				x: vb.x - (world.x - g.startWorld.x),
				y: vb.y - (world.y - g.startWorld.y),
			}));
		}
	};

	const onSvgPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
		pointersRef.current.delete(e.pointerId);
		if (pointersRef.current.size === 0) gestureRef.current = null;
	};

	// ── Seat interaction ───────────────────────────────────────────

	const onChairClick = (el: SeatingElement, seatIndex: number) => {
		const existing = assignmentBySeat.get(`${el.id}:${seatIndex}`);
		if (armed) {
			assign.mutate({
				guest_id: armed.id,
				element_id: el.id,
				seat_index: seatIndex,
			});
			setArmed(null);
		} else if (existing) {
			const guest = guestById.get(existing.guest_id);
			if (guest) setArmed(guest);
		}
	};

	const onChairDrop = (
		e: React.DragEvent,
		el: SeatingElement,
		seatIndex: number,
	) => {
		e.preventDefault();
		const guestId = e.dataTransfer.getData("text/guest-id");
		if (guestId) {
			assign.mutate({
				guest_id: guestId,
				element_id: el.id,
				seat_index: seatIndex,
			});
		}
	};

	// ── Derived lists ──────────────────────────────────────────────

	const filteredGuests = guests.filter((g) =>
		g.full_name.toLowerCase().includes(search.trim().toLowerCase()),
	);
	const unseated = filteredGuests.filter((g) => !assignmentByGuest.has(g.id));
	const seatedTables = elements
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
		}));

	const selected = elements.find((el) => el.id === selectedId) ?? null;
	const attendingCount = guests.filter(
		(g) => rsvpStatus(g) === "attending",
	).length;

	return (
		<div
			className="h-dvh overflow-hidden flex flex-col"
			style={{ background: "var(--section-s1)" }}
		>
			{/* Toolbar */}
			<header
				className="flex flex-wrap items-center gap-2 px-4 py-3 bg-white shadow-sm z-20"
				style={{ borderBottom: "1px solid var(--card-border)" }}
			>
				<a
					href="/admin"
					className="text-sm font-bold uppercase tracking-widest px-2"
					style={{ color: "var(--color-wine)" }}
				>
					← Admin
				</a>
				<h1
					className="text-xl font-serif mr-auto"
					style={{ color: "var(--color-wine)" }}
				>
					Seating Plan
				</h1>

				{Object.entries(ELEMENT_PRESETS).map(([kind, preset]) => (
					<button
						key={kind}
						type="button"
						onClick={() => addElement.mutate(kind)}
						disabled={addElement.isPending}
						className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors hover:opacity-80 disabled:opacity-40"
						style={{
							background: "var(--section-s2)",
							color: "var(--color-wine)",
						}}
					>
						＋ {kind === "label" ? "Label" : preset.label}
					</button>
				))}

				<div className="flex items-center gap-1 ml-2">
					<button
						type="button"
						onClick={() => zoomBy(1 / 1.2)}
						className="w-8 h-8 rounded-lg border text-lg leading-none"
						style={{
							borderColor: "var(--card-border)",
							color: "var(--color-wine)",
						}}
					>
						+
					</button>
					<button
						type="button"
						onClick={() => zoomBy(1.2)}
						className="w-8 h-8 rounded-lg border text-lg leading-none"
						style={{
							borderColor: "var(--card-border)",
							color: "var(--color-wine)",
						}}
					>
						−
					</button>
					<button
						type="button"
						onClick={fitView}
						className="px-3 h-8 rounded-lg border text-xs font-bold uppercase tracking-wider"
						style={{
							borderColor: "var(--card-border)",
							color: "var(--color-wine)",
						}}
					>
						Fit
					</button>
				</div>

				<a
					href="/print/seating"
					target="_blank"
					rel="noreferrer"
					className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white hover:opacity-90"
					style={{ background: "var(--color-wine)" }}
				>
					Print ↗
				</a>

				<span
					className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
					style={{
						background: saveState === "saved" ? "#ecf3d9" : "#fdf3e0",
						color: saveState === "saved" ? "#5a6b26" : "#9a6b1f",
					}}
				>
					<span
						className={`w-2 h-2 rounded-full ${saveState === "saving" ? "animate-pulse" : ""}`}
						style={{
							background: saveState === "saved" ? "#a8b55a" : "#e0a83f",
						}}
					/>
					{saveState === "saved" ? "Saved" : "Saving…"}
				</span>
			</header>

			<div className="flex flex-col md:flex-row flex-1 min-h-0">
				{/* Canvas */}
				<div className="relative flex-1 min-h-[45dvh] md:min-h-0">
					{selected && (
						<ElementInspector
							element={selected}
							onChange={(patch) => updateElement(selected.id, patch)}
							onDelete={() => {
								if (
									confirm(
										`Delete "${selected.label || selected.kind}"? Guests seated here become unseated.`,
									)
								) {
									removeElement.mutate(selected.id);
								}
							}}
							onDuplicate={() => pasteMutate(selected)}
							onClose={() => setSelectedId(null)}
						/>
					)}

					{armed && (
						<div
							className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-xl bg-white"
							style={{ border: "1px solid var(--card-border)" }}
						>
							<span
								className="w-2.5 h-2.5 rounded-full"
								style={{ background: RSVP_DOT[rsvpStatus(armed)] }}
							/>
							<p
								className="text-sm font-semibold"
								style={{ color: "var(--color-wine)" }}
							>
								Seating <strong>{armed.full_name}</strong> — tap a chair
							</p>
							{assignmentByGuest.has(armed.id) && (
								<button
									type="button"
									onClick={() => {
										unassign.mutate(armed.id);
										setArmed(null);
									}}
									className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
									style={{
										background: "var(--section-s2)",
										color: "var(--color-wine)",
									}}
								>
									Unseat
								</button>
							)}
							<button
								type="button"
								onClick={() => setArmed(null)}
								className="text-xs font-bold uppercase tracking-wider text-gray-400"
							>
								Cancel
							</button>
						</div>
					)}

					<svg
						ref={svgRef}
						className="absolute inset-0 w-full h-full block select-none"
						style={{
							touchAction: "none",
							background: "#f7f1ea",
						}}
						viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
						onPointerDown={onSvgPointerDown}
						onPointerMove={onSvgPointerMove}
						onPointerUp={onSvgPointerUp}
						onPointerCancel={onSvgPointerUp}
						role="application"
						aria-label="Seating plan canvas"
					>
						<defs>
							<pattern
								id="dotgrid"
								width={SNAP * 4}
								height={SNAP * 4}
								patternUnits="userSpaceOnUse"
							>
								<circle cx={1} cy={1} r={1} fill="rgba(107,21,53,0.10)" />
							</pattern>
						</defs>
						<rect
							x={viewBox.x}
							y={viewBox.y}
							width={viewBox.w}
							height={viewBox.h}
							fill="url(#dotgrid)"
						/>

						{elements.map((el) => (
							<ElementNode
								key={el.id}
								element={el}
								selected={el.id === selectedId}
								arming={!!armed}
								assignmentBySeat={assignmentBySeat}
								guestById={guestById}
								onPointerDown={(e) => onElementPointerDown(e, el)}
								onChairClick={(i) => onChairClick(el, i)}
								onChairDrop={(e, i) => onChairDrop(e, el, i)}
							/>
						))}
					</svg>
				</div>

				{/* Sidebar */}
				<aside
					className="w-full md:w-80 flex-1 md:flex-none min-h-0 bg-white flex flex-col"
					style={{ borderLeft: "1px solid var(--card-border)" }}
				>
					<div
						className="p-4 flex flex-col gap-3"
						style={{ borderBottom: "1px solid var(--section-s2)" }}
					>
						<div className="flex items-baseline justify-between">
							<h2
								className="text-lg font-serif"
								style={{ color: "var(--color-wine)" }}
							>
								Guests
							</h2>
							<p className="text-xs text-gray-400">
								{guests.length - unseated.length}/{guests.length} seated ·{" "}
								{attendingCount} attending
							</p>
						</div>
						<input
							type="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Find a guest…"
							className="w-full px-3 py-2.5 border rounded-xl text-base focus:outline-none focus:ring-2"
							style={{
								borderColor: "var(--card-border)",
								background: "var(--section-s1)",
							}}
						/>
					</div>

					<div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-5">
						{/* Unseated */}
						<section>
							<p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
								Unseated ({unseated.length})
							</p>
							{unseated.length === 0 ? (
								<p className="text-sm text-gray-300">
									Everyone has a chair. 🎉
								</p>
							) : (
								<ul className="flex flex-col gap-1">
									{unseated.map((g) => (
										<GuestRow
											key={g.id}
											guest={g}
											armed={armed?.id === g.id}
											onArm={() => setArmed(armed?.id === g.id ? null : g)}
											onDelete={() => {
												if (confirm(`Remove guest "${g.full_name}"?`))
													removeGuest.mutate(g.id);
											}}
										/>
									))}
								</ul>
							)}
						</section>

						{/* Seated, grouped per table */}
						{seatedTables.map(({ el, seated }) =>
							seated.length === 0 ? null : (
								<section key={el.id}>
									<p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
										{el.label || "Table"} ({seated.length}/{totalSeats(el)})
									</p>
									<ul className="flex flex-col gap-1">
										{seated.map(({ seat, guest }) => (
											<GuestRow
												key={guest.id}
												guest={guest}
												seatNumber={seat + 1}
												armed={armed?.id === guest.id}
												onArm={() =>
													setArmed(armed?.id === guest.id ? null : guest)
												}
												onUnseat={() => unassign.mutate(guest.id)}
											/>
										))}
									</ul>
								</section>
							),
						)}
					</div>

					{/* Add guest / seed */}
					<div
						className="p-4 flex flex-col gap-2"
						style={{ borderTop: "1px solid var(--section-s2)" }}
					>
						<form
							className="flex gap-2"
							onSubmit={(e) => {
								e.preventDefault();
								if (newGuestName.trim()) addGuest.mutate(newGuestName.trim());
							}}
						>
							<input
								value={newGuestName}
								onChange={(e) => setNewGuestName(e.target.value)}
								placeholder="Add a guest…"
								className="flex-1 px-3 py-2.5 border rounded-xl text-base focus:outline-none focus:ring-2"
								style={{
									borderColor: "var(--card-border)",
									background: "var(--section-s1)",
								}}
							/>
							<button
								type="submit"
								disabled={addGuest.isPending || !newGuestName.trim()}
								className="px-4 rounded-xl text-sm font-bold text-white disabled:opacity-40"
								style={{ background: "var(--color-wine)" }}
							>
								Add
							</button>
						</form>
						<button
							type="button"
							onClick={() => seedGuests.mutate()}
							disabled={seedGuests.isPending}
							className="text-xs font-bold uppercase tracking-wider py-2 rounded-xl transition-colors hover:opacity-80 disabled:opacity-40"
							style={{
								background: "var(--section-s2)",
								color: "var(--color-wine)",
							}}
						>
							{seedGuests.isPending
								? "Importing…"
								: seedGuests.data
									? `Imported ${seedGuests.data.created} from invites`
									: "Import guests from invites"}
						</button>
					</div>
				</aside>
			</div>
		</div>
	);
}

// ── Guest row ──────────────────────────────────────────────────────

function GuestRow({
	guest,
	seatNumber,
	armed,
	onArm,
	onUnseat,
	onDelete,
}: {
	guest: SeatingGuest;
	seatNumber?: number;
	armed: boolean;
	onArm: () => void;
	onUnseat?: () => void;
	onDelete?: () => void;
}) {
	return (
		<li>
			{/* biome-ignore lint/a11y/useSemanticElements: chip nests unseat/delete buttons; a native button cannot contain buttons */}
			<div
				draggable
				onDragStart={(e) => e.dataTransfer.setData("text/guest-id", guest.id)}
				className="group flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-colors"
				style={{
					background: armed ? "var(--color-wine)" : "var(--section-s1)",
					color: armed ? "white" : "var(--color-wine-dark, #4a0e24)",
				}}
				onClick={onArm}
				onKeyDown={(e) => e.key === "Enter" && onArm()}
				role="button"
				tabIndex={0}
			>
				<span
					className="w-2.5 h-2.5 rounded-full flex-shrink-0"
					style={{ background: RSVP_DOT[rsvpStatus(guest)] }}
					title={`RSVP: ${rsvpStatus(guest)}`}
				/>
				{seatNumber !== undefined && (
					<span className="text-xs font-bold opacity-50 w-5 text-right">
						{seatNumber}.
					</span>
				)}
				<span className="flex-1 text-base font-medium truncate">
					{guest.full_name}
				</span>
				{onUnseat && (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onUnseat();
						}}
						title="Unseat"
						className="opacity-0 group-hover:opacity-100 text-xs font-bold uppercase tracking-wider px-1.5"
					>
						↩
					</button>
				)}
				{onDelete && (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onDelete();
						}}
						title="Remove guest"
						className="opacity-0 group-hover:opacity-100 text-base px-1.5"
					>
						×
					</button>
				)}
			</div>
		</li>
	);
}

// ── SVG element node ───────────────────────────────────────────────

const KIND_STYLE: Record<
	string,
	{ fill: string; stroke: string; dash?: string }
> = {
	table: { fill: "#f2dbe7", stroke: "#c48aa5" },
	floral: { fill: "rgba(168,181,90,0.22)", stroke: "#a8b55a" },
	dancefloor: { fill: "rgba(208,72,120,0.06)", stroke: "#d04878", dash: "8 6" },
	bar: { fill: "#6b1535", stroke: "#4a0e24" },
	label: { fill: "transparent", stroke: "transparent" },
};

function ElementNode({
	element: el,
	selected,
	arming,
	assignmentBySeat,
	guestById,
	onPointerDown,
	onChairClick,
	onChairDrop,
}: {
	element: SeatingElement;
	selected: boolean;
	arming: boolean;
	assignmentBySeat: Map<string, { guest_id: string }>;
	guestById: Map<string, SeatingGuest>;
	onPointerDown: (e: React.PointerEvent) => void;
	onChairClick: (seatIndex: number) => void;
	onChairDrop: (e: React.DragEvent, seatIndex: number) => void;
}) {
	const style = KIND_STYLE[el.kind] ?? KIND_STYLE.table;
	const seats = seatPositions(el);

	return (
		<g
			transform={`translate(${el.x} ${el.y}) rotate(${el.rotation} ${el.width / 2} ${el.height / 2})`}
		>
			<rect
				width={el.width}
				height={el.height}
				rx={el.kind === "floral" ? el.height / 3 : 10}
				fill={style.fill}
				stroke={selected ? "#d04878" : style.stroke}
				strokeWidth={selected ? 2.5 : 1.5}
				strokeDasharray={style.dash}
				style={{ cursor: "grab" }}
				onPointerDown={onPointerDown}
			/>
			{el.label && (
				<text
					x={el.width / 2}
					y={el.height / 2}
					textAnchor="middle"
					dominantBaseline="central"
					pointerEvents="none"
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
				const labelOffset = CHAIR_RADIUS + 7;
				return (
					// biome-ignore lint/a11y/useSemanticElements: native <button> is not valid inside SVG
					<g
						key={s.index}
						role="button"
						tabIndex={0}
						aria-label={
							guest
								? `Seat ${s.index + 1}: ${guest.full_name}`
								: `Seat ${s.index + 1}, empty`
						}
						// Act on pointerdown: letting it bubble starts the pan gesture,
						// whose pointer capture swallows the derived click event.
						onPointerDown={(e) => {
							e.stopPropagation();
							onChairClick(s.index);
						}}
						onKeyDown={(e) => e.key === "Enter" && onChairClick(s.index)}
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => onChairDrop(e, s.index)}
					>
						<circle
							cx={s.x}
							cy={s.y}
							r={CHAIR_RADIUS}
							fill={guest ? "#6b1535" : "#f5f0eb"}
							stroke={arming && !guest ? "#d04878" : "#c48aa5"}
							strokeWidth={arming && !guest ? 2.5 : 1.25}
							style={{ cursor: "pointer" }}
						>
							<title>
								{guest
									? `${guest.full_name} — seat ${s.index + 1}`
									: `Seat ${s.index + 1}`}
							</title>
						</circle>
						{guest && (
							<text
								x={s.x}
								y={s.y}
								textAnchor="middle"
								dominantBaseline="central"
								pointerEvents="none"
								style={{
									fontFamily: "Lato, sans-serif",
									fontSize: 9,
									fontWeight: 700,
									fill: "#f5f0eb",
								}}
							>
								{guestInitials(guest.full_name)}
							</text>
						)}
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
								pointerEvents="none"
								style={{
									fontFamily: "Lato, sans-serif",
									fontSize: 11,
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

// ── Inspector panel ────────────────────────────────────────────────

function ElementInspector({
	element: el,
	onChange,
	onDelete,
	onDuplicate,
	onClose,
}: {
	element: SeatingElement;
	onChange: (patch: Partial<SeatingElement>) => void;
	onDelete: () => void;
	onDuplicate: () => void;
	onClose: () => void;
}) {
	const seatSides = [
		["seats_top", "Top"],
		["seats_right", "Right"],
		["seats_bottom", "Bottom"],
		["seats_left", "Left"],
	] as const;

	return (
		<div
			className="absolute left-3 top-3 z-10 w-64 max-w-[calc(100%-24px)] bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-3"
			style={{ border: "1px solid var(--card-border)" }}
		>
			<div className="flex items-center justify-between">
				<p className="text-xs uppercase tracking-widest font-bold text-gray-400">
					{el.kind}
				</p>
				<button
					type="button"
					onClick={onClose}
					className="w-6 h-6 rounded-full hover:bg-black/10 text-gray-400 leading-none"
				>
					×
				</button>
			</div>

			<input
				value={el.label ?? ""}
				onChange={(e) => onChange({ label: e.target.value })}
				placeholder="Label"
				className="w-full px-3 py-2 border rounded-xl text-base focus:outline-none focus:ring-2"
				style={{
					borderColor: "var(--card-border)",
					background: "var(--section-s1)",
				}}
			/>

			<div className="grid grid-cols-2 gap-2">
				<label className="flex flex-col gap-1">
					<span className="text-xs font-bold text-gray-400 uppercase">
						Width
					</span>
					<input
						type="number"
						step={10}
						min={20}
						value={Math.round(el.width)}
						onChange={(e) =>
							onChange({ width: Number(e.target.value) || el.width })
						}
						className="px-2 py-1.5 border rounded-lg text-base"
						style={{ borderColor: "var(--card-border)" }}
					/>
				</label>
				<label className="flex flex-col gap-1">
					<span className="text-xs font-bold text-gray-400 uppercase">
						Height
					</span>
					<input
						type="number"
						step={10}
						min={20}
						value={Math.round(el.height)}
						onChange={(e) =>
							onChange({ height: Number(e.target.value) || el.height })
						}
						className="px-2 py-1.5 border rounded-lg text-base"
						style={{ borderColor: "var(--card-border)" }}
					/>
				</label>
			</div>

			<div className="flex items-center gap-2">
				<span className="text-xs font-bold text-gray-400 uppercase flex-1">
					Rotate ({Math.round(el.rotation)}°)
				</span>
				<button
					type="button"
					onClick={() => onChange({ rotation: (el.rotation - 15 + 360) % 360 })}
					className="w-8 h-8 rounded-lg border"
					style={{
						borderColor: "var(--card-border)",
						color: "var(--color-wine)",
					}}
				>
					⟲
				</button>
				<button
					type="button"
					onClick={() => onChange({ rotation: (el.rotation + 15) % 360 })}
					className="w-8 h-8 rounded-lg border"
					style={{
						borderColor: "var(--card-border)",
						color: "var(--color-wine)",
					}}
				>
					⟳
				</button>
			</div>

			{el.kind === "table" || totalSeats(el) > 0 ? (
				<div className="grid grid-cols-2 gap-2">
					{seatSides.map(([key, label]) => (
						<label key={key} className="flex items-center gap-2">
							<span className="text-xs font-bold text-gray-400 uppercase w-14">
								{label}
							</span>
							<input
								type="number"
								min={0}
								max={30}
								value={el[key]}
								onChange={(e) =>
									onChange({ [key]: Math.max(0, Number(e.target.value) || 0) })
								}
								className="w-full px-2 py-1.5 border rounded-lg text-base"
								style={{ borderColor: "var(--card-border)" }}
							/>
						</label>
					))}
				</div>
			) : null}

			<div className="mt-1 grid grid-cols-2 gap-2">
				<button
					type="button"
					onClick={onDuplicate}
					title="Or copy/paste with ⌘C / ⌘V"
					className="py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors hover:opacity-80"
					style={{
						background: "var(--section-s2)",
						color: "var(--color-wine)",
					}}
				>
					Duplicate
				</button>
				<button
					type="button"
					onClick={onDelete}
					className="py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors"
				>
					Delete
				</button>
			</div>
		</div>
	);
}
