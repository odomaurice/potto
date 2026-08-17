"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  BedSingle01Icon,
  CalendarRemove01Icon,
  NotificationOff01Icon,
  UserQuestion01Icon,
  UserRemove01Icon,
  WorkoutRunIcon,
} from "@hugeicons/core-free-icons";


const PROBLEM_IMAGE = "/problem-parent.webp";
const STUDENT_IMAGE = "/problem-student.webp";

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

const BOARDING_PROBLEMS = [
  {
    icon: UserQuestion01Icon,
    title: "Unverified Exeat",
    body: "Boarders get signed out by whoever arrives with the right name. Without a verified guardian record, a school cannot prove the person at the gate is the person the parent actually approved.",
  },
  {
    icon: BedSingle01Icon,
    title: "Hostel Roll Call",
    body: "Hostel registers are taken once a night and filed away in a book. The next morning, nobody can answer a simple question: where was my child at 9pm?",
  },
  {
    icon: Alert02Icon,
    title: "Emergencies After Hours",
    body: "A student falls ill at midnight and their parents are three states away. Every minute spent hunting for the right phone number in a paper file is a minute lost.",
  },
  {
    icon: NotificationOff01Icon,
    title: "Weeks of Silence",
    body: "Between visiting days, most boarding parents hear nothing at all. News of a problem reaches them long after it started, and always second-hand.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ProblemMark({
  number,
  icon,
}: {
  number: number;
  icon: typeof UserRemove01Icon;
}) {
  return (
    <div className="relative flex h-20 items-end sm:h-24">
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 select-none font-header text-[4.5rem] leading-none font-extrabold tracking-tight text-brand/15 sm:text-[5.5rem]"
      >
        {String(number).padStart(2, "0")}
      </span>

      <HugeiconsIcon
        icon={icon}
        size={40}
        strokeWidth={1.6}
        className="relative ml-1 text-brand"
      />
    </div>
  );
}

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const boardingRef = useRef<HTMLDivElement>(null);
  const boardingInView = useInView(boardingRef, { once: true, amount: 0.15 });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  const revealBoarding = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: boardingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="problem"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
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
        <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:gap-x-12 xl:grid-cols-4">
          {PROBLEMS.map((problem, i) => (
            <motion.article
              key={problem.title}
              {...reveal(0.4 + i * 0.15)}
            >
              <ProblemMark number={i + 1} icon={problem.icon} />

              <h3 className="mt-8 font-header text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                {problem.title}
              </h3>
              <p className="mt-5 text-[0.95rem] leading-9 text-soft">
                {problem.body}
              </p>
            </motion.article>
          ))}

          <motion.div {...reveal(0.85)} className="relative">
            <Image
              src={PROBLEM_IMAGE}
              alt="A parent worrying about their child safety at school"
              loading="lazy"
              width={800}
              height={920}
              sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 92vw"
              className="relative aspect-4/5 w-full object-cover mask-[radial-gradient(ellipse_78%_78%_at_50%_50%,black_45%,transparent_100%)] lg:aspect-3/4"
            />
          </motion.div>
        </div>
        <div ref={boardingRef} className="mt-24 md:mt-32">
          <motion.h3
            {...revealBoarding(0)}
            className="max-w-4xl font-header text-2xl font-extrabold leading-[1.2] tracking-tight sm:text-3xl lg:text-4xl"
          >
            And for boarders, the school day never ends.
          </motion.h3>

          <motion.p
            {...revealBoarding(0.12)}
            className="mt-5 max-w-3xl text-lg leading-8 text-soft"
          >
            Boarding parents hand over twenty-four hours a day, not six. The
            weeks between visiting days are where their worry lives:
          </motion.p>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_17rem] lg:gap-16 xl:grid-cols-[1fr_19rem]">
            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:gap-x-12">
              {BOARDING_PROBLEMS.map((problem, i) => (
                <motion.article
                  key={problem.title}
                  {...revealBoarding(0.28 + i * 0.13)}
                >
                  <ProblemMark
                    number={PROBLEMS.length + i + 1}
                    icon={problem.icon}
                  />

                  <h3 className="mt-8 font-header text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                    {problem.title}
                  </h3>

                  <p className="mt-5 text-[0.95rem] leading-9 text-soft">
                    {problem.body}
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              {...revealBoarding(0.8)}
              className="flex items-end justify-center lg:justify-end"
            >
              <Image
                src={STUDENT_IMAGE}
                alt="A secondary school student in uniform heading to class"
                loading="lazy"
                width={760}
                height={1490}
                sizes="(min-width: 1280px) 19rem, (min-width: 1024px) 17rem, 15rem"
                className="h-auto w-full max-w-60 lg:max-w-none"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
