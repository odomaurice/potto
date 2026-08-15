"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon, ArrowRight01Icon, PlayIcon } from "@hugeicons/core-free-icons";

// Every href must correspond to a section id actually rendered on the homepage.
// The previous list pointed at #how-it-works, #pricing and #faq, none of which
// exist — those links did nothing. Add entries back here as their sections land.
const navItems = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Potto Suite", href: "#suite" },
  { label: "Testimonials", href: "#testimonials" },
];

/**
 * Vertical position the header samples to decide what is behind it — roughly
 * its own middle, so the swap lands as a section's edge passes under the bar.
 */
const PROBE_Y = 48;

/** What the header falls back to over any section that doesn't declare itself. */
const DEFAULT_NAV = { tone: "light" as const, bg: "var(--canvas)" };

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  // The section currently under the header. `tone` drives the contents (white
  // vs ink); `bg` is painted behind them so scrolling copy passes *under* the
  // bar instead of tangling with the nav links. Starts dark + transparent
  // because the hero is — otherwise the first paint flashes a light bar over
  // the video.
  const [nav, setNav] = useState<{ tone: "light" | "dark"; bg: string }>({
    tone: "dark",
    bg: "transparent",
  });
  const onDark = nav.tone === "dark";

  // Sections opt in by declaring `data-nav-tone`, and optionally `data-nav-bg`
  // with the colour the header should take on over them — any CSS colour, so a
  // future section can hand over `var(--color-brand-gold)` and the bar matches
  // it exactly. Omitting `data-nav-bg` leaves the bar transparent, which is what
  // the hero wants so its footage runs clean to the top of the viewport.
  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-tone]");
      let next = DEFAULT_NAV as { tone: "light" | "dark"; bg: string };

      sections.forEach((section) => {
        const r = section.getBoundingClientRect();
        if (r.top <= PROBE_Y && r.bottom > PROBE_Y) {
          next = {
            tone: section.dataset.navTone === "dark" ? "dark" : "light",
            bg: section.dataset.navBg ?? "transparent",
          };
        }
      });

      setNav(next);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Full-bleed, and the fill is a gradient of the section's own colour
          fading to nothing rather than a solid bar. A solid bar would cut a hard
          rectangle out of the page's continuous backdrop; this way copy passing
          underneath dissolves instead of colliding with the nav, and there is no
          edge anywhere. */}
      <header
        style={{
          backgroundImage: `linear-gradient(to bottom, ${nav.bg} 55%, transparent)`,
        }}
        className="fixed inset-x-0 top-0 z-50 transition-[background-image] duration-300"
      >
        {/* Contents run to the edges, so the logo and CTAs clear the centred
            column of every section below and never collide with its text. */}
        <div className="flex h-18 w-full items-center justify-between px-5 md:px-8 lg:px-12">
          <Link href="/" className="flex items-center">
            {/* The asset is white artwork on transparent; `brightness-0` maps it
                to solid black over light sections without a second file. */}
            <Image
              src="/potto_logo.svg"
              alt="Potto"
              width={148}
              height={55}
              priority
              className={`h-7 w-auto transition duration-300 ${onDark ? "" : "brightness-0"}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                  onDark
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-soft hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Glow is a coloured box-shadow keyed to each button's own fill, so
                it reads as light coming off the button rather than a drop
                shadow. It lifts on hover instead of switching on. */}
            <Link
              href="/register"
              className="hidden animate-glow items-center gap-1.5 rounded-full bg-brand-teal px-5 py-3 text-sm font-semibold text-ink [--glow:var(--color-brand-teal)] transition duration-300 hover:bg-brand-yellow-light hover:[--glow:var(--color-brand-yellow-light)] sm:inline-flex lg:px-8 lg:py-4"
            >
              Get started
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
            </Link>
            <Link
              href="#intro-video"
              className="hidden animate-glow items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-ink [--glow:var(--color-brand-yellow)] transition duration-300 hover:bg-brand-teal hover:[--glow:var(--color-brand-teal)] sm:inline-flex lg:px-8 lg:py-4 lg:text-base"
            >
              <HugeiconsIcon icon={PlayIcon} size={18} strokeWidth={2} />
              Watch demo
            </Link>

            {/* Hamburger — always available on mobile, logged in or out */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
                onDark
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-line bg-surface text-ink hover:bg-surface-2"
              }`}
            >
              <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={19} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — matches the dark bar above it */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-19 z-40 rounded-2xl border border-white/10 bg-ink/95 p-3 shadow-lg backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid gap-2 border-t border-white/10 pt-3">
                {/* <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Log in
                </Link> */}
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-brand-teal px-4 py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-brand-yellow-light"
                >
                  Get started
                </Link>
                <Link
                  href="#intro-video"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-brand-yellow px-4 py-2.5 text-center text-sm font-semibold text-ink transition hover:bg-brand-teal"
                >
                  Demo Video
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
