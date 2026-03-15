import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useState } from "react";
import { graphql } from "#/gql";
import type { GetAllInvitesQuery } from "#/gql/graphql";
import { createSupabaseServerClient } from "../../lib/supabase";
import { supabaseGraphqlClient } from "../../lib/supabase-graphql";

/** Returns the current user AND their access token for use in authenticated GraphQL requests. */
async function getAuthSession() {
	const supabase = createSupabaseServerClient(getRequest());
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
}

export const getAuthUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await getAuthSession();
		return session?.user ?? null;
	},
);
const GET_ALL_INVITES = graphql(`
  query GetAllInvites {
    inviteCollection(orderBy: [{ created_at: DescNullsLast }]) {
      edges {
        node {
          id
          name
          message
          sent
		  rsvpCollection {
			edges {
				node {
					id
					attending
					dietary
				}
			}
		  }
        }
      }
    }
  }
`);

export const getAllInvites = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = await getAuthSession();
		if (!session) throw new Error("Unauthorized");

		try {
			const res = await supabaseGraphqlClient.request<GetAllInvitesQuery>(
				GET_ALL_INVITES,
				{},
				{ Authorization: `Bearer ${session.access_token}` },
			);
			return res.inviteCollection?.edges?.map((e) => e.node) || [];
		} catch (e) {
			console.error(e);
			return [];
		}
	},
);

const ADD_INVITE_MUTATION = graphql(`
  mutation AddInvite($name: String!, $message: String, $sent: Boolean) {
    insertIntoinviteCollection(objects: [
      {
        name: $name,
        message: $message,
        sent: $sent
      }
    ]) {
      records {
        id
      }
    }
  }
`);

export const addInvite = createServerFn({ method: "POST" })
	.inputValidator(
		(data: unknown) => data as { name: string; message: string; sent: boolean },
	)
	.handler(async ({ data }) => {
		const session = await getAuthSession();
		if (!session) throw new Error("Unauthorized");

		try {
			await supabaseGraphqlClient.request(
				ADD_INVITE_MUTATION,
				{ name: data.name, message: data.message, sent: data.sent },
				{ Authorization: `Bearer ${session.access_token}` },
			);
			return { success: true };
		} catch (e) {
			console.error(e);
			return { success: false, error: "Failed to create invite" };
		}
	});

export const Route = createFileRoute("/admin/")({
	beforeLoad: async () => {
		const user = await getAuthUser();
		if (!user) {
			throw redirect({
				to: "/admin/login",
			});
		}
	},
	component: AdminDashboard,
});

function AdminDashboard() {
	const queryClient = useQueryClient();
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [sent, setSent] = useState(false);

	const { data: invites = [] } = useQuery({
		queryKey: ["invites"],
		queryFn: () => getAllInvites(),
	});

	const createInvite = useMutation({
		mutationFn: (data: { name: string; message: string; sent: boolean }) =>
			addInvite({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["invites"] });
			setName("");
			setMessage("");
			setSent(false);
		},
	});

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
		createInvite.mutate({ name, message, sent });
	};

	const handleLogout = async () => {
		// We can just clear the cookies on the client side for simplicity,
		// but the most robust way is to make an API call to signout.
		// Assuming the session cookies will be discarded.
		document.cookie =
			"sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie =
			"sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.href = "/admin/login";
	};

	return (
		<div className="min-h-screen bg-[color:var(--color-eggshell)] p-8">
			<div className="max-w-6xl mx-auto flex flex-col gap-8">
				<header className="flex justify-between items-center">
					<h1 className="text-4xl font-serif text-[color:var(--color-plum)]">
						Admin Dashboard
					</h1>
					<button
						onClick={handleLogout}
						type="button"
						className="bg-white px-4 py-2 rounded-lg border border-[color:var(--color-plum)]/20 shadow-sm text-sm font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors cursor-pointer"
					>
						Logout
					</button>
				</header>

				<section className="bg-white p-8 rounded-3xl shadow-xl flex flex-col gap-6">
					<h2 className="text-2xl font-serif text-[color:var(--color-plum)]">
						Create New Invite
					</h2>
					<form onSubmit={handleCreate} className="flex flex-col gap-4">
						<div className="flex gap-4">
							<label className="flex-1 flex flex-col gap-2">
								<span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
									Guest Name
								</span>
								<input
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									type="text"
									className="p-3 border rounded-lg focus:ring-[color:var(--color-burnt-orange)] outline-none bg-[color:var(--color-eggshell)]"
								/>
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
									Message
								</span>
								<input
									type="text"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="p-3 border rounded-lg focus:ring-[color:var(--color-burnt-orange)] outline-none bg-[color:var(--color-eggshell)]"
								/>
							</label>
						</div>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={sent}
								onChange={(e) => setSent(e.target.checked)}
								className="w-5 h-5 accent-[color:var(--color-burnt-orange)]"
							/>
							<span className="text-sm font-bold text-gray-700">
								Invite Sent?
							</span>
						</label>
						<button
							disabled={createInvite.isPending}
							type="submit"
							className="bg-[color:var(--color-burnt-orange)] text-white font-bold p-3 rounded-lg hover:opacity-90 uppercase tracking-widest transition-opacity w-fit px-8 cursor-pointer disabled:opacity-50"
						>
							{createInvite.isPending ? "Creating..." : "Create Invite"}
						</button>
					</form>
				</section>

				<section className="bg-white rounded-3xl shadow-xl overflow-hidden">
					<div className="p-8 pb-4">
						<h2 className="text-2xl font-serif text-[color:var(--color-plum)]">
							All Invites ({invites?.length || 0})
						</h2>
					</div>
					<div className="overflow-x-auto p-8 pt-0">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="border-b-2 border-gray-100 text-sm tracking-wider uppercase text-gray-500">
									<th className="pb-4 font-bold">Name</th>
									<th className="pb-4 font-bold">Message</th>
									<th className="pb-4 font-bold">Link</th>
									<th className="pb-4 border-l pl-4 font-bold">RSVP Status</th>
									<th className="pb-4 border-l pl-4 font-bold">Dietary</th>
									<th className="pb-4 border-l pl-4 text-center font-bold">
										Sent
									</th>
								</tr>
							</thead>
							<tbody>
								{invites?.map((invite) => {
									const rsvp = invite.rsvpCollection?.edges?.[0]?.node;
									return (
										<tr
											key={invite.id}
											className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
										>
											<td className="py-4 font-bold text-[color:var(--color-plum)] pr-4">
												{invite.name}
											</td>
											<td
												className="py-4 pr-4 max-w-[200px] truncate text-sm text-gray-600"
												title={invite.message}
											>
												{invite.message || "-"}
											</td>
											<td className="py-4 font-mono text-xs text-blue-500 pr-4">
												<a
													href={`/?id=${invite.id}#welcome`}
													target="_blank"
													rel="noreferrer"
													className="hover:underline"
												>
													View Invite ↗
												</a>
											</td>
											<td className="py-4 border-l pl-4 font-medium uppercase text-xs">
												{rsvp ? (
													rsvp.attending ? (
														<span className="text-green-600 font-bold">
															Attending
														</span>
													) : (
														<span className="text-red-600 font-bold">
															Declined
														</span>
													)
												) : (
													<span className="text-gray-400">Pending</span>
												)}
											</td>
											<td
												className="py-4 border-l pl-4 text-sm max-w-[200px] truncate pr-4 text-gray-600"
												title={rsvp?.dietary}
											>
												{rsvp?.dietary || "-"}
											</td>
											<td className="py-4 border-l pl-4 text-center">
												{invite.sent ? "✅" : "❌"}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	);
}
