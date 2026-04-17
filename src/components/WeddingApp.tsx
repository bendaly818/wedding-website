import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(useGSAP);
}
import type { RsvpInsertInput } from "#/gql/graphql";
import Button from "./ui/Button";
import FormField from "./ui/FormField";
import PageSection from "./ui/PageSection";
import RadioCard from "./ui/RadioCard";
import SongPicker from "./ui/SongPicker";
import { getInvite } from "../routes/api/-invite";
import { getRsvp, submitRsvp, updateRsvp } from "../routes/api/-rsvp";

type InviteResult = Awaited<ReturnType<typeof getInvite>>;

interface WeddingAppProps {
	inviteId?: string | null;
	initialData?: InviteResult | null;
}

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
					className="text-lg leading-relaxed mb-6"
					style={{ color: "var(--heading-on-bg)", opacity: 0.6 }}
				>
					Something wonderful is on its way. Check back once you have your
					invitation in hand.
				</p>
				<p
					className="text-base font-semibold tracking-widest uppercase"
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
	onExiting,
}: {
	guestName: string | null;
	onOpened: () => void;
	onExiting: () => void;
}) {
	const [phase, setPhase] = useState<"sealed" | "opening" | "exiting">(
		"sealed",
	);

	const sceneRef = useRef<HTMLButtonElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const letterRef = useRef<HTMLDivElement>(null);
	const flapFrontRef = useRef<HTMLDivElement>(null);
	const sealRef = useRef<HTMLDivElement>(null);
	const floatTweenRef = useRef<gsap.core.Tween | null>(null);

	// Idle float animation on mount
	const { contextSafe } = useGSAP(() => {
		floatTweenRef.current = gsap.to(containerRef.current, {
			y: -8,
			duration: 2.5,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1,
		});
	}, { scope: sceneRef });

	const handleOpen = contextSafe(() => {
		if (phase !== "sealed") return;
		setPhase("opening");

		// Kill float and snap container to rest
		floatTweenRef.current?.kill();
		gsap.set(containerRef.current, { y: 0 });

		const tl = gsap.timeline({ onComplete: onOpened });

		// Seal: gentle punch-up then drift and dissolve
		tl.to(sealRef.current, {
			scale: 1.07,
			duration: 0.12,
			ease: "power2.out",
		}).to(sealRef.current, {
			scale: 0.65,
			y: -18,
			rotation: 7,
			autoAlpha: 0,
			duration: 0.42,
			ease: "power2.in",
		});

		// Flap opens — parent has CSS perspective:1000px so just rotationX here
		tl.to(
			flapFrontRef.current,
			{
				rotationX: -180,
				duration: 0.88,
				ease: "power3.out",
			},
			0.08,
		);

		// Letter rises with slight overshoot
		tl.to(
			letterRef.current,
			{
				yPercent: -95,
				duration: 0.78,
				ease: "back.out(1.15)",
			},
			0.46,
		);

		// Exit: slow fade + gentle scale recession so crossfade feels graceful
		tl.to(
			sceneRef.current,
			{
				autoAlpha: 0,
				scale: 0.96,
				duration: 1.5,
				ease: "power2.inOut",
				onStart: () => {
					setPhase("exiting");
					onExiting();
				},
			},
			1.2,
		);
	});

	return (
		<button
			ref={sceneRef}
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
			<p className="font-serif text-3xl" style={{ color: "var(--color-wine)" }}>
				You&apos;re Invited
			</p>

			<div ref={containerRef} className="envelope-container">
				{/* SVG clip path: curved bezier edges for natural-looking flap */}
				<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
					<defs>
						<clipPath id="envelope-flap-clip" clipPathUnits="objectBoundingBox">
							{/* Straight sides with:
							    - rounded top corners (Q arcs matching the 8px envelope border-radius)
							    - rounded bottom tip where the flap meets the wax seal */}
							<path d="M 0.02 0 Q 0 0 0 0.05 L 0.47 0.75 Q 0.5 0.88 0.53 0.75 L 1 0.05 Q 1 0 0.98 0 Z" />
						</clipPath>
					</defs>
				</svg>

				{/* Letter — rises above envelope on open */}
				<div ref={letterRef} className="envelope-letter">
					<p className="envelope-letter-title">Ben &amp; Brit</p>
					<div className="envelope-letter-divider" />
					<p className="envelope-letter-date">November 6th, 2026</p>
					<p className="envelope-letter-venue">Bridgewater Estate</p>
				</div>

				{/* Envelope body — overflow:hidden clips fold triangles */}
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

				{/* Flap — parent has perspective:1000px; rotationX drives the 3D open */}
				<div className={`envelope-flap${phase !== "sealed" ? " is-open" : ""}`}>
					<div ref={flapFrontRef} className="envelope-flap-front" />
					<div className="envelope-flap-back" />
				</div>

				{/* Wax seal */}
				<div ref={sealRef} className="envelope-seal">
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
							className="text-xl font-semibold mb-3"
							style={{ color: "var(--heading-on-bg)" }}
						>
							For Women
						</h4>
						<p className="text-base leading-relaxed opacity-70 max-w-[400px] mx-auto">
							Cocktail, midi, or maxi dresses are perfect. As some areas of the
							venue have uneven ground, we recommend wearing block heels,
							wedges, or flats instead of stilettos.
						</p>
					</div>

					{/* ── Men ── */}
					<div className="flex-1 text-center">
						<h4
							className="text-xl font-semibold mb-3"
							style={{ color: "var(--heading-on-bg)" }}
						>
							For Men
						</h4>
						<p className="text-base leading-relaxed opacity-70 max-w-[400px] mx-auto">
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

// ── WeddingApp ────────────────────────────────────────────────────
export function WeddingApp({ inviteId: urlId, initialData: loaderResult }: WeddingAppProps) {
	const queryClient = useQueryClient();

	// Resolve invite ID from URL param or localStorage (localStorage is client-only)
	const [inviteId, setInviteId] = useState<string | null>(urlId ?? null);
	const [idResolved, setIdResolved] = useState(!!urlId);
	const [envelopeOpened, setEnvelopeOpened] = useState(false);
	// False until the useEffect has read localStorage — prevents the envelope
	// flashing on return visits before we know it's already been opened.
	const [envelopeStateKnown, setEnvelopeStateKnown] = useState(false);
	// mainVisible drives the site fade-in; true immediately for return visitors
	const [mainVisible, setMainVisible] = useState(false);

	useEffect(() => {
		// localStorage is client-only — this effect is unavoidable.
		let id: string | null = urlId ?? null;
		if (urlId) {
			// URL param case: ID already in state; just persist it.
			persistId(urlId);
		} else {
			// localStorage-only case: resolve ID from storage.
			id = readStoredId();
			setInviteId(id);
			setIdResolved(true);
			if (id) persistId(id);
		}
		if (id && hasOpenedEnvelope(id)) {
			setEnvelopeOpened(true);
			setMainVisible(true);
		}
		setEnvelopeStateKnown(true);
	}, [urlId]);

	// Fetch invite
	const inviteQuery = useQuery({
		queryKey: ["invite", inviteId],
		queryFn: async () => {
			const res = await getInvite({ data: inviteId! });
			if (!res.success) clearStoredId();
			return res;
		},
		enabled: idResolved && !!inviteId,
		// Seed from SSR loader data so the first render has content immediately
		initialData: loaderResult ?? undefined,
		// Invites don't change mid-session; avoid redundant background refetch
		staleTime: Number.POSITIVE_INFINITY,
	});

	const invite = inviteQuery.data?.success ? inviteQuery.data.invite : null;
	const guestName = invite?.name ?? null;

	// Fetch RSVP (only once invite is confirmed)
	const rsvpQuery = useQuery({
		queryKey: ["rsvp", inviteId],
		queryFn: () => getRsvp({ data: inviteId! }),
		enabled: !!invite,
	});

	const existingRsvp = rsvpQuery.data ?? null;

	// Derive stage from query states
	const stage: Stage = (() => {
		if (!idResolved || !envelopeStateKnown) return "initializing";
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
				email: "",
				additional_notes: "",
			} as RsvpInsertInput),
		onSubmit: async ({ value }) => {
			if (!inviteId) return;
			try {
				const result = await (existingRsvp ? updateRsvp : submitRsvp)({
					data: {
						invite_id: inviteId,
						attending: value.attending,
						dietary: value.dietary,
						transit: value.transit,
						physical_invite: value.physical_invite,
						song_recommendations: value.song_recommendations,
						email: value.email,
						additional_notes: value.additional_notes,
					},
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
					email: value.email,
					additional_notes: value.additional_notes,
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
			email: existingRsvp?.email ?? "",
			additional_notes: existingRsvp?.additional_notes ?? "",
		});
		existingRsvp && setIsEditing(true);
	}, [form, existingRsvp]);

	const handleEnvelopeOpened = useCallback(() => {
		if (inviteId) markEnvelopeOpened(inviteId);
		setEnvelopeOpened(true);
	}, [inviteId]);

	const handleEnvelopeExiting = useCallback(() => {
		setMainVisible(true);
	}, []);

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
					onExiting={handleEnvelopeExiting}
				/>
			)}

			<main
				style={{
					opacity: mainVisible ? 1 : 0,
					transition: "opacity 1.5s ease",
				}}
			>
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
							className="text-xl md:text-3xl mb-10  font-serif font-light"
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
											className="mt-2 mb-4 text-xl md:text-3xl font-serif font-light"
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
										<h3
											className="text-xl md:text-3xl font-serif mb-4 font-light"
											style={{ color: "var(--color-blush)" }}
										>
											{guestName}
										</h3>

										{invite?.message ? (
											<p
											className="mt-2 mb-4 text-xl md:text-3xl font-serif font-light"
											style={{
												color: "var(--color-blush-light)",
											}}>
												{invite.message}
											</p>
										) :<p
									className="mt-2 mb-4 text-xl md:text-3xl font-serif font-light"
											style={{
												color: "var(--color-blush-light)",
											}}
										>
											We are so excited to have you join us for our special day!
										</p>}
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

						<div className="max-w-2xl mx-auto min-h-[400px] flex flex-col justify-center">
							{existingRsvp && !isEditing ? (
								<div className="py-12">
									<div className="text-6xl mb-6">💌</div>
									<h3
										className="text-4xl mb-4"
										style={{ color: "var(--heading-on-bg)" }}
									>
										Thank You!
									</h3>
									<p className="text-xl opacity-70 mb-8">
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
										className="text-3xl mb-4"
										style={{ color: "var(--heading-on-bg)" }}
									>
										Hi {guestName}!
									</h3>
									<p className="mb-8 font-serif text-lg"

										style={{ color: "var(--color-wine)" }}
									>
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
														className="block text-base font-bold uppercase tracking-wider mb-2"
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

										<form.Subscribe selector={(s) => s.values.attending}>
											{(attending) =>
												attending === true ? (
													<form.Field name="email">
														{(field) => (
															<FormField
																label="Email Address"
																name="email"
																type="email"
																value={field.state.value ?? ""}
																onChange={(e) => field.handleChange(e.target.value)}
																placeholder="your@email.com"
																hint="We'll only use this to send you wedding updates closer to the day."
																required
															/>
														)}
													</form.Field>
												) : null
											}
										</form.Subscribe>

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
														className="block text-base font-bold uppercase tracking-wider mb-2"
													>
														Would you like transit to &amp; from the venue?
													</label>
													<p className="text-base opacity-60 mb-3">
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
														required
														/>
														<RadioCard
															name="transit"
															value="no"
															label="No thanks"
															checked={field.state.value === false}
															onChange={() => field.handleChange(false)}
															required
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
														className="block text-base font-bold uppercase tracking-wider mb-2"
													>
														Would you like a physical invite?
													</label>
													<p className="text-base opacity-60 mb-3">
														Something to put on the fridge and remember the day.
													</p>
													<div className="flex gap-4">
														<RadioCard
															name="physical_invite"
															value="yes"
															label="Yes please!"
															checked={field.state.value === true}
															onChange={() => field.handleChange(true)}
														required
														/>
														<RadioCard
															name="physical_invite"
															value="no"
															label="No thanks"
															checked={field.state.value === false}
															onChange={() => field.handleChange(false)}
															required
														/>
													</div>
												</div>
											)}
										</form.Field>

										<form.Field name="song_recommendations">
											{(field) => (
												<SongPicker
													value={field.state.value ?? ""}
													onChange={(v) => field.handleChange(v)}
													required
												/>
											)}
										</form.Field>

										<form.Subscribe selector={(s) => s.values.attending}>
											{(attending) =>
												attending === true ? (
													<form.Field name="additional_notes">
														{(field) => (
															<FormField
																label="Any questions?"
																name="additional_notes"
																value={field.state.value ?? ""}
																onChange={(e) => field.handleChange(e.target.value)}
																placeholder=""
																multiline
															/>
														)}
													</form.Field>
												) : null
											}
										</form.Subscribe>

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
									Venue Information
								</Button>
							</div>

							<div className="mt-10 text-left rounded-xl p-6">
								<h4
									className="display-title text-2xl mb-2"
									style={{ color: "var(--heading-on-bg)" }}
								>
									Getting There
								</h4>
								<p className="opacity-70 mb-4 leading-relaxed text-base">
									If you're not using the shuttle service that we will provide and you're not driving yourself — a quick note that Uber does not operate in the area of the wedding, so you'll need to pre-book a taxi or shuttle.
								</p>
								<ul className="space-y-2 text-base">
									<li><span className="font-semibold opacity-80">Liberty Shuttles</span> <span className="opacity-50">—</span> <a href="tel:0800995511" className="text-[var(--color-wine)] hover:underline">0800 99 55 11</a></li>
									<li><span className="font-semibold opacity-80">Huapai Transfers</span> <span className="opacity-50">—</span> <a href="tel:02049527222" className="text-[var(--color-wine)] hover:underline">0204 952 722</a></li>
									<li><span className="font-semibold opacity-80">Nor West Taxis</span> <span className="opacity-50">—</span> <a href="tel:094129335" className="text-[var(--color-wine)] hover:underline">09 412 9335</a></li>
									<li><span className="font-semibold opacity-80">Budget Taxi</span> <span className="opacity-50">—</span> <a href="tel:098494000" className="text-[var(--color-wine)] hover:underline">09 849 4000</a></li>
									<li><span className="font-semibold opacity-80">Corporate Cabs</span> <span className="opacity-50">—</span> <a href="tel:0800789789" className="text-[var(--color-wine)] hover:underline">0800 789 789</a></li>
									<li><span className="font-semibold opacity-80">Quick Shuttle</span> <span className="opacity-50">—</span> <a href="mailto:info@quickshuttle.co.nz" className="text-[var(--color-wine)] hover:underline">info@quickshuttle.co.nz</a></li>
								</ul>
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
