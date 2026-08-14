"use client";

import { useLayoutEffect } from "react";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
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
 * iPhone matches variant 2: try CSS motion, but start visible so unsupported
 * browsers get a complete static page.
 */
export function AltFadeUpReveal({
  children,
  className,
  style,
  delay = 0,
  y = 28,
}: AltFadeUpRevealProps) {
  const reducedMotion = useReducedMotion();
  const { useNativeScroll, useStaticFallback } = useIOSAnimationPath();
  const enabled = !reducedMotion && !useStaticFallback;
  const { ref, revealed } = useInViewReveal({ enabled });

  useLayoutEffect(() => {
    if (!useNativeScroll || !enabled || !revealed) return;
    const el = ref.current;
    if (!el) return;

    const failsafeId = window.setTimeout(() => {
      if (!el.isConnected) return;
      el.style.opacity = "1";
      el.style.transform = "none";
    }, delay * 1000 + 900);

    return () => window.clearTimeout(failsafeId);
  }, [useNativeScroll, enabled, revealed, delay, ref]);

  if (!enabled) {
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
        className={`ios-inview ${revealed ? "is-inview" : ""} ${className ?? ""}`.trim()}
        data-anim="fade-up"
        style={{
          ...style,
          ["--ios-inview-delay" as string]: `${delay}s`,
          ["--ios-inview-y" as string]: `${y}px`,
        }}
      >
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
