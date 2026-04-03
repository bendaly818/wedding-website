interface PageSectionProps {
	id: string;
	bg?: "s1" | "s2";
	className?: string;
	children: React.ReactNode;
}

export default function PageSection({ id, bg = "s1", className = "", children }: PageSectionProps) {
	return (
		<section
			id={id}
			className={`py-24 px-4${className ? ` ${className}` : ""}`}
			style={{ background: `var(--section-${bg})` }}
		>
			{children}
		</section>
	);
}
