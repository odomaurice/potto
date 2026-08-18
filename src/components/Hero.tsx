"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";


const VIDEO_SRC = "/videos/intro.mp4";

// Re-exported from slides/slide5.jpg, which was a 5600x3959 8.2MB JPEG. A
// poster is fetched eagerly, so that was the single heaviest thing on the page
// and it landed on phones first.
const POSTER = "/hero-poster.webp";

const ROTATE_MS = 6000;

const MESSAGES = [
  {
    lead: "Secured School",
    accent: "Communities",
    body: "Our easy-to-use technology assures you of student safety through effective tracking and monitoring.",
  },
  {
    lead: "Amazing Benefits",
    accent: "for Everyone",
    body: "Potto is a security management solution designed to ensure the safety of students against varying security threats — from early detection to quick response — using leading-edge technologies.",
  },
  {
    lead: "Safeguard",
    accent: "Students",
    body: "Every child accounted for, from the school gate to the closing bell, with real-time check-in and instant guardian alerts.",
  },
  {
    lead: "Early Detection,",
    accent: "Quick Response",
    body: "Threats are flagged the moment they surface and routed straight to the right responder, so no minutes are lost to guesswork.",
  },
];

const PHRASES = [
  "Secured school communities",
  "Real-time tracking",
  "Instant guardian alerts",
  "Early detection",
  "Quick response",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const marquee = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const message = MESSAGES[index];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      videoRef.current?.pause();
      return;
    }

    const rotate = setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      ROTATE_MS,
    );

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.5,
      });

      if (marquee.current) {
        gsap.to(marquee.current, {
          xPercent: -50,
          duration: 34,
          ease: "none",
          repeat: -1,
        });
      }
    }, root);

    return () => {
      clearInterval(rotate);
      ctx.revert();
    };
  }, []);

  const copy = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
    out: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };
  const line = {
    hidden: { yPercent: 115 },
    show: { yPercent: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
    out: { yPercent: -115, transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] } },
  } as const;
  const fade = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
    out: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  } as const;

  return (
    <section
      ref={root}
      data-nav-tone="dark"
      /* Portrait height is the one number to turn here, and it is a direct
         trade against how much of the clip's width survives — the section is
         filled by covering, so every pixel of height beyond the clip's own
         shape scales the picture up and pushes its sides off screen. At the
         clip's exact shape (478/848 = 56.4vw) nothing is lost at all; past
         that it goes quickly, and the clip carries its own titles:

             56.4vw  232px   100% of the width kept   nothing lost
             60vw    247px    94%                     3% off each side
             64vw    264px    88%                     6%
             68vw    280px    83%                     9%   <- here
             80vw    330px    70%                    15%
            100vw    412px    56%                    22%

         (Measured on a 412px-wide phone; the ratios hold at any width.)

         68vw trades roughly 9% off each side for 20% more height. Most promo
         edits keep their titles inside a safe margin of about that, so this is
         near the edge of what is free — if the titles start clipping, step
         back to 64vw or 60vw.

         Keyed to orientation rather than width: what forces the trade is the
         container being taller than it is wide, and a portrait 768x1024 tablet
         is every bit as tall-and-narrow as a phone, which a `sm:` breakpoint
         sails straight past. Landscape keeps the full viewport height, where
         the clip's 1.774:1 is near enough to the screen to cover it outright. */
      className="relative isolate flex min-h-[68vw] items-center justify-center overflow-hidden text-white landscape:min-h-svh"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink">
        {/* Edge to edge at every size — no contained band, no blurred backing,
            nothing that draws a box across the hero.

            Cover at every size. In portrait the section is already the clip's
            exact shape, so there is nothing left for it to crop — cover is
            used rather than contain purely so that any sub-pixel rounding
            spills over the edge instead of leaving a hairline of background
            along one side. */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          src={VIDEO_SRC}
          className="relative z-10 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-x-0 top-0 z-20 h-40 bg-linear-to-b from-ink/60 to-transparent" />
        {/* Shallow in portrait: at the full height it washed the bottom of the
            picture out to white, since the frame now ends much closer to the
            section's edge. Landscape is unchanged. */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-14 bg-linear-to-b from-transparent via-canvas/60 to-canvas landscape:h-32 lg:landscape:h-36" />
      </div>
      {/* Vertical padding only in landscape. In portrait the section's height
          is the clip's shape and nothing else may push against it — 272px of
          padding here would have forced the section taller than the picture
          and put the cropping straight back. */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center md:px-6 lg:px-8 landscape:pt-32 landscape:pb-36 lg:landscape:pb-40">
        <AnimatePresence mode="wait">
          <motion.div key={index} variants={copy} initial="hidden" animate="show" exit="out">
            <h1 className="font-header text-[2.75rem] font-extrabold leading-[1.04] tracking-tight drop-shadow-sm sm:text-6xl lg:text-[4.5rem]">
              <span className="block overflow-hidden pb-2">
                <motion.span variants={line} className="block">
                </motion.span>
              </span>
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

    
      <div data-hero-item className="absolute inset-x-0 bottom-0 z-10 pb-2">
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div ref={marquee} className="flex w-max">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex shrink-0 items-center py-4"
              >
                {PHRASES.map((phrase) => (
                  <div key={phrase} className="flex shrink-0 items-center whitespace-nowrap">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-soft md:text-sm">
                      {phrase}
                    </span>
                    <span aria-hidden className="px-6 text-brand md:px-8">
                      ✳
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
