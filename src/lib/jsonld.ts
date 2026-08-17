import { categories } from "@/data/categories";
import { menuItems } from "@/data/menu";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site-config";

const BUSINESS_ID = `${siteConfig.url}/#business`;

/**
 * LocalBusiness (specialised as FoodEstablishment/CateringService) describing
 * the whole operation. Emitted once, in the root layout, and referenced by
 * @id from the other graphs.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "₹₹",
    servesCuisine: [
      "Maharashtrian",
      "North Indian",
      "South Indian",
      "Chinese",
      "Indian",
    ],
    foundingDate: String(siteConfig.founded),
    image: `${siteConfig.url}/opengraph-image`,
    logo: `${siteConfig.url}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.hoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "Place",
      name: `${area}, Pune`,
    })),
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    hasMenu: `${siteConfig.url}/menu`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      ).toFixed(1),
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

/** Full Menu graph, one MenuSection per category. */
export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteConfig.url}/menu#menu`,
    name: `${siteConfig.name} Catering Menu`,
    description:
      "Vegetarian catering menu spanning Maharashtrian, Punjabi, South Indian and Chinese cuisines, with live counters, sweets and beverages.",
    inLanguage: "en-IN",
    provider: { "@id": BUSINESS_ID },
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      description: category.description,
      hasMenuItem: menuItems
        .filter((item) => item.category === category.slug)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          image: `${siteConfig.url}${item.image}`,
          suitableForDiet: dietToSchema(item.diet),
        })),
    })),
  };
}

function dietToSchema(diet: string[]): string[] {
  const out = new Set<string>();
  if (diet.includes("veg")) out.add("https://schema.org/VegetarianDiet");
  if (diet.includes("vegan")) out.add("https://schema.org/VeganDiet");
  return [...out];
}

/** Breadcrumbs for any non-home route. */
export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${siteConfig.url}${crumb.path}`,
      }),
    ),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "en-IN",
    publisher: { "@id": BUSINESS_ID },
  };
}
