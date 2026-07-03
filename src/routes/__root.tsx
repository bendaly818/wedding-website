import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Footer from "../components/Footer";
import Header from "../components/Header";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Ben & Brit — We're Getting Married!",
			},
			{
				name: "description",
				content:
					"Ben & Brit are getting married! November 6th, 2026 at Bridgewater Estate, Helensville, Auckland, New Zealand.",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "Ben & Brit Wedding" },
			{ property: "og:title", content: "Ben & Brit — We're Getting Married!" },
			{
				property: "og:description",
				content:
					"Ben & Brit are getting married! November 6th, 2026 at Bridgewater Estate, Helensville, Auckland, New Zealand.",
			},
			{
				property: "og:image",
				content: "https://wedding.dalys.xyz/images/hero.jpeg",
			},
			{ property: "og:url", content: "https://wedding.dalys.xyz" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "64x64 32x32 24x24 16x16",
				type: "image/x-icon",
			},
			{
				rel: "icon",
				href: "/logo192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{ rel: "apple-touch-icon", href: "/logo192.png" },
			{ rel: "manifest", href: "/manifest.json" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Faculty+Glyphic&family=Jost:ital,wght@0,100..900;1,100..900&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	// Print routes render standalone pages; the seating editor is a
	// full-viewport app — neither gets site chrome.
	const isPrint =
		pathname.startsWith("/print") || pathname.startsWith("/admin/seating");
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
				{!isPrint && <Header />}
				{children}
				{!isPrint && <Footer />}
				{/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
				<Scripts />
			</body>
		</html>
	);
}
