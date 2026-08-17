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




const DEVICES = [
  {
    src: "/devices/laptop.webp",
    width: 1600,
    height: 1105,
    className: "w-[46%] sm:w-[43%] md:w-[41%] lg:w-[40%]",
    sizes: "(min-width: 1024px) 40vw, (min-width: 640px) 43vw, 46vw",
    delay: 0,
    priority: true,
  },
  {
    src: "/devices/phone.webp",
    width: 440,
    height: 942,
    className: "w-[13%] sm:w-[11%] md:w-[9%] lg:w-[8%]",
    sizes: "(min-width: 1024px) 8vw, (min-width: 640px) 11vw, 13vw",
    // Last in, so the eye lands on the centre of the row.
    delay: 0.24,
    priority: false,
  },
  {
    src: "/devices/tablet.webp",
    width: 1200,
    height: 853,
    className: "w-[34%] sm:w-[32%] md:w-[31%] lg:w-[30%]",
    sizes: "(min-width: 1024px) 30vw, (min-width: 640px) 32vw, 34vw",
    delay: 0.12,
    priority: false,
  },
] as const;


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
      <div ref={copyRef} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">

        <div className="grid items-start gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <motion.span
              {...reveal(T.pill)}
              className="inline-block rounded-full bg-brand px-5 py-2.5 text-base font-semibold text-brand-fg sm:px-6 sm:py-3 sm:text-lg"
            >
              Potto in action
            </motion.span>

            <motion.h2
              {...reveal(T.headline)}
              className="mt-6 font-header text-4xl font-extrabold leading-[1.04] tracking-tight sm:mt-7 sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Ninety seconds
              <br />
              with <span className="text-brand">Potto</span>
            </motion.h2>
          </div>

          <div className="md:pt-2 lg:pt-4">
            <motion.p
              {...reveal(T.listHeading)}
              className="font-header text-xl font-extrabold leading-snug tracking-tight sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl"
            >
              Watch a school day run on Potto:
            </motion.p>

            <ul className="mt-6 space-y-3">
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
                <span className="block text-sm text-soft/80">
                  1:32 · plays right here
                </span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
      <div
        ref={artRef}
        aria-hidden
        className="pointer-events-none mt-14 w-full px-5 md:mt-20 md:px-8 lg:px-32"
      >
        <div className="flex items-end justify-between gap-3 sm:gap-6">
          {DEVICES.map((device) => (
            <motion.div
              key={device.src}
              initial={{ opacity: 0, y: 34 }}
              animate={
                artInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }
              }
              transition={{ duration: 0.75, delay: device.delay, ease }}
              className={device.className}
            >
              <Image
                src={device.src}
                alt=""
                width={device.width}
                height={device.height}
                priority={device.priority}
                sizes={device.sizes}
                className="h-auto w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full px-5 md:mt-14 md:px-8 lg:px-32">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {CLAIMS.map((claim, i) => (
            <motion.div
              key={claim.title}
              initial={{ opacity: 0, y: 22 }}
              animate={artInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              // Picks up after the last device has landed.
              transition={{ duration: 0.6, delay: 0.55 + i * 0.12, ease }}
              className="flex items-start gap-4"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-brand-fg lg:h-14 lg:w-14">
                <HugeiconsIcon icon={claim.icon} size={26} strokeWidth={1.9} />
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
                  >
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
