import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { RsvpInsertInput } from "#/gql/graphql";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import PageSection from "../components/ui/PageSection";
import RadioCard from "../components/ui/RadioCard";
import { getInvite } from "./api/-invite";
import { getRsvp, submitRsvp, updateRsvp } from "./api/-rsvp";

const searchSchema = z.object({
	id: z.string().optional(),
});

export const Route = createFileRoute("/")({
	validateSearch: searchSchema,
	component: App,
});

// ── localStorage helpers ──────────────────────────────────────────
const INVITE_KEY = "wedding_invite_id";
const OPENED_KEY = "wedding_envelope_opened_ids";

function readStoredId(): string | null {
	try {
		return localStorage.getItem(INVITE_KEY);
	} catch {
		return null;
	}
}
function persistId(id: string) {
	try {
		localStorage.setItem(INVITE_KEY, id);
	} catch {}
}
function clearStoredId() {
	try {
		localStorage.removeItem(INVITE_KEY);
	} catch {}
}
function hasOpenedEnvelope(id: string): boolean {
	try {
		const ids: string[] = JSON.parse(localStorage.getItem(OPENED_KEY) ?? "[]");
		return ids.includes(id);
	} catch {
		return false;
	}
}
function markEnvelopeOpened(id: string) {
	try {
		const ids: string[] = JSON.parse(localStorage.getItem(OPENED_KEY) ?? "[]");
		if (!ids.includes(id))
			localStorage.setItem(OPENED_KEY, JSON.stringify([...ids, id]));
	} catch {}
}

// ── ComingSoon ────────────────────────────────────────────────────
function ComingSoon() {
	return (
		<div
			className="fullscreen-overlay"
			style={{ background: "var(--section-s1)" }}
		>
			<div className="text-center max-w-sm mx-auto">
				<h1
					className="display-title text-6xl md:text-8xl mb-4"
					style={{ color: "var(--heading-on-bg)" }}
				>
					Ben &amp; Brit
				</h1>
				<p
					className="text-xl md:text-2xl font-serif italic mb-10"
					style={{ color: "var(--color-plum-pink)" }}
				>
					Are getting married
				</p>
				<div className="flex gap-3 justify-center mb-10">
					{[0.2, 0.32, 0.44, 0.56, 0.68].map((opacity) => (
						<span key={opacity} style={{ color: "var(--color-wine)", opacity }}>
							✦
						</span>
					))}
				</div>
				<p
					className="text-base leading-relaxed mb-6"
					style={{ color: "var(--heading-on-bg)", opacity: 0.6 }}
				>
					Something wonderful is on its way. Check back once you have your
					invitation in hand.
				</p>
				<p
					className="text-sm font-semibold tracking-widest uppercase"
					style={{ color: "var(--color-plum-pink)", opacity: 0.7 }}
				>
					November 6th, 2026
				</p>
			</div>
		</div>
	);
}

// ── EnvelopeOverlay ───────────────────────────────────────────────
function EnvelopeOverlay({
	guestName,
	onOpened,
}: {
	guestName: string | null;
	onOpened: () => void;
}) {
	const [phase, setPhase] = useState<"sealed" | "opening" | "exiting">(
		"sealed",
	);

	const handleOpen = useCallback(() => {
		if (phase !== "sealed") return;
		setPhase("opening");
		setTimeout(() => setPhase("exiting"), 1200);
		setTimeout(onOpened, 1800);
	}, [phase, onOpened]);

	const isAnimating = phase !== "sealed";

	return (
		<button
			className={`fullscreen-overlay envelope-scene${phase === "exiting" ? " is-exiting" : ""}`}
			type="button"
			tabIndex={0}
			aria-label="Open your invitation"
			onClick={phase === "sealed" ? handleOpen : undefined}
			onKeyDown={
				phase === "sealed"
					? (e) => e.key === "Enter" && handleOpen()
					: undefined
			}
		>
			<p className="envelope-tagline">You&apos;re Invited</p>

			{/* Container: provides positioning context for letter/flap/seal without overflow clipping */}
			<div
				className={`envelope-container${isAnimating ? " is-animating" : ""}`}
			>
				{/* Letter — sibling of envelope-outer, free to rise above it */}
				<div className={`envelope-letter${isAnimating ? " is-rising" : ""}`}>
					<p className="envelope-letter-title">Ben &amp; Brit</p>
					<div className="envelope-letter-divider" />
					<p className="envelope-letter-date">November 6th, 2026</p>
					<p className="envelope-letter-venue">Bridgewater Estate</p>
				</div>

				{/* envelope-outer: overflow:hidden + border-radius — only contains body elements */}
				<div className="envelope-outer">
					<div className="envelope-body-back" />
					<div className="envelope-fold-left" />
					<div className="envelope-fold-right" />
					<div className="envelope-fold-bottom">
						{guestName && (
							<div className="envelope-address">
								<span
									className="font-serif text-sm"
									style={{ color: "rgba(107,21,53,0.5)" }}
								>
									{guestName}
								</span>
							</div>
						)}
					</div>
					<div className="envelope-seams" />
				</div>

				{/* Flap — sibling of envelope-outer, unaffected by its overflow */}
				<div className={`envelope-flap${isAnimating ? " is-open" : ""}`}>
					<div className="envelope-flap-front" />
					<div className="envelope-flap-back" />
				</div>

				{/* Wax seal */}
				<div className={`envelope-seal${isAnimating ? " is-broken" : ""}`}>
					<svg
						viewBox="0 0 80 80"
						xmlns="http://www.w3.org/2000/svg"
						width="72"
						height="72"
						aria-hidden="true"
					>
						<path
							d="M40,6 C49,5 58,9 63,16 C68,22 70,30 68,38 C67,44 64,49 68,54 C72,59 72,67 66,72 C60,77 52,76 46,73 C42,71 39,73 35,74 C29,76 21,75 16,70 C11,65 11,57 14,51 C17,46 14,40 13,35 C11,28 13,19 19,14 C25,8 33,7 40,6 Z"
							fill="#7a1535"
						/>
						<path
							d="M40,6 C49,5 58,9 63,16 C68,22 70,30 68,38 C67,44 64,49 68,54 C72,59 72,67 66,72"
							fill="none"
							stroke="rgba(255,200,180,0.12)"
							strokeWidth="6"
							strokeLinecap="round"
						/>
						<circle
							cx="40"
							cy="40"
							r="24"
							fill="none"
							stroke="rgba(255,210,185,0.2)"
							strokeWidth="1"
						/>
						<circle
							cx="40"
							cy="40"
							r="19"
							fill="none"
							stroke="rgba(255,210,185,0.15)"
							strokeWidth="0.7"
						/>
						<text
							x="40"
							y="43"
							textAnchor="middle"
							dominantBaseline="middle"
							fontFamily="Georgia, 'Times New Roman', serif"
							fontSize="14"
							fontWeight="400"
							fill="rgba(255,230,210,0.88)"
							letterSpacing="2"
						>
							B&amp;B
						</text>
					</svg>
				</div>
			</div>
		</button>
	);
}

// ── WeddingAttire ─────────────────────────────────────────────────
function WeddingAttire() {
	return (
		<PageSection id="attire" bg="s1">
			<div className="page-wrap text-center">
				<h2
					className="display-title text-4xl mb-3"
					style={{ color: "var(--heading-on-bg)" }}
				>
					Wedding Attire
				</h2>
				<p
					className="font-serif text-2xl mb-14"
					style={{ color: "var(--color-plum-pink)" }}
				>
					Cocktail
				</p>

				<img
					src="/images/attire.png"
					alt="Wedding attire examples"
					className="max-w-4xl mx-auto mb-10 w-full"
				/>

				<div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-16 max-w-2xl mx-auto">
					{/* ── Women ── */}
					<div className="flex-1 text-center">
						<h4
							className="font-serif text-xl font-semibold mb-3"
							style={{ color: "var(--heading-on-bg)" }}
						>
							For Women
						</h4>
						<p className="text-sm leading-relaxed opacity-70 max-w-[400px] mx-auto">
							Cocktail, midi, or maxi dresses are perfect. As some areas of the
							venue have uneven ground, we recommend wearing block heels,
							wedges, or flats instead of stilettos.
						</p>
					</div>

					{/* ── Men ── */}
					<div className="flex-1 text-center">
						<h4
							className="font-serif text-xl font-semibold mb-3"
							style={{ color: "var(--heading-on-bg)" }}
						>
							For Men
						</h4>
						<p className="text-sm leading-relaxed opacity-70 max-w-[400px] mx-auto">
							A tailored blazer with trousers or a full suit is ideal. Dress
							shirts or button-downs are encouraged, and ties are completely
							optional — feel free to keep things polished yet relaxed.
						</p>
					</div>
				</div>
			</div>
		</PageSection>
	);
}

// ── Types ─────────────────────────────────────────────────────────
type Stage = "initializing" | "no-invite" | "envelope" | "site";

// ── App ───────────────────────────────────────────────────────────
function App() {
	const { id: urlId } = Route.useSearch();
	const queryClient = useQueryClient();

	// Resolve invite ID from URL param or localStorage (localStorage is client-only)
	const [inviteId, setInviteId] = useState<string | null>(urlId ?? null);
	const [idResolved, setIdResolved] = useState(!!urlId);
	const [envelopeOpened, setEnvelopeOpened] = useState(false);

	useEffect(() => {
		const id = urlId ?? readStoredId();
		if (id) persistId(id);
		setInviteId(id ?? null);
		setIdResolved(true);
		if (id) setEnvelopeOpened(hasOpenedEnvelope(id));
	}, [urlId]);

	// Fetch invite
	const inviteQuery = useQuery({
		queryKey: ["invite", inviteId],
		queryFn: async () => {
			const res = await getInvite(inviteId!);
			if (!res.success) clearStoredId();
			return res;
		},
		enabled: idResolved && !!inviteId,
	});

	const invite = inviteQuery.data?.success ? inviteQuery.data.invite : null;
	const guestName = invite?.name ?? null;

	// Fetch RSVP (only once invite is confirmed)
	const rsvpQuery = useQuery({
		queryKey: ["rsvp", inviteId],
		queryFn: () => getRsvp(inviteId!),
		enabled: !!invite,
	});

	const existingRsvp = rsvpQuery.data ?? null;

	// Derive stage from query states
	const stage: Stage = (() => {
		if (!idResolved) return "initializing";
		if (!inviteId) return "no-invite";
		if (inviteQuery.isPending) return "initializing";
		if (!inviteQuery.data?.success) return "no-invite";
		if (envelopeOpened) return "site";
		return "envelope";
	})();

	const [isEditing, setIsEditing] = useState(false);

	const form = useForm({
		defaultValues:
			rsvpQuery.data ??
			({
				attending: null as boolean | null,
				dietary: "",
				transit: null as boolean | null,
				physical_invite: null as boolean | null,
				song_recommendations: "",
			} as RsvpInsertInput),
		onSubmit: async ({ value }) => {
			if (!inviteId) return;
			try {
				const result = await (existingRsvp ? updateRsvp : submitRsvp)({
					invite_id: inviteId,
					attending: value.attending,
					dietary: value.dietary,
					transit: value.transit,
					physical_invite: value.physical_invite,
					song_recommendations: value.song_recommendations,
				});
				if (!result.success) {
					alert("Something went wrong saving your RSVP. Please try again.");
					return;
				}
				queryClient.setQueryData(["rsvp", inviteId], {
					attending: value.attending,
					dietary: value.dietary,
					transit: value.transit,
					physical_invite: value.physical_invite,
					song_recommendations: value.song_recommendations,
				});
				setIsEditing(false);
			} catch (error) {
				console.error(error);
				alert("Something went wrong saving your RSVP. Please try again.");
			}
		},
	});

	const startEditing = useCallback(() => {
		form.reset({
			attending: existingRsvp?.attending,
			dietary: existingRsvp?.dietary ?? "",
			transit: existingRsvp?.transit ?? null,
			physical_invite: existingRsvp?.physical_invite ?? null,
			song_recommendations: existingRsvp?.song_recommendations ?? "",
		});
		setIsEditing(true);
	}, [form, existingRsvp]);

	const handleEnvelopeOpened = useCallback(() => {
		if (inviteId) markEnvelopeOpened(inviteId);
		setEnvelopeOpened(true);
	}, [inviteId]);

	// ── No invite ──
	if (stage === "no-invite") return <ComingSoon />;

	// ── Initializing (loading) ──
	if (stage === "initializing") {
		return (
			<div
				className="fullscreen-overlay"
				style={{
					background:
						"radial-gradient(ellipse at 50% 35%, #5c1529 0%, #1e0810 100%)",
				}}
			>
				<div
					className="font-serif italic text-xl animate-pulse"
					style={{ color: "var(--color-blush)" }}
				>
					Opening your invitation...
				</div>
			</div>
		);
	}

	// ── Site (with optional envelope overlay) ──
	return (
		<>
			{stage === "envelope" && (
				<EnvelopeOverlay
					guestName={guestName}
					onOpened={handleEnvelopeOpened}
				/>
			)}

			<main>
				{/* ── HERO ── */}
				<PageSection
					id="home"
					bg="s1"
					className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center pb-20 pt-10 overflow-hidden"
				>
					{/* SVG sharpening filter definition */}
					<svg width="0" height="0" className="absolute" aria-hidden="true">
						<defs>
							<filter id="hero-sharpen">
								<feConvolveMatrix
									order="3"
									kernelMatrix="0 -0.5 0 -0.5 3 -0.5 0 -0.5 0"
									preserveAlpha="true"
								/>
							</filter>
						</defs>
					</svg>

					{/* Background photo with sepia + dark gradient overlay */}
					<div className="absolute inset-0 z-0">
						<img
							src="/images/hero.jpeg"
							alt=""
							aria-hidden="true"
							className="w-full h-full object-cover"
							style={{
								filter:
									"url(#hero-sharpen) sepia(70%) contrast(0.9) brightness(1.1)",
							}}
						/>
						<div
							className="absolute inset-0"
							style={{
								background:
									"radial-gradient(ellipse at 50% 40%, rgba(30,8,16,0.25) 0%, rgba(30,8,16,0.52) 100%)",
							}}
						/>
					</div>

					{/* Foreground content */}
					<div className="relative z-10 max-w-2xl mx-auto px-10 py-12">
						{/* Soft blur halo behind text */}
						<div
							className="absolute inset-0 -z-10"
							style={{
								backdropFilter: "blur(10px)",
								WebkitBackdropFilter: "blur(10px)",
								maskImage:
									"radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%)",
								WebkitMaskImage:
									"radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 75%)",
							}}
						/>

						<h1
							className="display-title mb-8 text-5xl md:text-7xl lg:text-8xl"
							style={{ color: "var(--color-blush-light)" }}
						>
							Ben &amp; Brit
						</h1>
						<p
							className="text-xl md:text-3xl font-serif mb-4 font-light"
							style={{ color: "var(--color-blush)" }}
						>
							We're getting married!
						</p>
						<div
							className="text-lg md:text-xl mb-10"
							style={{ color: "var(--color-blush-light)" }}
						>
							on November 6th, 2026
						</div>

						{guestName ? (
							<div className="mb-10 inline-block">
								{existingRsvp ? (
									<>
										<p
											className="text-xl md:text-3xl font-serif mb-4"
											style={{ color: "var(--color-blush)" }}
										>
											Thanks for RSVPing, {guestName}!
										</p>
										<p
											className="mt-2 mb-4 text-lg md:text-xl"
											style={{
												color: "var(--color-blush-light)",
											}}
										>
											We have you down as{" "}
											{existingRsvp.attending
												? "attending 🎉"
												: "unable to make it"}
											.
										</p>
									</>
								) : (
									<>
										<p
											className="text-xl md:text-3xl font-light mb-2"
											style={{ color: "var(--color-blush)" }}
										>
											A special welcome to
										</p>
										<h3
											className="text-3xl font-serif"
											style={{ color: "var(--color-blush-light)" }}
										>
											{guestName}
										</h3>
										<p
											className="mt-4 text-lg"
											style={{
												color: "var(--color-blush-light)",
												opacity: 0.7,
											}}
										>
											We are so excited to have you join us for our special day!
										</p>
									</>
								)}
							</div>
						) : null}

						<div className="flex gap-4 justify-center">
							<Button href="#rsvp" variant="wine" onClick={startEditing}>
								{existingRsvp ? "Edit RSVP" : "RSVP Now"}
							</Button>
							<Button
								href="#travel"
								variant="ghost"
								className="!border-[rgba(232,207,192,0.6)] !text-[var(--color-blush-light)]"
							>
								Details
							</Button>
						</div>
					</div>
				</PageSection>

				{/* ── RSVP ── */}
				<PageSection id="rsvp" bg="s1">
					<div className="page-wrap text-center">
						<h2
							className="display-title text-4xl mb-6"
							style={{ color: "var(--heading-on-bg)" }}
						>
							RSVP
						</h2>

						<div className="max-w-2xl mx-auto p-8 min-h-[400px] flex flex-col justify-center">
							{existingRsvp && !isEditing ? (
								<div className="py-12">
									<div className="text-6xl mb-6">💌</div>
									<h3
										className="text-3xl font-serif mb-4"
										style={{ color: "var(--heading-on-bg)" }}
									>
										Thank You!
									</h3>
									<p className="text-lg opacity-70 mb-8">
										Your RSVP has been sent. We can't wait to celebrate with
										you!
									</p>
									<Button variant="ghost" onClick={startEditing}>
										Edit Response
									</Button>
								</div>
							) : guestName ? (
								<div>
									<h3
										className="text-2xl font-serif mb-4"
										style={{ color: "var(--heading-on-bg)" }}
									>
										Hi {guestName}!
									</h3>
									<p className="mb-8 opacity-70 text-lg">
										{isEditing
											? "Update your response below."
											: "We would love to know if you can make it to our special day."}
									</p>
									<form
										className="flex flex-col gap-6 text-left"
										onSubmit={(e) => {
											e.preventDefault();
											e.stopPropagation();
											form.handleSubmit();
										}}
									>
										<form.Field name="attending">
											{(field) => (
												<div>
													<label
														htmlFor={field.name}
														className="block text-sm font-bold uppercase tracking-wider mb-2"
													>
														Will you be attending?
													</label>
													<div className="flex gap-4">
														<RadioCard
															name="attending"
															value="yes"
															label="Yes, wouldn't miss it!"
															checked={field.state.value === true}
															onChange={() => field.handleChange(true)}
															required
														/>
														<RadioCard
															name="attending"
															value="no"
															label="Sadly, cannot make it"
															checked={field.state.value === false}
															onChange={() => field.handleChange(false)}
															required
														/>
													</div>
												</div>
											)}
										</form.Field>

										<form.Field name="dietary">
											{(field) => (
												<FormField
													label="Dietary Requirements"
													name="dietary"
													value={field.state.value ?? ""}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Please let us know if you have any allergies or dietary restrictions..."
												/>
											)}
										</form.Field>

										<form.Field name="transit">
											{(field) => (
												<div>
													<label
														htmlFor={field.name}
														className="block text-sm font-bold uppercase tracking-wider mb-2"
													>
														Would you like transit to &amp; from the venue?
													</label>
													<p className="text-sm opacity-60 mb-3">
														We're arranging transport from a central Auckland
														location.
													</p>
													<div className="flex gap-4">
														<RadioCard
															name="transit"
															value="yes"
															label="Yes please!"
															checked={field.state.value === true}
															onChange={() => field.handleChange(true)}
														/>
														<RadioCard
															name="transit"
															value="no"
															label="No thanks"
															checked={field.state.value === false}
															onChange={() => field.handleChange(false)}
														/>
													</div>
												</div>
											)}
										</form.Field>

										<form.Field name="physical_invite">
											{(field) => (
												<div>
													<label
														htmlFor={field.name}
														className="block text-sm font-bold uppercase tracking-wider mb-2"
													>
														Would you like a physical invite?
													</label>
													<p className="text-sm opacity-60 mb-3">
														Something to put on the fridge and remember the day.
													</p>
													<div className="flex gap-4">
														<RadioCard
															name="physical_invite"
															value="yes"
															label="Yes please!"
															checked={field.state.value === true}
															onChange={() => field.handleChange(true)}
														/>
														<RadioCard
															name="physical_invite"
															value="no"
															label="No thanks"
															checked={field.state.value === false}
															onChange={() => field.handleChange(false)}
														/>
													</div>
												</div>
											)}
										</form.Field>

										<form.Field name="song_recommendations">
											{(field) => (
												<FormField
													label="What songs will get you on the dance floor?"
													hint="Bribe the DJ with your best tunes. No judgement (okay, maybe a little)."
													name="song_recommendations"
													value={field.state.value ?? ""}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="ABBA, Beyoncé, that one song you're embarrassed about..."
												/>
											)}
										</form.Field>

										<form.Subscribe selector={(s) => s.isSubmitting}>
											{(isSubmitting) => (
												<div className="flex gap-4 mt-4">
													{isEditing && (
														<Button
															variant="ghost"
															size="sm"
															className="flex-1"
															onClick={() => setIsEditing(false)}
														>
															Cancel
														</Button>
													)}
													<Button
														variant="primary"
														type="submit"
														disabled={isSubmitting}
														className="flex-1"
													>
														{isSubmitting
															? "Saving..."
															: isEditing
																? "Update RSVP"
																: "Send RSVP"}
													</Button>
												</div>
											)}
										</form.Subscribe>
									</form>
								</div>
							) : null}
						</div>
					</div>
				</PageSection>

				{/* ── TRAVEL & VENUE ── */}
				<PageSection id="travel" bg="s2">
					<div className="page-wrap text-center">
						<h2
							className="display-title text-4xl mb-12"
							style={{ color: "var(--heading-on-bg)" }}
						>
							Travel &amp; Venue
						</h2>
						<div className="max-w-2xl mx-auto text-center">
							<img
								src="/images/bridgewater.jpg"
								alt="Bridgewater Estate Venue"
								className="w-full h-64 object-cover rounded-xl mb-8 shadow-md"
							/>
							<h3
								className="display-title text-3xl mb-4"
								style={{ color: "var(--heading-on-bg)" }}
							>
								Bridgewater Estate
							</h3>
							<p className="text-xl font-serif mb-2 opacity-70">
								Helensville, Auckland, New Zealand
							</p>
							<p
								className="mb-8 font-serif text-xl tracking-wide"
								style={{ color: "var(--color-plum-pink)" }}
							>
								561 Peak Road, Auckland 0875
							</p>
							<div className="flex gap-4 justify-center">
								<Button
									href="https://maps.apple.com/?address=561+Peak+Road,+Auckland+0875"
									variant="wine"
									target="_blank"
									rel="noreferrer"
								>
									Get Directions
								</Button>
								<Button
									href="https://www.bridgewaterestate.co.nz/more/information-for-guests"
									variant="ghost"
									target="_blank"
									rel="noreferrer"
								>
									Guest Information
								</Button>
							</div>
						</div>
					</div>
				</PageSection>

				{/* ── ATTIRE ── */}
				<WeddingAttire />
			</main>
		</>
	);
}
