// Shared A5 invitation card used by /print/$inviteId (single) and
// /print/batch (one page per guest who requested a physical invite).

// ── Editable event details ────────────────────────────────────────
// Placeholder copy — swap these out once the schedule is locked in.
export const EVENT = {
	date: "Friday, 6th November 2026",
	ceremony: {
		label: "Please arrive at",
		time: "3:00pm", // e.g. "3:00 in the afternoon"
		note: "", // optional sub-line, e.g. "Garden lawn"
	},
	venue: {
		name: "Bridgewater Estate",
		address: "561 Peak Road, Auckland 0875",
	},
	attire: "Cocktail",
} as const;

export function InviteCard({ guestName }: { guestName: string }) {
	return (
		<article className="invite">
			<h1 className="invite-couple">
				Ben <span className="amp">&amp;</span> Brit
			</h1>

			<p className="invite-intro">have the pleasure of inviting</p>

			<p className="invite-guest">{guestName || "Our cherished guest"}</p>

			<p className="invite-occasion">to attend their wedding</p>

			<div className="rule" aria-hidden="true">
				<span className="rule-dot" />
			</div>

			<p className="invite-date">{EVENT.date}</p>

			<div className="invite-venue">
				<p className="venue-name">{EVENT.venue.name}</p>
				<p className="venue-address">{EVENT.venue.address}</p>
			</div>

			<div className="invite-schedule">
				<div className="sched-row">
					<span className="sched-label">{EVENT.ceremony.label}</span>
					<span className="sched-time">{EVENT.ceremony.time}</span>
					{EVENT.ceremony.note && (
						<span className="sched-note">{EVENT.ceremony.note}</span>
					)}
				</div>
			</div>

			<p className="invite-attire">Dress code</p>
			<p className="invite-attire-note">{EVENT.attire}</p>
		</article>
	);
}

// Card-only styles. Page-level rules (@page, .print-page, html/body print
// resets) live in each route so single vs multi-page can differ.
export const INVITE_CARD_CSS = `
:root {
	--ink: #4a0e24;
	--wine: #6b1535;
	--muted: rgba(74, 14, 36, 0.55);
	--paper: #f7f3ee;
}

.invite {
	box-sizing: border-box;
	width: 148mm;
	height: 210mm;
	padding: 18mm 16mm;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: var(--ink);
	background: var(--paper);
	border: 1px solid rgba(107, 21, 53, 0.12);
	box-shadow: 0 18px 50px rgba(74, 14, 36, 0.12);
	font-family: "Playfair Display", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}

.invite-couple {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-weight: 600;
	font-size: 46pt;
	line-height: 1;
	color: var(--wine);
	margin: 0;
}

.invite-couple .amp {
	font-weight: 400;
	color: var(--wine);
	padding: 0 0.12em;
}

.invite-intro {
	font-size: 11.5pt;
	margin: 9mm 0 4mm;
	color: var(--ink);
}

.invite-guest {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 22pt;
	font-weight: 500;
	color: var(--wine);
	margin: 0;
}

.invite-occasion {
	font-size: 11.5pt;
	margin: 4mm 0 0;
}

.rule {
	position: relative;
	width: 46mm;
	height: 1px;
	background: linear-gradient(90deg, transparent, rgba(107, 21, 53, 0.35), transparent);
	margin: 9mm 0;
}

.rule-dot {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 5px;
	height: 5px;
	transform: translate(-50%, -50%) rotate(45deg);
	background: var(--wine);
}

.invite-date {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 16pt;
	letter-spacing: 0.02em;
	color: var(--wine);
	margin: 0 0 8mm;
}

.invite-schedule {
	display: flex;
	flex-direction: column;
	gap: 5mm;
	margin-bottom: 8mm;
}

.sched-row {
	display: flex;
	flex-direction: column;
	gap: 1mm;
}

.sched-label {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 14pt;
	color: var(--wine);
}

.sched-time {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 12pt;
	color: var(--ink);
}

.sched-note {
	font-size: 9.5pt;
	font-style: italic;
	color: rgba(74, 14, 36, 0.7);
}

.invite-venue {
	margin-bottom: 8mm;
}

.venue-name {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 14pt;
	color: var(--wine);
	margin: 0 0 1mm;
}

.venue-address {
	font-size: 12pt;
	color: var(--ink);
	margin: 0;
}

.invite-attire {
	font-size: 14pt;
	color: var(--wine);
	margin: 0;
}

.invite-attire-note {
	font-size: 12pt;
	color: var(--ink);
	margin: 0;
}

@media print {
	.invite {
		border: none;
		box-shadow: none;
		page-break-inside: avoid;
		break-inside: avoid;
	}
	* {
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}
}
`;
