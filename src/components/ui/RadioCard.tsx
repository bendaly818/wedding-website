interface RadioCardProps {
	name: string;
	value: string;
	label: string;
	checked: boolean;
	onChange: () => void;
	required?: boolean;
}

export default function RadioCard({
	name,
	value,
	label,
	checked,
	onChange,
	required,
}: RadioCardProps) {
	return (
		<label
			className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl flex-1 justify-center border hover:bg-[var(--color-pisachio)] transition-colors"
			style={{
				borderColor: "var(--card-border)",
				outline: checked ? "2px solid var(--color-wine)" : undefined,
			}}
		>
			<input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				required={required}
				style={{ accentColor: "var(--color-pistachio)" }}
			/>
			<span>{label}</span>
		</label>
	);
}
