export type DietTag = "veg" | "jain" | "vegan" | "no-onion-garlic";

export type CategorySlug =
  | "starters"
  | "maharashtrian-thali"
  | "punjabi"
  | "south-indian"
  | "chinese"
  | "live-counters"
  | "sweets"
  | "beverages";

export type EventTypeSlug =
  | "wedding"
  | "mangalkarya"
  | "vastu-shanti"
  | "corporate"
  | "birthday"
  | "house-party";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Devanagari rendering, used as a decorative accent. */
  nameMarathi: string;
  description: string;
  /** Controls display order in filter bars and the menu grid. */
  order: number;
}

export interface EventType {
  slug: EventTypeSlug;
  name: string;
  nameMarathi: string;
  description: string;
  /** Short scale hint shown on the event cards, e.g. "200–2000 guests". */
  guestRange: string;
  image: string;
  icon: "wedding" | "temple" | "home" | "briefcase" | "cake" | "sparkles";
}

export interface MenuItem {
  id: string;
  name: string;
  nameMarathi?: string;
  description: string;
  category: CategorySlug;
  diet: DietTag[];
  eventTypes: EventTypeSlug[];
  image: string;
  /** Surfaced on the home page menu preview and badged in the grid. */
  featured?: boolean;
  /** Optional heat indicator, 0–3. */
  spiceLevel?: 0 | 1 | 2 | 3;
}

export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  /** Per plate, in INR. */
  pricePerPlate: number;
  minGuests: number;
  popular?: boolean;
  description: string;
  /** Headline inclusions rendered as the card's bullet list. */
  highlights: string[];
  /** Keyed by comparison-table row id — see `comparisonRows`. */
  features: Record<string, string | boolean>;
}

export interface ComparisonRow {
  id: string;
  label: string;
  /** Renders ticks/crosses instead of text when true. */
  boolean?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  eventType: EventTypeSlug;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  eventType: EventTypeSlug;
  caption: string;
  /** Drives the masonry row span. */
  aspect: "portrait" | "landscape" | "square";
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
