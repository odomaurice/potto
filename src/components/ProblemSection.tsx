"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CalendarRemove01Icon,
  UserRemove01Icon,
  WorkoutRunIcon,
} from "@hugeicons/core-free-icons";

/**
 * Problem statement. Sits on the shared white backdrop like every other
 * section — no ground of its own, so the page stays one picture. The panels
 * carry no borders; they are faint tonal lifts off the white, which groups the
 * copy without framing it.
 */

// Placeholder — swap for the real portrait. Any portrait-orientation image works.
const PROBLEM_IMAGE = "/slides/slide4.jpg";

const PROBLEMS = [
  {
    icon: UserRemove01Icon,
    title: "Child Theft",
    body: "57% of missing persons in Nigeria are children according to the 2020 report by ICRC.",
  },
  {
    icon: CalendarRemove01Icon,
    title: "Student Truancy",
    body: "A student's likelihood of passing a standard exam drops to 35% if he/she misses between 19 to 38 days of school within a year.",
  },
  {
    icon: WorkoutRunIcon,
    title: "Exhausting Dismissals",
    body: "About 65 minutes or more is expended during students' pickup and it is characterized by stress, anxiety, and a state of chaos which could make the children vulnerable.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProblemSection() {
  // One observer drives the whole block, so the panels arrive in a fixed order
  // rather than each negotiating its own viewport trigger.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="problem"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
      {/* No background of its own — the page backdrop runs straight through. */}
      <div ref={ref} className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.span
          {...reveal(0)}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-soft"
        >
          Problem Statement
        </motion.span>

        <motion.h2
          {...reveal(0.12)}
          className="mt-5 max-w-4xl font-header text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl"
        >
          Over 80% of parents express concerns regarding the safety and academic
          performance of their child.
        </motion.h2>

        <motion.p
          {...reveal(0.24)}
          className="mt-6 max-w-3xl text-lg leading-8 text-soft"
        >
          Many administrators have failed to lay a foundation of safety for their
          schools which has resulted to:
        </motion.p>

        {/* Wider gaps now that nothing is boxed — whitespace is what separates
            the columns, so it has to do the work the panels were doing. */}
        <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {PROBLEMS.map((problem, i) => (
            <motion.article
              key={problem.title}
              // 0.40s, 0.55s, 0.70s — one after another, left to right.
              {...reveal(0.4 + i * 0.15)}
              // No panel, no padding, no fill — the columns are held apart by
              // the grid gap alone. Frameless, like every other section.
              className=""
            >
              <HugeiconsIcon
                icon={problem.icon}
                size={40}
                strokeWidth={1.6}
                className="text-brand"
              />

              <h3 className="mt-10 font-header text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                {i + 1}. {problem.title}
              </h3>

              {/* Loose leading, matching the reference — long copy with no card
                  chrome needs air to stay readable. */}
              <p className="mt-5 text-[0.95rem] leading-9 text-soft">
                {problem.body}
              </p>
            </motion.article>
          ))}

          {/* Frameless portrait: no rounding, no fill behind it, and a radial
              mask that feathers all four edges so the photo dissolves into the
              page instead of sitting on it as a rectangle. */}
          <motion.div {...reveal(0.85)} className="relative">
            <Image
              src={PROBLEM_IMAGE}
              alt="A parent worrying about their child's safety at school"
              width={900}
              height={1200}
              sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 92vw"
              className="relative aspect-4/5 w-full object-cover mask-[radial-gradient(ellipse_78%_78%_at_50%_50%,black_45%,transparent_100%)] lg:aspect-3/4"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
