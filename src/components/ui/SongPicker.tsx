import { useEffect, useRef, useState } from "react";
import type { SpotifyTrack } from "../../routes/api/-spotify";
import { searchSpotify } from "../../routes/api/-spotify";

export type { SpotifyTrack };

function parseSelectedSongs(value: string): SpotifyTrack[] {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

interface SongPickerProps {
	value: string;
	onChange: (value: string) => void;
	required?: boolean;
}

export default function SongPicker({
	value,
	onChange,
	required,
}: SongPickerProps) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SpotifyTrack[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedSongs = parseSelectedSongs(value);

	const addSong = (track: SpotifyTrack) => {
		if (selectedSongs.find((s) => s.id === track.id)) return;
		onChange(JSON.stringify([...selectedSongs, track]));
		setQuery("");
		setResults([]);
		setShowResults(false);
	};

	const removeSong = (id: string) => {
		onChange(JSON.stringify(selectedSongs.filter((s) => s.id !== id)));
	};

	useEffect(() => {
		clearTimeout(searchTimeout.current);
		if (query.trim().length < 2) {
			setResults([]);
			setShowResults(false);
			return;
		}
		setIsSearching(true);
		searchTimeout.current = setTimeout(async () => {
			try {
				const tracks = await searchSpotify({ data: query });
				setResults(tracks);
				setShowResults(tracks.length > 0);
			} finally {
				setIsSearching(false);
			}
		}, 350);
		return () => clearTimeout(searchTimeout.current);
	}, [query]);

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setShowResults(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	return (
		<div>
			<label className="block text-base font-bold uppercase tracking-wider mb-2">
				Help us build the ultimate playlist
			</label>
			<p className="text-base opacity-60 mb-3">
				Your picks go straight to the DJ. Think: the song that gets you up every
				time, your guilty pleasure, that banger from 2009. We want all of it.
			</p>

			{/* Selected songs */}
			{selectedSongs.length > 0 && (
				<div className="flex flex-col gap-2 mb-3">
					{selectedSongs.map((song) => (
						<div
							key={song.id}
							className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border"
							style={{ borderColor: "var(--color-wine)", borderWidth: "1px", opacity: 1 }}
						>
							{song.albumArt ? (
								<img
									src={song.albumArt}
									alt=""
									className="w-9 h-9 rounded object-cover flex-shrink-0"
								/>
							) : (
								<div
									className="w-9 h-9 rounded flex-shrink-0"
									style={{ background: "var(--section-s2)" }}
								/>
							)}
							<div className="flex-1 min-w-0">
								<p
									className="text-base font-semibold truncate leading-tight"
									style={{ color: "var(--text-color)" }}
								>
									{song.name}
								</p>
								<p className="text-sm opacity-50 truncate leading-tight">
									{song.artist}
								</p>
							</div>
							<button
								type="button"
								onClick={() => removeSong(song.id)}
								className="w-7 h-7 flex items-center justify-center rounded-full text-lg leading-none opacity-30 hover:opacity-70 hover:bg-red-50 transition-all flex-shrink-0"
								aria-label={`Remove ${song.name}`}
							>
								×
							</button>
						</div>
					))}
				</div>
			)}

			{/* Search input */}
			<div ref={containerRef} className="relative">
				<div className="relative">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={
							selectedSongs.length > 0
								? "Add another song..."
								: "Search for a song or artist..."
						}
						className="w-full px-4 py-3 pr-12 rounded-xl bg-white border focus:outline-none focus:ring-2 text-base"
						style={{
							color: "var(--text-color)",
							borderColor: "var(--card-border)",
							outlineColor: "var(--color-plum-pink)",
						}}
						onFocus={() => results.length > 0 && setShowResults(true)}
					/>
					{isSearching ? (
						<div
							className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 rounded-full animate-spin"
							style={{
								borderColor: "var(--card-border)",
								borderTopColor: "var(--color-wine)",
							}}
						/>
					) : (
						<svg
							className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					)}
				</div>

				{/* Results dropdown */}
				{showResults && results.length > 0 && (
					<div
						className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border shadow-lg z-50 overflow-hidden"
						style={{ borderColor: "var(--card-border)" }}
					>
						{results.map((track) => {
							const alreadyAdded = selectedSongs.some((s) => s.id === track.id);
							return (
								<button
									key={track.id}
									type="button"
									onClick={() => !alreadyAdded && addSong(track)}
									disabled={alreadyAdded}
									className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--section-s1)] transition-colors text-left disabled:opacity-40"
								>
									{track.albumArt ? (
										<img
											src={track.albumArt}
											alt=""
											className="w-10 h-10 rounded object-cover flex-shrink-0"
										/>
									) : (
										<div
											className="w-10 h-10 rounded flex-shrink-0"
											style={{ background: "var(--section-s2)" }}
										/>
									)}
									<div className="flex-1 min-w-0">
										<p
											className="text-base font-semibold truncate"
											style={{ color: "var(--text-color)" }}
										>
											{track.name}
										</p>
										<p className="text-sm opacity-50 truncate">{track.artist}</p>
									</div>
									<span
										className="text-sm font-bold flex-shrink-0 uppercase tracking-wider"
										style={{
											color: alreadyAdded
												? "var(--card-border)"
												: "var(--color-wine)",
										}}
									>
										{alreadyAdded ? "Added" : "+ Add"}
									</span>
								</button>
							);
						})}
					</div>
				)}
			</div>

			{/* Hidden input for native required validation */}
			{required && (
				<input
					type="text"
					required
					value={selectedSongs.length > 0 ? "valid" : ""}
					onChange={() => {}}
					className="sr-only"
					tabIndex={-1}
					aria-hidden="true"
				/>
			)}
		</div>
	);
}
