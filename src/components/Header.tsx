import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-black/5 bg-[var(--header-bg)] px-4 backdrop-blur-md">
			<nav className="page-wrap flex items-center justify-between py-4">
				<h2 className="m-0 flex-shrink-0 text-xl font-serif text-[var(--text-color)]">
					<Link to="/" className="no-underline">
						Brit & Ben
					</Link>
				</h2>

				<div className="flex w-auto items-center gap-x-6 text-sm uppercase tracking-widest sm:flex-nowrap">
					<a href="#welcome" className="nav-link">
						Welcome
					</a>
					<a href="#schedule" className="nav-link">
						Schedule
					</a>
					<a href="#travel" className="nav-link">
						Travel
					</a>
					<a href="#rsvp" className="nav-link">
						RSVP
					</a>
				</div>

				<div className="flex items-center">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
