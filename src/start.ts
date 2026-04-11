import { createMiddleware, createStart } from "@tanstack/react-start";

const requestLogger = createMiddleware().server(
	async ({ request, next }) => {
		if (!import.meta.env.DEV) return next();

		const start = Date.now();
		const { method, url } = request;
		const path = new URL(url).pathname;

		try {
			const result = await next();
			const ms = Date.now() - start;
			console.log(`[${method}] ${path} → ${result.response?.status ?? "?"} (${ms}ms)`);
			return result;
		} catch (err) {
			const ms = Date.now() - start;
			console.error(`[${method}] ${path} → ERROR (${ms}ms)`, err);
			throw err;
		}
	},
);

export const startInstance = createStart(() => ({
	requestMiddleware: [requestLogger],
}));
