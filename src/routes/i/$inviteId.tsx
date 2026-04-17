import { createFileRoute } from "@tanstack/react-router";
import { WeddingApp } from "../../components/WeddingApp";
import { getInvite } from "../api/-invite";

const SUPABASE_URL = "https://jhomnlzkpbnwhksgpvga.supabase.co";
const SITE_URL = "https://wedding.dalys.xyz";

export const Route = createFileRoute("/i/$inviteId")({
	loader: async ({ params: { inviteId } }) => {
		return await getInvite({ data: inviteId });
	},
	head: ({ match }) => {
		const result = match.loaderData;
		const invite = result?.success ? result.invite : null;

		const title = invite?.name
			? `Ben & Brit invite ${invite.name} 💌`
			: "Ben & Brit — We're Getting Married!";

		const description = invite?.message
			? invite.message
			: invite?.name
				? `${invite.name}, you're invited to Ben & Brit's wedding on November 6th, 2026 at Bridgewater Estate, Helensville, Auckland.`
				: "Ben & Brit are getting married! November 6th, 2026 at Bridgewater Estate, Helensville, Auckland, New Zealand.";

		const inviteId = match.params.inviteId;
		const ogImageUrl = `${SUPABASE_URL}/functions/v1/og-image?id=${inviteId}`;
		const pageUrl = `${SITE_URL}/i/${inviteId}`;

		return {
			meta: [
				{ title },
				{ name: "description", content: description },

				// Open Graph
				{ property: "og:type", content: "website" },
				{ property: "og:site_name", content: "Ben & Brit Wedding" },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:image", content: ogImageUrl },
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ property: "og:url", content: pageUrl },

				// Twitter / X
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: ogImageUrl },
			],
		};
	},
	component: InvitePage,
});

function InvitePage() {
	const { inviteId } = Route.useParams();
	const loaderResult = Route.useLoaderData();
	return <WeddingApp inviteId={inviteId} initialData={loaderResult} />;
}
