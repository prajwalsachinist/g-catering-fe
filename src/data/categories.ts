import type { Category, DietTag, EventType } from "@/types";

export const categories: Category[] = [
  {
    slug: "starters",
    name: "Starters",
    nameMarathi: "स्टार्टर्स",
    description:
      "Fried-to-order snacks that keep guests happy while the mandap fills up.",
    order: 1,
  },
  {
    slug: "maharashtrian-thali",
    name: "Maharashtrian Thali",
    nameMarathi: "महाराष्ट्रीयन थाळी",
    description:
      "The food we grew up on — puran poli, masale bhat, amti and a spoon of ghee.",
    order: 2,
  },
  {
    slug: "punjabi",
    name: "Punjabi",
    nameMarathi: "पंजाबी",
    description:
      "Slow-simmered gravies and tandoor breads for guests who want richness.",
    order: 3,
  },
  {
    slug: "south-indian",
    name: "South Indian",
    nameMarathi: "दक्षिण भारतीय",
    description:
      "Batter fermented in-house overnight, chutneys ground the same morning.",
    order: 4,
  },
  {
    slug: "chinese",
    name: "Chinese",
    nameMarathi: "चायनीज",
    description:
      "Indo-Chinese with real wok heat — the counter the youngsters queue at.",
    order: 5,
  },
  {
    slug: "live-counters",
    name: "Live Counters",
    nameMarathi: "लाइव्ह काउंटर",
    description:
      "A chef, a flame and an audience. Theatre that doubles as dinner.",
    order: 6,
  },
  {
    slug: "sweets",
    name: "Sweets",
    nameMarathi: "गोड पदार्थ",
    description:
      "Modak steamed to order, shrikhand hung overnight in muslin.",
    order: 7,
  },
  {
    slug: "beverages",
    name: "Beverages",
    nameMarathi: "पेय",
    description:
      "Solkadhi, chaas and filter coffee — served cold when Pune is not.",
    order: 8,
  },
];

export const categoryMap = new Map(categories.map((c) => [c.slug, c]));

export const dietTags: {
  value: DietTag;
  label: string;
  description: string;
}[] = [
  {
    value: "veg",
    label: "Veg",
    description: "Pure vegetarian — our kitchen is 100% vegetarian.",
  },
  {
    value: "jain",
    label: "Jain",
    description: "No root vegetables, onion or garlic.",
  },
  {
    value: "vegan",
    label: "Vegan",
    description: "No dairy, ghee or honey.",
  },
  {
    value: "no-onion-garlic",
    label: "No Onion Garlic",
    description: "Satvik preparation for pujas and religious occasions.",
  },
];

export const dietLabel: Record<DietTag, string> = {
  veg: "Veg",
  jain: "Jain",
  vegan: "Vegan",
  "no-onion-garlic": "No Onion Garlic",
};

export const eventTypes: EventType[] = [
  {
    slug: "wedding",
    name: "Weddings",
    nameMarathi: "विवाह",
    description:
      "Sangeet to reception. Multi-cuisine spreads, live counters and a team that knows a Maharashtrian wedding runs on chai and timing.",
    guestRange: "300 – 2,000 guests",
    image: "/images/events/wedding.jpg",
    icon: "wedding",
  },
  {
    slug: "mangalkarya",
    name: "Mangalkarya",
    nameMarathi: "मंगलकार्य",
    description:
      "Munj, barsa, sakharpuda and naming ceremonies — satvik menus cooked without onion or garlic when the occasion asks for it.",
    guestRange: "100 – 600 guests",
    image: "/images/events/mangalkarya.jpg",
    icon: "temple",
  },
  {
    slug: "vastu-shanti",
    name: "Vastu Shanti",
    nameMarathi: "वास्तुशांती",
    description:
      "Housewarming pujas where the kitchen is not ready yet. We arrive with ours, feed everyone, and leave your new home spotless.",
    guestRange: "50 – 300 guests",
    image: "/images/events/vastu-shanti.jpg",
    icon: "home",
  },
  {
    slug: "corporate",
    name: "Corporate Events",
    nameMarathi: "कॉर्पोरेट",
    description:
      "Offsites, launches and Hinjewadi campus lunches. Punctual, invoiced, GST-compliant, and never late for a 1 PM break.",
    guestRange: "50 – 1,500 guests",
    image: "/images/events/corporate.jpg",
    icon: "briefcase",
  },
  {
    slug: "birthday",
    name: "Birthdays",
    nameMarathi: "वाढदिवस",
    description:
      "First birthdays to sixtieths. Chaat counters for the children, a proper thali for the grandparents.",
    guestRange: "30 – 400 guests",
    image: "/images/events/birthday.jpg",
    icon: "cake",
  },
  {
    slug: "house-party",
    name: "House Parties",
    nameMarathi: "घरगुती पार्टी",
    description:
      "Small, warm gatherings. We cook in your kitchen or ours, serve in your crockery, and wash up before we go.",
    guestRange: "20 – 100 guests",
    image: "/images/events/house-party.jpg",
    icon: "sparkles",
  },
];

export const eventTypeMap = new Map(eventTypes.map((e) => [e.slug, e]));

export const eventTypeLabel = Object.fromEntries(
  eventTypes.map((e) => [e.slug, e.name]),
) as Record<EventType["slug"], string>;
