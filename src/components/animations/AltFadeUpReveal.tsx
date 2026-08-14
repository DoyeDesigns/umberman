"use client";

import { useClientReady } from "@/hooks/useClientReady";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInViewReveal } from "@/hooks/useInViewReveal";

type AltFadeUpRevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  y?: number;
};

/**
 * Fade up on desktop. iPhone path matches V2Motion: visible markup, never opacity 0.
 */
export function AltFadeUpReveal({
  children,
  className,
  style,
  delay = 0,
  y = 28,
}: AltFadeUpRevealProps) {
  const reducedMotion = useReducedMotion();
  const ready = useClientReady();
  const { useNativeScroll } = useIOSAnimationPath();
  const enabled = !reducedMotion && ready && !useNativeScroll;
  const { ref, revealed } = useInViewReveal({ enabled });

  if (reducedMotion || !ready || useNativeScroll) {
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
