"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Alias for `!useReducedMotion()`.
 *
 * iPhone scroll routing uses `useIOSAnimationPath().useNativeScroll` — not this hook.
 * Call sites that already return static markup when `reducedMotion` is true do not
 * need an additional `if (!scrollMotion)` branch; it is unreachable there.
 */
export function useScrollMotionEnabled() {
  const reducedMotion = useReducedMotion();
  return !reducedMotion;
}
