import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Wrap any element to translate it on the Y axis as the user scrolls past it.
 * `range` controls travel distance in px (negative moves up faster than scroll).
 */
export function ParallaxLayer({
  children,
  range = 80,
  className,
}: {
  children: ReactNode;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div
      ref={ref}
      style={{ y: reduce ? 0 : y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
