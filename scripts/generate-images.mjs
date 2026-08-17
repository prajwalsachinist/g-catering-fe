/**
 * Generates the abstract SVG art still referenced by src/data/*.ts - in
 * practice, the team portraits.
 *
 * Food, event and gallery imagery is real photography; see
 * scripts/fetch-photos.mjs (`npm run photos`). Team members stay abstract
 * deliberately: presenting stock photos of strangers as named staff would
 * misrepresent the business. Swap in real portraits when they are shot.
 *
 *   npm run images
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DATA_DIR = join(ROOT, "src", "data");
const OUT_ROOT = join(ROOT, "public", "images");

/* -- deterministic randomness ------------------------------------------- */

function hashString(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 - small, fast, seeded PRNG so art is stable across builds. */
function makeRng(seed) {
  let a = seed;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n) => Math.round(n * 100) / 100;

/* -- palette ------------------------------------------------------------- */

/** Warm hues only, spanning turmeric -> saffron -> marigold -> kokum. */
function palette(rng) {
  const hue = 18 + rng() * 32; // 18deg (deep marigold) .. 50deg (turmeric)
  const accent = `hsl(${round(hue)} ${round(78 + rng() * 14)}% ${round(52 + rng() * 8)}%)`;
  const accentSoft = `hsl(${round(hue + 8)} ${round(70 + rng() * 15)}% ${round(62 + rng() * 8)}%)`;
  const deep = `hsl(${round(hue - 8)} ${round(60 + rng() * 15)}% ${round(22 + rng() * 6)}%)`;
  return { hue, accent, accentSoft, deep };
}

/* -- motifs -------------------------------------------------------------- */

/** Overhead plate: concentric rings with scattered garnish. */
function menuMotif(rng, w, h, p) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * (0.3 + rng() * 0.05);
  let out = "";

  out += `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}" fill="none" stroke="${p.accent}" stroke-opacity=".4" stroke-width="1.5"/>`;
  out += `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r * 0.74)}" fill="${p.accent}" fill-opacity=".14"/>`;
  out += `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(r * 0.74)}" fill="none" stroke="${p.accentSoft}" stroke-opacity=".32" stroke-width="1"/>`;

  // Garnish arranged around the rim.
  const count = 5 + Math.floor(rng() * 4);
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + rng() * 0.5;
    const dist = r * (0.3 + rng() * 0.34);
    const dotR = 6 + rng() * 20;
    out += `<circle cx="${round(cx + Math.cos(angle) * dist)}" cy="${round(cy + Math.sin(angle) * dist)}" r="${round(dotR)}" fill="${rng() > 0.5 ? p.accent : p.accentSoft}" fill-opacity="${round(0.22 + rng() * 0.28)}"/>`;
  }

  // A crescent highlight, as if light is falling from the upper left.
  out += `<path d="M ${round(cx - r * 0.8)} ${round(cy)} A ${round(r * 0.8)} ${round(r * 0.8)} 0 0 1 ${round(cx)} ${round(cy - r * 0.8)}" fill="none" stroke="${p.accentSoft}" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/>`;
  return out;
}

/** Wide scene: layered arcs suggesting tables and string lighting. */
function sceneMotif(rng, w, h, p) {
  let out = "";
  const layers = 3;
  for (let i = 0; i < layers; i += 1) {
    const y = h * (0.55 + i * 0.14);
    const amp = h * (0.05 + rng() * 0.05);
    out += `<path d="M 0 ${round(y)} Q ${round(w * 0.25)} ${round(y - amp)} ${round(w * 0.5)} ${round(y)} T ${round(w)} ${round(y)} L ${w} ${h} L 0 ${h} Z" fill="${i === 0 ? p.accent : p.deep}" fill-opacity="${round(0.1 - i * 0.025)}"/>`;
  }

  // Bokeh - warm out-of-focus lights.
  const lights = 7 + Math.floor(rng() * 6);
  for (let i = 0; i < lights; i += 1) {
    const r = 4 + rng() * 26;
    out += `<circle cx="${round(rng() * w)}" cy="${round(rng() * h * 0.62)}" r="${round(r)}" fill="${p.accentSoft}" fill-opacity="${round(0.14 + rng() * 0.3)}"/>`;
  }
  return out;
}

/** Portrait: soft vignette around a head-and-shoulders silhouette. */
function portraitMotif(rng, w, h, p) {
  const cx = w / 2;
  const headR = w * 0.17;
  const headY = h * 0.38;
  let out = "";
  out += `<circle cx="${round(cx)}" cy="${round(headY)}" r="${round(headR)}" fill="${p.accent}" fill-opacity=".16"/>`;
  out += `<path d="M ${round(cx - headR * 2.1)} ${h} Q ${round(cx - headR * 2)} ${round(headY + headR * 1.5)} ${round(cx)} ${round(headY + headR * 1.35)} Q ${round(cx + headR * 2)} ${round(headY + headR * 1.5)} ${round(cx + headR * 2.1)} ${h} Z" fill="${p.accent}" fill-opacity=".12"/>`;
  out += `<circle cx="${round(cx)}" cy="${round(headY)}" r="${round(headR * 1.5)}" fill="none" stroke="${p.accentSoft}" stroke-opacity=".2" stroke-width="1"/>`;
  return out;
}

/* -- svg assembly -------------------------------------------------------- */

function buildSvg({ seed, width, height, motif }) {
  const rng = makeRng(seed);
  const p = palette(rng);
  const id = (seed % 100000).toString(36);

  const glowX = round(25 + rng() * 50);
  const glowY = round(15 + rng() * 40);

  let inner = "";
  if (motif === "menu") inner = menuMotif(rng, width, height, p);
  else if (motif === "portrait") inner = portraitMotif(rng, width, height, p);
  else inner = sceneMotif(rng, width, height, p);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">
<defs>
<linearGradient id="b${id}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#2a1e12"/>
<stop offset=".55" stop-color="#181310"/>
<stop offset="1" stop-color="#33200e"/>
</linearGradient>
<radialGradient id="g${id}" cx="${glowX}%" cy="${glowY}%" r="70%">
<stop offset="0" stop-color="${p.accent}" stop-opacity=".55"/>
<stop offset="1" stop-color="${p.accent}" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="${width}" height="${height}" fill="url(#b${id})"/>
<rect width="${width}" height="${height}" fill="url(#g${id})"/>
${inner}
</svg>`;
}

/* -- discovery ----------------------------------------------------------- */

const SIZES = {
  menu: { width: 800, height: 600, motif: "menu" },
  events: { width: 900, height: 1100, motif: "scene" },
  team: { width: 640, height: 800, motif: "portrait" },
  about: { width: 1200, height: 800, motif: "scene" },
  hero: { width: 1600, height: 1000, motif: "scene" },
};

const GALLERY_ASPECT = {
  portrait: { width: 900, height: 1200 },
  landscape: { width: 1200, height: 800 },
  square: { width: 1000, height: 1000 },
};

async function collectPaths() {
  const files = await readdir(DATA_DIR);
  const paths = new Map(); // path -> { width, height, motif }

  for (const file of files) {
    if (!file.endsWith(".ts")) continue;
    const source = await readFile(join(DATA_DIR, file), "utf8");

    // Gallery entries carry an aspect that decides their dimensions.
    const galleryRe =
      /src:\s*"(\/images\/gallery\/[^"]+\.svg)"[\s\S]*?aspect:\s*"(portrait|landscape|square)"/g;
    let m;
    while ((m = galleryRe.exec(source)) !== null) {
      const [, path, aspect] = m;
      paths.set(path, { ...GALLERY_ASPECT[aspect], motif: "scene" });
    }

    // Everything else is sized by its directory.
    const genericRe = /"(\/images\/([a-z-]+)\/[^"]+\.svg)"/g;
    while ((m = genericRe.exec(source)) !== null) {
      const [, path, dir] = m;
      if (paths.has(path)) continue;
      const size = SIZES[dir];
      if (!size) continue;
      paths.set(path, size);
    }
  }

  // Food, event and gallery imagery is real photography fetched by
  // scripts/fetch-photos.mjs. What remains here is the team portraits:
  // they stay abstract on purpose, because dressing up stock photos of
  // strangers as named staff would misrepresent the business.
  return paths;
}

/* -- main ---------------------------------------------------------------- */

const paths = await collectPaths();
let written = 0;

for (const [publicPath, spec] of paths) {
  const relative = publicPath.replace(/^\/images\//, "");
  const outPath = join(OUT_ROOT, relative);
  await mkdir(dirname(outPath), { recursive: true });
  const svg = buildSvg({ seed: hashString(publicPath), ...spec });
  await writeFile(outPath, svg, "utf8");
  written += 1;
}

console.log(`Generated ${written} placeholder images into public/images/`);
