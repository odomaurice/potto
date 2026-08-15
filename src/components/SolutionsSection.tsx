"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlarmClockIcon,
  AmbulanceIcon,
  Bus01Icon,
  IdentityCardIcon,
  Message01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";

/**
 * Potto Solutions.
 *
 * The reference shows six teal cards. Six cards would be six frames, so the
 * teal is promoted to the section itself — one continuous surface the items sit
 * on, rather than a panel drawn around each one. The Potto mark from the
 * reference becomes a watermark tiled across the whole surface.
 *
 * The band meets the page on clean edges: no gradient hand-off, which only
 * produced a washed-out strip where the teal met the white.
 */

const BRAND_MARK = "/Potto-logo-only_iebxw7.webp";

const SOLUTIONS = [
  {
    icon: Bus01Icon,
    title: "Mobility Management",
    body: "Provide parents with real-time information on school bus activities, student arrivals, and dismissal processes, geared towards student safety through SMS and push notifications.",
  },
  {
    icon: UserCheck01Icon,
    title: "Guardian and Visitor Validation",
    body: "Authenticates the identities of guardians responsible for dropping off and picking up a child, and enhances appointment scheduling for proper visitor management.",
  },
  {
    icon: AmbulanceIcon,
    title: "Emergency Management",
    body: "Instantly alerts various emergency responders such as parents, the police, fire department, and healthcare facilities, in the event of a school emergency.",
  },
  {
    icon: AlarmClockIcon,
    title: "Truancy Control",
    body: "Monitors the attendance of students and staff according to their timetables, keeping a record of their presence or absence in each subject/class, and assessing their overall punctuality to school.",
  },
  {
    icon: IdentityCardIcon,
    title: "Smart ID Cards",
    body: "Create Radio Frequency Identification (RFID) cards and Quick Response (QR) codes instantly for every enrolled student and staff.",
  },
  {
    icon: Message01Icon,
    title: "Communication Management",
    body: "Offers a hybrid system of communication that allows schools to utilize a blend of bulk and individual short message service (SMS), push notifications, and in-app messaging to ensure effective communication with all stakeholders.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function SolutionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="solutions"
      data-nav-tone="dark"
      data-nav-bg="var(--color-brand-teal-dark)"
      className="relative isolate py-28 text-white md:py-36"
    >
      {/* Ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-brand-teal-dark"
      >
        {/* The mark from the reference, tiled across the whole surface instead
            of one per card. `brightness-0 invert` repaints it white while
            keeping its alpha — the asset is teal, and a teal mark on a teal
            ground is invisible at any opacity. */}
        <div className="absolute inset-0 bg-[url('/Potto-logo-only_iebxw7.webp')] bg-size-[340px_340px] bg-repeat opacity-[0.13] brightness-0 invert" />
      </div>

      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            {...reveal(0)}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60"
          >
            Potto Solutions
          </motion.span>

          <motion.h2
            {...reveal(0.12)}
            className="mt-4 font-header text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            One platform that handles your students’ safety challenges
          </motion.h2>

          <motion.p
            {...reveal(0.24)}
            className="mt-5 text-lg leading-8 text-white/70"
          >
            A technological ecosystem to efficiently keep your students secured.
          </motion.p>
        </div>

        {/* Frameless: no panel per item, just the icon disc, the title and the
            copy, held apart by the gutters. */}
        <div className="mt-20 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
          {SOLUTIONS.map((solution, i) => (
            <motion.article
              key={solution.title}
              // Staggered across the grid, one after the next.
              {...reveal(0.36 + i * 0.1)}
              className="text-center"
            >
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 text-white">
                <HugeiconsIcon
                  icon={solution.icon}
                  size={34}
                  strokeWidth={1.7}
                />
              </span>

              <h3 className="mt-7 font-header text-2xl font-extrabold leading-snug tracking-tight">
                {solution.title}
              </h3>

              {/* Loose leading, matching the reference — long copy with no card
                  chrome needs air to stay readable. */}
              <p className="mt-4 text-[0.95rem] leading-9 text-white/70">
                {solution.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
