"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Scroll-linked motion runs on all platforms when reduced motion is off. */
export function useScrollMotionEnabled() {
  const reducedMotion = useReducedMotion();
  return !reducedMotion;
}
