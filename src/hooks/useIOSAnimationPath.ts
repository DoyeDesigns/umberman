"use client";

import { useClientReady } from "@/hooks/useClientReady";
import { readIsIOS, useIsIOS } from "@/hooks/useIsIOS";

/**
 * Single gate for iPhone animation routing.
 * When `useNativeScroll` is true, components must NOT render Framer scroll-linked
 * motion (ScrollLinkedDiv, useTransform scroll chains, motion.div animate).
 */
export function useIOSAnimationPath() {
  const isIOS = useIsIOS();
  const ready = useClientReady();

  return {
    isIOS,
    ready,
    /** Plain visible markup during SSR / hydration on iPhone. */
    useStaticFallback: isIOS && !ready,
    /** CSS @keyframes + manual scroll listeners — no Framer on iPhone. */
    useNativeScroll: isIOS && ready,
  };
}

/** Non-hook check for module-level guards (e.g. safari-scroll-fix). */
export function shouldUseFramerScroll(): boolean {
  return !readIsIOS();
}
