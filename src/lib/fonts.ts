import localFont from "next/font/local";
import { Inter } from "next/font/google";

/**
 * Clash Display is a Fontshare face, so it is self-hosted from src/fonts
 * rather than fetched from a third party. Self-hosting keeps the render
 * path free of cross-origin connections, which matters for LCP.
 */
export const clashDisplay = localFont({
  src: [
    { path: "../fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
