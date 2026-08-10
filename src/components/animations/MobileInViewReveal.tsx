"use client";

import { motion } from "framer-motion";
import { mobileInViewTransition } from "@/lib/animations/mobile-motion";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
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
 * In-view reveal fallback. On iPhone uses plain div + CSS transform (no Framer).
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
  const { useNativeScroll } = useIOSAnimationPath();
  const { ref, revealed } = useInViewReveal({ enabled: !reducedMotion });

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (useNativeScroll) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...style,
          opacity: 1,
          transform: revealed ? "translate3d(0, 0, 0)" : `translate3d(0, ${y}px, 0)`,
          transition: `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
          willChange: "transform",
        }}
      >
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
