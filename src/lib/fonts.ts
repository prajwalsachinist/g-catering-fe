import localFont from "next/font/local";
import { Inter, Mukta } from "next/font/google";

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

/**
 * Devanagari face for the Marathi accents (dish names, occasion names).
 *
 * Note for future maintainers: src/fonts also contains AMS Anaram and AMS
 * Sudha. Those are legacy ISM-style fonts - their glyphs are Devanagari but
 * they are mapped to Latin ASCII slots, with nothing in the U+0900-097F
 * block. They cannot render the Unicode Marathi this site stores, so they are
 * intentionally unused. Mukta is a true Unicode Devanagari family, which
 * keeps the text selectable, indexable and editable.
 *
 * Only preloaded weights that are actually used, to keep the payload small.
 */
export const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600"],
  // Raw face variable; the Tailwind token --font-marathi points at this.
  variable: "--font-mukta",
  display: "swap",
  preload: true,
});
