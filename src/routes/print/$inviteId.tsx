import { createFileRoute } from "@tanstack/react-router";
import { getInvite } from "../api/-invite";
import { INVITE_CARD_CSS, InviteCard } from "./-invite-card";

export const Route = createFileRoute("/print/$inviteId")({
	loader: async ({ params: { inviteId } }) => {
		return await getInvite({ data: inviteId });
	},
	head: () => ({
		meta: [
			{ title: "Ben & Brit — Invitation" },
			{ name: "robots", content: "noindex" },
		],
	}),
	component: PrintInvite,
});

function PrintInvite() {
	const result = Route.useLoaderData();
	const invite = result?.success ? result.invite : null;
	const guestName = invite?.name?.trim() || "";

	return (
		<>
			<style>{INVITE_CARD_CSS}</style>
			<style>{PAGE_CSS}</style>
			<main className="print-page">
				<InviteCard guestName={guestName} />
			</main>
		</>
	);
}

// A5 = 148mm × 210mm portrait. Self-contained so the page prints clean
// without the site header/footer/nav.
const PAGE_CSS = `
@page {
	size: A5 portrait;
	margin: 0;
}

.print-page {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 24px;
	background: #ded4c8;
}

@media print {
	html,
	body,
	#app {
		margin: 0;
		padding: 0;
		min-height: 0;
		width: 148mm;
		height: 210mm;
		overflow: hidden;
	}
	.print-page {
		/* No flex/vh here: the card IS the page, so any centering maths
		   (mm→px rounding) pushes a white sliver on top and spills to page 2. */
		display: block;
		padding: 0;
		margin: 0;
		min-height: 0;
		width: 148mm;
		height: 210mm;
		overflow: hidden;
		background: #fff;
	}
	.invite {
		width: 100%;
		height: 100%;
		margin: 0;
	}
}
`;
