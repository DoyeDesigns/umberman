"use client";

import { useScroll, type UseScrollOptions } from "framer-motion";

/** Single entry point for scroll-linked animations (mobile tuning lives here). */
export function useSafeScroll(options: UseScrollOptions = {}) {
  return useScroll(options);
}
