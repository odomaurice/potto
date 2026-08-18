"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AnalyticsUpIcon,
  Cancel01Icon,
  PlayIcon,
  Shield01Icon,
  SquareLock01Icon,
} from "@hugeicons/core-free-icons";

/**
 * The three devices as one composed shot, cropped to its opaque bounds and
 * re-exported from `png png.png` (1567x767, 554KB, with a filename that had a
 * space in it). One image rather than three separately-positioned ones: the
 * arrangement, overlap and shadows are baked in, which no amount of flexbox
 * would have reproduced.
 *
 * The separate /devices/{laptop,tablet,phone}.webp crops are still on disk if
 * the row-of-three is ever wanted back.
 */
const DEVICES_IMAGE = "/devices/potto-devices.webp";

const CLAIMS = [
  {
    icon: Shield01Icon,
    title: "All-in-One Platform",
    body: "Manage payments, fees, expenses and more in one place.",
  },
  {
    icon: AnalyticsUpIcon,
    title: "Real-time Insights",
    body: "Get real-time data and visual reports to make informed decisions.",
  },
  {
    icon: SquareLock01Icon,
    title: "Secure & Reliable",
    body: "Your data is protected with top level security and reliability.",
  },
];

/**
 * One column split shared by both rows of the section, so the artwork's left
 * edge lands on the same line as "Watch a school day run on Potto:" above it,
 * and the claims run down under the headline.
 *
 * Declared once and spread into both rows because the two only stay aligned
 * while their template *and* their gap are identical — set them separately and
 * they drift the moment either is touched.
 *
 * 5:7 rather than an even split: it holds the artwork column slightly wider
 * than it was before, which is what the alignment was not allowed to cost.
 */
const COLUMNS = "md:grid-cols-[5fr_7fr] md:gap-8 lg:gap-12";

const VIDEO_SRC = "/videos/intro.MOV";

const CHECKLIST = ["Gate Check-in", "Live Register", "Real-time Alert"];

const ease = [0.22, 1, 0.36, 1] as const;
// separate viewport triggers.
const T = {
  pill: 0,
  headline: 0.15,
  listHeading: 0.3,
  firstPoint: 0.55,
  betweenPoints: 0.35,
  play: 0.55 + 3 * 0.35 + 0.25,
};

export default function IntroVideoSection() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const copyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(copyRef, { once: true, amount: 0.2 });
  const artRef = useRef<HTMLDivElement>(null);
  const artInView = useInView(artRef, { once: true, amount: 0.25 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.6, delay, ease },
  });

  const close = useCallback(() => setOpen(false), []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <section
      id="intro-video"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative isolate overflow-hidden py-24 text-ink md:py-32"
    >
      <div
        ref={copyRef}
        className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8"
      >
        <div className={`grid items-start gap-10 ${COLUMNS}`}>
          <div>
            <motion.span
              {...reveal(T.pill)}
              className="inline-block rounded-full bg-brand px-5 py-2.5 text-base font-semibold text-brand-fg sm:px-6 sm:py-3 sm:text-lg"
            >
              Potto in action
            </motion.span>

            <motion.h2
              {...reveal(T.headline)}
              /* Capped at 6xl. The headline column is narrower now that the
                 split favours the artwork, and at 7xl "Ninety seconds" breaks
                 across two lines of its own. */
              className="mt-6 font-header text-4xl font-extrabold leading-[1.04] tracking-tight sm:mt-7 sm:text-5xl md:text-5xl lg:text-6xl"
            >
              Ninety seconds
              <br />
              with <span className="text-brand">Potto</span>
            </motion.h2>
          </div>

          {/* The indent is the look on wide screens, but on a phone it is just
              lost width, so it only starts at lg. */}
          <div className="md:pt-2 lg:pt-4 lg:pl-10 xl:pl-12">
            <motion.p
              {...reveal(T.listHeading)}
              className="font-header text-xl font-extrabold leading-snug tracking-tight sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl"
            >
              Watch a school day run on Potto:
            </motion.p>

            {/* List and play control sit side by side once there is room for
                both, grouped by a set gap rather than pushed apart to the
                column edges — this column is the wide one, so `justify-between`
                stranded the button on the far right with a few hundred pixels
                of nothing beside it. Below sm the button drops under the list. */}
            <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-12">
              <ul className="space-y-3">
                {CHECKLIST.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -24 }}
                    animate={
                      inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: T.firstPoint + i * T.betweenPoints,
                      ease,
                    }}
                    className="flex items-center gap-3 text-lg font-medium sm:gap-3.5 sm:text-xl md:text-base lg:text-lg xl:text-xl"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: T.firstPoint + i * T.betweenPoints,
                        ease: "backOut",
                      }}
                      className="h-3 w-3 shrink-0 rounded-full bg-brand-gold"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                {...reveal(T.play)}
                className="flex shrink-0 items-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Play the Potto introduction video"
                  /* `animate-glow` rather than a static `shadow-*`: a running
                     animation outranks ordinary declarations, so a hover shadow
                     would simply be ignored here. Hover recolours the glow by
                     reassigning `--glow` instead. */
                  className="group relative grid h-16 w-16 shrink-0 animate-glow place-items-center rounded-full bg-brand-yellow text-ink [--glow:var(--color-brand-yellow)] transition duration-300 hover:scale-105 hover:bg-brand-yellow-light hover:[--glow:var(--color-brand-yellow-light)] sm:h-18 sm:w-18 lg:h-20 lg:w-20"
                >
                  {/* Two rings, the second half a cycle behind, so one is always
                      on its way out. Both start hidden behind the button face. */}
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-yellow"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-brand-yellow [animation-delay:1.3s]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 animate-halo rounded-full bg-brand-yellow blur-md"
                  />

                  <HugeiconsIcon
                    icon={PlayIcon}
                    size={30}
                    strokeWidth={2}
                    className="translate-x-0.5"
                  />
                </button>

                <span className="text-base font-medium text-soft">
                  Play the intro
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* Same container and the same COLUMNS split as the copy above, which is
          what puts the artwork's left edge on the headline block's right-hand
          column line rather than somewhere near it. */}
      <div
        ref={artRef}
        className="mx-auto mt-14 w-full max-w-7xl px-5 md:mt-20 md:px-6 lg:px-8"
      >
        <div className={`grid items-center gap-12 ${COLUMNS}`}>
          {/* Decorative — the claims beside it carry the meaning. The
              aria-hidden belongs here and not on the wrapper, which would take
              the claims out of the accessibility tree with it.

              First in the DOM so it comes first when the row stacks on a phone,
              but placed in the second column on wider screens. */}
          <div
            aria-hidden
            className="pointer-events-none md:col-start-2 md:row-start-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={artInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease }}
            >
              <Image
                src={DEVICES_IMAGE}
                alt=""
                width={1400}
                height={671}
                priority
                sizes="(min-width: 1280px) 690px, (min-width: 768px) 56vw, 92vw"
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          <div className="md:col-start-1 md:row-start-1">
            <div className="flex flex-col gap-8 lg:gap-10">
              {CLAIMS.map((claim, i) => (
                <motion.div
                  key={claim.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={
                    artInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
                  }
                  // Picks up after the artwork has landed.
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease }}
                  className="flex items-start gap-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-brand-fg lg:h-14 lg:w-14">
                    <HugeiconsIcon
                      icon={claim.icon}
                      size={26}
                      strokeWidth={1.9}
                    />
                  </span>

                  <div>
                    <h3 className="font-header text-lg font-extrabold tracking-tight lg:text-xl">
                      {claim.title}
                    </h3>
                    <p className="mt-1.5 text-[0.925rem] leading-6 text-soft">
                      {claim.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label="Potto introduction video"
                className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-5 bg-ink/85 px-4 py-6 backdrop-blur-xl md:px-8"
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close video"
                  className="flex shrink-0 items-center gap-2 self-end rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  Close
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={16}
                    strokeWidth={2}
                  />
                </button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 26,
                    mass: 0.7,
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl"
                >
                  <div
                    aria-hidden
                    className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-teal/20 blur-3xl"
                  />

                  <video
                    ref={videoRef}
                    src={VIDEO_SRC}
                    autoPlay
                    controls
                    playsInline
                    className="max-h-[78vh] w-full rounded-[1.75rem] bg-black shadow-2xl"
                  ></video>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
