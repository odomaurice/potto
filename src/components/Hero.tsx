"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";


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
      data-nav-tone="dark"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden text-white"
    >
      <div aria-hidden className="absolute  inset-0 -z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          src={VIDEO_SRC}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent via-canvas/60 to-canvas md:h-36" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-36 pt-32 text-center md:px-6 lg:px-8 lg:pb-40">
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
