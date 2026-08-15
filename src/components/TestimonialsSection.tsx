"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  QuoteUpIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";

/**
 * Testimonials — a single quote at a time, on the white page like every other
 * section. Frameless: no card around the quote, no border on the controls.
 *
 * NOTE: these are sample entries. The wording, people and schools are written
 * for layout purposes — swap them for real, permissioned quotes before launch.
 * School names are invented so nothing here attributes words to an actual
 * institution.
 */
/**
 * Drop portrait files at these paths and they render automatically; leave
 * `avatar` off (or delete the file) and the entry falls back to an initials
 * disc, so a missing image never shows as a broken picture. Square crops,
 * ~200×200 or larger.
 */
const TESTIMONIALS = [
  {
    quote:
      "Parents used to call the office every afternoon asking whether their child had been picked up. Since Potto, they get the alert before they think to ask.",
    name: "Adaeze Okonkwo",
    role: "Head Teacher",
    school: "Brightgate Academy, Lekki",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    quote:
      "Gate check-in used to take two staff and twenty minutes. It now takes one person and a card reader, and we have a record of every single entry.",
    name: "Tunde Balogun",
    role: "Head of Administration",
    school: "Crescent Hill Schools, Abuja",
    avatar: "/avatars/avatar2.jpg",
  },
  {
    quote:
      "The part that changed things for us was the panic alert. Everyone who needs to know is notified at once, and nobody is waiting on a phone tree.",
    name: "Ngozi Eze",
    role: "Safety Coordinator",
    school: "Pinegrove International School, Enugu",
    avatar: "/avatars/avatar3.jpg",
  },
  {
    quote:
      "I see when my daughter reaches school and when she leaves, on my phone, without calling anyone. That peace of mind is worth more than I expected.",
    name: "Ibrahim Sanni",
    role: "Parent",
    school: "Brightgate Academy, Lekki",
    avatar: "/avatars/avatar4.jpg",
  },
];

const INTERVAL = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

/** Initials for the avatar disc — no photo assets, and initials read cleanly. */
const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // `direction` decides which way a slide enters and leaves, so arrows and dots
  // both animate the way the viewer expects.
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  // Avatars that 404'd, keyed by src, so they fall back to initials once and
  // don't retry on every slide change.
  const [avatarFailed, setAvatarFailed] = useState<Record<string, boolean>>({});
  const current = TESTIMONIALS[index];

  const go = useCallback((next: number, dir: number) => {
    setSlide([(next + TESTIMONIALS.length) % TESTIMONIALS.length, dir]);
  }, []);

  // Autoplay, held while the viewer is hovering or tabbing through, and off
  // entirely under reduced motion — where the controls still work.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setSlide(([i]) => [(i + 1) % TESTIMONIALS.length, 1]),
      INTERVAL,
    );
    return () => clearInterval(t);
  }, [paused]);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="testimonials"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...reveal(0)}>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-soft">
              Testimonials
            </span>
            <span aria-hidden className="mx-auto mt-3 block h-0.5 w-10 bg-brand" />
          </motion.div>

          <motion.h2
            {...reveal(0.12)}
            className="mt-7 font-header text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl"
          >
            Listen to what our{" "}
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.08em] bottom-[0.07em] h-[0.36em] rounded-[3px] bg-highlight/70"
              />
              <span className="relative">clients say</span>
            </span>
          </motion.h2>

          <motion.p {...reveal(0.24)} className="mt-6 text-lg leading-8 text-soft">
            Our clients are not only satisfied — with Potto they are exceeding
            parents’ expectations.
          </motion.p>
        </div>

        {/* ---------- Carousel ---------- */}
        <motion.div
          {...reveal(0.36)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="What our clients say"
          className="relative mx-auto mt-16 max-w-4xl"
        >
          {/* Oversized quote glyph, sitting behind the text as an anchor rather
              than a box around it. */}
          <HugeiconsIcon
            icon={QuoteUpIcon}
            size={120}
            strokeWidth={1}
            className="pointer-events-none absolute -top-6 left-1/2 -z-10 -translate-x-1/2 text-brand/10"
          />

          {/* A floor on the height so the controls below hold still while quotes
              of different lengths swap in and out. */}
          <div className="grid min-h-72 place-items-center text-center sm:min-h-64">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 48 : -48 }),
                  center: { opacity: 1, x: 0 },
                  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -48 : 48 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease }}
              >
                <blockquote className="font-header text-2xl font-semibold leading-normal tracking-tight text-ink sm:text-3xl sm:leading-[1.45]">
                  “{current.quote}”
                </blockquote>

                <div
                  aria-hidden
                  className="mt-8 flex justify-center gap-1 text-brand-yellow"
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <HugeiconsIcon
                      key={star}
                      icon={StarIcon}
                      size={18}
                      strokeWidth={0}
                      className="fill-brand-yellow"
                    />
                  ))}
                </div>

                <figcaption className="mt-6 flex items-center justify-center gap-4">
                  {/* Portrait when one exists, initials otherwise — `onError`
                      catches a missing file at runtime so a 404 degrades to the
                      disc rather than a broken image. */}
                  {current.avatar && !avatarFailed[current.avatar] ? (
                    <Image
                      src={current.avatar}
                      alt=""
                      width={96}
                      height={96}
                      onError={() =>
                        setAvatarFailed((prev) => ({
                          ...prev,
                          [current.avatar]: true,
                        }))
                      }
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 font-header text-sm font-bold text-brand">
                      {initialsOf(current.name)}
                    </span>
                  )}
                  <span className="text-left">
                    <span className="block font-header text-base font-bold tracking-tight">
                      {current.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-soft">
                      {current.role} · {current.school}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* ---------- Controls ---------- */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1, -1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2} />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name + t.school}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-brand" : "w-2 bg-ink/15 hover:bg-ink/30"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1, 1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
