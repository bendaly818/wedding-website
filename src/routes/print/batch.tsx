import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAllInvites, getAuthUser } from "../api/-admin";
import { INVITE_CARD_CSS, InviteCard } from "./-invite-card";

export const Route = createFileRoute("/print/batch")({
	beforeLoad: async () => {
		const user = await getAuthUser();
		if (!user) {
			throw redirect({ to: "/admin/login" });
		}
	},
	loader: async () => {
		const invites = await getAllInvites();
		return invites.filter(
			(i) => i.rsvpCollection?.edges?.[0]?.node?.physical_invite === true,
		);
	},
	head: () => ({
		meta: [
			{ title: "Ben & Brit — Physical Invitations" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: BatchPrint,
});

function BatchPrint() {
	const invites = Route.useLoaderData();

	return (
		<>
			<style>{INVITE_CARD_CSS}</style>
			<style>{PAGE_CSS}</style>
			<main className="print-page">
				<div className="batch-toolbar">
					<p className="batch-count">
						{invites.length} guest{invites.length === 1 ? "" : "s"} requested a
						physical invite
					</p>
					<button
						type="button"
						className="batch-print-btn"
						onClick={() => window.print()}
					>
						Print / Save as PDF
					</button>
				</div>

				{invites.length === 0 ? (
					<p className="batch-empty">
						No one has asked for a physical invite yet.
					</p>
				) : (
					invites.map((invite) => (
						<section key={invite.id} className="batch-sheet">
							<InviteCard guestName={invite.name?.trim() || ""} />
						</section>
					))
				)}
			</main>
		</>
	);
}

// One A5 sheet per guest; each sheet is its own page in the PDF.
const PAGE_CSS = `
@page {
	size: A5 portrait;
	margin: 0;
}

.print-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	min-height: 100vh;
	padding: 24px;
	background: #ded4c8;
}

.batch-toolbar {
	display: flex;
	align-items: center;
	gap: 16px;
	width: 148mm;
	max-width: 100%;
	justify-content: space-between;
}

.batch-count {
	margin: 0;
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	font-size: 15px;
	color: #4a0e24;
}

.batch-print-btn {
	padding: 10px 18px;
	border: none;
	border-radius: 10px;
	background: #6b1535;
	color: #fff;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	cursor: pointer;
}

.batch-print-btn:hover {
	opacity: 0.9;
}

.batch-empty {
	font-family: "Playfair Display", ui-serif, Georgia, serif;
	color: #4a0e24;
	font-size: 16px;
}

@media print {
	html,
	body,
	#app {
		margin: 0;
		padding: 0;
		min-height: 0;
		width: 148mm;
		overflow: visible;
	}
	.print-page {
		display: block;
		padding: 0;
		margin: 0;
		min-height: 0;
		width: 148mm;
		background: #fff;
	}
	.batch-toolbar,
	.batch-empty {
		display: none;
	}
	/* Forced break after every sheet keeps mm→px rounding from drifting
	   across pages; overflow clamp stops a sheet spilling into two pages. */
	.batch-sheet {
		width: 148mm;
		height: 210mm;
		overflow: hidden;
		page-break-after: always;
		break-after: page;
	}
	.batch-sheet:last-child {
		page-break-after: auto;
		break-after: auto;
	}
	.batch-sheet .invite {
		width: 100%;
		height: 100%;
		margin: 0;
	}
}
`;
