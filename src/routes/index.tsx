import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import { submitRsvp, updateRsvp, getRsvp } from "./api/-rsvp";
import { getInvite } from "./api/-invite";

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
	try { return localStorage.getItem(INVITE_KEY); } catch { return null; }
}
function persistId(id: string) {
	try { localStorage.setItem(INVITE_KEY, id); } catch {}
}
function clearStoredId() {
	try { localStorage.removeItem(INVITE_KEY); } catch {}
}
function hasOpenedEnvelope(id: string): boolean {
	try {
		const ids: string[] = JSON.parse(localStorage.getItem(OPENED_KEY) ?? "[]");
		return ids.includes(id);
	} catch { return false; }
}
function markEnvelopeOpened(id: string) {
	try {
		const ids: string[] = JSON.parse(localStorage.getItem(OPENED_KEY) ?? "[]");
		if (!ids.includes(id)) localStorage.setItem(OPENED_KEY, JSON.stringify([...ids, id]));
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
					{["✦", "✦", "✦", "✦", "✦"].map((s, i) => (
						<span key={i} style={{ color: "var(--color-wine)", opacity: 0.2 + i * 0.12 }}>{s}</span>
					))}
				</div>
				<p
					className="text-base leading-relaxed mb-6"
					style={{ color: "var(--heading-on-bg)", opacity: 0.6 }}
				>
					Something wonderful is on its way. Check back once you have your invitation in hand.
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
	const [phase, setPhase] = useState<"sealed" | "opening" | "exiting">("sealed");

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
			onKeyDown={phase === "sealed" ? (e) => e.key === "Enter" && handleOpen() : undefined}
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
					onClick={(e) => { e.stopPropagation(); handleOpen(); }}
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
	const [existingRsvp, setExistingRsvp] = useState<{ attending: boolean; dietary?: string | null } | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	// Controlled form state — always reflects current inputs
	const [formAttending, setFormAttending] = useState<"yes" | "no" | "">("");
	const [formDietary, setFormDietary] = useState("");

	// Client-side initialization: resolve ID from URL or localStorage
	useEffect(() => {
		const id = urlId ?? readStoredId();
		if (id) {
			persistId(id);
			setInviteId(id);
		} else {
			setStage("no-invite");
		}
	}, [urlId]);

	// Load invite once we have an ID
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
					// Bad ID — clear it so they don't get stuck
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
		return () => { cancelled = true; };
	}, [inviteId]);

	// Sync form fields whenever we open the edit form
	useEffect(() => {
		const showingForm = stage === "site" && !isSuccess && (isEditing || !existingRsvp);
		if (!showingForm) return;
		setFormAttending(existingRsvp ? (existingRsvp.attending ? "yes" : "no") : "");
		setFormDietary(existingRsvp?.dietary ?? "");
	}, [isEditing, isSuccess, stage]); // eslint-disable-line react-hooks/exhaustive-deps

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
			const result = await fn({ invite_id: inviteId, attending: formAttending, dietary: formDietary });
			if (result.success) {
				setExistingRsvp({ attending: formAttending === "yes", dietary: formDietary });
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
				style={{ background: "radial-gradient(ellipse at 50% 35%, #5c1529 0%, #1e0810 100%)" }}
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
				<EnvelopeOverlay guestName={guestName} onOpened={handleEnvelopeOpened} />
			)}

			<main>
				{/* ── HERO ── */}
				<section
					id="welcome"
					className="min-h-screen flex flex-col items-center justify-center px-4 text-center pb-20 pt-10"
					style={{ background: "var(--section-s1)" }}
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
							Are getting married
						</p>
						<div
							className="text-lg md:text-xl tracking-widest uppercase mb-12 font-semibold"
							style={{ color: "var(--heading-on-bg)", opacity: 0.7 }}
						>
							November 6th, 2026
						</div>

						{guestName ? (
							<div
								className="mb-10 p-6 rounded-2xl inline-block border"
								style={{
									background: "var(--card-bg)",
									borderColor: "var(--card-border)",
									color: "var(--card-text)",
								}}
							>
								{existingRsvp ? (
									<>
										<p
											className="text-xl font-serif italic mb-2"
											style={{ color: "var(--color-plum-pink)" }}
										>
											Thanks for RSVPing, {guestName}!
										</p>
										<p className="mt-2 mb-4 opacity-70">
											We have you down as {existingRsvp.attending ? "attending 🎉" : "unable to make it"}.
										</p>
										<a
											href="#rsvp"
											onClick={() => { setIsEditing(true); setIsSuccess(false); }}
											className="inline-block px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 border"
											style={{
												borderColor: "var(--card-border)",
												color: "var(--card-heading)",
											}}
										>
											Edit Response
										</a>
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
							<a
								href="#rsvp"
								className="px-8 py-3 rounded-full uppercase tracking-wider text-sm font-bold shadow-md transition-all hover:scale-105"
								style={{
									background: "var(--color-wine)",
									color: "var(--color-blush-light)",
								}}
							>
								{existingRsvp ? "View RSVP" : "RSVP Now"}
							</a>
							<a
								href="#schedule"
								className="border px-8 py-3 rounded-full uppercase tracking-wider text-sm font-bold transition-all hover:scale-105"
								style={{
									borderColor: "var(--outline-btn-color)",
									color: "var(--outline-btn-color)",
								}}
							>
								Details
							</a>
						</div>
					</div>
				</section>

				{/* ── OUR STORY ── */}
				<section
					id="story"
					className="py-24 px-4"
					style={{ background: "var(--color-wine)", color: "var(--color-blush-light)" }}
				>
					<div className="page-wrap text-center max-w-3xl mx-auto">
						<h2
							className="display-title text-4xl mb-8"
							style={{ color: "var(--color-blush)" }}
						>
							Our Story
						</h2>
						<p className="text-lg leading-relaxed mb-6 opacity-90">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste ab nulla ipsam quibusdam, cum inventore accusantium exercitationem maxime laboriosam in eius fuga aperiam ut doloribus vel facilis doloremque voluptate. Vero.
						</p>
						<p
							className="text-lg leading-relaxed font-serif italic"
							style={{ color: "var(--color-blush)" }}
						>
							We couldn't be more thrilled to share this beautiful new chapter
							with our closest family and friends.
						</p>
					</div>
				</section>

				{/* ── SCHEDULE ── */}
				<section
					id="schedule"
					className="py-24 px-4"
					style={{ background: "var(--section-s2)" }}
				>
					<div className="page-wrap text-center">
						<h2
							className="display-title text-4xl mb-12"
							style={{ color: "var(--heading-on-bg)" }}
						>
							Schedule
						</h2>
						<div className="max-w-xl mx-auto">
							<p
								className="text-lg italic"
								style={{ color: "var(--color-plum-pink)" }}
							>
								More details to come as we finalize our plans...
							</p>
						</div>
					</div>
				</section>

				{/* ── TRAVEL & VENUE ── */}
				<section
					id="travel"
					className="py-24 px-4"
					style={{ background: "var(--section-s3)" }}
				>
					<div className="page-wrap text-center">
						<h2
							className="display-title text-4xl mb-12"
							style={{ color: "var(--heading-on-bg)" }}
						>
							Travel &amp; Venue
						</h2>
						<div
							className="max-w-2xl mx-auto p-8 rounded-2xl shadow-xl relative overflow-hidden text-center"
							style={{
								background: "var(--card-bg)",
								border: "1px solid var(--card-border)",
							}}
						>
							<img
								src="/images/bridgewater.jpg"
								alt="Bridgewater Estate Venue"
								className="w-full h-64 object-cover rounded-xl mb-8 shadow-md"
							/>
							<h3
								className="display-title text-3xl mb-4"
								style={{ color: "var(--card-heading)" }}
							>
								Bridgewater Estate
							</h3>
							<p
								className="text-lg mb-2"
								style={{ color: "var(--card-text)", opacity: 0.7 }}
							>
								Helensville, Auckland, New Zealand
							</p>
							<p
								className="mb-8 font-serif text-xl tracking-wide"
								style={{ color: "var(--card-text)" }}
							>
								561 Peak Road, Auckland 0875
							</p>
							<a
								href="https://maps.apple.com/?address=561+Peak+Road,+Auckland+0875"
								target="_blank"
								rel="noreferrer"
								className="inline-block px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-md transition-all hover:scale-105"
								style={{
									background: "var(--color-wine)",
									color: "var(--color-blush-light)",
								}}
							>
								Get Directions
							</a>
						</div>
					</div>
				</section>

				{/* ── RSVP ── */}
				<section
					id="rsvp"
					className="py-24 px-4 relative overflow-hidden"
					style={{ background: "var(--color-wine-dark)", color: "var(--color-blush-light)" }}
				>
					<div className="page-wrap text-center relative z-10">
						<h2
							className="display-title text-4xl mb-6"
							style={{ color: "var(--color-blush)" }}
						>
							RSVP
						</h2>

						<div
							className="max-w-2xl mx-auto border border-white/10 p-8 rounded-3xl min-h-[400px] flex flex-col justify-center"
							style={{ background: "rgba(255,255,255,0.05)" }}
						>
							{isSuccess || (existingRsvp && !isEditing) ? (
								<div className="py-12">
									<div className="text-6xl mb-6">💌</div>
									<h3
										className="text-3xl font-serif mb-4"
										style={{ color: "var(--color-blush)" }}
									>
										Thank You!
									</h3>
									<p className="text-lg opacity-90 mb-8">
										Your RSVP has been sent. We can't wait to celebrate with you!
									</p>
									<button
										type="button"
										onClick={() => { setIsEditing(true); setIsSuccess(false); }}
										className="px-8 py-3 rounded-full font-bold tracking-widest uppercase transition-all hover:scale-105 shadow-lg cursor-pointer border border-white/30 bg-white/10 hover:bg-white/20"
										style={{ color: "var(--color-blush)" }}
									>
										Edit Response
									</button>
								</div>
							) : guestName ? (
								<div>
									<h3
										className="text-2xl font-serif mb-4"
										style={{ color: "var(--color-blush)" }}
									>
										Hi {guestName}!
									</h3>
									<p className="mb-8 opacity-90 text-lg">
										{isEditing ? "Update your response below." : "We would love to know if you can make it to our special day."}
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
												<label className="flex items-center gap-2 cursor-pointer bg-white/10 px-6 py-3 rounded-xl flex-1 justify-center border border-white/20 hover:bg-white/20 transition-colors">
													<input
														type="radio"
														name="attending"
														value="yes"
														required
														checked={formAttending === "yes"}
														onChange={() => setFormAttending("yes")}
														style={{ accentColor: "var(--color-plum-pink)" }}
													/>
													<span>Yes, wouldn't miss it!</span>
												</label>
												<label className="flex items-center gap-2 cursor-pointer bg-white/10 px-6 py-3 rounded-xl flex-1 justify-center border border-white/20 hover:bg-white/20 transition-colors">
													<input
														type="radio"
														name="attending"
														value="no"
														required
														checked={formAttending === "no"}
														onChange={() => setFormAttending("no")}
														style={{ accentColor: "var(--color-plum-pink)" }}
													/>
													<span>Sadly, cannot make it</span>
												</label>
											</div>
										</div>

										<div>
											<label className="block text-sm font-bold uppercase tracking-wider mb-2">
												Dietary Requirements
											</label>
											<textarea
												rows={3}
												name="dietary"
												value={formDietary}
												onChange={(e) => setFormDietary(e.target.value)}
												placeholder="Please let us know if you have any allergies or dietary restrictions..."
												className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 resize-none"
												style={{
													color: "var(--color-blush-light)",
													outlineColor: "var(--color-plum-pink)",
												}}
											/>
										</div>

										<div className="flex gap-4 mt-4">
											{isEditing && (
												<button
													type="button"
													onClick={() => setIsEditing(false)}
													className="flex-1 px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all hover:scale-105 shadow-lg cursor-pointer border border-white/30 bg-white/10 hover:bg-white/20"
													style={{ color: "var(--color-blush)" }}
												>
													Cancel
												</button>
											)}
											<button
												disabled={isSubmitting}
												type="submit"
												className="flex-1 px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all hover:scale-105 disabled:opacity-50 shadow-lg cursor-pointer flex justify-center items-center gap-2"
												style={{
													background: "var(--color-plum-pink)",
													color: "var(--color-white)",
												}}
											>
												{isSubmitting ? "Saving..." : isEditing ? "Update RSVP" : "Send RSVP"}
											</button>
										</div>
									</form>
								</div>
							) : (
								<div>
									<p className="mb-8 opacity-90 text-lg">
										Please check your invitation for your bespoke link, or enter
										your Invite ID below to find your invitation.
									</p>
									<div className="max-w-md mx-auto">
										<form
											className="flex flex-col gap-4"
											onSubmit={(e) => {
												e.preventDefault();
												const code = (e.target as any).code.value;
												window.location.href = `/?id=${code}#rsvp`;
											}}
										>
											<input
												name="code"
												type="text"
												placeholder="Enter your Invite ID..."
												className="px-6 py-4 rounded-full font-bold text-center focus:outline-none focus:ring-2"
												style={{
													background: "var(--color-blush-light)",
													color: "var(--color-wine-dark)",
												}}
												required
											/>
											<button
												type="submit"
												className="px-6 py-4 rounded-full font-bold tracking-widest uppercase transition-all hover:scale-105 shadow-lg cursor-pointer"
												style={{
													background: "var(--color-plum-pink)",
													color: "var(--color-white)",
												}}
											>
												Find Invitation
											</button>
										</form>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
