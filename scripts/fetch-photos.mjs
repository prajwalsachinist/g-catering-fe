/**
 * Downloads the demo food photography referenced by src/data/*.ts.
 *
 *   npm run photos
 *
 * WHY THIS EXISTS
 * The repo ships with real photographs so the site is demoable immediately.
 * They are pulled from Unsplash, which grants a royalty-free licence for use
 * and modification without permission. They are still *placeholders*: replace
 * public/images/** with the client's own event photography before launch, and
 * keep the file paths so nothing else has to change.
 *
 * EVERY IMAGE HERE IS VEGETARIAN. Ganesh Catering is a pure vegetarian
 * kitchen, so meat photography would contradict the site copy. Candidate
 * images were reviewed by eye before being added below - do not add an id
 * without looking at it first.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = join(__dirname, "..", "public", "images");

/* -- the reviewed photo library ----------------------------------------- */

const PHOTOS = {
  fritters: "1554978991-33ef7f31d658", // pakoras frying in a kadhai
  samosa: "1601050690597-df0568f70950",
  chaat: "1610192244261-3f33de3f55e4",
  paneerGravy: "1631452180519-c014fe946bc7", // paneer curry, naan, rice
  palakPaneer: "1589647363585-f4a7d3877b10",
  vegCurry: "1567188040759-fb8a883dc6d8", // potato & pepper sabzi
  curryBowls: "1585937421612-70a008356fbe",
  eggplant: "1596797038530-2c107229654b", // baingan-style curry
  curryNaan: "1565557623262-b51c2513a641",
  curryBowl2: "1517244683847-7456b63c5969",
  thali: "1546833999-b9f581a1996d",
  bananaThali: "1625398407796-82650a8c135f", // sadhya on a banana leaf
  pavBhaji: "1606491956689-2ea866880c84",
  misalPav: "1626132647523-66f5bf380027",
  noodles: "1585032226651-759b368d7246", // hakka noodles
  noodleBowl: "1555126634-323283e090fa",
  dosa: "1668236543090-82eba5ee5976", // dosa with chutneys
  dosaPlate: "1613292443284-8d10ef9383fe",
  idli: "1589301760014-d929f3979dbc",
  puriPapad: "1567337710282-00832b415979",
  pulao: "1630851840633-f96999247032",
  vegBowl: "1512621776951-a57141f2eefd",
  spices: "1596040033229-a9821ebd058d",
  dough: "1517686469429-8bdb88b9f907", // hands kneading dough
  dessertCups: "1615832494873-b0c52d519696",
  cakeSlice: "1565958011703-44f9829ba187",
  brownie: "1606313564200-e75d5e30476c",
  dessertPlate: "1571877227200-a0d98ea607e9",
  rainbowCake: "1464349095431-e9a21285b5f3",
  tea: "1544787219-7f47ccb76574",
  coldDrinks: "1497534446932-c925b458314e",
  buffet: "1555244162-803834f70033", // chafing dishes on a buffet line
  interior: "1552566626-52f8b828add9",
  flatlay: "1543353071-873f17a7a088",
};

/*
 * Two otherwise-usable photos were rejected on review:
 *   1528605248644-14dd04022da1 (long table) and
 *   1466978913421-dad2ebd01d17 (shared plates)
 * Both prominently feature alcohol and read as Western restaurant scenes,
 * which is the wrong register for a Pune vegetarian caterer whose work is
 * weddings, mangalkarya and pujas.
 */

/* -- dish -> photo ------------------------------------------------------- */

const MENU = {
  // Starters
  "kanda-bhaji": "fritters",
  "batata-vada": "fritters",
  "sabudana-vada": "fritters",
  "paneer-tikka": "paneerGravy",
  "hara-bhara-kabab": "vegBowl",
  "kothimbir-vadi": "fritters",
  "masala-corn-chaat": "chaat",
  // Maharashtrian thali
  "puran-poli": "puriPapad",
  "masale-bhat": "pulao",
  "varan-bhaat": "thali",
  amti: "curryBowls",
  "bharli-vangi": "eggplant",
  "zunka-bhakri": "misalPav",
  "batatyachi-bhaji": "vegCurry",
  "kakdi-koshimbir": "vegBowl",
  thalipeeth: "dosaPlate",
  // Punjabi
  "paneer-butter-masala": "paneerGravy",
  "dal-makhani": "curryBowl2",
  "chole-bhature": "puriPapad",
  "malai-kofta": "curryNaan",
  "sarson-da-saag": "palakPaneer",
  "rajma-masala": "curryBowls",
  "tandoori-breads": "puriPapad",
  // South Indian
  "masala-dosa": "dosa",
  "idli-sambar": "idli",
  "medu-vada": "fritters",
  uttapam: "dosaPlate",
  "lemon-rice": "pulao",
  // Chinese
  "veg-hakka-noodles": "noodles",
  "schezwan-fried-rice": "pulao",
  "veg-manchurian": "noodleBowl",
  "chilli-paneer": "noodleBowl",
  "veg-spring-rolls": "fritters",
  // Live counters
  "live-pav-bhaji": "pavBhaji",
  "live-dosa-counter": "dosa",
  "live-chaat-counter": "chaat",
  "live-jalebi-rabdi": "dessertPlate",
  "live-pasta-counter": "noodleBowl",
  // Sweets
  "ukadiche-modak": "dessertPlate",
  shrikhand: "dessertCups",
  "gulab-jamun": "brownie",
  basundi: "dessertCups",
  rasmalai: "cakeSlice",
  // Beverages
  solkadhi: "coldDrinks",
  "masala-chaas": "coldDrinks",
  "aam-panna": "coldDrinks",
  "filter-coffee": "tea",
  "masala-chai": "tea",
};

const EVENTS = {
  wedding: "buffet",
  mangalkarya: "bananaThali",
  "vastu-shanti": "thali",
  corporate: "flatlay",
  birthday: "rainbowCake",
  "house-party": "misalPav",
};

/** [photo key, aspect] - aspect drives the crop dimensions. */
const GALLERY = {
  g01: ["interior", "landscape"],
  g02: ["dosa", "portrait"],
  g03: ["dessertPlate", "square"],
  g04: ["dough", "landscape"],
  g05: ["buffet", "landscape"],
  g06: ["bananaThali", "square"],
  g07: ["rainbowCake", "portrait"],
  g08: ["coldDrinks", "portrait"],
  g09: ["thali", "landscape"],
  g10: ["noodles", "square"],
  g11: ["paneerGravy", "landscape"],
  g12: ["flatlay", "portrait"],
  g13: ["chaat", "square"],
  g14: ["puriPapad", "landscape"],
  g15: ["dough", "portrait"],
  g16: ["bananaThali", "landscape"],
  g17: ["dessertCups", "square"],
  g18: ["buffet", "portrait"],
};

const ABOUT = {
  "kitchen-01": "dough",
  "kitchen-02": "spices",
  "kitchen-03": "interior",
};

const ASPECT = {
  portrait: [900, 1200],
  landscape: [1200, 800],
  square: [1000, 1000],
};

/* -- fetch --------------------------------------------------------------- */

function url(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=entropy&q=72&fm=jpg`;
}

const jobs = [];

for (const [slug, key] of Object.entries(MENU)) {
  jobs.push({ path: `menu/${slug}.jpg`, id: PHOTOS[key], w: 900, h: 675 });
}
for (const [slug, key] of Object.entries(EVENTS)) {
  jobs.push({ path: `events/${slug}.jpg`, id: PHOTOS[key], w: 900, h: 1100 });
}
for (const [slug, [key, aspect]] of Object.entries(GALLERY)) {
  const [w, h] = ASPECT[aspect];
  jobs.push({ path: `gallery/${slug}.jpg`, id: PHOTOS[key], w, h });
}
for (const [slug, key] of Object.entries(ABOUT)) {
  jobs.push({ path: `about/${slug}.jpg`, id: PHOTOS[key], w: 1200, h: 800 });
}
jobs.push({
  path: "hero/hero.jpg",
  id: PHOTOS.bananaThali,
  w: 1600,
  h: 1000,
});

let done = 0;
let failed = 0;

// Modest concurrency so the CDN doesn't start refusing connections.
const QUEUE = [...jobs];
async function worker() {
  while (QUEUE.length) {
    const job = QUEUE.shift();
    if (!job) break;
    if (!job.id) {
      console.warn(`skip ${job.path} - no photo id`);
      failed += 1;
      continue;
    }
    try {
      const res = await fetch(url(job.id, job.w, job.h), {
        headers: { "User-Agent": "GaneshCatering-build/1.0" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const out = join(OUT_ROOT, job.path);
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, buf);
      done += 1;
      process.stdout.write(".");
    } catch (error) {
      failed += 1;
      console.error(`\nFAILED ${job.path}: ${error.message}`);
    }
  }
}

await Promise.all(Array.from({ length: 6 }, worker));

console.log(`\nDownloaded ${done}/${jobs.length} photos (${failed} failed).`);
