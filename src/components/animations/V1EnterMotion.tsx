"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
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
