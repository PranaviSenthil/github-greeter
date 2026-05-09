import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/95 backdrop-blur-xl"
      style={{ animation: "fadeUp .35s ease-out both" }}
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-6 top-6 grid size-12 place-items-center rounded-full border border-warm-white/15 text-warm-white transition-colors hover:border-gold hover:text-gold"
        aria-label="Close"
      >
        <X className="size-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-warm-white/15 text-warm-white transition-colors hover:border-gold hover:text-gold md:left-8"
        aria-label="Previous"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-warm-white/15 text-warm-white transition-colors hover:border-gold hover:text-gold md:right-8"
        aria-label="Next"
      >
        <ChevronRight className="size-5" />
      </button>
      <img
        src={images[index]}
        alt=""
        className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-warm-white/60">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
