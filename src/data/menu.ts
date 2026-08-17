import type { MenuItem } from "@/types";

/**
 * Diet tagging follows the way Pune clients actually ask for it:
 *  - `jain`            → no root vegetables at all (so no potato, onion, garlic)
 *  - `no-onion-garlic` → satvik; root vegetables such as potato are still fine
 *  - `vegan`           → no ghee, milk, paneer, khoya or curd
 * Every item is vegetarian; the kitchen has never handled meat.
 */
export const menuItems: MenuItem[] = [
  // ── Starters ──────────────────────────────────────────────────────────
  {
    id: "kanda-bhaji",
    name: "Kanda Bhaji",
    nameMarathi: "कांदा भजी",
    description:
      "Sliced onion folded through spiced besan and fried in small batches so it stays lacy, never doughy. Served with dry garlic chutney.",
    category: "starters",
    diet: ["veg", "vegan"],
    eventTypes: ["wedding", "mangalkarya", "birthday", "house-party"],
    image: "/images/menu/kanda-bhaji.jpg",
    featured: true,
    spiceLevel: 2,
  },
  {
    id: "batata-vada",
    name: "Batata Vada",
    nameMarathi: "बटाटा वडा",
    description:
      "Soft potato masala with mustard and curry leaf, jacketed in besan and fried to order. Comes with fried green chillies.",
    category: "starters",
    diet: ["veg", "vegan"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/batata-vada.jpg",
    spiceLevel: 2,
  },
  {
    id: "sabudana-vada",
    name: "Sabudana Vada",
    nameMarathi: "साबुदाणा वडा",
    description:
      "Sago soaked overnight, crushed peanut and cumin, fried crisp outside and pillowy within. A fasting staple we serve year round.",
    category: "starters",
    diet: ["veg", "vegan", "no-onion-garlic"],
    eventTypes: ["mangalkarya", "vastu-shanti", "house-party"],
    image: "/images/menu/sabudana-vada.jpg",
    featured: true,
    spiceLevel: 1,
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    nameMarathi: "पनीर टिक्का",
    description:
      "Hand-set paneer marinated in hung curd, kasuri methi and Kashmiri chilli, then charred on skewers over coal.",
    category: "starters",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/paneer-tikka.jpg",
    featured: true,
    spiceLevel: 2,
  },
  {
    id: "hara-bhara-kabab",
    name: "Hara Bhara Kabab",
    nameMarathi: "हरा भरा कबाब",
    description:
      "Spinach, green peas and roasted chana bound without egg, pan-seared in ghee and finished with chaat masala.",
    category: "starters",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday"],
    image: "/images/menu/hara-bhara-kabab.jpg",
    spiceLevel: 1,
  },
  {
    id: "kothimbir-vadi",
    name: "Kothimbir Vadi",
    nameMarathi: "कोथिंबीर वडी",
    description:
      "Coriander and besan steamed into cakes, rested, then shallow-fried till the edges crackle. Sesame on top.",
    category: "starters",
    diet: ["veg", "vegan", "no-onion-garlic"],
    eventTypes: ["mangalkarya", "vastu-shanti", "wedding", "house-party"],
    image: "/images/menu/kothimbir-vadi.jpg",
    spiceLevel: 1,
  },
  {
    id: "masala-corn-chaat",
    name: "Masala Corn Chaat",
    nameMarathi: "मसाला कॉर्न चाट",
    description:
      "Steamed sweetcorn tossed with butter, black salt, lime and a pinch of amchur. Served in paper cones — the children's counter.",
    category: "starters",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["birthday", "corporate", "house-party", "vastu-shanti"],
    image: "/images/menu/masala-corn-chaat.jpg",
    spiceLevel: 1,
  },

  // ── Maharashtrian Thali ───────────────────────────────────────────────
  {
    id: "puran-poli",
    name: "Puran Poli",
    nameMarathi: "पुरणपोळी",
    description:
      "Chana dal and jaggery ground fine, sealed in a paper-thin poli and griddled. Served with a well of warm ghee and katachi amti.",
    category: "maharashtrian-thali",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "house-party"],
    image: "/images/menu/puran-poli.jpg",
    featured: true,
    spiceLevel: 0,
  },
  {
    id: "masale-bhat",
    name: "Masale Bhat",
    nameMarathi: "मसाले भात",
    description:
      "Ambemohar rice with tendli, cashew and our own goda masala, cooked till each grain stands apart. The wedding rice.",
    category: "maharashtrian-thali",
    diet: ["veg"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti"],
    image: "/images/menu/masale-bhat.jpg",
    featured: true,
    spiceLevel: 2,
  },
  {
    id: "varan-bhaat",
    name: "Varan Bhaat",
    nameMarathi: "वरण भात",
    description:
      "Plain toor dal with hing and a spoon of ghee over steamed rice. The first thing served on the leaf, and the most missed.",
    category: "maharashtrian-thali",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "house-party"],
    image: "/images/menu/varan-bhaat.jpg",
    spiceLevel: 0,
  },
  {
    id: "amti",
    name: "Amti",
    nameMarathi: "आमटी",
    description:
      "Toor dal sharpened with kokum and sweetened with a knob of gur, carrying the smoke of freshly roasted goda masala.",
    category: "maharashtrian-thali",
    diet: ["veg", "vegan", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "house-party"],
    image: "/images/menu/amti.jpg",
    spiceLevel: 2,
  },
  {
    id: "bharli-vangi",
    name: "Bharli Vangi",
    nameMarathi: "भरली वांगी",
    description:
      "Small brinjals stuffed with roasted peanut, dry coconut and goda masala, then simmered slow until the gravy turns glossy.",
    category: "maharashtrian-thali",
    diet: ["veg", "vegan"],
    eventTypes: ["wedding", "mangalkarya", "house-party"],
    image: "/images/menu/bharli-vangi.jpg",
    featured: true,
    spiceLevel: 3,
  },
  {
    id: "zunka-bhakri",
    name: "Zunka Bhakri",
    nameMarathi: "झुणका भाकरी",
    description:
      "Crumbly besan zunka with garlic and green chilli, alongside hand-patted jowar bhakri cooked on an open flame.",
    category: "maharashtrian-thali",
    diet: ["veg", "vegan"],
    eventTypes: ["wedding", "corporate", "house-party"],
    image: "/images/menu/zunka-bhakri.jpg",
    spiceLevel: 3,
  },
  {
    id: "batatyachi-bhaji",
    name: "Batatyachi Bhaji",
    nameMarathi: "बटाट्याची भाजी",
    description:
      "Turmeric-yellow potato with mustard, curry leaf and a squeeze of lime. Cooked without onion so it suits every occasion.",
    category: "maharashtrian-thali",
    diet: ["veg", "vegan", "no-onion-garlic"],
    eventTypes: ["mangalkarya", "vastu-shanti", "wedding", "house-party"],
    image: "/images/menu/batatyachi-bhaji.jpg",
    spiceLevel: 1,
  },
  {
    id: "kakdi-koshimbir",
    name: "Kakdi Koshimbir",
    nameMarathi: "काकडी कोशिंबीर",
    description:
      "Cucumber, crushed peanut and fresh curd with a mustard-seed tempering. Cut within the hour of serving, never before.",
    category: "maharashtrian-thali",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "house-party"],
    image: "/images/menu/kakdi-koshimbir.jpg",
    spiceLevel: 0,
  },
  {
    id: "thalipeeth",
    name: "Thalipeeth",
    nameMarathi: "थालीपीठ",
    description:
      "Bhajani flour of five roasted grains patted thin with onion and coriander, crisped on the tawa. Served with white butter.",
    category: "maharashtrian-thali",
    diet: ["veg"],
    eventTypes: ["corporate", "house-party", "birthday"],
    image: "/images/menu/thalipeeth.jpg",
    spiceLevel: 2,
  },

  // ── Punjabi ───────────────────────────────────────────────────────────
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    nameMarathi: "पनीर बटर मसाला",
    description:
      "Tomato and cashew gravy finished with butter and a touch of cream, holding cubes of soft paneer. Mild enough for everybody.",
    category: "punjabi",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/paneer-butter-masala.jpg",
    featured: true,
    spiceLevel: 1,
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    nameMarathi: "दाल मखनी",
    description:
      "Whole urad simmered overnight on a low flame with tomato and butter, stirred often, never rushed.",
    category: "punjabi",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/dal-makhani.jpg",
    featured: true,
    spiceLevel: 1,
  },
  {
    id: "chole-bhature",
    name: "Chole Bhature",
    nameMarathi: "छोले भटूरे",
    description:
      "Kabuli chana darkened with tea and anardana, served with bhature pulled to order so they arrive still ballooned.",
    category: "punjabi",
    diet: ["veg"],
    eventTypes: ["corporate", "birthday", "house-party"],
    image: "/images/menu/chole-bhature.jpg",
    spiceLevel: 2,
  },
  {
    id: "malai-kofta",
    name: "Malai Kofta",
    nameMarathi: "मलाई कोफ्ता",
    description:
      "Paneer and khoya dumplings with a hidden centre of raisin and cashew, resting in a pale, faintly sweet gravy.",
    category: "punjabi",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday"],
    image: "/images/menu/malai-kofta.jpg",
    spiceLevel: 1,
  },
  {
    id: "sarson-da-saag",
    name: "Sarson Da Saag",
    nameMarathi: "सरसों दा साग",
    description:
      "Mustard greens and spinach slow-cooked and hand-churned, finished with jaggery and white butter. Winter menus only.",
    category: "punjabi",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "house-party"],
    image: "/images/menu/sarson-da-saag.jpg",
    spiceLevel: 2,
  },
  {
    id: "rajma-masala",
    name: "Rajma Masala",
    nameMarathi: "राजमा मसाला",
    description:
      "Kashmiri rajma pressure-cooked till creaming at the edges, in a thick onion-tomato masala. Best with jeera rice.",
    category: "punjabi",
    diet: ["veg", "vegan"],
    eventTypes: ["corporate", "house-party", "birthday"],
    image: "/images/menu/rajma-masala.jpg",
    spiceLevel: 2,
  },
  {
    id: "tandoori-breads",
    name: "Assorted Tandoori Breads",
    nameMarathi: "तंदूरी रोटी",
    description:
      "Butter naan, lachha paratha, tandoori roti and missi roti, slapped onto the clay wall and served straight to the table.",
    category: "punjabi",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/tandoori-breads.jpg",
    spiceLevel: 0,
  },

  // ── South Indian ──────────────────────────────────────────────────────
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    nameMarathi: "मसाला डोसा",
    description:
      "Batter fermented in-house for sixteen hours, spread thin on a seasoned tawa, wrapped around potato bhaji. Two chutneys and sambar.",
    category: "south-indian",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/masala-dosa.jpg",
    featured: true,
    spiceLevel: 1,
  },
  {
    id: "idli-sambar",
    name: "Idli Sambar",
    nameMarathi: "इडली सांबार",
    description:
      "Steamed rice cakes that spring back when pressed, in a sambar built on freshly roasted and ground podi.",
    category: "south-indian",
    diet: ["veg", "vegan"],
    eventTypes: ["corporate", "mangalkarya", "house-party", "vastu-shanti"],
    image: "/images/menu/idli-sambar.jpg",
    spiceLevel: 1,
  },
  {
    id: "medu-vada",
    name: "Medu Vada",
    nameMarathi: "मेदू वडा",
    description:
      "Urad batter beaten by hand until it floats, shaped wet and fried gold. Crisp shell, steam inside, gone in two bites.",
    category: "south-indian",
    diet: ["veg", "vegan"],
    eventTypes: ["corporate", "mangalkarya", "wedding", "house-party"],
    image: "/images/menu/medu-vada.jpg",
    spiceLevel: 1,
  },
  {
    id: "uttapam",
    name: "Onion Tomato Uttapam",
    nameMarathi: "उत्तपम",
    description:
      "Thick dosa batter poured over a bed of onion, tomato and coriander, pressed down and cooked slow so the base caramelises.",
    category: "south-indian",
    diet: ["veg", "vegan"],
    eventTypes: ["corporate", "birthday", "house-party"],
    image: "/images/menu/uttapam.jpg",
    spiceLevel: 1,
  },
  {
    id: "lemon-rice",
    name: "Lemon Rice",
    nameMarathi: "लिंबू भात",
    description:
      "Short-grain rice tossed with turmeric, peanut, chana dal and curry leaf, sharpened with lime off the heat.",
    category: "south-indian",
    diet: ["veg", "vegan", "jain", "no-onion-garlic"],
    eventTypes: ["mangalkarya", "vastu-shanti", "corporate", "house-party"],
    image: "/images/menu/lemon-rice.jpg",
    spiceLevel: 1,
  },

  // ── Chinese ───────────────────────────────────────────────────────────
  {
    id: "veg-hakka-noodles",
    name: "Veg Hakka Noodles",
    nameMarathi: "व्हेज हक्का नूडल्स",
    description:
      "Julienned cabbage, carrot and capsicum tossed with noodles over a roaring flame so the wok hei actually lands.",
    category: "chinese",
    diet: ["veg", "vegan"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/veg-hakka-noodles.jpg",
    spiceLevel: 1,
  },
  {
    id: "schezwan-fried-rice",
    name: "Schezwan Fried Rice",
    nameMarathi: "शेजवान फ्राईड राईस",
    description:
      "Day-old rice fried hard with our own schezwan paste of soaked Kashmiri and byadgi chillies. Properly hot.",
    category: "chinese",
    diet: ["veg", "vegan"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/schezwan-fried-rice.jpg",
    spiceLevel: 3,
  },
  {
    id: "veg-manchurian",
    name: "Veg Manchurian",
    nameMarathi: "व्हेज मंचुरियन",
    description:
      "Hand-rolled cabbage and carrot balls in a glossy ginger-garlic gravy. Available dry for the starter counter.",
    category: "chinese",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/veg-manchurian.jpg",
    featured: true,
    spiceLevel: 2,
  },
  {
    id: "chilli-paneer",
    name: "Chilli Paneer",
    nameMarathi: "चिली पनीर",
    description:
      "Paneer batter-fried then folded through onion petals, capsicum and green chilli in a sharp, barely-there sauce.",
    category: "chinese",
    diet: ["veg"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/chilli-paneer.jpg",
    spiceLevel: 3,
  },
  {
    id: "veg-spring-rolls",
    name: "Veg Spring Rolls",
    nameMarathi: "स्प्रिंग रोल्स",
    description:
      "Thin wrappers around a crunchy noodle and vegetable filling, fried to a blistered gold. Served with schezwan dip.",
    category: "chinese",
    diet: ["veg", "vegan"],
    eventTypes: ["corporate", "birthday", "house-party"],
    image: "/images/menu/veg-spring-rolls.jpg",
    spiceLevel: 1,
  },

  // ── Live Counters ─────────────────────────────────────────────────────
  {
    id: "live-pav-bhaji",
    name: "Live Pav Bhaji Counter",
    nameMarathi: "लाइव्ह पाव भाजी",
    description:
      "A wide tawa, a mound of bhaji kept moving, pav toasted in butter to order. One chef, endless second helpings.",
    category: "live-counters",
    diet: ["veg"],
    eventTypes: ["wedding", "birthday", "corporate", "house-party"],
    image: "/images/menu/live-pav-bhaji.jpg",
    featured: true,
    spiceLevel: 2,
  },
  {
    id: "live-dosa-counter",
    name: "Live Dosa Counter",
    nameMarathi: "लाइव्ह डोसा काउंटर",
    description:
      "Plain, masala, mysore and paper dosa spread to order in front of guests. Chutneys replenished every twenty minutes.",
    category: "live-counters",
    diet: ["veg"],
    eventTypes: ["wedding", "mangalkarya", "corporate", "birthday"],
    image: "/images/menu/live-dosa-counter.jpg",
    featured: true,
    spiceLevel: 1,
  },
  {
    id: "live-chaat-counter",
    name: "Live Chaat Counter",
    nameMarathi: "लाइव्ह चाट काउंटर",
    description:
      "Pani puri, sev puri, dahi puri and ragda pattice assembled to order, with the pani kept properly cold.",
    category: "live-counters",
    diet: ["veg"],
    eventTypes: ["wedding", "birthday", "house-party", "corporate"],
    image: "/images/menu/live-chaat-counter.jpg",
    featured: true,
    spiceLevel: 2,
  },
  {
    id: "live-jalebi-rabdi",
    name: "Live Jalebi & Rabdi",
    nameMarathi: "लाइव्ह जिलेबी रबडी",
    description:
      "Jalebi coiled straight into the kadhai, lifted from the syrup still crackling, drowned in slow-reduced rabdi.",
    category: "live-counters",
    diet: ["veg", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "birthday"],
    image: "/images/menu/live-jalebi-rabdi.jpg",
    featured: true,
    spiceLevel: 0,
  },
  {
    id: "live-pasta-counter",
    name: "Live Pasta Counter",
    nameMarathi: "लाइव्ह पास्ता काउंटर",
    description:
      "Penne and fusilli tossed to order in red, white or pink sauce, with olives, corn and chilli flakes on the side.",
    category: "live-counters",
    diet: ["veg"],
    eventTypes: ["corporate", "birthday", "house-party", "wedding"],
    image: "/images/menu/live-pasta-counter.jpg",
    spiceLevel: 1,
  },

  // ── Sweets ────────────────────────────────────────────────────────────
  {
    id: "ukadiche-modak",
    name: "Ukadiche Modak",
    nameMarathi: "उकडीचे मोदक",
    description:
      "Rice flour shells pleated by hand around coconut and jaggery, steamed in batches of twenty-one and served with ghee.",
    category: "sweets",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["mangalkarya", "vastu-shanti", "wedding", "house-party"],
    image: "/images/menu/ukadiche-modak.jpg",
    featured: true,
    spiceLevel: 0,
  },
  {
    id: "shrikhand",
    name: "Kesar Shrikhand",
    nameMarathi: "श्रीखंड",
    description:
      "Curd hung overnight in muslin, whisked smooth with sugar, saffron and cardamom. Served cold with hot puri.",
    category: "sweets",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "house-party"],
    image: "/images/menu/shrikhand.jpg",
    featured: true,
    spiceLevel: 0,
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    nameMarathi: "गुलाब जामुन",
    description:
      "Khoya spheres fried on a low flame so they cook through, then rested in cardamom syrup until they double.",
    category: "sweets",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "corporate", "birthday", "house-party"],
    image: "/images/menu/gulab-jamun.jpg",
    spiceLevel: 0,
  },
  {
    id: "basundi",
    name: "Basundi",
    nameMarathi: "बासुंदी",
    description:
      "Full-fat milk reduced for three hours until it turns the colour of ivory, studded with charoli and almond.",
    category: "sweets",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti"],
    image: "/images/menu/basundi.jpg",
    spiceLevel: 0,
  },
  {
    id: "rasmalai",
    name: "Rasmalai",
    nameMarathi: "रसमलाई",
    description:
      "Chenna discs poached till weightless, resting in saffron milk with slivers of pistachio. Served chilled.",
    category: "sweets",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "corporate", "birthday"],
    image: "/images/menu/rasmalai.jpg",
    spiceLevel: 0,
  },

  // ── Beverages ─────────────────────────────────────────────────────────
  {
    id: "solkadhi",
    name: "Solkadhi",
    nameMarathi: "सोलकढी",
    description:
      "Kokum steeped till pink, loosened with first-press coconut milk and a whisper of green chilli. Served in kulhads.",
    category: "beverages",
    diet: ["veg", "vegan"],
    eventTypes: ["wedding", "mangalkarya", "house-party", "vastu-shanti"],
    image: "/images/menu/solkadhi.jpg",
    featured: true,
    spiceLevel: 1,
  },
  {
    id: "masala-chaas",
    name: "Masala Chaas",
    nameMarathi: "मसाला ताक",
    description:
      "Churned buttermilk with roasted cumin, black salt, ginger and coriander. Kept over ice through the whole service.",
    category: "beverages",
    diet: ["veg", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "corporate"],
    image: "/images/menu/masala-chaas.jpg",
    spiceLevel: 0,
  },
  {
    id: "aam-panna",
    name: "Aam Panna",
    nameMarathi: "आम पन्हे",
    description:
      "Raw mango roasted over flame, pulped with jaggery, black salt and roasted cumin. Summer weddings depend on it.",
    category: "beverages",
    diet: ["veg", "vegan", "jain", "no-onion-garlic"],
    eventTypes: ["wedding", "mangalkarya", "vastu-shanti", "birthday"],
    image: "/images/menu/aam-panna.jpg",
    spiceLevel: 0,
  },
  {
    id: "filter-coffee",
    name: "Filter Coffee",
    nameMarathi: "फिल्टर कॉफी",
    description:
      "Decoction dripped slow through a brass filter, met with boiling milk and pulled between tumblers until it froths.",
    category: "beverages",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: ["corporate", "wedding", "house-party", "birthday"],
    image: "/images/menu/filter-coffee.jpg",
    spiceLevel: 0,
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    nameMarathi: "मसाला चहा",
    description:
      "Cut chai boiled with fresh ginger, cardamom and lemongrass. Kept coming from the samovar until the last guest leaves.",
    category: "beverages",
    diet: ["veg", "jain", "no-onion-garlic"],
    eventTypes: [
      "wedding",
      "mangalkarya",
      "vastu-shanti",
      "corporate",
      "birthday",
      "house-party",
    ],
    image: "/images/menu/masala-chai.jpg",
    featured: true,
    spiceLevel: 0,
  },
];

export const featuredMenuItems = menuItems.filter((item) => item.featured);

export function getMenuItemsByCategory(slug: MenuItem["category"]): MenuItem[] {
  return menuItems.filter((item) => item.category === slug);
}
