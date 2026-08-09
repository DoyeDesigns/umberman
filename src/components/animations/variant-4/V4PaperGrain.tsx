"use client";

import type { RefObject } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { VARIANT_4 } from "@/lib/animations/config";

type V4PaperGrainProps = {
  targetRef: RefObject<HTMLElement | null>;
};

export function V4PaperGrain({ targetRef }: V4PaperGrainProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();

  if (variant !== 4 || reducedMotion) {
    return null;
  }

  void targetRef;

  return (
    <div
      aria-hidden
      className="v4-paper-grain pointer-events-none fixed inset-0 z-50"
      style={{ opacity: VARIANT_4.grainOpacity }}
    />
  );
}
