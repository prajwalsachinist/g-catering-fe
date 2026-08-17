import Image from "next/image";

/**
 * A slowly rotating ring of dishes around a centre plate.
 *
 * Replaces the earlier ambient particle field: the composition is radially
 * aligned rather than random, and it shows the actual food.
 *
 * Animated entirely in CSS (see `.orbit-ring` / `.orbit-item` in globals.css)
 * so the landing page ships no animation library. The ring rotates one way
 * while each dish counter-rotates at the same rate, which keeps the
 * photographs upright as they travel. Both animations are dropped under
 * prefers-reduced-motion, leaving a static arrangement.
 */

const centre = "/images/hero/hero.jpg";

const dishes = [
  "/images/menu/masala-dosa.jpg",
  "/images/menu/paneer-butter-masala.jpg",
  "/images/menu/live-pav-bhaji.jpg",
  "/images/menu/veg-hakka-noodles.jpg",
  "/images/menu/ukadiche-modak.jpg",
  "/images/menu/kanda-bhaji.jpg",
];

/** Item box as a share of the container; the orbit radius follows from it. */
const ITEM = 23; // %
const RADIUS = 176; // % of the item's own height

export function DishOrbit() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-[28rem]"
      // Purely illustrative; every dish shown is listed on the menu page.
      aria-hidden="true"
    >
      {/* Warm bloom behind the plate */}
      <div className="absolute inset-[8%] rounded-full bg-saffron/20 blur-3xl" />

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
          sizes="(max-width: 640px) 36vw, 14rem"
          className="object-cover"
        />
      </div>

      {/* Orbiting dishes */}
      <div className="orbit-ring absolute inset-0">
        {dishes.map((src, index) => {
          const angle = (index / dishes.length) * 360;
          return (
            <div
              key={src}
              className="absolute"
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
              <div className="orbit-item relative size-full overflow-hidden rounded-full border border-line-strong bg-surface-2 shadow-xl shadow-black/40">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 18vw, 7rem"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
