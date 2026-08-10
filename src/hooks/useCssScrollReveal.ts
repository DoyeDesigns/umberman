"use client";

import { useIsIOS } from "@/hooks/useIsIOS";

/**
 * iPhone scroll text + motion: always GSAP → element.style (direct DOM).
 * CSS view() reports supported on WebKit but often leaves text clipped/invisible.
 */
export function useCssScrollReveal() {
  const isIOS = useIsIOS();

  return {
    isIOS,
    /** Never use CSS view() on iOS — unreliable in this layout. */
    useCssPath: false,
    /** GSAP writes clip-path/opacity directly on word spans. */
    useDirectPath: isIOS,
  };
}
