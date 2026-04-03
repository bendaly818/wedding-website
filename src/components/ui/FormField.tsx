import type React from "react";

interface FormFieldProps {
	label: string;
	hint?: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	rows?: number;
}

export default function FormField({ label, hint, name, value, onChange, placeholder, rows = 3 }: FormFieldProps) {
	return (
		<div>
			<label className="block text-sm font-bold uppercase tracking-wider mb-2">
				{label}
			</label>
			{hint && <p className="text-sm opacity-60 mb-3">{hint}</p>}
			<textarea
				rows={rows}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="w-full px-4 py-3 rounded-xl bg-white border focus:outline-none focus:ring-2 resize-none"
				style={{
					color: "var(--text-color)",
					borderColor: "var(--card-border)",
					outlineColor: "var(--color-plum-pink)",
				}}
			/>
		</div>
	);
}
