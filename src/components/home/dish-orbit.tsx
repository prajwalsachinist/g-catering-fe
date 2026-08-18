import Image from "next/image";

import { menuItems } from "@/data/menu";

/**
 * A ring of dishes orbiting a centre plate.
 *
 * Replaced the earlier ambient particle field: the composition is radially
 * aligned and shows real menu photography rather than random drift. The
 * ring rotates one way while each dish counter-rotates at the same rate,
 * which is what keeps the photograph upright as it travels rather than
 * tumbling. Pure CSS (see the "Dish orbit" block in globals.css), so the
 * landing page ships no animation library, and it is dropped entirely under
 * prefers-reduced-motion.
 *
 * Hovering a dish reveals its name - the ring keeps moving, so the label
 * rides along with its photo rather than snapping to a fixed spot.
 */

const DISH_IDS = [
  "masala-dosa",
  "paneer-butter-masala",
  "live-pav-bhaji",
  "veg-hakka-noodles",
  "ukadiche-modak",
  "kanda-bhaji",
  "puran-poli",
  "masala-chai",
];

const dishes = DISH_IDS.map((id) => menuItems.find((item) => item.id === id)).filter(
  (item): item is (typeof menuItems)[number] => item !== undefined,
);

const centre = "/images/hero/hero.jpg";

/** Item box as a share of the container; the orbit radius follows from it. */
const ITEM = 21; // %
const RADIUS = 176; // % of the item's own height

export function DishOrbit() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-[28rem]"
      // Purely illustrative; every dish shown is listed on the menu page.
      // The per-dish hover labels are decorative confirmation, not unique
      // content, so the whole graphic stays out of the accessibility tree.
      aria-hidden="true"
    >
      {/* Warm bloom behind the plate, gently breathing. */}
      <div className="plate-pulse absolute inset-[8%] rounded-full bg-saffron/25 blur-3xl" />

      {/* Alignment rings */}
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[13%] rounded-full border border-dashed border-saffron/20" />

      {/* Centre plate */}
      <div className="absolute inset-[26%] overflow-hidden rounded-full border border-saffron/30 shadow-[0_20px_60px_-20px_var(--color-saffron)]">
        <Image
          src={centre}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 40vw, 15rem"
          className="object-cover"
        />
      </div>

      {/* Orbiting dishes */}
      <div className="orbit-ring absolute inset-0">
        {dishes.map((dish, index) => {
          const angle = (index / dishes.length) * 360;
          return (
            <div
              key={dish.id}
              className="group absolute"
              style={{
                left: "50%",
                top: "50%",
                width: `${ITEM}%`,
                height: `${ITEM}%`,
                marginLeft: `-${ITEM / 2}%`,
                marginTop: `-${ITEM / 2}%`,
                transform: `rotate(${angle}deg) translateY(-${RADIUS}%) rotate(${-angle}deg)`,
              }}
            >
              {/*
                Clip and counter-rotation live on the SAME element - splitting
                them (clip on a child of the animated element) let the child's
                overflow-hidden/border-radius silently stop clipping in Chrome,
                which promotes an animated ancestor to its own compositing
                layer. The label is a separate sibling carrying an identical
                counter-rotation, so it stays upright and in phase without
                ever being nested inside the clipped circle.
              */}
              <div className="orbit-item relative size-full overflow-hidden rounded-full border border-line-strong bg-surface-2 shadow-xl shadow-black/40 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={dish.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 18vw, 7rem"
                  className="object-cover"
                />
              </div>

              <div
                aria-hidden="true"
                className="orbit-item pointer-events-none absolute inset-0"
              >
                <span className="media-chip absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 scale-95 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-foreground opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                  {dish.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
