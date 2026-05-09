import { useCallback, useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export function Compare({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
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
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
      <span className="absolute right-5 top-5 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
        After
      </span>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="Before" className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
        <span className="absolute left-5 top-5 rounded-full bg-charcoal/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-warm-white/80 backdrop-blur">
          Before
        </span>
      </div>
      <div className="absolute inset-y-0 z-10 flex items-center" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
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
  );
}
