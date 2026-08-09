"use client";

import { type UseScrollOptions } from "framer-motion";
import { useManualScrollProgress } from "@/hooks/useManualScrollProgress";

/**
 * Scroll-linked progress via JS measurement. Framer Motion's ScrollTimeline
 * path breaks scroll-linked opacity on iPhone WebKit (motion#3559).
 */
export function useSafeScroll(options: UseScrollOptions = {}) {
  return useManualScrollProgress(options);
}
