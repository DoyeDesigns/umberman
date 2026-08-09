"use client";

import { motion } from "framer-motion";
import {
  MOBILE_IN_VIEWPORT,
  mobileInViewTransition,
} from "@/lib/animations/mobile-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MobileInViewRevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  y?: number;
};

/** Reliable reveal for iOS — avoids scroll-linked progress that breaks in WebKit. */
export function MobileInViewReveal({
  children,
  className,
  style,
  delay = 0,
  duration = 0.55,
  y = 14,
}: MobileInViewRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={MOBILE_IN_VIEWPORT}
      transition={mobileInViewTransition(delay, duration)}
    >
      {children}
    </motion.div>
  );
}
