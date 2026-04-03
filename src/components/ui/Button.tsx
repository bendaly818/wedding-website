import type React from "react";

type Variant = "primary" | "wine" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyle: Record<Variant, React.CSSProperties> = {
	primary: {
		background: "var(--color-wine)",
		color: "var(--color-blush-light)",
	},
	wine: { background: "var(--color-wine)", color: "var(--color-blush-light)" },
	outline: {
		borderColor: "var(--outline-btn-color)",
		color: "var(--outline-btn-color)",
	},
	ghost: { borderColor: "var(--card-border)", color: "var(--heading-on-bg)" },
};

const sizeClass: Record<Size, string> = {
	sm: "px-6 py-2 text-sm",
	md: "px-8 py-3 text-sm",
	lg: "px-8 py-4",
};

const BASE =
	"rounded-full font-bold tracking-widest uppercase transition-all hover:scale-105 cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50";

interface ButtonProps {
	variant?: Variant;
	size?: Size;
	href?: string;
	target?: string;
	rel?: string;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	onClick?: React.MouseEventHandler;
	className?: string;
	children: React.ReactNode;
}

export default function Button({
	variant = "primary",
	size = "md",
	href,
	target,
	rel,
	type = "button",
	disabled,
	onClick,
	className = "",
	children,
}: ButtonProps) {
	const hasBorder = variant === "outline" || variant === "ghost";
	const cls = `${BASE} ${sizeClass[size]} ${hasBorder ? "border" : "shadow-md"} ${className}`;
	const style = variantStyle[variant];

	if (href !== undefined) {
		return (
			<a
				href={href}
				className={cls}
				style={style}
				onClick={onClick}
				target={target}
				rel={rel}
			>
				{children}
			</a>
		);
	}

	return (
		<button
			className={cls}
			style={style}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
