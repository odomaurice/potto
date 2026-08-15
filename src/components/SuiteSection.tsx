"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Certificate01Icon,
  CreditCardIcon,
  DatabaseIcon,
  Message02Icon,
  ShoppingCart01Icon,
  Wallet02Icon,
} from "@hugeicons/core-free-icons";

/** The Potto mark on its own — 256×256, teal on a real alpha channel. */
const BRAND_MARK = "/Potto-logo-only_iebxw7.webp";

/**
 * Potto Suite — the key product, then the auxiliary services.
 *
 * Built as live text rather than the exported card images from the old site:
 * those bake in the white panels the brief rules out, and an image of a card
 * cannot reflow on a phone. Everything here is frameless — the products are
 * separated by whitespace and a tinted icon disc, nothing is boxed.
 */

const KEY_PRODUCT = {
  name: "Potto Secure",
  tagline: "Student Safety Management",
  functions: [
    "Monitor, track, and alerts parents and school on student movement",
    "Send panic alerts to all parents in case of any distress",
    "Eliminates impersonation or child theft through proper guardian validation",
    "Quick response to threats in cases of emergency",
  ],
  features: [
    "Gate Pass",
    "Students Tracking",
    "Bus attendance",
    "Classroom attendance",
    "Dynamic attendance",
    "Visitor management",
    "Android and iOS",
    "Instant messaging",
    "Panic alert System",
    "Panic responders",
  ],
};

const AUXILIARY = [
  {
    icon: Certificate01Icon,
    name: "Potto Assess",
    tagline: "Result Management System",
    points: [
      "Instant result processing and generation",
      "Teacher privilege setting to avoid buddy inputting",
      "Online access by student to check results",
      "Friendly mobile app for easy access to child's records",
    ],
  },
  {
    icon: CreditCardIcon,
    name: "Potto Pay",
    tagline: "Electronic Payment and Fee Collection System",
    points: [
      "Collection of all type of fees for school",
      "Payment history generation and financial status report",
      "Creation of different type of fees and automatic receipt generation",
    ],
  },
  {
    icon: Wallet02Icon,
    name: "Potto Pocket",
    tagline: "Students Pocket Money Management",
    points: [
      "Seamless payment of fees",
      "Student budget allocation",
      "Expenses tracking of child's spending",
      "Easy and cashless purchases in school",
    ],
  },
  {
    icon: ShoppingCart01Icon,
    name: "Potto Store",
    tagline: "Mini Ecommerce System",
    points: [
      "Sales of admission forms and other school materials",
      "Proper inventory management",
      "Seamless account reconciliation",
    ],
  },
  {
    icon: DatabaseIcon,
    name: "Potto Admin",
    tagline: "School Database Management System",
    points: [
      "Student and Staff Data processing",
      "Communication Management using SMS and Emails",
      "Dynamic School Configuration",
      "Full customization to suit your look and feel",
    ],
  },
  {
    icon: Message02Icon,
    name: "Potto Comm",
    tagline: "Bulk Messaging System",
    points: [
      "Sends, tracks in real-time, and stores predefined and customized bulk SMS to parents and teachers at just a click of the button",
    ],
  },
];

const BLURB =
  "Potto brings to you a lot of awesome solutions which quickly optimize the productivity of teachers and students in your school.";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SuiteSection() {
  // One observer per block, so each half animates when it is reached rather
  // than the whole section firing off the first thing to appear.
  const keyRef = useRef<HTMLDivElement>(null);
  const auxRef = useRef<HTMLDivElement>(null);
  const keyInView = useInView(keyRef, { once: true, amount: 0.15 });
  const auxInView = useInView(auxRef, { once: true, amount: 0.1 });

  const reveal = (visible: boolean, delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.65, delay, ease },
  });

  return (
    <section
      id="suite"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        {/* ---------- Key product ---------- */}
        <div ref={keyRef}>
          <motion.span
            {...reveal(keyInView, 0)}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-soft"
          >
            Potto Suite
          </motion.span>

          <motion.h2
            {...reveal(keyInView, 0.12)}
            className="mt-4 font-header text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl"
          >
            Potto{" "}
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.08em] bottom-[0.07em] h-[0.36em] rounded-[3px] bg-highlight/70"
              />
              <span className="relative">Key Product</span>
            </span>
          </motion.h2>

          <motion.p
            {...reveal(keyInView, 0.24)}
            className="mt-5 max-w-2xl text-lg leading-8 text-soft"
          >
            {BLURB}
          </motion.p>

          <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* Identity */}
            <motion.div {...reveal(keyInView, 0.36)}>
              {/* The brand mark itself rather than a generic shield glyph. It
                  carries alpha, so the tinted disc shows through behind it. */}
              <span className="grid h-24 w-24 place-items-center rounded-full bg-brand/10">
                <Image
                  src={BRAND_MARK}
                  alt=""
                  width={256}
                  height={256}
                  className="h-12 w-12 object-contain"
                />
              </span>
              <h3 className="mt-8 font-header text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
                {KEY_PRODUCT.name}
              </h3>
              <p className="mt-3 text-lg font-medium text-brand-yellow-dark">
                {KEY_PRODUCT.tagline}
              </p>
            </motion.div>

            {/* Key function + features */}
            <div>
              <motion.h4
                {...reveal(keyInView, 0.44)}
                className="font-header text-2xl font-extrabold tracking-tight"
              >
                Key Function
              </motion.h4>

              <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {KEY_PRODUCT.functions.map((fn, i) => (
                  <motion.li
                    key={fn}
                    {...reveal(keyInView, 0.52 + i * 0.1)}
                    className="flex gap-3 text-base leading-7 text-soft"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {fn}
                  </motion.li>
                ))}
              </ul>

              <motion.h4
                {...reveal(keyInView, 0.9)}
                className="mt-12 font-header text-2xl font-extrabold tracking-tight"
              >
                Features
              </motion.h4>

              {/* Chips, not panels — they wrap freely and carry no border. */}
              <motion.ul
                {...reveal(keyInView, 0.98)}
                className="mt-6 flex flex-wrap gap-2.5"
              >
                {KEY_PRODUCT.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-full bg-brand/8 px-4 py-2 text-sm font-medium text-brand"
                  >
                    {feature}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>

        {/* ---------- Auxiliary services ---------- */}
        <div ref={auxRef} className="mt-28 md:mt-36">
          <motion.h2
            {...reveal(auxInView, 0)}
            className="font-header text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl"
          >
            Potto Auxiliary{" "}
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.08em] bottom-[0.07em] h-[0.36em] rounded-[3px] bg-highlight/70"
              />
              <span className="relative">Services</span>
            </span>
          </motion.h2>

          <motion.p
            {...reveal(auxInView, 0.12)}
            className="mt-5 max-w-2xl text-lg leading-8 text-soft"
          >
            {BLURB}
          </motion.p>

          <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {AUXILIARY.map((product, i) => (
              <motion.article
                key={product.name}
                // Staggered one after another across the grid.
                {...reveal(auxInView, 0.24 + i * 0.1)}
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
                  <HugeiconsIcon
                    icon={product.icon}
                    size={30}
                    strokeWidth={1.6}
                  />
                </span>

                <h3 className="mt-6 font-header text-2xl font-extrabold tracking-tight text-brand">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-brand-yellow-dark">
                  {product.tagline}
                </p>

                <ul className="mt-5 space-y-3">
                  {product.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.95rem] leading-7 text-soft"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
