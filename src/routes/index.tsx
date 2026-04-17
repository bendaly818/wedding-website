import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { WeddingApp } from "../components/WeddingApp";
import { getInvite } from "./api/-invite";

const searchSchema = z.object({
	id: z.string().optional(),
});

export const Route = createFileRoute("/")({
	validateSearch: searchSchema,
	loaderDeps: ({ search }) => ({ id: search.id }),
	loader: async ({ deps: { id } }) => {
		if (!id) return null;
		return await getInvite({ data: id });
	},
	component: App,
});

function App() {
	const { id: urlId } = Route.useSearch();
	const loaderResult = Route.useLoaderData();
	return <WeddingApp inviteId={urlId} initialData={loaderResult} />;
}
