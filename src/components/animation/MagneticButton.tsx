import { useRef, type ReactNode, type MouseEvent } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "div" | "a";
  onClick?: () => void;
};

/**
 * Cursor-magnetized wrapper using react-spring physics.
 * Premium hover micro-interaction for primary CTAs.
 */
export function MagneticButton({ children, className, strength = 0.35, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { mass: 1, tension: 200, friction: 18 },
  }));

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    api.start({ x: dx, y: dy, scale: 1.04 });
  };
  const handleLeave = () => api.start({ x: 0, y: 0, scale: 1 });

  return (
    <animated.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x, y, scale, display: "inline-block" }}
      className={className}
    >
      {children}
    </animated.div>
  );
}
