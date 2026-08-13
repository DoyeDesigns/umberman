"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInViewReveal } from "@/hooks/useInViewReveal";

type AltFadeUpRevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** Vertical offset in px before reveal. */
  y?: number;
};

/**
 * Fade up from below — triggers once when the element enters the viewport.
 */
export function AltFadeUpReveal({
  children,
  className,
  style,
  delay = 0,
  y = 28,
}: AltFadeUpRevealProps) {
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
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translate3d(0, 0, 0)" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: revealed ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
