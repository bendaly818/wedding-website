import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
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
		setTimeout(() => setPhase("exiting"), 900);
		setTimeout(onOpened, 1700);
	}, [phase, onOpened]);

	const isAnimating = phase !== "sealed";

	return (
		<div
			className={`fullscreen-overlay envelope-scene${phase === "exiting" ? " is-exiting" : ""}`}
			role="button"
			tabIndex={0}
			aria-label="Open your invitation"
			onClick={phase === "sealed" ? handleOpen : undefined}
			onKeyDown={
				phase === "sealed"
					? (e) => e.key === "Enter" && handleOpen()
					: undefined
			}
		>
			<p
				className="font-serif italic text-sm"
				style={{ color: "rgba(232,207,192,0.45)", letterSpacing: "0.3em" }}
			>
				You&apos;re Invited
			</p>

			<div className={`envelope-outer${isAnimating ? " is-animating" : ""}`}>
				{/* Envelope body */}
				<div className="envelope-body">
					{guestName && (
						<div className="envelope-address">
							<span
								className="font-serif italic text-sm"
								style={{ color: "rgba(107,21,53,0.55)" }}
							>
								To: {guestName}
							</span>
						</div>
					)}
				</div>

				{/* Flap */}
				<div className={`envelope-flap${isAnimating ? " is-open" : ""}`} />

				{/* Wax seal */}
				<div className={`envelope-seal${isAnimating ? " is-broken" : ""}`}>
					B♥B
				</div>
			</div>

			{phase === "sealed" && (
				<button
					type="button"
					className="envelope-cta"
					onClick={(e) => {
						e.stopPropagation();
						handleOpen();
					}}
				>
					Open your invitation
				</button>
			)}
		</div>
	);
}

// ── Types ─────────────────────────────────────────────────────────
type Stage = "initializing" | "no-invite" | "envelope" | "site";

// ── App ───────────────────────────────────────────────────────────
function App() {
	const { id: urlId } = Route.useSearch();

	const [inviteId, setInviteId] = useState<string | null>(null);
	const [stage, setStage] = useState<Stage>("initializing");
	const [guestName, setGuestName] = useState<string | null>(null);
	const [existingRsvp, setExistingRsvp] = useState<{
		attending: boolean;
		dietary?: string | null;
		transit?: boolean | null;
		physical_invite?: boolean | null;
		song_recommendations?: string | null;
	} | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formAttending, setFormAttending] = useState<"yes" | "no" | "">("");
	const [formDietary, setFormDietary] = useState("");
	const [formTransit, setFormTransit] = useState<boolean | null>(null);
	const [formPhysicalInvite, setFormPhysicalInvite] = useState<boolean | null>(
		null,
	);
	const [formSongRecs, setFormSongRecs] = useState("");

	useEffect(() => {
		const id = urlId ?? readStoredId();
		if (id) {
			persistId(id);
			setInviteId(id);
		} else {
			setStage("no-invite");
		}
	}, [urlId]);

	useEffect(() => {
		if (!inviteId) return;
		let cancelled = false;

		async function load() {
			let failed = false;
			try {
				const res = await getInvite(inviteId!);
				if (cancelled) return;
				if (res.success && res.invite) {
					setGuestName(res.invite.name);
					const rsvp = await getRsvp(inviteId!);
					if (!cancelled && rsvp) setExistingRsvp(rsvp);
				} else {
					clearStoredId();
					failed = true;
				}
			} catch {
				failed = true;
			}
			if (cancelled) return;
			if (failed) {
				setStage("no-invite");
			} else {
				setStage(hasOpenedEnvelope(inviteId!) ? "site" : "envelope");
			}
		}
		load();
		return () => {
			cancelled = true;
		};
	}, [inviteId]);

	useEffect(() => {
		const showingForm =
			stage === "site" && !isSuccess && (isEditing || !existingRsvp);
		if (!showingForm) return;
		setFormAttending(
			existingRsvp ? (existingRsvp.attending ? "yes" : "no") : "",
		);
		setFormDietary(existingRsvp?.dietary ?? "");
		setFormTransit(existingRsvp?.transit ?? null);
		setFormPhysicalInvite(existingRsvp?.physical_invite ?? null);
		setFormSongRecs(existingRsvp?.song_recommendations ?? "");
	}, [isEditing, isSuccess, stage]);

	const handleEnvelopeOpened = useCallback(() => {
		if (inviteId) markEnvelopeOpened(inviteId);
		setStage("site");
	}, [inviteId]);

	const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inviteId) return;
		setIsSubmitting(true);
		try {
			const fn = existingRsvp ? updateRsvp : submitRsvp;
			const result = await fn({
				invite_id: inviteId,
				attending: formAttending,
				dietary: formDietary,
				transit: formTransit,
				physical_invite: formPhysicalInvite,
				song_recommendations: formSongRecs,
			});
			if (result.success) {
				setExistingRsvp({
					attending: formAttending === "yes",
					dietary: formDietary,
					transit: formTransit,
					physical_invite: formPhysicalInvite,
					song_recommendations: formSongRecs,
				});
				setIsEditing(false);
				setIsSuccess(true);
			} else {
				alert("Something went wrong saving your RSVP. Please try again.");
			}
		} catch (error) {
			console.error(error);
			alert("Something went wrong saving your RSVP. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

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
					className="min-h-screen flex flex-col items-center justify-center px-4 text-center pb-20 pt-10"
				>
					<div className="max-w-2xl mx-auto">
						<h1
							className="display-title mb-4 text-5xl md:text-7xl lg:text-8xl"
							style={{ color: "var(--heading-on-bg)" }}
						>
							Ben &amp; Brit
						</h1>
						<p
							className="text-xl md:text-2xl mb-8 font-light italic"
							style={{ color: "var(--color-plum-pink)" }}
						>
							We're getting married
						</p>
						<div
							className="text-lg md:text-xl tracking-widest uppercase mb-12 font-semibold"
							style={{ color: "var(--heading-on-bg)", opacity: 0.7 }}
						>
							November 6th, 2026
						</div>

						{guestName ? (
							<div className="mb-10 p-6 inline-block">
								{existingRsvp ? (
									<>
										<p
											className="text-xl font-serif italic mb-2"
											style={{ color: "var(--color-plum-pink)" }}
										>
											Thanks for RSVPing, {guestName}!
										</p>
										<p className="mt-2 mb-4 opacity-70">
											We have you down as{" "}
											{existingRsvp.attending
												? "attending 🎉"
												: "unable to make it"}
											.
										</p>
										<Button
											href="#rsvp"
											variant="ghost"
											size="sm"
											onClick={() => {
												setIsEditing(true);
												setIsSuccess(false);
											}}
										>
											Edit Response
										</Button>
									</>
								) : (
									<>
										<p
											className="text-xl font-serif italic mb-2"
											style={{ color: "var(--color-plum-pink)" }}
										>
											A Special Welcome to
										</p>
										<h3
											className="text-3xl font-serif"
											style={{ color: "var(--card-heading)" }}
										>
											{guestName}
										</h3>
										<p className="mt-4 opacity-70">
											We are so excited to have you join us for our special day!
										</p>
									</>
								)}
							</div>
						) : null}

						<div className="flex gap-4 justify-center">
							<Button href="#rsvp" variant="wine">
								{existingRsvp ? "View RSVP" : "RSVP Now"}
							</Button>
							<Button href="#travel" variant="ghost">
								Details
							</Button>
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
							<p className="text-lg mb-2 opacity-70">
								Helensville, Auckland, New Zealand
							</p>
							<p className="mb-8 font-serif text-xl tracking-wide">
								561 Peak Road, Auckland 0875
							</p>
							<Button
								href="https://maps.apple.com/?address=561+Peak+Road,+Auckland+0875"
								variant="wine"
								target="_blank"
								rel="noreferrer"
							>
								Get Directions
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
									<Button
										variant="ghost"
										onClick={() => {
											setIsEditing(true);
											setIsSuccess(false);
										}}
									>
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
										onSubmit={handleRsvpSubmit}
									>
										<div>
											<label className="block text-sm font-bold uppercase tracking-wider mb-2">
												Will you be attending?
											</label>
											<div className="flex gap-4">
												<RadioCard
													name="attending"
													value="yes"
													label="Yes, wouldn't miss it!"
													checked={formAttending === "yes"}
													onChange={() => setFormAttending("yes")}
													required
												/>
												<RadioCard
													name="attending"
													value="no"
													label="Sadly, cannot make it"
													checked={formAttending === "no"}
													onChange={() => setFormAttending("no")}
													required
												/>
											</div>
										</div>

										<FormField
											label="Dietary Requirements"
											name="dietary"
											value={formDietary}
											onChange={(e) => setFormDietary(e.target.value)}
											placeholder="Please let us know if you have any allergies or dietary restrictions..."
										/>

										<div>
											<label className="block text-sm font-bold uppercase tracking-wider mb-2">
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
													checked={formTransit === true}
													onChange={() => setFormTransit(true)}
												/>
												<RadioCard
													name="transit"
													value="no"
													label="No thanks"
													checked={formTransit === false}
													onChange={() => setFormTransit(false)}
												/>
											</div>
										</div>

										<div>
											<label className="block text-sm font-bold uppercase tracking-wider mb-2">
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
													checked={formPhysicalInvite === true}
													onChange={() => setFormPhysicalInvite(true)}
												/>
												<RadioCard
													name="physical_invite"
													value="no"
													label="No thanks"
													checked={formPhysicalInvite === false}
													onChange={() => setFormPhysicalInvite(false)}
												/>
											</div>
										</div>

										<FormField
											label="What songs will get you on the dance floor?"
											hint="Bribe the DJ with your best tunes. No judgement (okay, maybe a little)."
											name="song_recommendations"
											value={formSongRecs}
											onChange={(e) => setFormSongRecs(e.target.value)}
											placeholder="ABBA, Beyoncé, that one song you're embarrassed about..."
										/>

										<div className="flex gap-4 mt-4">
											{isEditing && (
												<Button
													variant="ghost"
													size="lg"
													className="flex-1"
													onClick={() => setIsEditing(false)}
												>
													Cancel
												</Button>
											)}
											<Button
												variant="primary"
												size="lg"
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
									</form>
								</div>
							) : null}
						</div>
					</div>
				</PageSection>
			</main>
		</>
	);
}
