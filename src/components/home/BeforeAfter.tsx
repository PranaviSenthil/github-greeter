import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      update(x);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, update]);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              The Transformation
            </p>
            <h2 className="font-display text-4xl tracking-tight text-warm-white md:text-6xl">
              Before. <span className="font-serif italic text-gold-gradient">After.</span>
            </h2>
          </div>
          <p className="max-w-md text-warm-white/65">
            Drag to reveal how restraint, light and material can transform a space from forgotten to
            unforgettable.
          </p>
        </div>

        <div
          ref={ref}
          className="relative aspect-[16/10] w-full cursor-ew-resize overflow-hidden rounded-2xl border border-warm-white/10 select-none"
          onMouseDown={(e) => {
            setDragging(true);
            update(e.clientX);
          }}
          onTouchStart={(e) => {
            setDragging(true);
            update(e.touches[0].clientX);
          }}
        >
          {/* AFTER (full) */}
          <img
            src={afterImg}
            alt="After: luxury redesigned interior"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            loading="lazy"
          />
          <span className="absolute right-5 top-5 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
            After
          </span>

          {/* BEFORE clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={beforeImg}
              alt="Before: original interior"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="lazy"
            />
            <span className="absolute left-5 top-5 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-warm-white/80 backdrop-blur">
              Before
            </span>
          </div>

          {/* divider + handle */}
          <div
            className="absolute inset-y-0 z-10 flex items-center"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-full w-px bg-gold/80 shadow-[0_0_30px_oklch(0.78_0.13_85/0.6)]" />
            <button
              type="button"
              aria-label="Drag to compare"
              onMouseDown={(e) => {
                e.stopPropagation();
                setDragging(true);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setDragging(true);
              }}
              className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/60 bg-charcoal/80 text-gold backdrop-blur-md transition-transform hover:scale-110"
            >
              <MoveHorizontal className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
