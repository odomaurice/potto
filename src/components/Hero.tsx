"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, PlayIcon } from "@hugeicons/core-free-icons";

const VIDEO_SRC = "/videos/intro.MOV";
const POSTER = "/slides/slide5.jpg";

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

// Phrase strip along the bottom. Wording, not metrics — the numbers belong
// further down the page where they can be substantiated.
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

    // The video always renders with `autoPlay` so server and client markup match;
    // reduced motion parks it on the poster frame here instead.
    if (reduced) videoRef.current?.pause();
    if (reduced) return;

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
      // Tells HomeHeader to paint itself white while this section is behind it.
      data-nav-tone="dark"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden text-white"
    >
      {/* ---------- Footage ---------- */}
      <div aria-hidden className="absolute  inset-0 -z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          // Bare `src`, no <source type>. Browsers discard sources whose declared
          // MIME they report they cannot play, and Chrome says exactly that about
          // "video/quicktime" — a typed source means the file is never fetched.
          // With no type it sniffs the bytes (H.264/AAC) and plays it.
          src={VIDEO_SRC}
          className="h-full w-full object-cover"
        />

        {/* Scrims are edge-only. The full-bleed `bg-ink/40` wash that used to sit
            here existed to hold centred white copy; with the footage carrying its
            own titles it only greyed the picture out, so it is gone. */}

        {/* Top: just enough to keep the header's white logo and links legible. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/60 to-transparent" />

        {/* Bottom: a short hand-off to the page so there is no seam, and so the
            phrase strip has something light to sit on. Kept shallow — the taller
            version washed halfway up the frame. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent via-canvas/60 to-canvas md:h-36" />
      </div>

      {/* Matches the shared section padding; the inner max-w-4xl is a reading
          measure for centred copy, not a different container width. */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-36 pt-32 text-center md:px-6 lg:px-8 lg:pb-40">
        <AnimatePresence mode="wait">
          <motion.div key={index} variants={copy} initial="hidden" animate="show" exit="out">
            <h1 className="font-header text-[2.75rem] font-extrabold leading-[1.04] tracking-tight drop-shadow-sm sm:text-6xl lg:text-[4.5rem]">
              {/* Each line clips its own text so the reveal has something to
                  slide out of. */}
              {/* <span className="block overflow-hidden pb-1">
                <motion.span variants={line} className="block">
                  {message.lead}
                </motion.span>
              </span> */}
              <span className="block overflow-hidden pb-2">
                <motion.span variants={line} className="block">
                  {/* Ink on the yellow swash, not white: white on #FACC15 is
                      about 1:1 and would vanish. */}
                  {/* <span className="relative inline-block text-ink">
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.55, ease: "easeInOut" }}
                      className="absolute inset-x-[-0.08em] bottom-[0.07em] h-[0.36em] origin-left rounded-[3px] bg-highlight"
                    />
                    <span className="relative">{message.accent}</span>
                  </span> */}
                </motion.span>
              </span>
            </h1>

            {/* Fixed floor so the buttons don't shuffle as body copy changes
                length between messages. */}
            {/* <motion.p
              variants={fade}
              className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl lg:min-h-24"
            >
              {message.body}
            </motion.p> */}
          </motion.div>
        </AnimatePresence>

        {/* <div
          data-hero-item
          className="relative -bottom-64 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/register"
            className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-16 py-3.5 text-base font-semibold text-brand-fg shadow-lg transition hover:bg-brand-teal sm:w-auto"
          >
            Start free trial
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={18}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="#intro-video"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-16 py-4.5 text-base font-semibold text-ink shadow-lg transition hover:bg-brand-yellow-light sm:w-auto"
          >
            <HugeiconsIcon icon={PlayIcon} size={18} strokeWidth={2} />
            Watch demo
          </Link>
        </div> */}

        {/* Manual control over the rotation — without it the copy changes with
            no way to hold or revisit a message. */}
        {/* <div data-hero-item className="mt-10 flex items-center justify-center gap-2">
          {MESSAGES.map((m, i) => (
            <button
              key={m.accent}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show message ${i + 1}: ${m.lead} ${m.accent}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-highlight" : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div> */}
      </div>

      {/* ---------- Phrase strip ----------
          No band, no border, no fill. It rides in the zone where the footage has
          already faded to canvas, so it reads as the first line of the page
          rather than a bar closing off the hero — hence ink text, not white. */}
      <div data-hero-item className="absolute inset-x-0 bottom-0 z-10 pb-2">
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div ref={marquee} className="flex w-max">
            {/* Two identical rows; the second is decorative filler for the loop. */}
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
