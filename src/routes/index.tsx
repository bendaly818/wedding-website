import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useState, useEffect } from "react";
import { submitRsvp } from "./api/-rsvp";
import { getInvite } from "./api/-invite";

const searchSchema = z.object({
	id: z.string().optional(),
});

export const Route = createFileRoute("/")({
	validateSearch: searchSchema,
	component: App,
});

function App() {
	const { id } = Route.useSearch();
	
	const [guestName, setGuestName] = useState<string | null>(null);
	const [isInitializing, setIsInitializing] = useState(!!id);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		async function loadInvite() {
			if (!id) return;
			setIsInitializing(true);
			try {
				const res = await getInvite({ data: id });
				if (res.success && res.invite) {
					setGuestName(res.invite.name);
				} else {
					console.error(res.error);
				}
			} catch (e) {
				console.error("Failed to fetch invite", e);
			} finally {
				setIsInitializing(false);
			}
		}
		loadInvite();
	}, [id]);

	const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!id) return;

		setIsSubmitting(true);
		const form = e.target as HTMLFormElement;
		const attending = form.attending.value;
		const dietary = form.dietary.value;

		try {
			const result = await submitRsvp({
				data: {
					invite_id: id,
					attending,
					dietary,
				},
			});
			if (result.success) {
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

	return (
		<main>
			<section
				id="welcome"
				className="min-h-screen flex flex-col items-center justify-center px-4 text-center pb-20 pt-10"
			>
				<div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12">
					<div className="flex-1 text-center lg:text-left">
						<h1 className="display-title mb-4 text-5xl md:text-7xl lg:text-8xl text-[color:var(--color-plum)]">
							Brit & Ben
						</h1>
						<p className="text-xl md:text-2xl mb-8 font-light italic text-[color:var(--color-plum-light)]">
							Are getting married
						</p>
						<div className="text-lg md:text-xl tracking-widest uppercase mb-12 text-[color:var(--color-plum-dark)] opacity-80">
							November 6th, 2026
						</div>
						
						{isInitializing ? (
							<div className="mb-10 text-[color:var(--color-burnt-orange)] animate-pulse">
								Opening your invitation...
							</div>
						) : guestName ? (
							<div className="mb-10 bg-[color:var(--color-eggshell)] p-6 rounded-2xl border border-[color:var(--color-plum)]/10 shadow-sm inline-block animate-fade-in">
								<p className="text-xl font-serif text-[color:var(--color-burnt-orange-light)] italic mb-2">
									A Special Welcome to
								</p>
								<h3 className="text-3xl font-serif text-[color:var(--color-plum)]">
									{guestName}
								</h3>
								<p className="mt-4 text-[color:var(--color-plum-dark)] opacity-70">
									We are so excited to have you join us for our special day!
								</p>
							</div>
						) : null}
						
						<div className="flex gap-4 justify-center lg:justify-start">
							<a
								href="#rsvp"
								className="bg-[color:var(--color-burnt-orange)] text-[color:var(--color-eggshell)] px-8 py-3 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider text-sm font-bold shadow-md"
							>
								RSVP Now
							</a>
							<a
								href="#schedule"
								className="border border-[color:var(--color-plum)] text-[color:var(--color-plum)] hover:bg-[color:var(--color-plum)] hover:text-[color:var(--color-eggshell)] px-8 py-3 rounded-full transition-colors uppercase tracking-wider text-sm font-bold"
							>
								Details
							</a>
						</div>
					</div>
					<div className="flex-1 max-w-md w-full relative">
						<div className="absolute inset-0 bg-[color:var(--color-plum)]/10 rounded-full blur-[60px] transform scale-110 -z-10"></div>
						<img
							src="/images/hero.png"
							alt="An illustration of Brit and Ben"
							className="w-full h-auto rounded-[3rem] shadow-2xl border-4 border-[color:var(--color-eggshell)]"
						/>
					</div>
				</div>
			</section>

			<section id="story" className="py-24 px-4 bg-white/40 dark:bg-black/20">
				<div className="page-wrap text-center max-w-3xl mx-auto">
					<h2 className="display-title text-4xl mb-8 text-[color:var(--color-plum)]">
						Our Story
					</h2>
					<p className="text-lg leading-relaxed mb-6 text-[color:var(--color-plum-dark)]">
						We first met a few years ago and quickly became inseparable. Brit is
						a lovely brunette with a great sense of humour who always keeps
						things fun and lighthearted, while Ben is a software engineer who
						thought he was just building a cool website but ended up building a
						life together with his perfect match.
					</p>
					<p className="text-lg leading-relaxed text-[color:var(--color-plum-dark)] font-serif italic">
						We couldn't be more thrilled to share this beautiful new chapter
						with our closest family and friends.
					</p>
				</div>
			</section>

			<section
				id="schedule"
				className="py-24 px-4 bg-white/50 dark:bg-black/20"
			>
				<div className="page-wrap text-center">
					<h2 className="display-title text-4xl mb-12 text-[color:var(--color-plum)]">
						Schedule
					</h2>
					<div className="max-w-xl mx-auto space-y-8">
						<p className="text-lg italic text-[color:var(--color-plum-light)] dark:opacity-80">
							More details to come as we finalize our plans...
						</p>
					</div>
				</div>
			</section>

			<section id="travel" className="py-24 px-4">
				<div className="page-wrap text-center">
					<h2 className="display-title text-4xl mb-12 text-[color:var(--color-plum)]">
						Travel & Venue
					</h2>
					<div className="max-w-2xl mx-auto bg-[color:var(--color-eggshell)] border border-[color:var(--color-plum)]/10 p-8 rounded-2xl shadow-xl relative overflow-hidden text-center">
						<div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--color-burnt-orange)]/10 rounded-bl-[100px] -z-10"></div>
						<img
							src="/images/bridgewater.jpg"
							alt="Bridgewater Estate Venue"
							className="w-full h-64 object-cover rounded-xl mb-8 shadow-md"
						/>
						<h3 className="display-title text-3xl mb-4 text-[color:var(--color-plum-dark)]">
							Bridgewater Estate
						</h3>
						<p className="text-lg mb-6 text-[color:var(--color-plum-dark)] opacity-80">
							Helensville, Auckland, New Zealand
						</p>
						<p className="mb-8 font-serif text-xl tracking-wide text-[color:var(--color-plum-dark)]">
							561 Peak Road, Auckland 0875
						</p>
						<a
							href="https://maps.apple.com/?address=561+Peak+Road,+Auckland+0875"
							target="_blank"
							rel="noreferrer"
							className="inline-block bg-[color:var(--color-plum)] text-[color:var(--color-eggshell)] hover:opacity-90 px-8 py-3 rounded-full transition-opacity font-bold uppercase tracking-wider text-sm shadow-md"
						>
							Get Directions
						</a>
					</div>
				</div>
			</section>

			<section
				id="rsvp"
				className="py-24 px-4 bg-[color:var(--color-plum)] text-[color:var(--color-eggshell)] relative overflow-hidden"
			>
				<div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[color:var(--color-burnt-orange)]/20 rounded-full blur-[100px] -translate-y-1/2 -z-0 pointer-events-none"></div>
				<div className="page-wrap text-center relative z-10">
					<h2 className="display-title text-4xl mb-6 text-[color:var(--color-eggshell)]">
						RSVP
					</h2>

					<div className="max-w-2xl mx-auto bg-[color:var(--color-eggshell)]/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl min-h-[400px] flex flex-col justify-center">
						{isInitializing ? (
							<div className="text-[color:var(--color-burnt-orange-light)] animate-pulse text-xl">
								Loading your invite details...
							</div>
						) : isSuccess ? (
							<div className="py-12 animate-fade-in">
								<div className="text-6xl mb-6">💌</div>
								<h3 className="text-3xl font-serif text-[color:var(--color-burnt-orange-light)] mb-4">
									Thank You!
								</h3>
								<p className="text-lg opacity-90">
									Your RSVP has been sent. We can't wait to celebrate with you!
								</p>
							</div>
						) : guestName ? (
							<div className="animate-fade-in">
								<h3 className="text-2xl font-serif text-[color:var(--color-burnt-orange-light)] mb-4">
									Hi {guestName}!
								</h3>
								<p className="mb-8 opacity-90 text-lg">
									We would love to know if you can make it to our special day.
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
													className="accent-[color:var(--color-burnt-orange)]"
												/>
												<span>Yes, wouldn't miss it!</span>
											</label>
											<label className="flex items-center gap-2 cursor-pointer bg-white/10 px-6 py-3 rounded-xl flex-1 justify-center border border-white/20 hover:bg-white/20 transition-colors">
												<input
													type="radio"
													name="attending"
													value="no"
													required
													className="accent-[color:var(--color-burnt-orange)]"
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
											placeholder="Please let us know if you have any allergies or dietary restrictions..."
											className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-[color:var(--color-eggshell)] placeholder-[color:var(--color-eggshell)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-burnt-orange)] resize-none"
										></textarea>
									</div>

									<button
										disabled={isSubmitting}
										type="submit"
										className="mt-4 bg-[color:var(--color-burnt-orange)] hover:opacity-90 disabled:opacity-50 text-[color:var(--color-eggshell)] px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-opacity shadow-lg cursor-pointer flex justify-center items-center gap-2"
									>
										{isSubmitting ? "Sending..." : "Send RSVP"}
									</button>
								</form>
							</div>
						) : (
							<div className="animate-fade-in">
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
											className="px-6 py-4 rounded-full text-[color:var(--color-plum-dark)] font-bold text-center focus:outline-none focus:ring-2 focus:ring-[color:var(--color-burnt-orange)] bg-[color:var(--color-eggshell)]"
											required
										/>
										<button
											type="submit"
											className="bg-[color:var(--color-burnt-orange)] hover:opacity-90 text-[color:var(--color-eggshell)] px-6 py-4 rounded-full font-bold tracking-widest uppercase transition-opacity shadow-lg mt-2 cursor-pointer"
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
	);
}
