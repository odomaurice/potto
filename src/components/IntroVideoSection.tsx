"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, PlayIcon } from "@hugeicons/core-free-icons";



const DEVICES_IMAGE = "/devices.png";
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

  /** Fade-and-rise of those bullet points, positioned on the shared timeline. */
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
      // Bottom padding reserves room for the artwork band, whose height is
      // width-driven — so it is expressed in vw and tracks the band's own
      // scaling at each breakpoint. Change one and the other must follow.
      className="relative isolate overflow-hidden pt-24 pb-[62vw] text-ink sm:pb-[46vw] md:pt-32 lg:pb-[34vw]"
    >
      {/* The band is deliberately wider than the viewport on small screens.
          The 3.2 crop ratio cannot be relaxed — a shorter ratio lets the
          headline baked into the top of devices.png back into frame — so the
          only way to enlarge the hardware on a phone is to zoom in and let the
          sides clip. 190% ≈ double size at 375px; the section clips the excess. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-[3.2] w-[190%] -translate-x-1/2 overflow-hidden sm:w-[140%] lg:w-full"
      >
        {/* `priority` because Next measured this as the Largest Contentful
            Paint: it is a full-width image one scroll below the fold, so the
            default lazy loading delays LCP. This marks it eager + high fetch
            priority and preloads it. */}
        <Image
          src={DEVICES_IMAGE}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 100vw, (min-width: 640px) 140vw, 190vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* Shared section container — see the note in FeaturesSection. */}
      <div ref={copyRef} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <motion.span
              {...reveal(T.pill)}
              className="inline-block rounded-full bg-brand px-5 py-2.5 text-base font-semibold text-brand-fg sm:px-6 sm:py-3 sm:text-lg"
            >
              Potto in action
            </motion.span>

            <motion.h2
              {...reveal(T.headline)}
              className="mt-6 font-header text-4xl font-extrabold leading-[1.04] tracking-tight sm:mt-7 sm:text-6xl lg:text-7xl"
            >
              Ninety seconds
              <br />
              with <span className="text-brand">Potto</span>
            </motion.h2>
          </div>

          <div className="lg:pt-4">
            <motion.p
              {...reveal(T.listHeading)}
              className="font-header text-xl font-extrabold leading-snug tracking-tight sm:text-2xl lg:text-3xl"
            >
              Watch a school day run on Potto:
            </motion.p>

            <ul className="mt-6 space-y-3">
              {CHECKLIST.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -24 }}
                  // Each point is pinned to a shared clock — 0.55s, 0.90s,
                  // 1.25s — so they arrive strictly one after the other.
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: T.firstPoint + i * T.betweenPoints,
                    ease,
                  }}
                  className="flex items-center gap-3 text-lg font-medium sm:gap-3.5 sm:text-xl lg:text-2xl"
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

            {/* ---------- Play control ---------- */}
            <motion.div
              {...reveal(T.play)}
              className="mt-10 flex items-center gap-4"
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Play the Potto introduction video"
                className="group relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-yellow text-ink shadow-[0_0_34px_-4px_var(--color-brand-yellow)] transition duration-300 hover:scale-105 hover:bg-brand-yellow-light hover:shadow-[0_0_52px_-2px_var(--color-brand-yellow-light)] sm:h-20 sm:w-20"
              >
                {/* Halo breathes on its own — the glow is the resting state, and
                    hover only intensifies it. */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 animate-halo rounded-full bg-brand-yellow blur-md"
                />
                {/* Nudged right for optical centring: a triangle's visual mass
                    sits left of its bounding box. */}
                <HugeiconsIcon
                  icon={PlayIcon}
                  size={30}
                  strokeWidth={2}
                  className="translate-x-0.5"
                />
              </button>

              <span className="text-base font-medium text-soft">
                Play the intro
                <span className="block text-sm text-soft/80">
                  1:32 · plays right here
                </span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- In-app video modal ----------
          Portalled to <body>. This section sets `isolate`, which creates a
          stacking context — a modal rendered inside it is trapped there, and the
          fixed header (z-50, root context) would paint straight over the
          overlay no matter how high its own z-index went. */}
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
                {/* Close sits above the player as its own row rather than floating
                on a negative offset — a negative top pushed it off-screen on
                short viewports, where it was the only visible way out. */}
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
                  // The backdrop closes on click; the player must not.
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl"
                >
                  {/* Brand glow instead of a hard border, so the player reads as lit
                  rather than framed — consistent with the rest of the page. */}
                  <div
                    aria-hidden
                    className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-teal/20 blur-3xl"
                  />

                  <video
                    ref={videoRef}
                    // Bare `src`, no <source type>: see the note on VIDEO_SRC.
                    src={VIDEO_SRC}
                    autoPlay
                    controls
                    playsInline
                    // `max-h` keeps the whole player on screen in landscape, where a
                    // 16:9 box sized off the width would overflow vertically.
                    className="max-h-[78vh] w-full rounded-[1.75rem] bg-black shadow-2xl"
                  >
                    {/* Add captions once a transcript exists:
                    <track kind="captions" srcLang="en" src="/videos/intro.en.vtt" default /> */}
                  </video>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
