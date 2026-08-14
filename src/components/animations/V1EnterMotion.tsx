"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  animistaToIosOffset,
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

const IOS_REVEAL_DURATION = 0.55;

/**
 * Variant 1 — Animista enter when element scrolls into view (once).
 * On iPhone uses plain transform transitions (Animista/GSAP unreliable in WebKit).
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
  const enabled = variant === 1 && !reducedMotion;
  const { ref, revealed } = useInViewReveal({ enabled });

  const anim = animation ?? presetToAnimista(preset);
  const totalDelay = delay + beat * V1_BEAT_STAGGER;

  if (!enabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (useStaticFallback) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (useNativeScroll) {
    const offset = animistaToIosOffset(anim);
    const transform = revealed
      ? "translate3d(0, 0, 0) scale(1)"
      : `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${offset.scale})`;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...style,
          opacity: 1,
          transform,
          transition: `transform ${IOS_REVEAL_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) ${totalDelay}s`,
          willChange: revealed ? "auto" : "transform",
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
