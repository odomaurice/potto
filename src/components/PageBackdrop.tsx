import ContourPattern from "./ContourPattern";

/**
 * One backdrop for the whole homepage.
 *
 * The brief is that the page should read as a single picture from header to
 * footer, so the contour field and colour washes live here — once, at page
 * level — instead of each section carrying its own copy. Sections render
 * transparent on top of it, which is what stops them looking like stacked
 * panels.
 *
 * It is `fixed` rather than `absolute`: a viewBox stretched over a page several
 * thousand pixels tall smears the curves into vertical streaks, whereas pinning
 * it to the viewport keeps the drawing in proportion at every scroll position
 * and lets the content drift across it.
 */
export default function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-canvas">
      {/* Plain white plus the contour lines, nothing else. The brand colour
          washes that used to sit here tinted the page off-white; the reference
          artwork is white with grey linework, so they are gone. */}
      <ContourPattern className="text-ink/[0.07]" />
    </div>
  );
}
