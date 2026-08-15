"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

// Sections in page order. `id: null` = the top of the page (hero, which has no id).
// Each id must match an anchor rendered on the homepage.
type Section = { id: string | null; label: string };

// Must mirror the sections actually rendered in page.tsx, in page order — a dot
// pointing at a missing id silently does nothing when clicked, and skews the
// active-section maths because its offset resolves to Infinity.
const SECTIONS: Section[] = [
  { id: null, label: "Top" },
  { id: "intro-video", label: "Potto in action" },
  { id: "features", label: "Features" },
  { id: "problem", label: "The problem" },
  { id: "suite", label: "Potto Suite" },
  { id: "solutions", label: "Solutions" },
  { id: "testimonials", label: "Testimonials" },
];

const LAST = SECTIONS.length - 1;

/**
 * Homepage scroll aid: a section indicator down the left edge (click a dot to
 * jump; the active section is highlighted) and up/down arrows on the right that
 * step to the previous/next section. Both read one shared active index derived
 * from scroll position. Desktop only — hidden on smaller screens.
 */
export default function HomeScrollNav() {
  const [active, setActive] = useState(0);

  // Absolute document offset of a section's top (0 for the hero/top entry).
  const topOf = (s: Section) => {
    if (!s.id) return 0;
    const el = document.getElementById(s.id);
    return el ? el.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;
  };

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      // A probe line ~30% down the viewport decides the "current" section.
      const probe = window.scrollY + window.innerHeight * 0.3;
      let idx = 0;
      for (let i = 0; i < SECTIONS.length; i += 1) {
        if (probe >= topOf(SECTIONS[i])) idx = i;
      }
      // Snap to the last section when scrolled to the very bottom (short final
      // sections might never cross the probe line otherwise).
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        idx = LAST;
      }
      setActive(idx);
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

  const goTo = useCallback((i: number) => {
    const target = SECTIONS[Math.max(0, Math.min(LAST, i))];
    if (!target.id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // scroll-margin-top (set globally on [id] elements) keeps the fixed header
    // from covering the section top.
    document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Left — section indicator */}
      <nav
        aria-label="Section navigation"
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col items-center gap-3">
          {SECTIONS.map((s, i) => {
            const isActive = active === i;
            return (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${s.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex cursor-pointer items-center py-1"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive ? "h-6 w-1.5 bg-brand" : "h-1.5 w-1.5 bg-line group-hover:bg-soft"
                    }`}
                  />
                  {/* Label on hover */}
                  <span className="pointer-events-none absolute left-6 whitespace-nowrap rounded-md border border-line bg-surface px-2 py-1 text-xs font-medium text-ink opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right — scroll up / down */}
      {/* <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Scroll to previous section"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === LAST}
          aria-label="Scroll to next section"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div> */}
    </>
  );
}
