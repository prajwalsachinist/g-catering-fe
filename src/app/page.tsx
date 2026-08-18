import type { Metadata } from "next";

import { EventTypes } from "@/components/home/event-types";
import { FinalCta } from "@/components/home/final-cta";
import { GalleryStrip } from "@/components/home/gallery-strip";
import { Hero } from "@/components/home/hero";
import { MenuPreview } from "@/components/home/menu-preview";
import { Stats } from "@/components/home/stats";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Wedding & Event Catering in Pune",
  description:
    "Ganesh Catering serves weddings, mangalkarya, vastu shanti, corporate events, birthdays and house parties across Pune. Pure vegetarian, FSSAI licensed, 1,200+ events since 2009.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventTypes />
      <MenuPreview />
      <Stats />

      <section className="section-y warm-wash" aria-labelledby="reviews-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Client stories"
            title={<span id="reviews-heading">Ask the families we have fed</span>}
            description="Eight of the twelve hundred. Every one of them booked us, or told somebody else to."
            align="center"
          />
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      <GalleryStrip />
      <FinalCta />
    </>
  );
}
