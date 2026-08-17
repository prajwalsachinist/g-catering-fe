/**
 * Single source of truth for business identity, contact routes and SEO
 * defaults. Replace the placeholder contact details with the real ones
 * before going live — they are referenced by the header, footer, mobile
 * CTA bar, contact page and the LocalBusiness JSON-LD.
 */

const rawPhone = "+919822012345";

export const siteConfig = {
  name: "Ganesh Catering",
  legalName: "Ganesh Catering Services",
  tagline: "Pune's kitchen for the moments that matter",
  description:
    "Ganesh Catering serves weddings, mangalkarya, vastu shanti, corporate events, birthdays and house parties across Pune with authentic Maharashtrian, Punjabi, South Indian and Chinese menus. FSSAI certified, 1,200+ events served.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ganeshcatering.in",
  locale: "en_IN",

  founded: 2009,

  contact: {
    phone: rawPhone,
    phoneDisplay: "+91 98220 12345",
    whatsapp: rawPhone.replace("+", ""),
    email: "hello@ganeshcatering.in",
  },

  address: {
    street: "Shop 14, Sai Krupa Complex, Sinhagad Road",
    locality: "Wadgaon Budruk",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411041",
    country: "IN",
    countryName: "India",
  },

  geo: {
    latitude: 18.4529,
    longitude: 73.8256,
  },

  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 9:00 PM" },
    { days: "Sunday", time: "10:00 AM – 6:00 PM" },
  ],

  /** Machine-readable form for the openingHoursSpecification in JSON-LD. */
  hoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
    { days: ["Sunday"], opens: "10:00", closes: "18:00" },
  ],

  credentials: {
    fssai: "11522998000123",
    servingSince: 2009,
  },

  social: {
    instagram: "https://instagram.com/ganeshcatering.pune",
    facebook: "https://facebook.com/ganeshcateringpune",
  },

  /** Areas listed in the footer and used for the JSON-LD areaServed field. */
  serviceAreas: [
    "Kothrud",
    "Sinhagad Road",
    "Karve Nagar",
    "Warje",
    "Baner",
    "Aundh",
    "Hadapsar",
    "Viman Nagar",
    "Hinjewadi",
    "Pimpri-Chinchwad",
  ],
} as const;

export const telHref = `tel:${siteConfig.contact.phone}`;
export const mailHref = `mailto:${siteConfig.contact.email}`;

/** Builds a wa.me deep link with an optional prefilled message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = `Namaste! I'd like to enquire about catering for an upcoming event.`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
