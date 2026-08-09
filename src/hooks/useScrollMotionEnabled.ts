"use client";

import { useIsIOS } from "@/hooks/useIsIOS";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Scroll-linked Framer Motion is disabled on iOS Safari/WebKit where it often fails. */
export function useScrollMotionEnabled() {
  const isIOS = useIsIOS();
  const reducedMotion = useReducedMotion();
  return !isIOS && !reducedMotion;
}
