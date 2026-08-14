"use client";

import { useLayoutEffect } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  presetToAnimista,
  V1_BEAT_STAGGER,
  type AnimistaEnter,
} from "@/lib/animations/v1-animista";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

type V1EnterMotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
  animation?: AnimistaEnter;
  beat?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Variant 1 — Animista enter when element scrolls into view (once).
 * iPhone matches variant 2: try CSS motion, but start visible so unsupported
 * browsers get a complete static page.
 */
export function V1EnterMotion({
  children,
  preset = "settle",
  animation,
  beat = 0,
  delay = 0,
  className,
  style,
}: V1EnterMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const { useNativeScroll, useStaticFallback } = useIOSAnimationPath();
  const enabled = variant === 1 && !reducedMotion && !useStaticFallback;
  const { ref, revealed } = useInViewReveal({ enabled });

  const anim = animation ?? presetToAnimista(preset);
  const totalDelay = delay + beat * V1_BEAT_STAGGER;

  useLayoutEffect(() => {
    if (!useNativeScroll || !enabled || !revealed) return;
    const el = ref.current;
    if (!el) return;

    const failsafeId = window.setTimeout(() => {
      if (!el.isConnected) return;
      el.style.opacity = "1";
      el.style.transform = "none";
    }, totalDelay * 1000 + 800);

    return () => window.clearTimeout(failsafeId);
  }, [useNativeScroll, enabled, revealed, totalDelay, ref]);

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
        data-anim={anim}
        style={{
          ...style,
          ["--ios-inview-delay" as string]: `${totalDelay}s`,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${className ?? ""} ${revealed ? `anim-${anim}` : "anim-v1-hidden"}`.trim()}
      style={{
        ...style,
        animationDelay: revealed ? `${totalDelay}s` : undefined,
      }}
    >
      {children}
    </div>
  );
}
