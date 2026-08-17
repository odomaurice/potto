import ContourPattern from "./ContourPattern";

export default function PageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-canvas">
    
      <ContourPattern className="text-water-mark" />
    </div>
  );
}
