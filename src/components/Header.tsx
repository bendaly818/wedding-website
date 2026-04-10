import { Link } from "@tanstack/react-router";
import { useState } from "react";

const NAV_LINKS = [
	{ href: "#welcome", label: "Welcome" },
	{ href: "#rsvp", label: "RSVP" },
	{ href: "#travel", label: "Travel" },
	{ href: "#attire", label: "Attire" },
];

export default function Header() {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--header-bg)] px-4 backdrop-blur-md">
			<nav className="page-wrap flex items-center justify-between py-4">
				<h2 className="m-0 flex-shrink-0 text-xl font-serif text-[var(--text-color)]">
					<Link to="/" className="no-underline">
						B & B
					</Link>
				</h2>

				{/* Desktop nav */}
				<div className="hidden sm:flex items-center gap-x-6 text-base uppercase tracking-widest">
					{NAV_LINKS.map(({ href, label }) => (
						<a key={href} href={href} className="nav-link">
							{label}
						</a>
					))}
				</div>

				{/* Mobile burger button */}
				<button
					type="button"
					className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					<span
						className={`block h-0.5 w-6 bg-[var(--text-color)] transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
					/>
					<span
						className={`block h-0.5 w-6 bg-[var(--text-color)] transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
					/>
					<span
						className={`block h-0.5 w-6 bg-[var(--text-color)] transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
					/>
				</button>
			</nav>

			{/* Mobile dropdown */}
			{open && (
				<div className="sm:hidden flex flex-col items-center gap-4 py-4 text-base uppercase tracking-widest border-t border-black/5">
					{NAV_LINKS.map(({ href, label }) => (
						<a
							key={href}
							href={href}
							className="nav-link"
							onClick={() => setOpen(false)}
						>
							{label}
						</a>
					))}
				</div>
			)}
		</header>
	);
}
