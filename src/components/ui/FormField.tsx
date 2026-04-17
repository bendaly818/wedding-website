import type React from "react";

interface FormFieldProps {
	label: string;
	hint?: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder?: string;
	rows?: number;
	type?: string;
	multiline?: boolean;
	required?: boolean;
}

export default function FormField({ label, hint, name, value, onChange, placeholder, rows = 3, type, multiline = true, required }: FormFieldProps) {
	const sharedClass = "w-full px-4 py-3 rounded-xl bg-white border focus:outline-none focus:ring-2";
	const sharedStyle = {
		color: "var(--text-color)",
		borderColor: "var(--card-border)",
		outlineColor: "var(--color-plum-pink)",
	};

	return (
		<div>
			<label className="block text-base font-bold uppercase tracking-wider mb-2">
				{label}
			</label>
			{hint && <p className="text-base opacity-60 mb-3">{hint}</p>}
			{multiline && !type ? (
				<textarea
					rows={rows}
					name={name}
					value={value}
					onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
					placeholder={placeholder}
					required={required}
					className={`${sharedClass} resize-none`}
					style={sharedStyle}
				/>
			) : (
				<input
					type={type ?? "text"}
					name={name}
					value={value}
					onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
					placeholder={placeholder}
					required={required}
					className={sharedClass}
					style={sharedStyle}
				/>
			)}
		</div>
	);
}
