"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BubbleChatIcon,
  DashboardSpeed01Icon,
  ShieldUserIcon,
} from "@hugeicons/core-free-icons";

const FEATURES = [
  {
    icon: ShieldUserIcon,
    title: "Safeguard Students",
    body: "Utilising Potto's guardian verification system, digital visitor management, comprehensive student tracking on school entry and exit, and electronic manifest for bus monitoring, you can effortlessly keep tabs on each student from the convenience of your location, no matter when or where.",
    tint: "bg-brand/10 text-brand",
  },
  {
    icon: DashboardSpeed01Icon,
    title: "Streamline Operations",
    body: "Streamline your school dismissal procedures, centralize attendance tracking, and establish a unified, real-time, hassle-free system to monitor and report late arrivals, early dismissals, bus alterations, playdates, and other aspects. This efficient approach is sure to earn the appreciation of both your parents and staff.",
    tint: "bg-brand-yellow/15 text-brand-yellow-dark",
  },
  {
    icon: BubbleChatIcon,
    title: "Simplify Communication",
    body: "Improve administrative workload by 15% by enabling parents to inform the school about their child's arrival for pickup, request dismissal changes, and receive notifications regarding tardiness and child truancy through the Potto App and SMS.",
    tint: "bg-brand/10 text-brand",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative py-24 text-ink md:py-32"
    >
    
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-soft">
            Features
          </span>
          <h2 className="mt-4 font-header text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Amazing benefits for{" "}
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.08em] bottom-[0.07em] h-[0.36em] rounded-[3px] bg-highlight/70"
              />
              <span className="relative">everyone</span>
            </span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-soft">
            Potto is a security management solution designed to ensure the safety
            of students against varying security threats — from early detection
            to quick response, using leading-edge technologies.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-10 lg:gap-14">
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <span
                className={` grid mx-auto h-20 w-20 place-items-center rounded-full ${feature.tint}`}
              >
                <HugeiconsIcon icon={feature.icon} size={34} strokeWidth={1.8} />
              </span>

              <h3 className="mt-8 font-header text-2xl font-extrabold tracking-tight sm:text-start">
                {feature.title}
              </h3>
              <p className="mt-5 text-[0.975rem] leading-9 text-soft sm:text-start">
                {feature.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
