"use client";

import { motion } from "framer-motion";
import { mobileInViewTransition } from "@/lib/animations/mobile-motion";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MobileInViewRevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  y?: number;
};

/**
 * iOS-safe reveal: never gates readability on opacity 0 + whileInView
 * (broken inside overflow-x-hidden on WebKit). Uses IO + scroll checks + timeout.
 */
export function MobileInViewReveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.55,
  y = 14,
}: MobileInViewRevealProps) {
  const reducedMotion = useReducedMotion();
  const { ref, revealed } = useInViewReveal({ enabled: !reducedMotion });

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, opacity: 1 }}
      initial={{ opacity: 1, y }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 1, y }}
      transition={mobileInViewTransition(delay, duration)}
    >
      {children}
    </motion.div>
  );
}
