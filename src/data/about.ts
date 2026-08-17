import type { Stat, TeamMember, TimelineEntry } from "@/types";

export const stats: Stat[] = [
  { label: "Years serving Pune", value: 16, suffix: "+" },
  { label: "Events catered", value: 1200, suffix: "+" },
  { label: "Guests fed", value: 480000, suffix: "+" },
  { label: "Repeat & referred clients", value: 92, suffix: "%" },
];

export const timeline: TimelineEntry[] = [
  {
    year: "2009",
    title: "One tempo, two burners",
    description:
      "Ganesh Shinde starts cooking for neighbourhood satyanarayan pujas out of a rented kitchen in Wadgaon Budruk. Forty plates on the first order, all of them carried up three floors by hand.",
  },
  {
    year: "2012",
    title: "The first wedding",
    description:
      "A 400-guest wedding in Karve Nagar, booked entirely on word of mouth. It runs late, it runs over budget, and it produces eleven referrals over the following year.",
  },
  {
    year: "2015",
    title: "A kitchen of our own",
    description:
      "We take over a 2,400 sq ft commissary on Sinhagad Road with cold storage, a dedicated satvik section and stainless prep lines. FSSAI registration follows the same year.",
  },
  {
    year: "2018",
    title: "Live counters change everything",
    description:
      "Clients stop asking for buffets and start asking for theatre. We build our first mobile dosa and chaat counters, and hire chefs who can cook with an audience two feet away.",
  },
  {
    year: "2021",
    title: "Cooking through a hard year",
    description:
      "Weddings shrink to fifty guests. We adapt to sealed single-serve thalis, contactless delivery and doorstep vastu shanti meals, and keep every member of our core team employed.",
  },
  {
    year: "2024",
    title: "Corporate kitchens",
    description:
      "A second production unit opens to serve IT campuses in Hinjewadi and Kharadi, running weekday volumes alongside the weekend event business.",
  },
  {
    year: "Today",
    title: "Still a family kitchen",
    description:
      "Sixteen years, 1,200 events and roughly half a million plates later, Ganesh still tastes the amti before it leaves the kitchen. Some things do not scale, and should not.",
  },
];

export const team: TeamMember[] = [
  {
    id: "ganesh-shinde",
    name: "Ganesh Shinde",
    role: "Founder & Head Chef",
    bio: "Learned to cook in his mother's kitchen in Satara and has been feeding Pune since 2009. Still personally tastes the dal before any wedding service begins.",
    image: "/images/team/ganesh-shinde.svg",
  },
  {
    id: "sunita-shinde",
    name: "Sunita Shinde",
    role: "Co-founder & Operations",
    bio: "Runs logistics, staffing and every client conversation that matters. If your event finished on time, that was her doing.",
    image: "/images/team/sunita-shinde.svg",
  },
  {
    id: "imran-qureshi",
    name: "Imran Qureshi",
    role: "Executive Chef, North Indian",
    bio: "Fifteen years across hotel kitchens in Pune and Delhi. Owns the tandoor, the dal makhani that simmers overnight, and strong opinions about both.",
    image: "/images/team/imran-qureshi.svg",
  },
  {
    id: "lakshmi-iyer",
    name: "Lakshmi Iyer",
    role: "Chef de Partie, South Indian",
    bio: "Ferments every batch of dosa batter in-house and grinds chutney the morning it is served. Will not compromise on either.",
    image: "/images/team/lakshmi-iyer.svg",
  },
];

export const hygienePoints = [
  {
    title: "FSSAI licensed",
    description:
      "Licence 11522998000123, renewed annually and displayed at both production units. Available for inspection on request.",
  },
  {
    title: "Separate satvik line",
    description:
      "Jain, vegan and no-onion-garlic food is cooked on dedicated stoves with separate utensils, stored and transported apart.",
  },
  {
    title: "Cold chain maintained",
    description:
      "Dairy, chutneys and cut vegetables travel in refrigerated transport and are held below 5°C until service begins.",
  },
  {
    title: "Daily staff health checks",
    description:
      "Temperature logs, hairnets, gloves and closed footwear on every shift. Annual medical certificates for all kitchen staff.",
  },
  {
    title: "Pure vegetarian kitchen",
    description:
      "No meat, fish or egg has ever entered either premises. There is no cross-contamination risk because there is nothing to cross.",
  },
  {
    title: "Water tested quarterly",
    description:
      "RO-treated water for all cooking and washing, with third-party potability testing every quarter.",
  },
];
